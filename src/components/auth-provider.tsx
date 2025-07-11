"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import { users } from '@/lib/mock-data';
import type { User } from '@/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // This is a mock login. In a real app, you'd call an API.
    // We are ignoring the password for this mock.
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    return new Promise(resolve => {
        setTimeout(() => {
            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                resolve(foundUser);
            } else {
                resolve(null);
            }
            setLoading(false);
        }, 1000);
    })
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const authContextValue = useMemo<AuthContextType>(() => ({
    user,
    login,
    logout,
    loading,
  }), [user, login, logout, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
