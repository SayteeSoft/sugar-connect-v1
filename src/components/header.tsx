
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/icons";
import { LogIn, LogOut, Settings, UserPlus, User, Users, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from 'next-themes';
import { Skeleton } from './ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';

const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
  <div className={inSheet ? 'flex flex-col space-y-4' : 'hidden md:flex items-center gap-2'}>
    <Button variant="ghost" className="text-base text-muted-foreground hover:bg-transparent hover:text-primary" asChild>
      <Link href="/profile">Profile</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:bg-transparent hover:text-primary" asChild>
      <Link href="/messages">Messages</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:bg-transparent hover:text-primary" asChild>
      <Link href="/matches">Matches</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:bg-transparent hover:text-primary" asChild>
      <Link href="/search">Search</Link>
    </Button>
  </div>
);

export function Header() {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getCreditsButton = () => {
    if (!user) return null;

    switch (user.role) {
      case 'Sugar Daddy':
        return (
          <Button asChild>
            <Link href="/purchase-credits" className="flex items-center gap-2">
              Buy Credits
              <Badge variant="secondary" className="rounded-full bg-white text-primary text-xs w-6 h-6 flex items-center justify-center p-0">
                {user.credits}
              </Badge>
            </Link>
          </Button>
        );
      case 'Sugar Baby':
        return <Button variant="outline" disabled>Free</Button>;
      case 'Admin':
        return <Button variant="outline" disabled>Unlimited Credits</Button>;
      default:
        return null;
    }
  };
  
  const renderLoadingSkeletons = () => (
      <div className="flex items-center gap-2 md:gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10 rounded-full" />
      </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden flex-1 items-center justify-center md:flex">
             {isClient && !loading && user && <NavLinks />}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-4">
          {(!isClient || loading) ? renderLoadingSkeletons() : (
            <>
                {user && getCreditsButton()}
                
                {user && (
                    <div className="md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 py-6" onClick={() => setIsSheetOpen(false)}>
                                <NavLinks inSheet />
                            </div>
                        </SheetContent>
                    </Sheet>
                    </div>
                )}
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                        {isClient && user ? (
                            <AvatarImage src={user.avatarUrl} />
                        ) : null}
                        <AvatarFallback>
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    {user ? (
                        <>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={toggleTheme}>
                            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </DropdownMenuItem>
                        {user.role === 'Admin' && (
                            <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/admin"><Users className="mr-2 h-4 w-4" />Admin</Link>
                            </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                        <DropdownMenuItem asChild>
                            <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Sign In</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/signup"><UserPlus className="mr-2 h-4 w-4" />Sign Up</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={toggleTheme}>
                            {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                        </DropdownMenuItem>
                        </>
                    )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
