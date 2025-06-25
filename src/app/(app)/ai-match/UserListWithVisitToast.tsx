'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserList } from './UserList';
import type { UserProfile } from '@/lib/types';

interface UserListWithVisitToastProps {
  initialUsers: UserProfile[];
  title: string;
  emptyMessage: string;
}

export function UserListWithVisitToast({ initialUsers, title, emptyMessage }: UserListWithVisitToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (initialUsers.length > 0) {
      toast({
        title: 'New Visitors',
        description: `You have ${initialUsers.length} new profile visitor(s). Check them out!`,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserList 
      initialUsers={initialUsers}
      title={title}
      emptyMessage={emptyMessage}
    />
  );
}
