
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserList } from './UserList';
import type { UserProfile } from '@/lib/types';

interface UserListWithVisitToastProps {
  initialUsers: UserProfile[];
  title: string;
  emptyMessage: string;
  onRemoveUser?: (userId: string) => void;
  onFavoriteUser?: (user: UserProfile) => void;
}

export function UserListWithVisitToast({ initialUsers, title, emptyMessage, onRemoveUser, onFavoriteUser }: UserListWithVisitToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (initialUsers.length > 0) {
      const hasSeenToast = localStorage.getItem('hasSeenVisitorToast');
      if (!hasSeenToast) {
        toast({
          title: 'New Visitors',
          description: `You have ${initialUsers.length} new profile visitor(s). Check them out!`,
        });
        // Prevent toast from showing again in the same session
        localStorage.setItem('hasSeenVisitorToast', 'true');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUsers.length]);

  return (
    <UserList 
      initialUsers={initialUsers}
      title={title}
      emptyMessage={emptyMessage}
      onRemoveUser={onRemoveUser}
      onFavoriteUser={onFavoriteUser}
    />
  );
}
