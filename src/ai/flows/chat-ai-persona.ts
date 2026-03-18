'use server';
/**
 * @fileOverview This file implements a Genkit flow for interacting with AI agent personas.
 * Users can select a persona and chat with it to receive specialized assistance.
 *
 * - chatWithAIAgentPersona - A function that handles the interaction with the selected AI agent persona.
 * - ChatAIPersonaInput - The input type for the chatWithAIAgentPersona function.
 * - ChatAIPersonaOutput - The return type for the chatWithAIAgentPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the chat agent persona flow.
const ChatAIPersonaInputSchema = z.object({
  message: z.string().describe('The user\'s message to the AI agent.'),
  personaName: z.enum(['Lux', 'Architect', 'Dev']).describe('The name of the selected AI agent persona.'),
});
export type ChatAIPersonaInput = z.infer<typeof ChatAIPersonaInputSchema>;

// Define the output schema for the chat agent persona flow.
const ChatAIPersonaOutputSchema = z.object({
  response: z.string().describe('The AI agent\'s generated response.'),
});
export type ChatAIPersonaOutput = z.infer<typeof ChatAIPersonaOutputSchema>;

// Map of persona names to their system instructions.
const personaInstructionsMap: Record<ChatAIPersonaInput['personaName'], string> = {
  Lux: `You are Lux, a helpful and elegant AI assistant for the LuxAI Platform. You provide concise, insightful, and sophisticated answers. Your goal is to assist users with general queries about the platform, AI, or any other topic with grace and clarity.`,
  Architect: `You are Architect, an AI assistant from the LuxAI Platform, specialized in structural and design principles. You provide detailed, logical, and well-structured advice, particularly for software architecture, system design, or problem-solving. Your tone is analytical and precise.`,
  Dev: `You are Dev, an AI assistant from the LuxAI Platform, specialized in software development. You provide practical coding advice, debugging tips, explain technical concepts clearly, and assist with code-related tasks. Your responses are practical, technical, and direct.`,
};

// Define the prompt that the AI agent will use.
const chatAIPersonaPrompt = ai.definePrompt({
  name: 'chatAIPersonaPrompt',
  input: {
    schema: z.object({
      userMessage: z.string().describe('The actual message from the user.'),
      agentInstructions: z.string().describe('The system instructions defining the AI agent persona role.'),
    }),
  },
  output: {schema: ChatAIPersonaOutputSchema},
  prompt: `{{{agentInstructions}}}

User message: {{{userMessage}}}

Please provide a response based on your persona, keeping it helpful and relevant to the user's query.`,
});

// Define the Genkit flow for chatting with an AI agent persona.
const chatAIPersonaFlow = ai.defineFlow(
  {
    name: 'chatAIPersonaFlow',
    inputSchema: ChatAIPersonaInputSchema,
    outputSchema: ChatAIPersonaOutputSchema,
  },
  async (input) => {
    const agentInstructions = personaInstructionsMap[input.personaName];
    if (!agentInstructions) {
      throw new Error(`Unknown persona: ${input.personaName}`);
    }

    const {output} = await chatAIPersonaPrompt({
      userMessage: input.message,
      agentInstructions: agentInstructions,
    });
    return output!;
  }
);

/**
 * Interacts with a selected AI agent persona through a chat interface.
 *
 * @param input - The ChatAIPersonaInput containing the user's message and the selected persona name.
 * @returns A Promise that resolves to ChatAIPersonaOutput, containing the AI agent's response.
 */
export async function chatWithAIAgentPersona(
  input: ChatAIPersonaInput
): Promise<ChatAIPersonaOutput> {
  return chatAIPersonaFlow(input);
}
