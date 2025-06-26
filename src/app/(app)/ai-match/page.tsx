
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Heart, Eye, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AiMatchClient } from './AiMatchClient';
import { UserList } from './UserList';
import { db } from '@/lib/db';
import { UserListWithVisitToast } from './UserListWithVisitToast';
import type { UserProfile } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

// Helper to get from localStorage or return default
const getStoredIds = (key: string, defaultIds: string[]): string[] => {
  if (typeof window === 'undefined') return defaultIds;
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : defaultIds;
  } catch (e) {
    console.error(`Failed to parse ${key} from localStorage`, e);
    return defaultIds;
  }
};

const ListSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-7 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)


export default function AiMatchPage() {
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getStoredIds('user_favorites', ['2', '5', '7']));
  const [visitorIds, setVisitorIds] = useState<string[]>(() => getStoredIds('user_visitors', ['4', '6']));
  const [viewedIds, setViewedIds] = useState<string[]>(() => getStoredIds('user_viewed', ['3', '8']));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      const profiles = await db.getProfiles();
      setAllProfiles(profiles);
      setIsLoading(false);
    }
    fetchProfiles();
  }, []);

  useEffect(() => {
    localStorage.setItem('user_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('user_visitors', JSON.stringify(visitorIds));
  }, [visitorIds]);

  useEffect(() => {
    localStorage.setItem('user_viewed', JSON.stringify(viewedIds));
  }, [viewedIds]);

  const getProfilesFromIds = (ids: string[]) => {
    if (!allProfiles.length) return [];
    return allProfiles
      .filter(p => ids.includes(p.id))
      .map(p => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem(`user-profile-${p.id}`) : null;
        try {
          return stored ? { ...p, ...JSON.parse(stored) } : p;
        } catch (e) {
          return p;
        }
      });
  };

  const favorites = useMemo(() => getProfilesFromIds(favoriteIds), [favoriteIds, allProfiles]);
  const visitors = useMemo(() => getProfilesFromIds(visitorIds), [visitorIds, allProfiles]);
  const viewed = useMemo(() => getProfilesFromIds(viewedIds), [viewedIds, allProfiles]);

  const handleAddFavorite = (user: UserProfile) => {
    setFavoriteIds(prev => [...new Set([...prev, user.id])]);
  }
  const handleRemoveFavorite = (userId: string) => {
    setFavoriteIds(prev => prev.filter(id => id !== userId));
  }
  const handleRemoveVisitor = (userId: string) => {
    setVisitorIds(prev => prev.filter(id => id !== userId));
  }
  const handleRemoveViewed = (userId: string) => {
    setViewedIds(prev => prev.filter(id => id !== userId));
  }

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
          {isLoading ? <ListSkeleton /> : (
            <UserList
              initialUsers={favorites}
              title="Your Favorite Profiles"
              emptyMessage="You haven't added any profiles to your favorites yet."
              onRemoveUser={handleRemoveFavorite}
              onFavoriteUser={handleAddFavorite}
            />
          )}
        </TabsContent>
        <TabsContent value="visitors" className="mt-6">
           {isLoading ? <ListSkeleton /> : (
            <UserListWithVisitToast
              initialUsers={visitors}
              title="Recent Visitors"
              emptyMessage="No one has visited your profile recently."
              onRemoveUser={handleRemoveVisitor}
              onFavoriteUser={handleAddFavorite}
            />
           )}
        </TabsContent>
        <TabsContent value="viewed" className="mt-6">
           {isLoading ? <ListSkeleton /> : (
            <UserList
              initialUsers={viewed}
              title="Profiles You've Viewed"
              emptyMessage="You haven't viewed any profiles yet."
              onRemoveUser={handleRemoveViewed}
              onFavoriteUser={handleAddFavorite}
            />
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
