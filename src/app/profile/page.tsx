
"use client";

import { useForm, Controller } from "react-hook-form";
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
import { Camera, PlusCircle, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profiles } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Sugar Daddy", "Sugar Baby", "Admin"]),
  location: z.string().min(2, "Location is required."),
  about: z.string().optional(),
  wants: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
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

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const userProfile = profiles.find(p => p.userId === user?.id);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      role: "Sugar Baby",
      location: "",
      about: "",
      wants: [],
      interests: [],
      age: 18,
      height: undefined,
      bodyType: undefined,
      ethnicity: undefined,
      hairColor: undefined,
      eyeColor: undefined,
      smoker: undefined,
      drinker: undefined,
      piercings: undefined,
      tattoos: undefined,
    }
  });

  useEffect(() => {
    if (user && userProfile) {
      reset({
        name: user.name,
        role: user.role,
        location: user.location,
        about: userProfile.about,
        wants: userProfile.wants,
        interests: userProfile.interests,
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

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (!user) {
    notFound();
    return null;
  }
  
  if (!userProfile) {
    return <div className="container mx-auto p-8">Profile not found.</div>;
  }

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile saved:", data);
    toast({
      title: "Profile Saved!",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Button type="button" variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-4">
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
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={user.role !== 'Admin'}>
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
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed here. <Link href="/settings" className="underline hover:text-primary">Change here.</Link>
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                      <Button type="submit" className="w-full">Save Profile</Button>
                      <Button type="button" variant="outline" className="w-full" onClick={() => reset()}>Cancel</Button>
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
                 <Controller
                    name="about"
                    control={control}
                    render={({ field }) => (
                        <Textarea placeholder="Tell us about yourself..." rows={4} {...field} value={field.value ?? ''} />
                    )}
                    />
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
                              <button type="button" className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"><X className="h-3 w-3" /></button>
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
                              <button type="button" className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"><X className="h-3 w-3" /></button>
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
                       <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
                  <button type="button" className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="body-type"><SelectValue/></SelectTrigger>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="ethnicity"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="hair-color"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="eye-color"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="smoker"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="drinker"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="piercings"><SelectValue/></SelectTrigger>
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
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="tattoos"><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="No">No</SelectItem>
                                       <SelectItem value="Yes">Yes</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
