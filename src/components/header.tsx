
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
import { ThemeSwitcher } from "./theme-switcher";
import { Skeleton } from './ui/skeleton';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useTheme } from 'next-themes';

const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
  <div className={inSheet ? 'flex flex-col space-y-4' : 'flex items-center gap-2'}>
    <Button variant="ghost" className="text-base text-muted-foreground hover:text-primary" asChild>
      <Link href="/profile">Profile</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:text-primary" asChild>
      <Link href="/messages">Messages</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:text-primary" asChild>
      <Link href="/matches">Matches</Link>
    </Button>
    <Button variant="ghost" className="text-base text-muted-foreground hover:text-primary" asChild>
      <Link href="/search">Search</Link>
    </Button>
  </div>
);

export function Header() {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

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
            <Link href="/purchase-credits">Buy Credits [{user.credits}]</Link>
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

  const renderAuthContent = () => {
    if (user) {
      return (
        <div className="flex items-center gap-2 md:gap-4">
          {getCreditsButton()}
        </div>
      );
    }
    return null;
  };
  
  const renderLoadingSkeletons = () => (
      <div className="flex items-center gap-2 md:gap-4">
          <Skeleton className="h-10 w-24" />
      </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden items-center justify-center gap-2 md:flex flex-1">
          {isClient && !loading && user && <NavLinks />}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-4">
          {(!isClient || loading) ? renderLoadingSkeletons() : renderAuthContent()}
          
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
              {(!isClient || loading) ? (
                <DropdownMenuLabel>Loading...</DropdownMenuLabel>
              ) : user ? (
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
                    <span>Toggle Theme</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <div className="md:hidden">
            <Sheet>
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
                    <div className="flex flex-col gap-4 py-6">
                        <NavLinks inSheet />
                    </div>
                </SheetContent>
            </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
