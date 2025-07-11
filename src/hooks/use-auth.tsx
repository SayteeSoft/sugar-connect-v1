
"use client";

import { createContext, useContext } from 'react';
import type { User, Role, ProfileFormValues } from '@/types';

export interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
  signup: (email: string, pass: string, role: Role) => Promise<User | null>;
  loading: boolean;
  updateUser: (userId: string, data: ProfileFormValues) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
