'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate personalized messages from Sugar Babies to Sugar Daddies.
 *
 * The flow uses AI to create engaging messages based on a character profile for each Sugar Baby.
 * It includes types for input and output schemas and an exported function to trigger the flow.
 *
 * @exports generateSugarBabyMessage - A function to generate a personalized message from a Sugar Baby.
 * @exports GenerateSugarBabyMessageInput - The input type for the generateSugarBabyMessage function.
 * @exports GenerateSugarBabyMessageOutput - The output type for the generateSugarBabyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSugarBabyMessageInputSchema = z.object({
  sugarBabyProfile: z.object({
    name: z.string().describe('The name of the Sugar Baby.'),
    age: z.number().describe('The age of the Sugar Baby.'),
    interests: z.string().describe('The interests of the Sugar Baby.'),
    location: z.string().describe('The location of the Sugar Baby.'),
    messageHistory: z.array(z.string()).optional().describe('Optional history of previous messages between the Sugar Daddy and Sugar Baby.'),
  }).describe('The profile of the Sugar Baby sending the message.'),
  sugarDaddyName: z.string().describe('The name of the Sugar Daddy receiving the message.'),
});
export type GenerateSugarBabyMessageInput = z.infer<typeof GenerateSugarBabyMessageInputSchema>;

const GenerateSugarBabyMessageOutputSchema = z.object({
  message: z.string().describe('The personalized message from the Sugar Baby.'),
});
export type GenerateSugarBabyMessageOutput = z.infer<typeof GenerateSugarBabyMessageOutputSchema>;

export async function generateSugarBabyMessage(input: GenerateSugarBabyMessageInput): Promise<GenerateSugarBabyMessageOutput> {
  return generateSugarBabyMessageFlow(input);
}

const generateSugarBabyMessagePrompt = ai.definePrompt({
  name: 'generateSugarBabyMessagePrompt',
  input: {schema: GenerateSugarBabyMessageInputSchema},
  output: {schema: GenerateSugarBabyMessageOutputSchema},
  prompt: `You are a helpful AI assistant that crafts personalized and engaging messages from Sugar Babies to Sugar Daddies on a dating platform.

  Given the Sugar Baby's profile and the Sugar Daddy's name, generate a message that is likely to capture the Sugar Daddy's attention and encourage interaction.
  Consider the Sugar Baby's interests and location to make the message relevant and appealing.
  The message should be short, friendly, and inviting.

  Here are some examples of good messages:
  - "Hi {{sugarDaddyName}}, I saw your profile and I'm really interested in {{sugarBabyProfile.interests}}. I'm in {{sugarBabyProfile.location}}, maybe we could chat sometime?"
  - "Hey {{sugarDaddyName}}, your profile caught my eye! I'm {{sugarBabyProfile.age}} and love {{sugarBabyProfile.interests}}.  Would love to hear more about you."

  Sugar Baby Profile:
  Name: {{sugarBabyProfile.name}}
  Age: {{sugarBabyProfile.age}}
  Interests: {{sugarBabyProfile.interests}}
  Location: {{sugarBabyProfile.location}}

  Sugar Daddy's Name: {{sugarDaddyName}}

  Previous Message History (if any):
  {{#if sugarBabyProfile.messageHistory}}
    {{#each sugarBabyProfile.messageHistory}}
      - {{{this}}}
    {{/each}}
  {{else}}
    No previous messages.
  {{/if}}

  Message:`, 
});

const generateSugarBabyMessageFlow = ai.defineFlow(
  {
    name: 'generateSugarBabyMessageFlow',
    inputSchema: GenerateSugarBabyMessageInputSchema,
    outputSchema: GenerateSugarBabyMessageOutputSchema,
  },
  async input => {
    const {output} = await generateSugarBabyMessagePrompt(input);
    return output!;
  }
);
