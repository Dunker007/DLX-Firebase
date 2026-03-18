
'use server';
/**
 * @fileOverview A Text-to-Speech AI agent for vocal synthesis.
 *
 * - generateAudio - A function that handles converting text to audio.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import wav from 'wav';

const AudioGenInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  voice: z.enum(['Algenib', 'Achernar', 'Rigel']).default('Algenib'),
});
export type AudioGenInput = z.infer<typeof AudioGenInputSchema>;

const AudioGenOutputSchema = z.object({
  audioUrl: z.string().describe('The generated audio as a Base64 data URI.'),
});
export type AudioGenOutput = z.infer<typeof AudioGenOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateAudio(input: AudioGenInput): Promise<AudioGenOutput> {
  return audioGenerationFlow(input);
}

const audioGenerationFlow = ai.defineFlow(
  {
    name: 'audioGenerationFlow',
    inputSchema: AudioGenInputSchema,
    outputSchema: AudioGenOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: input.voice },
          },
        },
      },
      prompt: input.text,
    });

    if (!media) {
      throw new Error('no media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUrl: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
