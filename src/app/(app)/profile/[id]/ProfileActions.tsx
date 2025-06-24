'use client';

import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Flag, Ban } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProfileActionsProps {
  userName: string;
}

export function ProfileActions({ userName }: ProfileActionsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary/80 hover:text-primary">
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
            <Button variant="ghost" size="icon">
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
            <Button variant="ghost" size="icon">
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
            <Button variant="ghost" size="icon" className="text-destructive/80 hover:text-destructive">
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
