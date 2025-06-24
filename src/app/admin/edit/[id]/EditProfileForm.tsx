
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { UserProfile } from '@/lib/types';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Loader2, Trash2, Upload } from 'lucide-react';


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

const bodyTypes = ["Slim", "Athletic", "Average", "Curvy", "A few extra pounds"];
const piercingsOptions = ["None", "Ears", "Nose", "Other"];
const tattoosOptions = ["None", "One", "Multiple", "Hidden", "Full Sleeve"];
const smokesOptions = ["No", "Socially", "Regularly"];
const drinksOptions = ["No", "Socially", "Regularly", "Daily"];
const educationOptions = [
  "High School",
  "Some College",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD / Doctorate",
  "MD",
  "MBA",
  "Juris Doctor"
];

export function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState({
    ...user,
    interests: user.interests.join(', '),
    height: user.height ?? '',
    bodyType: user.bodyType ?? '',
    hairColor: user.hairColor ?? '',
    eyeColor: user.eyeColor ?? '',
    piercings: user.piercings ?? '',
    tattoos: user.tattoos ?? '',
    smokes: user.smokes ?? '',
    drinks: user.drinks ?? '',
    education: user.education ?? '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // In a real app, this would be an API call to update the user.
    // We simulate it with a delay.
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: 'Success!',
      description: `Profile for ${formData.name} has been updated.`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleAddGalleryImage = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, ''] });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  const profileImage = formData.gallery?.[0] || 'https://placehold.co/400x400.png';


  return (
    <form onSubmit={handleSave} className="mt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-0">
              <div className="relative">
                 <Image
                    src={profileImage}
                    alt={formData.name}
                    width={400}
                    height={400}
                    className="aspect-square w-full rounded-t-lg object-cover"
                    data-ai-hint="placeholder"
                />
              </div>
               <div className="p-6 space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" value={formData.age} onChange={handleChange} required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={formData.location} onChange={handleChange} required />
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={formData.bio} onChange={handleChange} rows={5} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Interests</CardTitle></Header>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" value={formData.interests} onChange={handleChange} />
                <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Gallery</CardTitle></Header>
            <CardContent>
              <div className="space-y-4">
                <Label>Gallery Image URLs</Label>
                <div className="space-y-2">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Image
                        src={url || 'https://placehold.co/100x100.png'}
                        alt={`Gallery image ${index + 1}`}
                        width={40}
                        height={40}
                        className="rounded-md object-cover aspect-square"
                        data-ai-hint="placeholder"
                      />
                      <Input
                        value={url}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                        placeholder="https://..."
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => alert('Upload functionality not implemented.')}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveGalleryImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={handleAddGalleryImage}>
                  Add Gallery Image
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attributes</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ethnicity">Ethnicity</Label>
                    <Select onValueChange={(value) => handleSelectChange('ethnicity', value)} value={formData.ethnicity}>
                      <SelectTrigger id="ethnicity"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{ethnicities.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" value={formData.height} onChange={handleChange} placeholder="e.g., 5' 10&quot;" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Body Type</Label>
                    <Select onValueChange={(value) => handleSelectChange('bodyType', value)} value={formData.bodyType}>
                      <SelectTrigger id="bodyType"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{bodyTypes.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Hair Color</Label>
                    <Input id="hairColor" value={formData.hairColor} onChange={handleChange} placeholder="e.g., Brown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <Input id="eyeColor" value={formData.eyeColor} onChange={handleChange} placeholder="e.g., Blue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="piercings">Piercings</Label>
                    <Select onValueChange={(value) => handleSelectChange('piercings', value)} value={formData.piercings}>
                      <SelectTrigger id="piercings"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{piercingsOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tattoos">Tattoos</Label>
                    <Select onValueChange={(value) => handleSelectChange('tattoos', value)} value={formData.tattoos}>
                      <SelectTrigger id="tattoos"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{tattoosOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smokes">Smokes</Label>
                    <Select onValueChange={(value) => handleSelectChange('smokes', value)} value={formData.smokes}>
                      <SelectTrigger id="smokes"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{smokesOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drinks">Drinks</Label>
                    <Select onValueChange={(value) => handleSelectChange('drinks', value)} value={formData.drinks}>
                      <SelectTrigger id="drinks"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{drinksOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="education">Education</Label>
                    <Select onValueChange={(value) => handleSelectChange('education', value)} value={formData.education}>
                      <SelectTrigger id="education"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent>{educationOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
