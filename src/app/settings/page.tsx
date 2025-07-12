
"use client";

import { useAuth } from "@/hooks/use-auth";
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
        <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12 md:py-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-4xl font-bold font-headline text-primary">Settings</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">Manage your account settings, preferences, and more.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold font-headline text-primary mb-4">Account</h2>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
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
                                    <Button>Update Password</Button>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-headline text-primary mb-4">Preferences</h2>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Language Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Language selection coming soon.</p>
                                    <Button className="mt-4" disabled>Save Language</Button>
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-headline text-destructive mb-4">Danger Zone</h2>
                            <Card className="border-destructive">
                                <CardHeader>
                                    <CardTitle>Delete Account</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm mb-4 text-muted-foreground">
                                        Permanently delete your account and all of your content. This action is not reversible.
                                    </p>
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
                        </section>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
