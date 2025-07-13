
"use client";

import { useAuth } from "@/hooks/use-auth";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Profile } from "@/types";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
        if (!user) return;
        setDataLoading(true);
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error("Failed to fetch profiles");
            }
            const data = await response.json();
            const foundProfile = data.profiles.find((p: Profile) => p.userId === user.id);
            if (foundProfile) {
                setUserProfile(foundProfile);
            }
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            toast({ title: "Error", description: "Could not load your profile data.", variant: "destructive"});
        } finally {
            setDataLoading(false);
        }
    };
    if (user) {
        fetchProfileData();
    }
  }, [user, toast]);

  const isLoading = loading || dataLoading;

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-1 space-y-8">
                    <Card>
                        <div className="p-4">
                            <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
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

  if (!user) {
    notFound();
    return null;
  }
  
  if (!userProfile) {
    return <div className="container mx-auto p-8">Profile not found. Please contact support.</div>;
  }

  return <ProfileForm user={user} profile={userProfile} />;
}
