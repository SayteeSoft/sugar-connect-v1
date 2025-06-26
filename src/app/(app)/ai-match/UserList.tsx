
'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageSquare, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserListProps {
  initialUsers: UserProfile[];
  title: string;
  emptyMessage: string;
  onRemoveUser?: (userId: string) => void;
  onFavoriteUser?: (user: UserProfile) => void;
}

export function UserList({
  initialUsers,
  title,
  emptyMessage,
  onRemoveUser,
  onFavoriteUser,
}: UserListProps) {
  const { toast } = useToast();

  const handleRemove = (userId: string) => {
    const user = initialUsers.find((u) => u.id === userId);
    if (onRemoveUser) {
      onRemoveUser(userId);
    }
    if (user) {
      toast({
        title: 'User Removed',
        description: `${user.name} has been removed from this list.`,
      });
    }
  };

  const handleFavorite = (user: UserProfile) => {
    if (onFavoriteUser) {
      onFavoriteUser(user);
    }
    toast({
      title: 'Favorited!',
      description: `You have added ${user.name} to your favorites.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {initialUsers.length > 0 ? (
          <div className="space-y-4">
            {initialUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <Link
                    href={`/profile/${user.id}`}
                    className="font-semibold hover:underline"
                  >
                    {user.name}, {user.age}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {user.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-pink-500 hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900/50"
                    onClick={() => handleFavorite(user)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button asChild variant="ghost" size="icon">
                    <Link href="/messages">
                      <MessageSquare className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(user.id)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
