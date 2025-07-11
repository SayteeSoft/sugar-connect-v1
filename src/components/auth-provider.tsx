
"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import { users as initialUsers, profiles as initialProfiles } from '@/lib/mock-data';
import type { User, Profile, Role, ProfileFormValues } from '@/types';

// Make a mutable copy for in-memory operations
let users: User[] = [...initialUsers];
let profiles: Profile[] = [...initialProfiles];

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

  const signup = useCallback(async (email: string, pass: string, role: Role): Promise<User | null> => {
    setLoading(true);
    // In a real app, you'd call an API to create a user.
    // Here we'll just add them to our in-memory array.
    
    return new Promise(resolve => {
        setTimeout(() => {
            const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                setLoading(false);
                resolve(null); // User already exists
                return;
            }

            const newId = String(users.length + 1);
            const newProfileId = `p${newId}`;

            const newUser: User = {
                id: newId,
                email,
                name: 'New User',
                age: 18,
                location: 'Not specified',
                role,
                credits: role === 'Sugar Daddy' ? 10 : 'unlimited',
                avatarUrl: 'https://placehold.co/400x400.png',
                profileId: newProfileId
            };

            const newProfile: Profile = {
                id: newProfileId,
                userId: newId,
                about: "",
                wants: [],
                interests: [],
                gallery: [],
                attributes: {},
            };
            
            users = [...users, newUser];
            profiles = [...profiles, newProfile];

            // For mock purposes, we log the user in immediately after signup
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            
            setLoading(false);
            resolve(newUser);
        }, 1500);
    });
  }, []);

  const updateUser = useCallback(async (userId: string, data: ProfileFormValues): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = users.findIndex(u => u.id === userId);
            const profileIndex = profiles.findIndex(p => p.userId === userId);

            if (userIndex === -1 || profileIndex === -1) {
                reject(new Error("User or profile not found"));
                return;
            }
            
            // Update user object
            const updatedUser: User = { 
                ...users[userIndex],
                name: data.name,
                location: data.location,
                age: data.age,
                role: data.role,
            };
            users[userIndex] = updatedUser;

            // Update profile object
            profiles[profileIndex] = {
                ...profiles[profileIndex],
                about: data.about || '',
                wants: data.wants?.map(w => w.value) || [],
                interests: data.interests?.map(i => i.value) || [],
                attributes: {
                    height: data.height,
                    bodyType: data.bodyType,
                    ethnicity: data.ethnicity,
                    hairColor: data.hairColor,
                    eyeColor: data.eyeColor,
                    smoker: data.smoker,
                    drinker: data.drinker,
                    piercings: data.piercings,
                    tattoos: data.tattoos,
                },
            };

            // Update state and local storage if it's the currently logged-in user
            if (user?.id === userId) {
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }

            resolve(updatedUser);
        }, 500);
    });
  }, [user]);

  const authContextValue = useMemo<AuthContextType>(() => ({
    user,
    login,
    logout,
    signup,
    loading,
    updateUser,
  }), [user, login, logout, signup, loading, updateUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
