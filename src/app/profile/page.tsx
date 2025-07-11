
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
import { Camera, PlusCircle, Trash2, X, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profiles } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Sugar Daddy", "Sugar Baby", "Admin"]),
  location: z.string().min(2, "Location is required."),
  about: z.string().optional(),
  wants: z.array(z.object({ value: z.string() })).optional(),
  interests: z.array(z.object({ value: z.string() })).optional(),
  age: z.coerce.number().min(18, "You must be at least 18."),
  height: z.coerce.number().optional(),
  bodyType: z.enum(["Slim", "Athletic", "Average", "Curvy"]).optional(),
  ethnicity: z.enum(["White/Caucasian", "Black/African Decent", "North/African Decent", "East Asian", "South Asian", "Hispanic/Latino", "Middle Eastern", "Native America/Indegenious"]).optional(),
  hairColor: z.enum(["Brown", "Black", "Blonde", "Chestnut", "Grey", "Auburn", "Red"]).optional(),
  eyeColor: z.enum(["Blue", "Brown", "Green", "Grey", "Hazel"]).optional(),
  smoker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  drinker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  piercings: z.enum(["Yes", "No"]).optional(),
  tattoos: z.enum(["Yes", "No"]).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    if (!value && value !== 0) return null;
    return (
        <div className="grid gap-1.5">
            <Label className="text-muted-foreground">{label}</Label>
            <p className="text-sm">{String(value)}</p>
        </div>
    )
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [wantsInput, setWantsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");


  // Find the profile that matches the logged-in user's ID
  const userProfile = user ? profiles.find(p => p.userId === user.id) : undefined;

  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      role: "Sugar Baby", // Default role
      location: "",
      about: "",
      wants: [],
      interests: [],
      age: 18,
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
    }
  }, [user, userProfile, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you would send this data to your backend API
    console.log("Profile saved:", data);

    // Update the mock data in memory (for demonstration)
    if (user && userProfile) {
        user.name = data.name;
        user.location = data.location;
        user.age = data.age;
        userProfile.about = data.about || '';
        userProfile.wants = data.wants?.map(w => w.value) || [];
        userProfile.interests = data.interests?.map(i => i.value) || [];
        // ... update other fields ...
    }


    toast({
      title: "Profile Saved!",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false); // Switch to view mode after saving
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
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-headline">My Profile</h1>
            {!isEditing && (
                 <Button type="button" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            )}
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
                  {isEditing && (
                    <Button type="button" variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                        <Camera className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
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
                        <Label htmlFor="role">Role</Label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value} disabled={user.role !== 'Admin'}>
                                    <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sugar Daddy">Sugar Daddy</SelectItem>
                                        <SelectItem value="Sugar Baby">Sugar Baby</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
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
                    </>
                  ) : (
                    <div className="space-y-4">
                        <ViewField label="Name" value={formValues.name} />
                        <ViewField label="Role" value={formValues.role} />
                        <ViewField label="Location" value={formValues.location} />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className={isEditing ? '' : 'text-muted-foreground'}>Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                     {isEditing && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Email cannot be changed here.
                        </p>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 pt-2">
                        <Button type="submit" className="w-full">Save Profile</Button>
                        <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>Cancel</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
                  <Label>Wants</Label>
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
                  <Label>Interests</Label>
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
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative group">
                      <Image src="https://placehold.co/400x400.png" alt="Gallery image" width={200} height={200} className="rounded-md w-full aspect-square object-cover" data-ai-hint="gallery photo"/>
                       {isEditing && (
                        <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                       )}
                  </div>
                  {isEditing && (
                    <button type="button" className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                        <PlusCircle className="h-8 w-8" />
                        <span className="text-sm mt-1">Add Photo</span>
                    </button>
                  )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
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
                          <Label htmlFor="height">Height (cm)</Label>
                            <Controller
                                name="height"
                                control={control}
                                render={({ field }) => <Input id="height" type="number" {...field} value={field.value ?? ''} />}
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
                        <ViewField label="Height (cm)" value={formValues.height} />
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
