import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";

export default function MatchesPage() {
    // Mock data for demonstration
    const favorites = users.slice(0, 2);
    const visitors = users.slice(2, 4);
    const viewed = users.slice(4, 6);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold font-headline mb-2">Matches</h1>
        <p className="text-muted-foreground mb-6">Browse your favorites, see who visited your profile, and who you have viewed.</p>

        <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="visitors">Visitors</TabsTrigger>
                <TabsTrigger value="viewed">Viewed</TabsTrigger>
            </TabsList>
            <TabsContent value="favorites" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Favorites</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorites.map(user => (
                            <Card key={user.id} className="p-4 flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.location}</p>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="visitors">
                 <Card>
                    <CardHeader>
                        <CardTitle>Who Visited You</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {visitors.map(user => (
                            <Card key={user.id} className="p-4 flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.location}</p>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="viewed">
                 <Card>
                    <CardHeader>
                        <CardTitle>Who You've Viewed</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {viewed.map(user => (
                            <Card key={user.id} className="p-4 flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.location}</p>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
