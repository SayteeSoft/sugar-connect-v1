
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { mockUsers } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@/types';

function FiltersPanel() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-filter">New</Label>
            <Switch id="new-filter" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="online-filter">Online</Label>
            <Switch id="online-filter" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="photo-filter">With Photo</Label>
            <Switch id="photo-filter" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Age Range</Label>
            <Slider defaultValue={[18, 65]} max={80} min={18} step={1} />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Slider defaultValue={[150, 200]} max={220} min={140} step={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location-filter">Location</Label>
            <Input id="location-filter" placeholder="e.g. London" />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <Button className="w-full">Apply Filters</Button>
            <Button variant="outline" className="w-full">Clear Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SearchPage() {
  const { user } = useAuth();
  
  const searchResults = mockUsers.filter((u) => {
    if (u.role === 'Admin') return false; // Exclude admins from search results always
    if (!user) return true; // If no user is logged in, show everyone (except Admins)
    if (user.role === 'Admin') return u.role !== 'Admin'; // Admin sees everyone (except other Admins)
    if (user.role === 'Sugar Daddy') return u.role === 'Sugar Baby';
    if (user.role === 'Sugar Baby') return u.role === 'Sugar Daddy';
    return false;
  });


  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-6">
          <h1 className="text-4xl font-bold font-headline text-primary">Discover Your Match</h1>
          <p className="text-muted-foreground mt-2">Use the filters to find the perfect person who meets your criteria.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-1 lg:col-span-1">
          <div className="sticky top-20">
            <FiltersPanel />
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(profile => (
              <Card key={profile.id} className="overflow-hidden group relative">
                <Link href={`/profile/${profile.id}`}>
                    <Image src={profile.avatarUrl} alt={profile.name} width={400} height={400} className="object-cover w-full h-60" data-ai-hint="profile photo" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold text-lg">{profile.name}, {profile.age}</h3>
                        <p className="text-sm">{profile.location}</p>
                    </div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                        <MessageCircle className="h-5 w-5"/>
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full h-10 w-10">
                        <Heart className="h-5 w-5"/>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
