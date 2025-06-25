
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import type { UserProfile } from '@/lib/types';

export async function updateUserProfile(id: string, data: Partial<UserProfile>) {
  try {
    const updatedUser = await db.updateProfile(id, data);
    if (!updatedUser) {
      return { success: false, error: 'User not found.' };
    }
    // Revalidate paths to reflect changes
    revalidatePath(`/admin/edit/${id}`);
    revalidatePath(`/profile/${id}`);
    revalidatePath('/admin');
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: 'Failed to update profile.' };
  }
}
