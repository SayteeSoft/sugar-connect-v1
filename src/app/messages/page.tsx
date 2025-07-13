
"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreVertical, Phone, Search, Send, Smile, Paperclip, Video } from "lucide-react";
import type { User, Message as MessageType } from '@/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


type FormattedMessage = {
    id: string;
    text: string;
    sender: 'me' | 'them';
    avatarUrl?: string;
};

const createConversationId = (userId1: string, userId2: string) => {
    return [userId1, userId2].sort().join('-');
};

export default function MessagesPage() {
    const { user: currentUser, deductCredit } = useAuth();
    const { toast } = useToast();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    const conversations = useMemo(() => {
        if (!currentUser) return [];
        if (currentUser.role === 'Sugar Daddy') {
            return mockUsers.filter(u => u.role === 'Sugar Baby');
        }
        if (currentUser.role === 'Sugar Baby') {
            return mockUsers.filter(u => u.role === 'Sugar Daddy');
        }
        if (currentUser.role === 'Admin') {
            return mockUsers.filter(u => u.id !== currentUser.id && u.role !== 'Admin');
        }
        return [];
    }, [currentUser]);

    const [activeConversation, setActiveConversation] = useState<User | null>(null);
    const [messages, setMessages] = useState<FormattedMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [lastMessage, setLastMessage] = useState<Record<string, string>>({});

    // Set initial conversation
    useEffect(() => {
        if (conversations.length > 0 && !activeConversation) {
            setActiveConversation(conversations[0] as User);
        }
    }, [conversations, activeConversation]);

    // Fetch messages when active conversation changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeConversation || !currentUser) return;

            setIsLoadingMessages(true);
            const conversationId = createConversationId(currentUser.id, activeConversation.id);
            
            try {
                const response = await fetch(`/api/messages?conversationId=${conversationId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data: { messages: MessageType[] } = await response.json();
                
                const formattedMessages = data.messages.map(msg => ({
                    id: msg.id,
                    text: msg.text,
                    sender: msg.senderId === currentUser.id ? 'me' : 'them',
                    avatarUrl: msg.senderId === currentUser.id ? currentUser.avatarUrl : activeConversation.avatarUrl
                }));

                setMessages(formattedMessages);
                
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not load conversation history.",
                    variant: "destructive"
                });
            } finally {
                setIsLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [activeConversation, currentUser, toast]);


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleConversationClick = (user: User) => {
        setActiveConversation(user);
    };

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !currentUser || !activeConversation) return;

        const messageText = messageInput.trim();
        const conversationId = createConversationId(currentUser.id, activeConversation.id);

        // Optimistically update UI
        const optimisticMessage: FormattedMessage = {
            id: String(Date.now()),
            text: messageText,
            sender: 'me',
            avatarUrl: currentUser.avatarUrl,
        };
        setMessages(prev => [...prev, optimisticMessage]);
        setMessageInput('');

        try {
            if (currentUser?.role === 'Sugar Daddy') {
                if (typeof currentUser.credits === 'number' && currentUser.credits > 0) {
                    deductCredit?.();
                    toast({
                        title: 'Message Sent!',
                        description: `1 credit has been deducted. You have ${currentUser.credits - 1} credits remaining.`,
                    });
                } else if (currentUser.credits !== 'unlimited') {
                    toast({
                        variant: 'destructive',
                        title: 'No Credits Left',
                        description: 'Please purchase more credits to send messages.',
                    });
                     // Revert optimistic update
                    setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
                    return;
                }
            }

            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversationId,
                    senderId: currentUser.id,
                    receiverId: activeConversation.id,
                    text: messageText,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const { sentMessage } = await response.json();

            // Replace optimistic message with actual message from server
            setMessages(prev => prev.map(m => m.id === optimisticMessage.id ? {
                ...optimisticMessage,
                id: sentMessage.id, // Update with real ID
            } : m));

        } catch (error) {
            toast({
                title: "Error",
                description: "Message could not be sent.",
                variant: "destructive",
            });
            // Revert optimistic update
            setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
        }
    };

    if (!currentUser) {
        return (
            <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 md:px-6 py-8">
                <p>Please log in to see your messages.</p>
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold font-headline text-primary">Messages</h1>
            <p className="text-muted-foreground mt-2">Your private conversations with potential matches.</p>
        </div>
        <div className="max-w-4xl mx-auto">
            <Card className="h-[70vh] w-full flex shadow-lg">
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
                                className="group p-4 flex items-center gap-4 hover:bg-accent cursor-pointer border-b data-[state=active]:bg-accent"
                                data-state={activeConversation?.id === convo.id ? 'active' : 'inactive'}
                                onClick={() => handleConversationClick(convo as User)}
                            >
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={convo.avatarUrl} />
                                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-semibold">{convo.name}</p>
                                    <p className="text-sm text-muted-foreground truncate group-hover:text-foreground group-data-[state=active]:text-foreground">
                                        {lastMessage[convo.id] || `Select to see messages...`}
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
                        <div ref={chatContainerRef} className="flex-1 p-6 space-y-4 overflow-y-auto">
                           {isLoadingMessages ? (
                                <div className="space-y-4">
                                    <div className="flex items-end gap-2 justify-end">
                                        <div className="rounded-lg p-3 max-w-md"><Skeleton className="h-8 w-48" /></div>
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <div className="rounded-lg p-3 max-w-md"><Skeleton className="h-8 w-56" /></div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={cn("flex items-end gap-2", { 'justify-end': msg.sender === 'me' })}>
                                            {msg.sender === 'them' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={msg.avatarUrl} />
                                                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn(
                                                "rounded-lg p-3 max-w-md shadow-sm",
                                                msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-background'
                                            )}>
                                                <p>{msg.text}</p>
                                            </div>
                                            {msg.sender === 'me' && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={currentUser.avatarUrl} />
                                                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="p-4 border-t flex items-center gap-2 bg-background">
                            <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon"><Smile className="h-5 w-5" /></Button>
                            <Input 
                                placeholder="Type your message..." 
                                className="flex-1 bg-muted/50 focus-visible:ring-1"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={isLoadingMessages}
                            />
                            <Button onClick={handleSendMessage} disabled={isLoadingMessages || !messageInput.trim()}>
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
    </div>
  );
}
