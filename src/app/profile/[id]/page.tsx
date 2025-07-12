
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Edit, MessageCircle, Heart, CheckCircle, Mail, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { mockUsers, mockProfiles } from "@/lib/mock-data";
import { notFound, useRouter, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, Profile } from "@/types";

const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value ? String(value) : <span className="text-muted-foreground/70">Not specified</span>}</p>
        </div>
    )
}

export default function OtherUserProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();

  // In a real app, you would fetch this data from an API.
  // For now, we use the mock data for display purposes.
  const user: User | undefined = mockUsers.find(u => u.id === id) as User | undefined;
  const userProfile: Profile | undefined = mockProfiles.find(p => p.userId === id);

  if (loading) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
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
  if (currentUser && currentUser.id === id) {
    router.push('/profile');
    return null; // Render nothing while redirecting
  }

  if (!user || !userProfile) {
    notFound();
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6 sticky top-24">
            <Card>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={400}
                    height={400}
                    className="rounded-lg w-full aspect-square object-cover"
                    data-ai-hint="profile photo"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4 mr-1"/>
                      Verified
                  </Badge>
                </div>
                <div className="text-center space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                            {user.name}
                            {user.role === 'Admin' && <Star className="h-5 w-5 text-yellow-400 fill-current" />}
                        </h1>
                        <Badge variant="outline" className="border-primary text-primary">{user.role}</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1 text-left">
                        <div className="flex items-center gap-2">
                           <MapPin className="h-4 w-4" />
                           <span>{user.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Mail className="h-4 w-4" />
                           <span>{user.email}</span>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
             <div className="flex gap-2">
                <Button className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                </Button>
                 <Button variant="outline" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorite
                </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
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
                  <Label className="text-sm font-medium">Wants</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
                      {userProfile.wants.length > 0 ? userProfile.wants.map((want, index) => (
                          <Badge key={index} variant="secondary">{want}</Badge>
                      )) : <p className="text-sm text-muted-foreground">No wants specified.</p>}
                  </div>
                </div>
                 <div>
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
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
              <CardContent>
                 <p className="text-sm text-muted-foreground">This user hasn't added any photos to their gallery yet.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ViewField label="Age" value={user.age} />
                <ViewField label="Height" value={userProfile.attributes.height} />
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
