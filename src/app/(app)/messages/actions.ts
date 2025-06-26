'use server';

import { db } from '@/lib/db';

export async function spendCredit(userId: string) {
  try {
    const user = await db.getProfileById(userId);

    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    if (user.role !== 'Sugar Daddy') {
      return { success: false, error: 'User is not a Sugar Daddy.' };
    }
    
    if (user.credits <= 0) {
      return { success: false, error: 'Insufficient credits.' };
    }

    const updatedUser = await db.updateProfile(userId, { credits: user.credits - 1 });
    
    if (!updatedUser) {
        return { success: false, error: 'Failed to update user profile.' };
    }

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Failed to spend credit:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
