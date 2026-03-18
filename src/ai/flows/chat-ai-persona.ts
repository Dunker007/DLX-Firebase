
'use server';
/**
 * @fileOverview This file implements a Grounded Genkit flow for AI agent personas.
 * Agents can now search News and Labs Roadmap using tools.
 *
 * - chatWithAIAgentPersona - A function that handles the interaction with the selected AI agent persona.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { initializeFirebase, getSdks } from '@/firebase';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';

// Tools for grounding
const searchNewsTool = ai.defineTool(
  {
    name: 'searchNews',
    description: 'Searches the latest platform news and research articles.',
    inputSchema: z.object({
      query: z.string().optional().describe('Search query for the news.'),
    }),
    outputSchema: z.array(z.object({
      title: z.string(),
      content: z.string(),
      category: z.string(),
    })),
  },
  async () => {
    const { firestore } = initializeFirebase();
    const newsRef = collection(firestore, 'news_articles');
    const q = query(newsRef, orderBy('publishDate', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      title: doc.data().title,
      content: doc.data().content,
      category: doc.data().category,
    }));
  }
);

const checkRoadmapTool = ai.defineTool(
  {
    name: 'checkRoadmap',
    description: 'Checks the experimental feature roadmap and lab projects.',
    inputSchema: z.object({}),
    outputSchema: z.array(z.object({
      name: z.string(),
      description: z.string(),
      status: z.string(),
    })),
  },
  async () => {
    const { firestore } = initializeFirebase();
    const labsRef = collection(firestore, 'lab_projects');
    const q = query(labsRef, limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      name: doc.data().name,
      description: doc.data().description,
      status: doc.data().status,
    }));
  }
);

const ChatAIPersonaInputSchema = z.object({
  message: z.string().describe('The user\'s message to the AI agent.'),
  personaName: z.enum(['Lux', 'Architect', 'Dev']).describe('The name of the selected AI agent persona.'),
});
export type ChatAIPersonaInput = z.infer<typeof ChatAIPersonaInputSchema>;

const ChatAIPersonaOutputSchema = z.object({
  response: z.string().describe('The AI agent\'s generated response.'),
});
export type ChatAIPersonaOutput = z.infer<typeof ChatAIPersonaOutputSchema>;

const personaInstructionsMap: Record<ChatAIPersonaInput['personaName'], string> = {
  Lux: `You are Lux, a helpful and elegant AI assistant for the LuxAI Platform. You have access to tools to search news and check the roadmap. Ground your answers in this platform data when relevant.`,
  Architect: `You are Architect, specializing in system design. Use the roadmap tool to see what's being built and provide structural advice grounded in the platform's actual development.`,
  Dev: `You are Dev, a direct technical assistant. Use the news and roadmap tools to provide up-to-date technical context on the platform's state.`,
};

const chatAIPersonaPrompt = ai.definePrompt({
  name: 'chatAIPersonaPrompt',
  tools: [searchNewsTool, checkRoadmapTool],
  input: {
    schema: z.object({
      userMessage: z.string(),
      agentInstructions: z.string(),
    }),
  },
  output: {schema: ChatAIPersonaOutputSchema},
  prompt: `{{{agentInstructions}}}

User message: {{{userMessage}}}

If the user asks about platform updates, projects, or news, use your tools to provide a grounded response.`,
});

const chatAIPersonaFlow = ai.defineFlow(
  {
    name: 'chatAIPersonaFlow',
    inputSchema: ChatAIPersonaInputSchema,
    outputSchema: ChatAIPersonaOutputSchema,
  },
  async (input) => {
    const agentInstructions = personaInstructionsMap[input.personaName];
    const {output} = await chatAIPersonaPrompt({
      userMessage: input.message,
      agentInstructions: agentInstructions,
    });
    return output!;
  }
);

export async function chatWithAIAgentPersona(input: ChatAIPersonaInput): Promise<ChatAIPersonaOutput> {
  return chatAIPersonaFlow(input);
}
