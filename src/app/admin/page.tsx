
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";
import { useToast } from "@/hooks/use-toast";


export default function AdminPage() {
    const { user, loading, deleteUser } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                 const response = await fetch('/api/users');
                 if (!response.ok) {
                    throw new Error("Failed to fetch users");
                 }
                 const data = await response.json();
                 setUsers(data.users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                toast({
                    title: "Error",
                    description: "Could not fetch the user list.",
                    variant: "destructive"
                });
            }
        };

        if (user?.role === 'Admin') {
            fetchUsers();
        }
    }, [user, toast]);

    if (loading) {
        return <div className="container mx-auto p-8">Loading...</div>;
    }

    if (user?.role !== 'Admin') {
        router.push('/');
        return null;
    }

    const handleDelete = async (userId: string) => {
        if (!deleteUser) return;
        try {
            await deleteUser(userId);
            setUsers(currentUsers => currentUsers.filter(u => u.id !== userId));
            toast({
                title: "User Deleted",
                description: "The user has been successfully deleted.",
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({
                title: "Error",
                description: `Failed to delete user: ${errorMessage}`,
                variant: "destructive",
            });
        }
    };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-6">
          <h1 className="text-4xl font-bold font-headline text-primary">User Management</h1>
          <p className="text-muted-foreground mt-2">A list of all users in the system.</p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={u.avatarUrl} />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                        <span>{u.name}</span>
                        <Badge variant={u.role === 'Admin' ? 'destructive' : 'default'}>
                            {u.role === 'Sugar Daddy' ? 'Daddy' : u.role === 'Sugar Baby' ? 'Baby' : 'Admin'}
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.age}</TableCell>
                  <TableCell>{u.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => router.push(`/profile/${u.id}`)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/edit-user/${u.id}`)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={u.role === 'Admin'}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user account
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(u.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
