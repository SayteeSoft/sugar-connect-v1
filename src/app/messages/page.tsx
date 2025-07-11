import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function MessagesPage() {
    const conversations = users.filter(u => u.role !== 'Admin').slice(0, 4);
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold font-headline mb-6">Messages</h1>
        <Card className="h-full flex">
            <div className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <Input placeholder="Search messages..." />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(convo => (
                         <div key={convo.id} className="p-4 flex items-center gap-4 hover:bg-accent cursor-pointer border-b">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={convo.avatarUrl} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">Hey, I saw your profile and was really intrigued...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={conversations[0].avatarUrl} />
                        <AvatarFallback>{conversations[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{conversations[0].name}</p>
                </div>
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {/* Chat messages would go here */}
                    <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={conversations[0].avatarUrl} />
                        </Avatar>
                        <div className="rounded-lg bg-muted p-3 max-w-xs">
                            <p>Hey, I saw your profile and was really intrigued by your love for art!</p>
                        </div>
                    </div>
                    <div className="flex items-end gap-2 justify-end">
                        <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-xs">
                            <p>Thanks! I'd love to chat more.</p>
                        </div>
                         <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/40x40.png" />
                        </Avatar>
                    </div>
                </div>
                <div className="p-4 border-t flex items-center gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </Card>
    </div>
  );
}
