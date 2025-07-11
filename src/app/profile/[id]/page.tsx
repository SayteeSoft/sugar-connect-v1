
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Edit, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import { users, profiles } from "@/lib/mock-data";
import { notFound, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, Profile } from "@/types";
import { useMemo } from "react";

const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    if (!value && value !== 0) return null;
    return (
        <div className="grid gap-1.5">
            <Label className="text-muted-foreground">{label}</Label>
            <p className="text-sm">{String(value)}</p>
        </div>
    )
}

interface OtherUserProfilePageProps {
    params: {
        id: string;
    };
}

export default function OtherUserProfilePage({ params }: OtherUserProfilePageProps) {
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();

  const user: User | undefined = useMemo(() => users.find(u => u.id === params.id), [params.id]);
  const userProfile: Profile | undefined = useMemo(() => profiles.find(p => p.userId === params.id), [params.id]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardContent className="p-4">
                            <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                 </div>
                 <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                 </div>
            </div>
        </div>
    );
  }

  // If the current user is viewing their own profile, redirect to the editable /profile page
  if (currentUser && currentUser.id === params.id) {
    router.push('/profile');
    return null; // Render nothing while redirecting
  }

  if (!user || !userProfile) {
    notFound();
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-headline">{user.name}'s Profile</h1>
             <div className="flex gap-2">
                <Button>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                </Button>
                 <Button variant="outline">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorite
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={400}
                    height={400}
                    className="rounded-lg w-full aspect-square object-cover"
                    data-ai-hint="profile photo"
                  />
                </div>
                <div className="space-y-4">
                    <ViewField label="Name" value={user.name} />
                    <ViewField label="Role" value={user.role} />
                    <ViewField label="Location" value={user.location} />
                    <ViewField label="Email" value={user.email} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About {user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{userProfile.about || 'No information provided.'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wants &amp; Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Wants</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                      {userProfile.wants.length > 0 ? userProfile.wants.map((want, index) => (
                          <Badge key={index} variant="secondary">{want}</Badge>
                      )) : <p className="text-sm text-muted-foreground">No wants specified.</p>}
                  </div>
                </div>
                 <div>
                  <Label className="text-muted-foreground">Interests</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                      {userProfile.interests.length > 0 ? userProfile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">{interest}</Badge>
                      )) : <p className="text-sm text-muted-foreground">No interests specified.</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative group">
                      <Image src="https://placehold.co/400x400.png" alt="Gallery image" width={200} height={200} className="rounded-md w-full aspect-square object-cover" data-ai-hint="gallery photo"/>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
                <ViewField label="Age" value={user.age} />
                <ViewField label="Height (cm)" value={userProfile.attributes.height} />
                <ViewField label="Body Type" value={userProfile.attributes.bodyType} />
                <ViewField label="Ethnicity" value={userProfile.attributes.ethnicity} />
                <ViewField label="Hair Color" value={userProfile.attributes.hairColor} />
                <ViewField label="Eye Color" value={userProfile.attributes.eyeColor} />
                <ViewField label="Smoker" value={userProfile.attributes.smoker} />
                <ViewField label="Drinker" value={userProfile.attributes.drinker} />
                <ViewField label="Piercings" value={userProfile.attributes.piercings} />
                <ViewField label="Tattoos" value={userProfile.attributes.tattoos} />
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
