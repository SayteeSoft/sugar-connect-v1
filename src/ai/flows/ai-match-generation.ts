'use server';

/**
 * @fileOverview AI-driven match suggestions based on user profiles, behavior, and preferences.
 *
 * - generateAiMatch - A function that generates AI-driven match suggestions.
 * - AiMatchInput - The input type for the generateAiMatch function.
 * - AiMatchOutput - The return type for the generateAiMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMatchInputSchema = z.object({
  userProfile: z
    .string()
    .describe('Detailed profile information of the user, including preferences, interests, and relationship goals.'),
  userBehavior: z
    .string()
    .describe('Data on user behavior within the app, such as search history, liked profiles, and messaging patterns.'),
  userPreferences: z
    .string()
    .describe('Explicitly stated preferences of the user regarding potential matches.'),
  numberOfMatches: z.number().describe('The number of potential matches to generate.'),
});
export type AiMatchInput = z.infer<typeof AiMatchInputSchema>;

const AiMatchOutputSchema = z.object({
  suggestedMatches: z
    .array(z.string())
    .describe('A list of user IDs or profile summaries of potential matches.'),
});
export type AiMatchOutput = z.infer<typeof AiMatchOutputSchema>;

export async function generateAiMatch(input: AiMatchInput): Promise<AiMatchOutput> {
  return aiMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMatchPrompt',
  input: {schema: AiMatchInputSchema},
  output: {schema: AiMatchOutputSchema},
  prompt: `You are an AI matchmaker. Your task is to analyze user profiles, behavior, and preferences to suggest potential matches.

  Analyze the following user data and suggest {{numberOfMatches}} potential matches. Provide the output as a list of user IDs or profile summaries:

  User Profile: {{{userProfile}}}
  User Behavior: {{{userBehavior}}}
  User Preferences: {{{userPreferences}}}

  Consider factors such as shared interests, compatibility of relationship goals, and observed interaction patterns.
  Ensure that the suggested matches align with the user's stated preferences and behavior within the app.
  `,
});

const aiMatchFlow = ai.defineFlow(
  {
    name: 'aiMatchFlow',
    inputSchema: AiMatchInputSchema,
    outputSchema: AiMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
