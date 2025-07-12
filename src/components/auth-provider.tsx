
"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import { users as initialUsers, profiles as initialProfiles } from '@/lib/mock-data';
import type { User, Profile, Role, ProfileFormValues } from '@/types';

// Let's make our "DB" mutable to simulate updates
let users: User[] = JSON.parse(JSON.stringify(initialUsers));
let profiles: Profile[] = JSON.parse(JSON.stringify(initialProfiles));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Let's re-verify the user against our "database" on load
      const userInDb = users.find(u => u.id === parsedUser.id);
      if (userInDb) {
        setUser(userInDb);
      } else {
        // User was in local storage but not in our DB, so clear it
        localStorage.removeItem('user');
      }
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
    formData.append('userId', userId);

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key as keyof ProfileFormValues];

            if (key === 'avatar' || key === 'gallery') continue;

            if (key === 'wants' || key === 'interests') {
                if (Array.isArray(value)) {
                    const stringValues = value.map((item: any) => item.value);
                    formData.append(key, JSON.stringify(stringValues));
                }
            } else if (value !== undefined && value !== null && value !== '') {
                formData.append(key, String(value));
            }
        }
    }

    if (data.avatar instanceof File) {
      formData.append('avatar', data.avatar);
    }
    
    if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach((file) => {
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
    
    const { user: updatedUser, profile: updatedProfile } = await response.json();

    if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    if(userIndex !== -1) users[userIndex] = updatedUser;

    const profileIndex = profiles.findIndex(p => p.userId === userId);
    if(profileIndex !== -1) profiles[profileIndex] = updatedProfile;

    return updatedUser;

  }, [user]);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) {
        throw new Error("User not found");
    }
    if (userToDelete.role === 'Admin') {
        throw new Error("Admin accounts cannot be deleted.");
    }

    users = users.filter(u => u.id !== userId);
    profiles = profiles.filter(p => p.userId !== userId);
    
    if (user?.id === userId) {
        logout();
    }
  }, [user, logout]);


  const authContextValue = useMemo<AuthContextType>(() => ({
    user,
    login,
    logout,
    signup,
    loading,
    updateUser,
    deleteUser,
  }), [user, login, logout, signup, loading, updateUser, deleteUser]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
