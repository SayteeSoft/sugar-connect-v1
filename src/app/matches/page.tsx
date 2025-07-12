
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Trash2, Users, Eye } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserRow = ({ user }: { user: User }) => (
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

export default function MatchesPage() {
    const { user, loading } = useAuth();

    const filteredUsers = useMemo(() => {
        if (!user) return [];
        if (user.role === 'Sugar Daddy') {
            return users.filter(u => u.role === 'Sugar Baby');
        }
        if (user.role === 'Sugar Baby') {
            return users.filter(u => u.role === 'Sugar Daddy');
        }
        // Admins see everyone except other admins.
        if (user.role === 'Admin') {
            return users.filter(u => u.role !== 'Admin');
        }
        return [];
    }, [user]);

    const favorites = useMemo(() => filteredUsers.slice(0, 2), [filteredUsers]);
    const visitors = useMemo(() => filteredUsers.slice(2, 4), [filteredUsers]);
    const viewed = useMemo(() => filteredUsers.slice(4, 6), [filteredUsers]);
    
    if (loading) {
        return (
             <div className="container mx-auto px-4 md:px-6 py-8 max-w-4xl">
                <div className="text-center mb-6">
                    <Skeleton className="h-9 w-1/3 mx-auto" />
                    <Skeleton className="h-4 w-2/3 mx-auto mt-4" />
                </div>
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!user) {
        return <div className="container mx-auto px-4 md:px-6 py-8 text-center"><p>Please log in to see your matches.</p></div>
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold font-headline text-primary">Matches</h1>
                <p className="text-muted-foreground mt-2">Browse your favorites, see who visited your profile, and who you have viewed.</p>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                    <Tabs defaultValue="favorites" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="favorites">
                                <Heart className="mr-2 h-4 w-4" />
                                Favorites
                            </TabsTrigger>
                            <TabsTrigger value="visitors">
                                <Users className="mr-2 h-4 w-4" />
                                Visitors
                            </TabsTrigger>
                            <TabsTrigger value="viewed">
                                <Eye className="mr-2 h-4 w-4" />
                                Viewed
                            </TabsTrigger>
                        </TabsList>
                        <div className="mt-6">
                            <TabsContent value="favorites">
                                {favorites.length > 0 ? favorites.map(u => <UserRow key={u.id} user={u} />) : <p className="p-4 text-center text-muted-foreground">No favorites yet.</p>}
                            </TabsContent>
                            <TabsContent value="visitors">
                                {visitors.length > 0 ? visitors.map(u => <UserRow key={u.id} user={u} />) : <p className="p-4 text-center text-muted-foreground">No visitors yet.</p>}
                            </TabsContent>
                            <TabsContent value="viewed">
                                {viewed.length > 0 ? viewed.map(u => <UserRow key={u.id} user={u} />) : <p className="p-4 text-center text-muted-foreground">You haven't viewed any profiles yet.</p>}
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
