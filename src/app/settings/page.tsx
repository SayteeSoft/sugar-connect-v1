
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    const { user, deleteUser } = useAuth();
    const { toast } = useToast();

    const handleDeleteAccount = async () => {
        if (!user || !deleteUser) return;
        try {
            await deleteUser(user.id);
            toast({
                title: "Account Deleted",
                description: "Your account has been permanently deleted.",
            });
            // The logout is handled inside deleteUser, which will redirect via AuthProvider
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete account. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">
                    Settings
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                    Manage your account settings, preferences, and more.
                </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update the password for your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Update Password</Button>
                    </CardFooter>

                    <Separator className="my-6" />

                    <CardHeader>
                        <CardTitle>Language Settings</CardTitle>
                         <CardDescription>Language selection coming soon.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This feature is not yet available.</p>
                    </CardContent>
                    <CardFooter>
                        <Button disabled>Save Language</Button>
                    </CardFooter>

                    <Separator className="my-6" />

                    <CardHeader className="border-t-destructive pt-6">
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>
                            Permanently delete your account and all of your content. This action is not reversible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete My Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove all your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
