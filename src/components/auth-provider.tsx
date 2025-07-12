
"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import type { User, Profile, Role, ProfileFormValues } from '@/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // In-memory cache of users to avoid re-fetching constantly.
  // This will be populated on initial load.
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const initializeAuth = async () => {
      // Simulate fetching all users and profiles on initial load
      // In a real app, this might be an API call that gets all data
      // or it could be done page-by-page. For this app, we'll preload.
      try {
        // This is a bit of a hack for the mock data setup.
        // We'll just read the local `data.json` via a fetch call to an API
        // that we will need to create. For now, let's assume we can get it.
        // Let's defer this and just use the local storage user for now.
      } catch (e) {
        console.error("Could not load initial user data", e);
      }
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // In a real app, you'd fetch `/api/login` or similar.
    // For this mock app, we'll have to "find" the user by fetching all data.
    // This is inefficient but required by the mock data structure.
    
    // Let's simplify and just use a local find for now, as the API doesn't support it.
    // This part is still mock-logic.
    const { users: allUsers } = await import('@/lib/mock-data');


    return new Promise(resolve => {
        setTimeout(() => {
            const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
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
    
    const newId = String(Date.now());
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

    const formData = new FormData();
    formData.append('isNewUser', 'true');
    formData.append('user', JSON.stringify(newUser));
    formData.append('profile', JSON.stringify(newProfile));
    
    try {
        const response = await fetch('/api/profile', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create profile.");
        }
        
        const { user: createdUser } = await response.json();

        setUser(createdUser);
        localStorage.setItem('user', JSON.stringify(createdUser));
        
        setLoading(false);
        return createdUser;

    } catch (error) {
        console.error('Signup Error:', error);
        setLoading(false);
        return null;
    }
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
    
    const { user: updatedUser } = await response.json();

    if (user?.id === userId) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return updatedUser;

  }, [user]);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    const response = await fetch('/api/profile', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user.");
    }

    // If the deleted user is the currently logged-in user, log them out.
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
