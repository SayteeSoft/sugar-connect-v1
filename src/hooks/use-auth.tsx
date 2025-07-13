
"use client";

import { createContext, useContext } from 'react';
import type { User, Role, ProfileFormValues } from '@/types';

// The user object available in the context should not have the password hash.
export type SafeUser = Omit<User, 'passwordHash'>;

export interface AuthContextType {
  user: SafeUser | null;
  login: (email: string, pass: string) => Promise<SafeUser | null>;
  logout: () => void;
  signup: (email: string, pass: string, role: Role) => Promise<SafeUser | null>;
  loading: boolean;
  updateUser: (userId: string, data: Partial<ProfileFormValues> & { credits?: number | 'unlimited' }) => Promise<SafeUser>;
  deleteUser: (userId: string) => Promise<void>;
  deductCredit: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
