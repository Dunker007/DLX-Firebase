
'use server';
/**
 * @fileOverview A video generation AI agent using Google Veo.
 *
 * - generateVideoClip - A function that handles text-to-video generation.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';

const VideoGenInputSchema = z.object({
  prompt: z.string().describe('The visual description for the video clip.'),
  aspectRatio: z.enum(['16:9', '9:16']).default('16:9'),
});
export type VideoGenInput = z.infer<typeof VideoGenInputSchema>;

const VideoGenOutputSchema = z.object({
  videoUrl: z.string().describe('The generated video URL.'),
});
export type VideoGenOutput = z.infer<typeof VideoGenOutputSchema>;

export async function generateVideoClip(input: VideoGenInput): Promise<VideoGenOutput> {
  return videoGenerationFlow(input);
}

const videoGenerationFlow = ai.defineFlow(
  {
    name: 'videoGenerationFlow',
    inputSchema: VideoGenInputSchema,
    outputSchema: VideoGenOutputSchema,
  },
  async (input) => {
    let { operation } = await ai.generate({
      model: 'googleai/veo-3.0-generate-preview',
      prompt: input.prompt,
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      if (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video');
    }

    // Fetch the video data to return as data URI
    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
      `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`
    );
    
    if (!videoDownloadResponse.ok) {
      throw new Error('Failed to fetch video data');
    }

    const arrayBuffer = await videoDownloadResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Video = buffer.toString('base64');

    return {
      videoUrl: `data:video/mp4;base64,${base64Video}`,
    };
  }
);
