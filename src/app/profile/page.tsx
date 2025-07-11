import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>This is your personal profile page. More features coming soon!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://placehold.co/100x100.png" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">User Name</h2>
                        <p className="text-muted-foreground">user.email@example.com</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="User Name" />
                    </div>
                     <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="London, UK" />
                    </div>
                </div>
                <Button>Save Profile</Button>
            </CardContent>
        </Card>
    </div>
  );
}
