
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, PlusCircle, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { users, profiles } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (!user) {
    // Or redirect to login
    notFound();
    return null;
  }
  
  const userProfile = profiles.find(p => p.userId === user.id);

  if (!userProfile) {
    return <div className="container mx-auto p-8">Profile not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
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
                />
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue={user.role}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sugar Daddy">Sugar Daddy</SelectItem>
                      <SelectItem value="Sugar Baby">Sugar Baby</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={user.location} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue={user.email} disabled />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed here. <Link href="/settings" className="underline hover:text-primary">Change here.</Link>
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                    <Button className="w-full">Save Profile</Button>
                    <Button variant="outline" className="w-full">Cancel</Button>
                </div>
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
              <Textarea placeholder="Tell us about yourself..." rows={4} defaultValue={userProfile.about} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wants &amp; Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Wants</Label>
                <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                    {userProfile.wants.map(want => (
                        <Badge key={want} variant="secondary" className="pr-1">
                            {want}
                            <button className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"><X className="h-3 w-3" /></button>
                        </Badge>
                    ))}
                </div>
              </div>
               <div>
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                    {userProfile.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="pr-1">
                            {interest}
                            <button className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"><X className="h-3 w-3" /></button>
                        </Badge>
                    ))}
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
                    <Image src="https://placehold.co/400x400.png" alt="Gallery image" width={200} height={200} className="rounded-md w-full aspect-square object-cover"/>
                     <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <button className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    <PlusCircle className="h-8 w-8" />
                    <span className="text-sm mt-1">Add Photo</span>
                </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Attributes</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" defaultValue={user.age} />
                </div>
                <div>
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" defaultValue={`${userProfile.attributes.height}cm`} />
                </div>
                 <div>
                    <Label htmlFor="body-type">Body Type</Label>
                     <Select defaultValue={userProfile.attributes.bodyType}>
                        <SelectTrigger id="body-type"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Slim">Slim</SelectItem>
                            <SelectItem value="Athletic">Athletic</SelectItem>
                            <SelectItem value="Average">Average</SelectItem>
                            <SelectItem value="Curvy">Curvy</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="ethnicity">Ethnicity</Label>
                    <Select defaultValue={userProfile.attributes.ethnicity}>
                        <SelectTrigger id="ethnicity"><SelectValue/></SelectTrigger>
                        <SelectContent>
                           <SelectItem value="White/Caucasian">White/Caucasian</SelectItem>
                           {/* Add other options */}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="hair-color">Hair Color</Label>
                    <Select defaultValue={userProfile.attributes.hairColor}>
                        <SelectTrigger id="hair-color"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Brown">Brown</SelectItem>
                             {/* Add other options */}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="eye-color">Eye Color</Label>
                    <Select defaultValue={userProfile.attributes.eyeColor}>
                        <SelectTrigger id="eye-color"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Brown">Brown</SelectItem>
                            {/* Add other options */}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="smoker">Smoker</Label>
                    <Select defaultValue={userProfile.attributes.smoker}>
                        <SelectTrigger id="smoker"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Socially">Socially</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="drinker">Drinker</Label>
                    <Select defaultValue={userProfile.attributes.drinker}>
                        <SelectTrigger id="drinker"><SelectValue/></SelectTrigger>
                        <SelectContent>
                             <SelectItem value="No">No</SelectItem>
                             <SelectItem value="Socially">Socially</SelectItem>
                             <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="piercings">Piercings</Label>
                    <Select defaultValue={userProfile.attributes.piercings}>
                        <SelectTrigger id="piercings"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="tattoos">Tattoos</Label>
                    <Select defaultValue={userProfile.attributes.tattoos}>
                        <SelectTrigger id="tattoos"><SelectValue/></SelectTrigger>
                        <SelectContent>
                           <SelectItem value="No">No</SelectItem>
                           <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
