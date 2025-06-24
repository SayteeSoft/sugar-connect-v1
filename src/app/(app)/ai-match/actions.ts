'use server';

import { generateAiMatch } from '@/ai/flows/ai-match-generation';
import { AiMatchInput } from '@/ai/flows/ai-match-generation';

export async function getAiMatches() {
  // In a real app, you would fetch the current logged-in user's data here.
  const mockInput: AiMatchInput = {
    userProfile: 'User is a 34-year-old software engineer living in London. Enjoys hiking, photography, and trying new restaurants. Looking for a serious, long-term relationship.',
    userBehavior: 'Has liked profiles of women aged 30-38 who are also in the tech industry. Has searched for users in the London area.',
    userPreferences: 'Prefers non-smokers, active lifestyle, enjoys travel.',
    numberOfMatches: 5,
  };

  try {
    const result = await generateAiMatch(mockInput);
    // In a real app, you'd use the returned IDs to fetch full user profiles from your database.
    // For this example, we'll just return the generated text.
    return { success: true, matches: result.suggestedMatches };
  } catch (error) {
    console.error('AI Match Generation Failed:', error);
    return { success: false, error: 'Failed to generate matches.' };
  }
}
