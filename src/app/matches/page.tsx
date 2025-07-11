import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Trash2, Users, Eye } from "lucide-react";

export default function MatchesPage() {
    // Mock data for demonstration
    const favorites = users.slice(0, 2);
    const visitors = users.slice(2, 4);
    const viewed = users.slice(4, 6);

    const UserRow = ({ user }: { user: typeof users[0] }) => (
        <div className="flex items-center justify-between p-4 border-b last:border-b-0">
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">{user.name}, {user.age}</p>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.location}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline">Matches</h1>
                <p className="text-muted-foreground mt-2">Browse your favorites, see who visited your profile, and who you have viewed.</p>
            </div>

            <Tabs defaultValue="favorites" className="w-full">
                <TabsList className="flex justify-center bg-transparent p-0">
                    <TabsTrigger value="favorites" className="mx-1 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                        <Heart className="mr-2 h-4 w-4" />
                        Favorites
                    </TabsTrigger>
                    <TabsTrigger value="visitors" className="mx-1 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        Visitors
                    </TabsTrigger>
                    <TabsTrigger value="viewed" className="mx-1 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                        <Eye className="mr-2 h-4 w-4" />
                        Viewed
                    </TabsTrigger>
                </TabsList>
                <Card className="mt-6">
                    <CardContent className="p-0">
                        <TabsContent value="favorites" className="m-0">
                            {favorites.map(user => <UserRow key={user.id} user={user} />)}
                        </TabsContent>
                        <TabsContent value="visitors" className="m-0">
                            {visitors.map(user => <UserRow key={user.id} user={user} />)}
                        </TabsContent>
                        <TabsContent value="viewed" className="m-0">
                            {viewed.map(user => <UserRow key={user.id} user={user} />)}
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
