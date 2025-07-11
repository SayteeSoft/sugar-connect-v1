
"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreVertical, Phone, Search, Send, Smile, Paperclip, Video } from "lucide-react";
import type { User } from '@/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export default function MessagesPage() {
    const { user: currentUser } = useAuth();
    const conversations = users.filter(u => u.role !== 'Admin' && u.id !== currentUser?.id).slice(0, 4);
    const [activeConversation, setActiveConversation] = useState<User | null>(conversations[0] || null);
    
    const handleConversationClick = (user: User) => {
        setActiveConversation(user);
    };

    if (!currentUser) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-8 flex items-center justify-center">
                <p>Please log in to see your messages.</p>
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-4xl h-[70vh] flex shadow-lg">
            {/* Left Panel: Conversations List */}
            <div className="w-1/3 border-r flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(convo => (
                         <div 
                            key={convo.id} 
                            className={cn(
                                "p-4 flex items-center gap-4 hover:bg-accent cursor-pointer border-b",
                                activeConversation?.id === convo.id && "bg-accent"
                            )}
                            onClick={() => handleConversationClick(convo)}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={convo.avatarUrl} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">
                                    {convo.id === '4' ? "Hi! I saw you're a travel partner." : convo.id === '5' ? "Hey there! Loved your profile!" : "Your profile mentioned you..."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Right Panel: Chat Window */}
            {activeConversation ? (
                <div className="w-2/3 flex flex-col bg-muted/20">
                    <div className="p-4 border-b flex items-center gap-4 bg-background">
                        <Avatar>
                            <AvatarImage src={activeConversation.avatarUrl} />
                            <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{activeConversation.name}</p>
                            <p className="text-sm text-muted-foreground">Online</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Phone className="h-5 w-5"/></Button>
                            <Button variant="ghost" size="icon"><Video className="h-5 w-5"/></Button>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5"/></Button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                        <div className="flex items-end gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={activeConversation.avatarUrl} />
                                <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg bg-background p-3 max-w-md shadow-sm">
                                <p>Hi! I saw you're a travel partner. What's the most amazing place you've visited?</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t flex items-center gap-2 bg-background">
                        <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Smile className="h-5 w-5" /></Button>
                        <Input placeholder="Type your message..." className="flex-1 bg-muted/50 focus-visible:ring-1" />
                        <Button>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="w-2/3 flex items-center justify-center text-muted-foreground">
                    <p>Select a conversation to start chatting.</p>
                </div>
            )}
        </Card>
    </div>
  );
}
