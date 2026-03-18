'use server';
/**
 * @fileOverview A financial investment insights AI agent.
 *
 * - smartFolioInsights - A function that handles the generation of investment insights.
 * - SmartFolioInsightsInput - The input type for the smartFolioInsights function.
 * - SmartFolioInsightsOutput - The return type for the smartFolioInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmartFolioInsightsInputSchema = z.object({
  currentPortfolioValue: z.number().describe('The current total value of the user\u0027s investment portfolio.'),
  monthlyContribution: z.number().describe('The amount of money the user contributes to their investments monthly.'),
  riskTolerance: z.enum(['low', 'medium', 'high', 'conservative', 'moderate', 'aggressive']).describe('The user\u0027s personal risk tolerance level for investments.'),
  investmentHorizonYears: z.number().describe('The number of years the user plans to invest.'),
  investmentGoals: z.string().describe('A detailed description of the user\u0027s investment goals, e.g., \u0027saving for retirement in 20 years\u0027 or \u0027buying a house in 5 years\u0027.'),
  existingInvestmentsDescription: z.string().optional().describe('An optional comma-separated list or description of the user\u0027s current investment holdings.'),
});
export type SmartFolioInsightsInput = z.infer<typeof SmartFolioInsightsInputSchema>;

const SmartFolioInsightsOutputSchema = z.object({
  summary: z.string().describe('An overall summary of the current portfolio status, risk assessment, and key recommendations.'),
  riskAnalysis: z.object({
    level: z.string().describe('The identified risk level of the current portfolio or suggested strategy (e.g., \u0027Moderate\u0027, \u0027High\u0027).'),
    detailedAnalysis: z.string().describe('A detailed explanation of the risk factors, including potential downsides and upsides.'),
  }).describe('A comprehensive analysis of the investment risk.'),
  investmentStrategySuggestions: z.array(z.string()).describe('A list of suggested investment strategies tailored to the user\u0027s profile and goals.'),
  diversificationRecommendations: z.array(z.string()).describe('Recommendations for improving portfolio diversification across different asset classes or sectors.'),
  nextSteps: z.array(z.string()).describe('A list of actionable steps the user can take based on the insights and suggestions provided.'),
});
export type SmartFolioInsightsOutput = z.infer<typeof SmartFolioInsightsOutputSchema>;

export async function smartFolioInsights(input: SmartFolioInsightsInput): Promise<SmartFolioInsightsOutput> {
  return smartFolioInsightsFlow(input);
}

const smartFolioInsightsPrompt = ai.definePrompt({
  name: 'smartFolioInsightsPrompt',
  input: { schema: SmartFolioInsightsInputSchema },
  output: { schema: SmartFolioInsightsOutputSchema },
  prompt: `You are an expert financial advisor specializing in personalized investment portfolio analysis and strategy development. Your goal is to provide comprehensive and actionable insights based on the user's financial data and goals.

Analyze the following information and generate a detailed report, including a summary, risk analysis, specific investment strategy suggestions, diversification recommendations, and clear next steps.

## User Financial Data and Goals:
- Current Portfolio Value: {{{currentPortfolioValue}}}
- Monthly Contribution: {{{monthlyContribution}}}
- Risk Tolerance: {{{riskTolerance}}}
- Investment Horizon: {{{investmentHorizonYears}}} years
- Investment Goals: {{{investmentGoals}}}
{{#if existingInvestmentsDescription}}- Existing Investments: {{{existingInvestmentsDescription}}}{{/if}}

Provide the output in a structured JSON format as described by the output schema, ensuring all fields are populated with relevant and professional financial advice.`,
});

const smartFolioInsightsFlow = ai.defineFlow(
  {
    name: 'smartFolioInsightsFlow',
    inputSchema: SmartFolioInsightsInputSchema,
    outputSchema: SmartFolioInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await smartFolioInsightsPrompt(input);
    return output!;
  },
);
