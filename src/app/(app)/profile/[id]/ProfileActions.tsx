'use client';

import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Flag, Ban } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface ProfileActionsProps {
  userName: string;
}

export function ProfileActions({ userName }: ProfileActionsProps) {
  const { toast } = useToast();

  const handleFavorite = () => {
    toast({
      title: 'Favorited!',
      description: `You have added ${userName} to your favorites.`,
    });
  };

  const handleMessage = () => {
    toast({
      title: 'Message Sent!',
      description: `Your message to ${userName} has been sent.`,
    });
  };

  const handleReport = () => {
    toast({
      title: 'Reported',
      description: `Thank you for reporting ${userName}. We will review this profile.`,
    });
  };

  const handleBlock = () => {
    toast({
      variant: 'destructive',
      title: 'Blocked',
      description: `You have blocked ${userName}. You will no longer see their profile.`,
    });
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary/80 hover:text-primary"
              onClick={handleFavorite}
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add {userName} to favorites</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to favorites</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleMessage}>
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Message {userName}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Message</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleReport}>
              <Flag className="h-5 w-5" />
              <span className="sr-only">Report {userName}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Report</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive/80 hover:text-destructive"
              onClick={handleBlock}
            >
              <Ban className="h-5 w-5" />
              <span className="sr-only">Block {userName}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Block</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
