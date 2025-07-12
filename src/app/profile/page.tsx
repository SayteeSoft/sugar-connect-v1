
"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, PlusCircle, Trash2, X, Edit, CheckCircle, Star, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profiles } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileFormValues as ProfileFormSchema, profileFormSchema } from "@/types";

type ProfileFormValues = z.infer<typeof profileFormSchema>;


const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value ? String(value) : <span className="text-muted-foreground/70">Not specified</span>}</p>
        </div>
    )
}

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [wantsInput, setWantsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);


  // Find the profile that matches the logged-in user's ID
  const userProfile = user ? profiles.find(p => p.userId === user.id) : undefined;

  const { control, handleSubmit, reset, getValues, setValue, watch, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      role: "Sugar Baby", // Default role
      location: "",
      about: "",
      wants: [],
      interests: [],
      age: 18,
      gallery: [],
    }
  });
  
  const { fields: wantsFields, append: appendWant, remove: removeWant } = useFieldArray({
    control,
    name: "wants",
  });

  const { fields: interestsFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control,
    name: "interests",
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control, name: "gallery"
  });


  useEffect(() => {
    // When the user and their profile are loaded, populate the form
    if (user && userProfile) {
      reset({
        name: user.name,
        role: user.role,
        location: user.location,
        about: userProfile.about,
        wants: userProfile.wants.map(w => ({ value: w })),
        interests: userProfile.interests.map(i => ({ value: i })),
        age: user.age,
        height: userProfile.attributes.height,
        bodyType: userProfile.attributes.bodyType,
        ethnicity: userProfile.attributes.ethnicity,
        hairColor: userProfile.attributes.hairColor,
        eyeColor: userProfile.attributes.eyeColor,
        smoker: userProfile.attributes.smoker,
        drinker: userProfile.attributes.drinker,
        piercings: userProfile.attributes.piercings,
        tattoos: userProfile.attributes.tattoos,
      });
      setAvatarPreview(user.avatarUrl);
      setGalleryPreviews(userProfile.gallery);
    }
  }, [user, userProfile, reset]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("avatar", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
          appendGallery(file as any);
          newPreviews.push(URL.createObjectURL(file));
      });
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    removeGallery(index);
    setGalleryPreviews(previews => previews.filter((_, i) => i !== index));
  };


  const onSubmit = async (data: ProfileFormValues) => {
    if (!user || !userProfile || !updateUser) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not save profile. User not found.",
        });
        return;
    }

    try {
        await updateUser(user.id, data);
        toast({
          title: "Profile Saved!",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false); // Switch to view mode after saving
    } catch(error) {
        console.error("Failed to save profile", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred while saving.",
        });
    }
  };

  const handleCancel = () => {
      // Revert any changes in the form by re-populating it from original data
      if (user && userProfile) {
        reset({
            name: user.name,
            role: user.role,
            location: user.location,
            about: userProfile.about,
            wants: userProfile.wants.map(w => ({ value: w })),
            interests: userProfile.interests.map(i => ({ value: i })),
            age: user.age,
            height: userProfile.attributes.height,
            bodyType: userProfile.attributes.bodyType,
            ethnicity: userProfile.attributes.ethnicity,
            hairColor: userProfile.attributes.hairColor,
            eyeColor: userProfile.attributes.eyeColor,
            smoker: userProfile.attributes.smoker,
            drinker: userProfile.attributes.drinker,
            piercings: userProfile.attributes.piercings,
            tattoos: userProfile.attributes.tattoos,
        });
        setAvatarPreview(user.avatarUrl);
        setGalleryPreviews(userProfile.gallery);
      }
      setIsEditing(false); // Switch back to view mode
  }
  
  const handleAddWant = () => {
    if (wantsInput.trim()) {
      appendWant({ value: wantsInput.trim() });
      setWantsInput("");
    }
  };

  const handleAddInterest = () => {
    if (interestsInput.trim()) {
      appendInterest({ value: interestsInput.trim() });
      setInterestsInput("");
    }
  };


  if (loading) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-1 space-y-8">
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
                 <div className="md:col-span-2 space-y-8">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                 </div>
            </div>
        </div>
    );
  }

  if (!user) {
    // This will render the not-found.tsx page if the user is not logged in.
    notFound();
    return null;
  }
  
  if (!userProfile) {
    // This could happen if a user exists but has no corresponding profile entry.
    return <div className="container mx-auto p-8">Profile not found. Please contact support.</div>;
  }

  const formValues = getValues();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6 lg:sticky top-24">
            <Card>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={avatarPreview || user.avatarUrl}
                    alt={user.name}
                    width={400}
                    height={400}
                    className="rounded-lg w-full aspect-square object-cover"
                    data-ai-hint="profile photo"
                  />
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        ref={avatarInputRef}
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    )}
                  />
                  {isEditing ? (
                    <Button type="button" variant="secondary" size="icon" className="absolute top-3 left-3 rounded-full" onClick={() => avatarInputRef.current?.click()}>
                        <Camera className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                        <CheckCircle className="h-4 w-4 mr-1"/>
                        Verified
                    </Badge>
                  )}
                </div>
                {errors.avatar && <p className="text-destructive text-sm mt-1">{errors.avatar.message}</p>}
                {isEditing ? (
                    <div className="space-y-4 text-center">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <Input id="name" {...field} />}
                            />
                            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => <Input id="location" {...field} />}
                            />
                            {errors.location && <p className="text-destructive text-sm mt-1">{errors.location.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className='text-muted-foreground'>Email Address</Label>
                            <Input id="email" defaultValue={user.email} disabled />
                            <p className="text-xs text-muted-foreground mt-1">
                                Email cannot be changed.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                                {formValues.name}
                                {formValues.role === 'Admin' && <Star className="h-5 w-5 text-yellow-400 fill-current" />}
                            </h1>
                            <Badge variant="outline" className="border-primary text-primary">{formValues.role}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center justify-center gap-2">
                               <MapPin className="h-4 w-4" />
                               <span>{formValues.location}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                               <Mail className="h-4 w-4" />
                               <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                )}
                 
              </CardContent>
              {!isEditing && (
                <CardContent className="p-6 pt-0">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </CardContent>
              )}
            </Card>
            {isEditing && (
                <div className="flex gap-2">
                    <Button type="submit" className="w-full">Save Changes</Button>
                    <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>Cancel</Button>
                </div>
              )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About {isEditing ? user.name : formValues.name}</CardTitle>
              </CardHeader>
              <CardContent>
                 {isEditing ? (
                    <Controller
                        name="about"
                        control={control}
                        render={({ field }) => (
                            <Textarea placeholder="Tell us about yourself..." rows={4} {...field} value={field.value ?? ''} />
                        )}
                    />
                 ) : (
                    <p className="text-sm text-muted-foreground">{formValues.about || 'No information provided.'}</p>
                 )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wants &amp; Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Wants</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                      {wantsFields.map((field, index) => (
                          <Badge key={field.id} variant="secondary" className="pr-1">
                              {field.value}
                              {isEditing && <button type="button" className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5" onClick={() => removeWant(index)}><X className="h-3 w-3" /></button>}
                          </Badge>
                      ))}
                      {isEditing && <Input value={wantsInput} onChange={(e) => setWantsInput(e.target.value)} placeholder="Add a want..." className="h-8 border-none focus-visible:ring-0 flex-1" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddWant(); } }}/>}
                  </div>
                </div>
                 <div>
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 border rounded-md min-h-10">
                      {interestsFields.map((field, index) => (
                          <Badge key={field.id} variant="secondary" className="pr-1">
                              {field.value}
                              {isEditing && <button type="button" className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5" onClick={() => removeInterest(index)}><X className="h-3 w-3" /></button>}
                          </Badge>
                      ))}
                       {isEditing && <Input value={interestsInput} onChange={(e) => setInterestsInput(e.target.value)} placeholder="Add an interest..." className="h-8 border-none focus-visible:ring-0 flex-1" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest(); } }}/>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryPreviews.map((src, index) => (
                        <div key={index} className="relative group">
                            <Image src={src} alt={`Gallery image ${index + 1}`} width={200} height={200} className="rounded-md w-full aspect-square object-cover" data-ai-hint="gallery photo"/>
                            {isEditing && (
                                <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeGalleryImage(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    {isEditing && (
                        <>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={galleryInputRef}
                            className="hidden"
                            onChange={handleGalleryChange}
                          />
                          <button type="button" onClick={() => galleryInputRef.current?.click()} className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                              <PlusCircle className="h-8 w-8" />
                              <span className="text-sm mt-1">Add Photo</span>
                          </button>
                        </>
                    )}
                </div>
                {errors.gallery && <p className="text-destructive text-sm mt-1">{errors.gallery.message}</p>}
                {!isEditing && galleryPreviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">This user hasn't added any photos to their gallery yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className={isEditing ? "grid grid-cols-2 gap-x-6 gap-y-4" : "space-y-3"}>
                {isEditing ? (
                    <>
                      <div>
                          <Label htmlFor="age">Age</Label>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => <Input id="age" type="number" {...field} />}
                            />
                             {errors.age && <p className="text-destructive text-sm mt-1">{errors.age.message}</p>}
                      </div>
                      <div>
                          <Label htmlFor="height">Height</Label>
                            <Controller
                                name="height"
                                control={control}
                                render={({ field }) => <Input id="height" type="text" {...field} value={field.value ?? ''} />}
                            />
                      </div>
                       <div>
                          <Label htmlFor="body-type">Body Type</Label>
                          <Controller
                                name="bodyType"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="body-type"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Slim">Slim</SelectItem>
                                            <SelectItem value="Athletic">Athletic</SelectItem>
                                            <SelectItem value="Average">Average</SelectItem>
                                            <SelectItem value="Curvy">Curvy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="ethnicity">Ethnicity</Label>
                          <Controller
                                name="ethnicity"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="ethnicity"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="White/Caucasian">White/Caucasian</SelectItem>
                                            <SelectItem value="Black/African Decent">Black/African Decent</SelectItem>
                                            <SelectItem value="North/African Decent">North/African Decent</SelectItem>
                                            <SelectItem value="East Asian">East Asian</SelectItem>
                                            <SelectItem value="South Asian">South Asian</SelectItem>
                                            <SelectItem value="Hispanic/Latino">Hispanic/Latino</SelectItem>
                                            <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                                            <SelectItem value="Native America/Indegenious">Native America/Indegenious</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="hair-color">Hair Color</Label>
                          <Controller
                                name="hairColor"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="hair-color"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Brown">Brown</SelectItem>
                                            <SelectItem value="Black">Black</SelectItem>
                                            <SelectItem value="Blonde">Blonde</SelectItem>
                                            <SelectItem value="Chestnut">Chestnut</SelectItem>
                                            <SelectItem value="Grey">Grey</SelectItem>
                                            <SelectItem value="Auburn">Auburn</SelectItem>
                                            <SelectItem value="Red">Red</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                      <div>
                          <Label htmlFor="eye-color">Eye Color</Label>
                            <Controller
                                name="eyeColor"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="eye-color"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Brown">Brown</SelectItem>
                                            <SelectItem value="Blue">Blue</SelectItem>
                                            <SelectItem value="Green">Green</SelectItem>
                                            <SelectItem value="Grey">Grey</SelectItem>
                                            <SelectItem value="Hazel">Hazel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="smoker">Smoker</Label>
                          <Controller
                                name="smoker"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="smoker"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="No">No</SelectItem>
                                            <SelectItem value="Socially">Socially</SelectItem>
                                            <SelectItem value="Sometimes">Sometimes</SelectItem>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="drinker">Drinker</Label>
                          <Controller
                                name="drinker"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="drinker"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="No">No</SelectItem>
                                             <SelectItem value="Socially">Socially</SelectItem>
                                             <SelectItem value="Sometimes">Sometimes</SelectItem>
                                             <SelectItem value="Yes">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="piercings">Piercings</Label>
                            <Controller
                                name="piercings"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="piercings"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="No">No</SelectItem>
                                            <SelectItem value="Yes">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                       <div>
                          <Label htmlFor="tattoos">Tattoos</Label>
                            <Controller
                                name="tattoos"
                                control={control}
                                render={({ field }) => (
                                   <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger id="tattoos"><SelectValue placeholder="Select..." /></SelectTrigger>
                                        <SelectContent>
                                           <SelectItem value="No">No</SelectItem>
                                           <SelectItem value="Yes">Yes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                      </div>
                    </>
                  ) : (
                    <>
                        <ViewField label="Age" value={formValues.age} />
                        <ViewField label="Height" value={formValues.height} />
                        <ViewField label="Body Type" value={formValues.bodyType} />
                        <ViewField label="Ethnicity" value={formValues.ethnicity} />
                        <ViewField label="Hair Color" value={formValues.hairColor} />
                        <ViewField label="Eye Color" value={formValues.eyeColor} />
                        <ViewField label="Smoker" value={formValues.smoker} />
                        <ViewField label="Drinker" value={formValues.drinker} />
                        <ViewField label="Piercings" value={formValues.piercings} />
                        <ViewField label="Tattoos" value={formValues.tattoos} />
                    </>
                  )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
