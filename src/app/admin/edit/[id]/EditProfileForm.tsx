'use client';

import { useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

interface EditProfileFormProps {
  user: UserProfile;
}

const ethnicities = [
  "White",
  "Black / African / Caribbean",
  "Asian / Asian British",
  "Mixed / Multiple ethnic groups",
  "Other ethnic group",
];

export function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState({ ...user, interests: user.interests.join(', ') });
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update the user.
    toast({
      title: 'Success!',
      description: 'Profile has been updated.',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, ethnicity: value });
  };


  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Editing {user.name}</CardTitle>
        <CardDescription>Make your changes below and click save.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSave}>
          <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={formData.location} onChange={handleChange} required />
              </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity</Label>
            <Select onValueChange={handleSelectChange} defaultValue={formData.ethnicity}>
              <SelectTrigger id="ethnicity">
                <SelectValue placeholder="Select an ethnicity" />
              </SelectTrigger>
              <SelectContent>
                {ethnicities.map((ethnicity) => (
                  <SelectItem key={ethnicity} value={ethnicity}>
                    {ethnicity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={formData.bio} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input id="interests" value={formData.interests} onChange={handleChange} />
            <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
          </div>
          <Button type="submit" className="w-full !mt-6" size="lg">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
