

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
import { Camera, PlusCircle, Trash2, X, Edit, CheckCircle, Star, MapPin, Mail, Mars, Venus } from "lucide-react";
import Image from "next/image";
import { wantOptions, interestOptions } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import { ProfileFormValues as ProfileFormSchema, profileFormSchema, Profile, User, Role } from "@/types";
import { MultiSelect } from "@/components/ui/multi-select";
import { GalleryLightbox } from "@/components/gallery-lightbox";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value ? String(value) : <span className="text-muted-foreground/70">Not specified</span>}</p>
        </div>
    )
}

interface ProfileFormProps {
  user: User;
  profile: Profile;
  isAdminEditing?: boolean;
}

export function ProfileForm({ user, profile, isAdminEditing = false }: ProfileFormProps) {
  const { user: currentUser, updateUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isAdminEditing);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  const { control, handleSubmit, reset, getValues, setValue, watch, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      sex: "Female",
      role: "Sugar Baby",
      location: "",
      about: "",
      wants: [],
      interests: [],
      age: 18,
      gallery: [],
      height: "",
    }
  });
  
  const { fields: galleryFields, append: appendGallery, remove: removeGallery, replace: replaceGallery } = useFieldArray({
    control, name: "gallery"
  });

  const watchSex = watch("sex");
  const watchRole = watch("role");

  useEffect(() => {
    const initialValues = {
      name: user.name,
      email: user.email,
      sex: user.sex,
      role: user.role,
      location: user.location,
      about: profile.about,
      wants: profile.wants.map(v => ({value: v, label: v})),
      interests: profile.interests.map(v => ({value: v, label: v})),
      age: user.age,
      gallery: profile.gallery || [],
      height: profile.attributes.height,
      bodyType: profile.attributes.bodyType,
      ethnicity: profile.attributes.ethnicity,
      hairColor: profile.attributes.hairColor,
      eyeColor: profile.attributes.eyeColor,
      smoker: profile.attributes.smoker,
      drinker: profile.attributes.drinker,
      piercings: profile.attributes.piercings,
      tattoos: profile.attributes.tattoos,
    };
    reset(initialValues);
    setAvatarPreview(user.avatarUrl);
    if (profile.gallery) {
      replaceGallery(profile.gallery.map(url => ({ file: url })));
    }
  }, [user, profile, reset, replaceGallery]);
  
  useEffect(() => {
    // Automatically update role based on sex, unless an Admin is editing.
    if (!isAdminEditing) {
        if (watchSex === 'Male') {
            setValue('role', 'Sugar Daddy');
        } else if (watchSex === 'Female') {
            setValue('role', 'Sugar Baby');
        }
    }
  }, [watchSex, setValue, isAdminEditing]);

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
        const newFiles = Array.from(files);
        const currentFiles = getValues("gallery") || [];
        
        const combinedFiles = [...currentFiles, ...newFiles.map(file => ({ file }))];

        const uniqueFiles = combinedFiles.reduce((acc: { file: any }[], current) => {
            const file = current.file;
            const fileName = file instanceof File ? file.name : file;
            if (!acc.some(item => (item.file instanceof File ? item.file.name : item.file) === fileName)) {
                acc.push(current);
            }
            return acc;
        }, []);

        replaceGallery(uniqueFiles);
    }
  };


  const removeGalleryImage = (index: number) => {
    removeGallery(index);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user || !profile || !updateUser) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not save profile. User not found.",
        });
        return;
    }

    try {
        const updatedUser = await updateUser(user.id, {
            ...data,
            gallery: galleryFields.map(field => (field as any).file)
        });
        
        toast({
          title: "Profile Saved!",
          description: `${data.name}'s profile has been successfully updated.`,
        });

        const updatedProfileResponse = await fetch('/api/users');
        const updatedData = await updatedProfileResponse.json();
        const freshProfile = updatedData.profiles.find((p: Profile) => p.userId === user.id);

        if (freshProfile) {
            const newFieldValues = freshProfile.gallery.map((url: string) => ({ file: url }));
            replaceGallery(newFieldValues);
        }

        if (isAdminEditing) {
          router.push("/admin");
        } else {
          setIsEditing(false);
        }
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
      const initialValues = {
          name: user.name,
          email: user.email,
          sex: user.sex,
          role: user.role,
          location: user.location,
          about: profile.about,
          wants: profile.wants.map(v => ({value: v, label: v})),
          interests: profile.interests.map(v => ({value: v, label: v})),
          age: user.age,
          gallery: profile.gallery,
          height: profile.attributes.height,
          bodyType: profile.attributes.bodyType,
          ethnicity: profile.attributes.ethnicity,
          hairColor: profile.attributes.hairColor,
          eyeColor: profile.attributes.eyeColor,
          smoker: profile.attributes.smoker,
          drinker: profile.attributes.drinker,
          piercings: profile.attributes.piercings,
          tattoos: profile.attributes.tattoos,
      };
      reset(initialValues);
      setAvatarPreview(user.avatarUrl);
      if (profile.gallery) {
        replaceGallery(profile.gallery.map(url => ({ file: url })));
      }
      if (isAdminEditing) {
        router.back();
      } else {
        setIsEditing(false);
      }
  }
  
  const formValues = getValues();
  
  const imageSources = galleryFields
        .map(field => (field as any).file)
        .map(file => (typeof file === 'string' ? file : URL.createObjectURL(file)));


  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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
                        disabled={!isEditing}
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
                {errors.avatar && <p className="text-destructive text-sm mt-1">{errors.avatar.message as string}</p>}
                {isEditing ? (
                    <div className="space-y-4 text-left">
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
                            {currentUser?.role === 'Admin' ? (
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger id="role"><SelectValue placeholder="Select role..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                                <SelectItem value="Sugar Daddy">Sugar Daddy</SelectItem>
                                                <SelectItem value="Sugar Baby">Sugar Baby</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            ) : (
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => <Input id="role" {...field} readOnly />}
                                />
                            )}
                        </div>

                        <div>
                          <Label htmlFor="sex">Sex</Label>
                          <Controller
                              name="sex"
                              control={control}
                              render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                                      <SelectTrigger id="sex"><SelectValue placeholder="Select sex..." /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="Male">Male</SelectItem>
                                          <SelectItem value="Female">Female</SelectItem>
                                      </SelectContent>
                                  </Select>
                              )}
                          />
                          {errors.sex && <p className="text-destructive text-sm mt-1">{errors.sex.message}</p>}
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
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input id="email" {...field} />}
                            />
                            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 text-left">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                {formValues.name}
                                {formValues.role === 'Admin' && <Star className="h-5 w-5 text-yellow-400 fill-current" />}
                            </h1>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1 text-left">
                            <div className="flex items-center gap-2">
                               <MapPin className="h-4 w-4" />
                               <span>{formValues.location}</span>
                            </div>
                             {formValues.sex && (
                               <div className="flex items-center gap-2">
                                {formValues.sex === 'Male' ? <Mars className="h-4 w-4" /> : <Venus className="h-4 w-4" />}
                                <span>{formValues.sex}</span>
                               </div>
                             )}
                            <div className="flex items-center gap-2">
                               <Mail className="h-4 w-4" />
                               <span>{formValues.email}</span>
                            </div>
                        </div>
                    </div>
                )}
              </CardContent>
              {!isEditing && !isAdminEditing && (
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
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About {formValues.name}</CardTitle>
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
                  {isEditing ? (
                    <Controller
                        name="wants"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={wantOptions}
                                selected={field.value || []}
                                onChange={field.onChange}
                                placeholder="Select what you're looking for..."
                            />
                        )}
                    />
                  ) : (
                     <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
                        {formValues.wants && formValues.wants.length > 0 ? formValues.wants.map((want, index) => (
                            <Badge key={index} variant="secondary">{want.label}</Badge>
                        )) : <p className="text-sm text-muted-foreground">No wants specified.</p>}
                    </div>
                  )}
                </div>
                 <div>
                  <Label className="text-sm font-medium">Interests</Label>
                   {isEditing ? (
                    <Controller
                        name="interests"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={interestOptions}
                                selected={field.value || []}
                                onChange={field.onChange}
                                placeholder="Select your interests..."
                            />
                        )}
                    />
                  ) : (
                     <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
                        {formValues.interests && formValues.interests.length > 0 ? formValues.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest.label}</Badge>
                        )) : <p className="text-sm text-muted-foreground">No interests specified.</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                    {galleryFields.length > 0 ? (
                        <GalleryLightbox
                            images={imageSources}
                            renderThumbnails={({ openLightbox }) => (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryFields.map((field, index) => {
                                        const src = imageSources[index];
                                        return (
                                            <div key={field.id} className="relative group cursor-pointer" onClick={() => openLightbox(index)}>
                                                <Image src={src} alt={`Gallery image ${index + 1}`} width={200} height={200} className="rounded-md w-full aspect-square object-cover" data-ai-hint="gallery photo" />
                                                {isEditing && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeGalleryImage(index);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {isEditing && (
                                        <>
                                            <input type="file" multiple accept="image/*" ref={galleryInputRef} className="hidden" onChange={handleGalleryChange} />
                                            <button type="button" onClick={() => galleryInputRef.current?.click()} className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                                                <PlusCircle className="h-8 w-8" />
                                                <span className="text-sm mt-1">Add Photo</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                    ) : (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            {!isEditing && (
                                <p className="text-sm text-muted-foreground col-span-full">This user hasn't added any photos to their gallery yet.</p>
                            )}
                         </div>
                    )}
                    {errors.gallery && <p className="text-destructive text-sm mt-1">{errors.gallery.message as string}</p>}
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
                             {errors.height && <p className="text-destructive text-sm mt-1">{errors.height.message}</p>}
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
