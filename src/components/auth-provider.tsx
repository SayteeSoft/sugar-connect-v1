
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
    const formData = new FormData();

    // Append all non-file fields to formData
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'wants' || key === 'interests') {
        // These are arrays of objects, so stringify them
        formData.append(key, JSON.stringify(value.map((item: any) => item.value)));
      } else if (key !== 'avatar' && key !== 'gallery' && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Append files
    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    }
    
    if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach((file, index) => {
            if (file instanceof File) {
                formData.append(`gallery`, file);
            }
        });
    }

    const response = await fetch('/api/profile', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile.");
    }
    
    const updatedUserData = await response.json();

    // Update state and local storage if it's the currently logged-in user
    if (user?.id === userId) {
        setUser(updatedUserData.user);
        localStorage.setItem('user', JSON.stringify(updatedUserData.user));
    }
    
    // Also update the in-memory mock data so the app is consistent
    const userIndex = users.findIndex(u => u.id === userId);
    if(userIndex !== -1) users[userIndex] = updatedUserData.user;

    const profileIndex = profiles.findIndex(p => p.userId === userId);
    if(profileIndex !== -1) profiles[profileIndex] = updatedUserData.profile;

    return updatedUserData.user;

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
    </Auth-Provider>
  );
}

    