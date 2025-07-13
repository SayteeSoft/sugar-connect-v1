
"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/hooks/use-auth';
import type { User, Role, Profile, ProfileFormValues } from '@/types';

// We explicitly type the user object stored in state and localStorage to not include the hash.
type SafeUser = Omit<User, 'passwordHash'>;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<SafeUser | null> => {
    setLoading(true);
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return null;
        }

        const { user: loggedInUser } = await response.json();
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return loggedInUser;
    } catch (error) {
        console.error("Login failed", error);
        return null;
    } finally {
        setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const signup = useCallback(async (email: string, pass: string, role: Role): Promise<SafeUser | null> => {
    setLoading(true);
    
    const newId = String(Date.now());
    const newProfileId = `p${newId}`;

    const newUser: Omit<User, 'passwordHash'> = {
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
    formData.append('password', pass);
    
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

  const updateUser = useCallback(async (userId: string, data: Partial<ProfileFormValues> & { credits?: number | 'unlimited' }): Promise<SafeUser> => {
    const formData = new FormData();
    formData.append('userId', userId);

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key as keyof typeof data];
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
    
    const avatarFile = (data as ProfileFormValues).avatar;
    if (avatarFile instanceof File) {
      formData.append('avatar', avatarFile);
    }
    
    const galleryFiles = (data as ProfileFormValues).gallery;
    let hasNewFiles = false;
    if (galleryFiles && galleryFiles.length > 0) {
        galleryFiles.forEach((item) => {
            const file = (item as any).file ?? item;
            if (file instanceof File) {
                formData.append(`gallery`, file);
                hasNewFiles = true;
            }
        });
    }

    if (!hasNewFiles && galleryFiles) {
        const existingGallery = galleryFiles.map(item => (typeof ((item as any).file ?? item) === 'string' ? ((item as any).file ?? item) : '')).filter(Boolean);
        formData.append('existingGallery', JSON.stringify(existingGallery));
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

    if (user?.id === userId) {
        logout();
    }
  }, [user, logout]);

  const deductCredit = useCallback(async (): Promise<void> => {
    if (user && user.role === 'Sugar Daddy' && typeof user.credits === 'number' && user.credits > 0) {
        const newCredits = user.credits - 1;
        try {
            await updateUser(user.id, { credits: newCredits });
        } catch (error) {
            console.error("Failed to deduct credit:", error);
            // Optionally revert UI change or notify user
        }
    }
  }, [user, updateUser]);


  const authContextValue = useMemo<AuthContextType>(() => ({
    user,
    login,
    logout,
    signup,
    loading,
    updateUser,
    deleteUser,
    deductCredit,
  }), [user, login, logout, signup, loading, updateUser, deleteUser, deductCredit]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
