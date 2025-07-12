
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { users as allUsers, profiles as allProfiles } from "@/lib/mock-data";
import { notFound, useParams, useRouter } from "next/navigation";
import type { ProfileFormValues, Role } from "@/types";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Sugar Daddy", "Sugar Baby", "Admin"]),
  location: z.string().min(2, "Location is required."),
  about: z.string().optional(),
  age: z.coerce.number().min(18, "You must be at least 18."),
});

type EditUserFormValues = z.infer<typeof profileSchema>;


export default function EditUserPage() {
  const { user: currentUser, loading, updateUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // In a real app, this data would be fetched from an API.
  const userToEdit = allUsers.find(u => u.id === id);
  const userProfileToEdit = allProfiles.find(p => p.userId === id);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<EditUserFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      role: "Sugar Baby",
      location: "",
      about: "",
      age: 18,
    }
  });
  
  useEffect(() => {
    if (userToEdit && userProfileToEdit) {
      reset({
        name: userToEdit.name,
        role: userToEdit.role,
        location: userToEdit.location,
        about: userProfileToEdit.about,
        age: userToEdit.age,
      });
    }
  }, [userToEdit, userProfileToEdit, reset]);

  const onSubmit = async (data: EditUserFormValues) => {
    // This is a simplified submission. In a real app, the `updateUser`
    // function would likely have permission checks.
    if (!updateUser) {
        toast({ title: "Error", description: "Update function not available.", variant: "destructive" });
        return;
    }
    try {
        await updateUser(id, data as ProfileFormValues); // We cast here, it's not ideal but works for mock
        toast({
            title: "User Profile Saved!",
            description: `${data.name}'s profile has been successfully updated.`,
        });
        router.push("/admin");
    } catch (error) {
        toast({ title: "Error", description: "Failed to update user.", variant: "destructive" });
    }
  };

  if (loading || !userToEdit) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-24" />
                </CardFooter>
            </Card>
        </div>
    );
  }

  // Ensure only admins can access this page
  if (currentUser?.role !== 'Admin') {
    notFound();
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Edit User: {userToEdit.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
                <Label htmlFor="age">Age</Label>
                <Controller
                    name="age"
                    control={control}
                    render={({ field }) => <Input id="age" type="number" {...field} />}
                />
                    {errors.age && <p className="text-destructive text-sm mt-1">{errors.age.message}</p>}
            </div>
            <div>
                <Label htmlFor="role">Role</Label>
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={userToEdit.role === 'Admin'}>
                            <SelectTrigger id="role"><SelectValue placeholder="Select role..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Sugar Daddy">Sugar Daddy</SelectItem>
                                <SelectItem value="Sugar Baby">Sugar Baby</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
      </Card>
    </div>
  );
}
