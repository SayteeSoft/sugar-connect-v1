
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Gift, MessageSquare, Pencil, Loader2 } from 'lucide-react';
import { ProfileActions } from './ProfileActions';
import { useState, useEffect } from 'react';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const femaleNames = ['Isabella', 'Sophia', 'Charlotte'];

const AttributeItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  if (!value) return null;
  return (
    <div className="flex justify-between border-b py-3 text-sm last:border-none">
      <span className="font-semibold text-foreground">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-0">
            <Skeleton className="aspect-square w-full rounded-t-lg" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="mt-6 flex flex-col gap-2">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader><Skeleton className="h-7 w-1/4" /></CardHeader>
          <CardContent><Skeleton className="h-20 w-full" /></CardContent>
        </Card>
        <Card>
          <CardHeader><Skeleton className="h-7 w-1/4" /></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const dbUser = await db.getProfileById(params.id);
      
      const storedUserJSON = localStorage.getItem(`user-profile-${params.id}`);
      let finalUser = dbUser;
      if (storedUserJSON) {
        try {
          const storedUser = JSON.parse(storedUserJSON);
          finalUser = { ...dbUser, ...storedUser };
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }

      if (finalUser) {
        setUser(finalUser);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [params.id]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  
  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>User not found.</p>
      </div>
    );
  }

  // The admin user (ID 1) was formerly female, so we keep the hint consistent
  const isFemale = femaleNames.includes(user.name) || user.id === '1';
  const aiHint = isFemale ? 'woman portrait' : 'man portrait';

  return (
    <div className="bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="relative">
                   <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-t-lg object-cover"
                      data-ai-hint={aiHint}
                  />
                   {user.isVerified && (
                    <Badge variant="default" className="absolute top-2 right-2 bg-primary/80 border-none text-primary-foreground backdrop-blur-sm">
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        Verified
                    </Badge>
                  )}
                </div>
                 <div className="p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h1 className="text-3xl font-bold font-headline">{user.name}, {user.age}</h1>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{user.location}</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                        <Button size="lg" className="w-full"><MessageSquare className="w-4 h-4 mr-2" /> Message</Button>
                        <Button asChild size="lg" variant="secondary" className="w-full">
                          <Link href={`/admin/edit/${user.id}`}>
                            <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                          </Link>
                        </Button>
                        <Button size="lg" variant="secondary" className="w-full"><Gift className="w-4 h-4 mr-2" /> Send a Gift</Button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>About {user.name}</CardTitle>
                <ProfileActions userId={user.id} userName={user.name} />
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{user.bio}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Wants</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {(user.wants || []).map(want => (
                  <Badge key={want} variant="secondary" className="text-base px-3 py-1">{want}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {(user.interests || []).map(interest => (
                  <Badge key={interest} variant="secondary" className="text-base px-3 py-1">{interest}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {(user.gallery || []).map((img, index) => (
                    <Image key={index} src={img} alt={`${user.name}'s gallery image ${index + 1}`} width={600} height={400} className="rounded-lg object-cover aspect-video" data-ai-hint="lifestyle photo" />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  <AttributeItem label="Age" value={user.age} />
                  <AttributeItem label="Height" value={user.height} />
                  <AttributeItem label="Body Type" value={user.bodyType} />
                  <AttributeItem label="Ethnicity" value={user.ethnicity} />
                  <AttributeItem label="Hair Color" value={user.hairColor} />
                  <AttributeItem label="Eye Color" value={user.eyeColor} />
                  <AttributeItem label="Piercings" value={user.piercings} />
                  <AttributeItem label="Tattoos" value={user.tattoos} />
                  <AttributeItem label="Smokes" value={user.smokes} />
                  <AttributeItem label="Drinks" value={user.drinks} />
                  <AttributeItem label="Education" value={user.education} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
