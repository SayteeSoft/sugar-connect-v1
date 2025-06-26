
'use client';

import { useState, useRef, useEffect } from 'react';
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
import { Loader2, Trash2, Upload, ChevronDown } from 'lucide-react';
import { updateUserProfile } from './actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';


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

const popularInterests = ["Business", "Charity", "Dining", "Horses", "Literature", "Running", "Shopping", "Sports", "Travel"];

export function EditProfileForm({ user }: EditProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(null);
  
  useEffect(() => {
    // Start with the base user from props
    let finalProfile = { ...user };
    
    // Merge text data from localStorage
    const storedProfile = localStorage.getItem(`user-profile-${user.id}`);
    if (storedProfile) {
        try {
            const parsedProfile = JSON.parse(storedProfile);
            finalProfile = { ...finalProfile, ...parsedProfile };
        } catch(e) {
            console.error("Failed to parse profile from localStorage", e);
        }
    }
    
    // Merge image data from sessionStorage for session persistence
    const imageOverrides = sessionStorage.getItem(`ss_profile_overrides_${user.id}`);
    if (imageOverrides) {
        try {
            const parsedImages = JSON.parse(imageOverrides);
            finalProfile = { ...finalProfile, ...parsedImages };
        } catch(e) {
            console.error("Failed to parse images from sessionStorage", e);
        }
    }

    // Ensure array fields are correctly typed
    if (!Array.isArray(finalProfile.gallery)) {
        finalProfile.gallery = user.gallery || [];
    }
    if (!Array.isArray(finalProfile.wants)) {
        finalProfile.wants = user.wants || [];
    }
    if (!Array.isArray(finalProfile.interests)) {
        finalProfile.interests = user.interests || [];
    }
    
    setFormData(finalProfile);
  }, [user]);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const dataToSave: Partial<UserProfile> = {
      ...formData,
      age: Number(formData.age),
      wants: (Array.isArray(formData.wants) ? formData.wants.join(',') : formData.wants || '').split(',').map(i => i.trim()).filter(i => i),
      interests: formData.interests || [],
    };

    const result = await updateUserProfile(user.id, dataToSave);

    setIsSaving(false);

    if (result.success && result.user) {
      try {
        const updatedUser = result.user as UserProfile;
        const { profileImage, gallery, ...restForStorage } = updatedUser;
        
        // Persist text data to localStorage
        localStorage.setItem(`user-profile-${user.id}`, JSON.stringify(restForStorage));
        
        // Persist image data to sessionStorage to avoid quota errors and allow session-persistence
        const imageOverrides = { profileImage, gallery };
        sessionStorage.setItem(`ss_profile_overrides_${user.id}`, JSON.stringify(imageOverrides));

        // Update form state with the full user object including images
        setFormData(updatedUser);
        
        toast({
          title: 'Success!',
          description: `Profile for ${formData.name} has been updated.`,
        });
      } catch (e) {
        console.error("Failed to save to storages", e);
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'Could not save profile changes to your browser. Changes may be lost on refresh.'
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: result.error || 'Failed to update profile.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingGalleryIndex !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const newGallery = [...(formData.gallery || [])];
        newGallery[editingGalleryIndex] = result;
        setFormData({ ...formData, gallery: newGallery });
        setEditingGalleryIndex(null); // Reset index
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be selected again
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleAddGalleryImage = () => {
    const currentGallery = formData.gallery || [];
    setFormData({ ...formData, gallery: [...currentGallery, 'https://placehold.co/600x400.png'] });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  return (
    <form onSubmit={handleSave} className="mt-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
             <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <div className="relative group">
                   <Image
                      src={formData.profileImage}
                      alt={formData.name || 'User Profile'}
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-lg object-cover"
                      data-ai-hint="placeholder"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Change Photo
                      </Button>
                  </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfileImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                <input
                  type="file"
                  ref={galleryFileInputRef}
                  onChange={handleGalleryFileChange}
                  accept="image/*"
                  className="hidden"
                />

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
            <CardHeader><CardTitle>Wants</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="wants">Wants</Label>
                <Input id="wants" value={(Array.isArray(formData.wants) ? formData.wants.join(', ') : formData.wants) || ''} onChange={handleChange} />
                <p className="text-xs text-muted-foreground">Separate wants with a comma.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between h-auto min-h-10">
                    <div className="flex gap-1 flex-wrap">
                      {formData.interests?.length > 0 ? (
                        formData.interests.map(interest => (
                          <Badge variant="secondary" key={interest}>{interest}</Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground font-normal">Select interests...</span>
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                   <div className="p-4 grid grid-cols-2 gap-4">
                    {popularInterests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={(formData.interests || []).includes(interest)}
                          onCheckedChange={(checked) => {
                             const currentInterests = formData.interests || [];
                             if (checked) {
                               setFormData({ ...formData, interests: [...currentInterests, interest] });
                             } else {
                               setFormData({ ...formData, interests: currentInterests.filter(i => i !== interest) });
                             }
                          }}
                        />
                        <Label htmlFor={`interest-${interest}`} className="font-normal cursor-pointer">{interest}</Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
               <p className="text-xs text-muted-foreground mt-2">Select all that apply.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(formData.gallery || []).map((url, index) => (
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
                      onClick={() => {
                        setEditingGalleryIndex(index);
                        galleryFileInputRef.current?.click();
                      }}
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
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
