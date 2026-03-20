import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const GDRIVE_FOLDER_ID = process.env.GDRIVE_FOLDER_ID;

const getGoogleAuth = () => {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) throw new Error('Missing Google Auth Credentials in Next.js environment');
  
  try {
    const credentials = JSON.parse(credentialsJson);
    return new google.auth.GoogleAuth({ 
      credentials, 
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });
  } catch {
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON format');
  }
};

// Finds an existing specific chat memory file for an agent
async function findChatMemoryFile(agentId: string, drive: any, parentId: string) {
  const fileName = `memory_${agentId}.json`;
  const response = await drive.files.list({
    q: `name = '${fileName}' and '${parentId}' in parents and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });
  return response.data.files?.[0] || null;
}

// GET: Read Chat History from Google Drive
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    if (!agentId) return NextResponse.json({ error: 'Missing agentId' }, { status: 400 });
    if (!GDRIVE_FOLDER_ID) return NextResponse.json({ error: 'Missing GDRIVE_FOLDER_ID' }, { status: 500 });
    
    // TODO: In the future we should handle subfolders like /Agents/Lux/Memory natively.
    // For now, we write directly to the Root Brain folder for immediate testing.
    
    const auth = getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });
    
    let file = await findChatMemoryFile(agentId, drive, GDRIVE_FOLDER_ID);
    
    if (!file || !file.id) {
      return NextResponse.json([]); // No history yet
    }

    const fileRes = await drive.files.get({
      fileId: file.id,
      alt: 'media',
    }, { responseType: 'json' });

    return NextResponse.json(fileRes.data || []);
  } catch (error: any) {
    console.error("GET Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Append Chat Message to Google Drive
export async function POST(request: Request) {
  try {
    const { role, content, agent_id } = await request.json();
    if (!agent_id) return NextResponse.json({ error: 'Missing agent_id' }, { status: 400 });
    if (!GDRIVE_FOLDER_ID) return NextResponse.json({ error: 'Missing GDRIVE_FOLDER_ID' }, { status: 500 });

    const auth = getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });

    // Step 1: Read existing memory
    let file = await findChatMemoryFile(agent_id, drive, GDRIVE_FOLDER_ID);
    let history: any[] = [];
    
    if (file && file.id) {
      const fileRes = await drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'json' });
      history = Array.isArray(fileRes.data) ? fileRes.data : [];
    }

    // Step 2: Append new message
    history.push({
      role,
      content,
      agent_id,
      timestamp: new Date().toISOString()
    });

    const fileMetadata = {
      name: `memory_${agent_id}.json`,
      mimeType: 'application/json',
      ...( !file ? { parents: [GDRIVE_FOLDER_ID] } : {} )
    };
    
    const media = {
      mimeType: 'application/json',
      body: JSON.stringify(history, null, 2)
    };

    // Step 3: Write back to Drive
    if (file && file.id) {
      await drive.files.update({
        fileId: file.id,
        requestBody: { mimeType: 'application/json' },
        media: media
      });
    } else {
      await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Clear Chat History
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    if (!agentId || !GDRIVE_FOLDER_ID) return NextResponse.json({ success: false });

    const auth = getGoogleAuth();
    const drive = google.drive({ version: 'v3', auth });

    let file = await findChatMemoryFile(agentId, drive, GDRIVE_FOLDER_ID);
    if (file && file.id) {
      await drive.files.delete({ fileId: file.id });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
