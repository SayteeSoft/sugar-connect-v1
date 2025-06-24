'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Conversation = {
    id: string;
    userId: string;
    userName: string;
    lastMessage: string;
    avatar: string;
    unreadCount: number;
}

type Messages = {
    [key: string]: { id: string; sender: string; text: string }[];
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Messages>({});
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [convos, msgs] = await Promise.all([
        db.getConversations(),
        db.getMessages(),
      ]);
      setConversations(convos);
      setMessages(msgs);
      if (convos.length > 0) {
        setSelectedConv(convos[0]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)]">
      <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        <div className="flex flex-col border-r md:col-span-1 lg:col-span-1">
            <div className="p-4 border-b">
                <h2 className="text-xl font-headline font-bold">Chats</h2>
                 <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-9" />
                </div>
            </div>
          <ScrollArea className="flex-grow">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={cn(
                  "flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent",
                  selectedConv?.id === conv.id && "bg-accent"
                )}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conv.avatar} alt={conv.userName} />
                  <AvatarFallback>{conv.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{conv.userName}</h3>
                    {conv.unreadCount > 0 && (
                      <Badge variant="default" className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs">{conv.unreadCount}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>
        
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
            {selectedConv ? (
                <>
                <div className="flex items-center gap-4 border-b p-4">
                     <Avatar>
                        <AvatarImage src={selectedConv.avatar} alt={selectedConv.userName} />
                        <AvatarFallback>{selectedConv.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-semibold">{selectedConv.userName}</h2>
                </div>
                 <ScrollArea className="flex-grow p-4 bg-background">
                    <div className="space-y-4">
                    {messages[selectedConv.id]?.map(msg => (
                        <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'Me' ? 'justify-end' : 'justify-start')}>
                             {msg.sender !== 'Me' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConv.avatar} /></Avatar>}
                            <div className={cn("max-w-xs rounded-lg px-4 py-2 md:max-w-md", msg.sender === 'Me' ? 'bg-primary text-primary-foreground' : 'bg-card')}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
                <div className="border-t p-4 bg-card">
                    <div className="relative">
                    <Input placeholder="Type a message..." className="pr-12" />
                    <Button size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
                        <Send className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
                </>
            ) : (
                <div className="flex flex-grow items-center justify-center">
                    <p className="text-muted-foreground">Select a conversation to start chatting</p>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
}
