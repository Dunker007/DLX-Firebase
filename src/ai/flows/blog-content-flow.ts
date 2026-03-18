'use server';
/**
 * @fileOverview A technical content generation AI agent.
 *
 * - generateBlogContent - A function that handles the generation of technical blog posts.
 * - BlogContentInput - The input type for the generateBlogContent function.
 * - BlogContentOutput - The return type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogContentInputSchema = z.object({
  prompt: z.string().describe('The main topic or abstract for the blog post.'),
  tone: z.enum(['technical', 'professional', 'creative', 'minimal']).describe('The desired tone of the content.'),
  target: z.enum(['twitter', 'medium', 'newsletter', 'whitepaper']).describe('The target distribution channel.'),
});
export type BlogContentInput = z.infer<typeof BlogContentInputSchema>;

const BlogContentOutputSchema = z.object({
  title: z.string().describe('A catchy, SEO-optimized title.'),
  content: z.string().describe('The full generated blog content in Markdown format.'),
  seoKeywords: z.array(z.string()).describe('A list of recommended SEO keywords.'),
  readingTime: z.number().describe('Estimated reading time in minutes.'),
  wordCount: z.number().describe('Total word count.'),
});
export type BlogContentOutput = z.infer<typeof BlogContentOutputSchema>;

export async function generateBlogContent(input: BlogContentInput): Promise<BlogContentOutput> {
  return blogContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'blogContentPrompt',
  input: {schema: BlogContentInputSchema},
  output: {schema: BlogContentOutputSchema},
  prompt: `You are CopyArchitect, an expert technical writer and content strategist. 
Your goal is to generate high-quality, SEO-optimized content based on the user's prompt.

Topic/Abstract: {{{prompt}}}
Tone: {{{tone}}}
Target Platform: {{{target}}}

Please provide a structured response including a compelling title, the full article content (Markdown), relevant SEO keywords, and metadata (reading time, word count). 
Ensure the technical depth is appropriate for the "{{{tone}}}" tone and the formatting is optimized for "{{{target}}}".`,
});

const blogContentFlow = ai.defineFlow(
  {
    name: 'blogContentFlow',
    inputSchema: BlogContentInputSchema,
    outputSchema: BlogContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
