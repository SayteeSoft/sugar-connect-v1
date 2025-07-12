
"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { generateSugarBabyMessage } from '@/ai/flows/generate-sugar-baby-message';
import { mockUsers as allUsers } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X, MessageSquare, Clock } from 'lucide-react';
import type { User } from '@/types';

export function MessageToast() {
    const { user } = useAuth();
    const [message, setMessage] = useState<string | null>(null);
    const [fromUser, setFromUser] = useState<User | null>(null);
    const [show, setShow] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Ensure this only runs on the client to avoid hydration mismatch
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Wait until the component has mounted and we're on the client
        if (!isClient || user?.role !== 'Sugar Daddy') {
            return;
        }

        const generateAndShowMessage = async () => {
            if (isGenerating || show) return;

            setIsGenerating(true);
            try {
                const sugarBabies = allUsers.filter(u => u.role === 'Sugar Baby');
                if (sugarBabies.length === 0) return;

                const randomBaby = sugarBabies[Math.floor(Math.random() * sugarBabies.length)];
                setFromUser(randomBaby);
                
                const result = await generateSugarBabyMessage({
                    sugarDaddyName: user.name,
                    sugarBabyProfile: {
                        name: randomBaby.name,
                        age: randomBaby.age,
                        interests: "fashion and art", // Mock interests
                        location: randomBaby.location,
                    },
                });
                
                if (result.message) {
                    setMessage(result.message);
                    setShow(true);
                }
            } catch (error) {
                console.error("Error generating message:", error);
            } finally {
                setIsGenerating(false);
            }
        };

        // Trigger randomly, but not too often
        const timer = setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance every 20 seconds
                generateAndShowMessage();
            }
        }, 20000);
        
        return () => {
            clearInterval(timer);
        };
    }, [user, isGenerating, show, isClient]);

    const handleClose = () => {
        setShow(false);
        setMessage(null);
        setFromUser(null);
    };

    if (!show || !message || !fromUser) return null;

    return (
        <div className="fixed top-20 right-5 z-50 animate-in slide-in-from-top-5 fade-in-50">
            <Card className="w-96 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-end p-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex items-start gap-3">
                        <Avatar>
                            <AvatarImage src={fromUser.avatarUrl} alt={fromUser.name} />
                            <AvatarFallback>{fromUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{fromUser.name}</p>
                            <p className="text-sm text-muted-foreground">{message}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                    <Button variant="ghost" size="sm" onClick={handleClose}>
                        <Clock className="mr-1 h-4 w-4" />
                        Not Now
                    </Button>
                    <Button size="sm">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Reply
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
