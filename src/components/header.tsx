"use client";

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
import { Bell, Heart, LogIn, LogOut, Search, Settings, UserPlus, User, Mail, Users } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

const NavLinks = () => (
  <>
    <Button variant="ghost" asChild>
      <Link href="/profile">Profile</Link>
    </Button>
    <Button variant="ghost" asChild>
      <Link href="/messages">Messages</Link>
    </Button>
    <Button variant="ghost" asChild>
      <Link href="/matches">Matches</Link>
    </Button>
    <Button variant="ghost" asChild>
      <Link href="/search">Search</Link>
    </Button>
  </>
);

export function Header() {
  const { user, logout, loading } = useAuth();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="w-1/3">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <nav className="w-1/3 hidden md:flex items-center justify-center gap-2">
          {user && <NavLinks />}
        </nav>

        <div className="w-1/3 flex items-center justify-end gap-2 md:gap-4">
          {!loading && user && (
            <>
              {getCreditsButton()}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {loading ? (
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
                  {user.role === 'Admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin"><Users className="mr-2 h-4 w-4" />Admin</Link>
                    </DropdownMenuItem>
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
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
