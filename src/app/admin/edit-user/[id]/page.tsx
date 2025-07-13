
"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { User, Profile } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";

export default function EditUserPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const id = params.id as string;

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setDataLoading(true);
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        
        const foundUser = data.users.find((u: User) => u.id === id);
        const foundProfile = data.profiles.find((p: Profile) => p.userId === id);
        
        if (foundUser && foundProfile) {
          setUserToEdit(foundUser);
          setProfileToEdit(foundProfile);
        }
      } catch (error) {
        console.error("Failed to fetch user to edit:", error);
        toast({ title: "Error", description: "Could not load user data.", variant: "destructive"});
      } finally {
        setDataLoading(false);
      }
    };
    fetchUser();
  }, [id, toast]);

  const isLoading = authLoading || dataLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <Card>
              <Skeleton className="w-full aspect-square rounded-lg" />
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (currentUser?.role !== 'Admin' || !userToEdit || !profileToEdit) {
    notFound();
    return null;
  }

  return (
    <ProfileForm
      user={userToEdit}
      profile={profileToEdit}
      isAdminEditing={true}
    />
  );
}
