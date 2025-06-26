'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PolicyModalProps {
  triggerText: string;
  title: string;
  children: React.ReactNode;
}

export function PolicyModal({ triggerText, title, children }: PolicyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground transition-colors hover:text-primary text-left p-0 bg-transparent h-auto">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-4 text-sm text-muted-foreground">
                {children}
            </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button">Accept and Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
