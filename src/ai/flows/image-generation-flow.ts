'use server';
/**
 * @fileOverview A generative art and branding asset AI agent.
 *
 * - generateImage - A function that handles image synthesis using Imagen models.
 * - ImageGenInput - The input type for the generateImage function.
 * - ImageGenOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGenInputSchema = z.object({
  prompt: z.string().describe('The visual prompt for the image generation.'),
  aspectRatio: z.enum(['1:1', '16:9', '4:5']).default('1:1'),
  style: z.enum(['photoreal', 'anime', 'painting', '3d']).describe('The rendering engine/style.'),
});
export type ImageGenInput = z.infer<typeof ImageGenInputSchema>;

const ImageGenOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a Base64 data URI.'),
  revisedPrompt: z.string().describe('The prompt as refined by the AI for better results.'),
});
export type ImageGenOutput = z.infer<typeof ImageGenOutputSchema>;

export async function generateImage(input: ImageGenInput): Promise<ImageGenOutput> {
  return imageGenerationFlow(input);
}

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: ImageGenInputSchema,
    outputSchema: ImageGenOutputSchema,
  },
  async input => {
    // We enhance the prompt based on the style
    const enhancedPrompt = `${input.prompt}, style: ${input.style}, high resolution, cinematic lighting, masterpiece`;
    
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: enhancedPrompt,
    });

    if (!media) {
      throw new Error('Image generation failed: No media returned.');
    }

    return {
      imageUrl: media.url,
      revisedPrompt: enhancedPrompt,
    };
  }
);
