import { Sparkles, Heart, Eye, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AiMatchClient } from './AiMatchClient';
import { UserList } from './UserList';
import { db } from '@/lib/db';

export default async function AiMatchPage() {
  const [favorites, visitors, viewed] = await Promise.all([
    db.getFavorites(),
    db.getVisitors(),
    db.getViewed(),
  ]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center text-center">
        <Sparkles className="h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-headline font-bold">Connections</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Discover, track, and manage your potential matches and interactions.
        </p>
      </div>

      <Tabs defaultValue="ai-match" className="mt-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="ai-match">
            <Sparkles className="mr-2 h-4 w-4" /> AI Match
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="mr-2 h-4 w-4" /> Favorites
          </TabsTrigger>
          <TabsTrigger value="visitors">
            <UserCheck className="mr-2 h-4 w-4" /> Visitors
          </TabsTrigger>
          <TabsTrigger value="viewed">
            <Eye className="mr-2 h-4 w-4" /> Viewed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-match" className="mt-6">
          <AiMatchClient />
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
          <UserList
            initialUsers={favorites}
            title="Your Favorite Profiles"
            emptyMessage="You haven't added any profiles to your favorites yet."
          />
        </TabsContent>
        <TabsContent value="visitors" className="mt-6">
          <UserList
            initialUsers={visitors}
            title="Recent Visitors"
            emptyMessage="No one has visited your profile recently."
          />
        </TabsContent>
        <TabsContent value="viewed" className="mt-6">
          <UserList
            initialUsers={viewed}
            title="Profiles You've Viewed"
            emptyMessage="You haven't viewed any profiles yet."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
