
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Heart,
  Search,
  MessageSquare,
  Sparkles,
  UserCircle,
  Shield,
  Gem,
  Settings,
  HelpCircle,
  LogOut,
  Infinity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { db } from '@/lib/db';
import type { UserProfile } from '@/lib/types';
import { Badge } from './ui/badge';

const navLinks = [
  { href: '/profile/1', label: 'Profile', icon: UserCircle },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/ai-match', label: 'AI Match', icon: Sparkles },
];

// In a real app, you would get this from your authentication system.
// For the prototype, we can easily toggle between admin ('1') and a regular user ('2').
const MOCK_CURRENT_USER_ID = '1';

export function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let profile = await db.getProfileById(MOCK_CURRENT_USER_ID);
      if (profile) {
        let mergedProfile = { ...profile };
        
        const storedText = localStorage.getItem(`user-profile-${profile.id}`);
        if (storedText) {
          try {
            mergedProfile = { ...mergedProfile, ...JSON.parse(storedText) };
          } catch(e) {
            console.error("Failed to parse profile from localStorage", e);
          }
        }
        
        const storedImages = sessionStorage.getItem(`ss_profile_overrides_${profile.id}`);
        if (storedImages) {
            try {
                mergedProfile = { ...mergedProfile, ...JSON.parse(storedImages) };
            } catch(e) {
                console.error("Failed to parse images from sessionStorage", e);
            }
        }
        setUser(mergedProfile);
      }
    };
    if (typeof window !== 'undefined') {
      fetchUser();
    }
  }, [pathname]); // Refetch when path changes to get latest localstorage data
  
  const isLoggedIn = user;
  const isAdmin = user?.id === '1';

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button
        key={link.href}
        asChild
        variant={pathname === link.href ? 'default' : 'ghost'}
        className={cn(
          'justify-start text-base',
          isMobile && 'w-full',
          pathname === link.href ? 'font-bold' : 'font-semibold text-muted-foreground'
        )}
      >
        <Link href={link.href}>
          <link.icon className="mr-2 h-5 w-5" />
          {link.label}
        </Link>
      </Button>
    ));

  const renderAccountMenuItems = (isMobile = false) => {
      const commonButtonClasses = 'w-full justify-start font-semibold text-base';
      const commonIconClasses = 'mr-2 h-5 w-5 text-primary';

      const menuItems = (
        <>
            {user?.role === 'Sugar Daddy' && (
                <Button asChild variant="ghost" className={cn(commonButtonClasses)}>
                    <Link href="/payment">
                        <Gem className={cn(commonIconClasses)} />
                        Buy Credits
                        <Badge className="ml-auto">{user.credits}</Badge>
                    </Link>
                </Button>
            )}
            {user?.role === 'Sugar Baby' && (
                <Button variant="ghost" className={cn(commonButtonClasses)} disabled>
                    <Gem className={cn(commonIconClasses)} />
                    Credits
                    <Badge variant="secondary" className="ml-auto">
                        <Infinity className="h-4 w-4" />
                    </Badge>
                </Button>
            )}
             <Button variant="ghost" className={cn(commonButtonClasses)}>
                <Settings className={cn(commonIconClasses)} />
                Settings
            </Button>
             <Button variant="ghost" className={cn(commonButtonClasses)}>
                <HelpCircle className={cn(commonIconClasses)} />
                Help
            </Button>
            <Separator className="my-2" />
             <Button asChild variant="ghost" className={cn(commonButtonClasses)}>
                <Link href="/">
                    <LogOut className={cn(commonIconClasses)} />
                    Logout
                </Link>
            </Button>
        </>
      )

      const dropdownItems = (
        <>
            {user?.role === 'Sugar Daddy' && (
              <DropdownMenuItem asChild>
                  <Link href="/payment">
                      <Gem className="mr-2 h-4 w-4" />
                      <span className="flex-grow">Buy Credits</span>
                      <Badge>{user.credits}</Badge>
                  </Link>
              </DropdownMenuItem>
            )}
            {user?.role === 'Sugar Baby' && (
              <DropdownMenuItem disabled>
                  <Gem className="mr-2 h-4 w-4" />
                  <span className="flex-grow">Credits</span>
                  <Badge variant="secondary">
                    <Infinity className="h-4 w-4" />
                  </Badge>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </Link>
            </DropdownMenuItem>
        </>
      )

      if (isMobile) {
          return menuItems;
      }
      
      const avatarSrc = user?.profileImage || "https://placehold.co/100x100.png";
      const avatarAlt = user?.name || "My Account";
      const avatarFallback = user?.name?.charAt(0) || 'A';

      return (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarSrc} alt={avatarAlt} data-ai-hint="placeholder" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href="/profile/1">
                          <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage src={avatarSrc} alt={user?.name || "Profile"} data-ai-hint="placeholder" />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                          </Avatar>
                          <span>Profile</span>
                      </Link>
                  </DropdownMenuItem>
                  {dropdownItems}
              </DropdownMenuContent>
          </DropdownMenu>
      )
  }

  const avatarSrc = user?.profileImage || "https://placehold.co/100x100.png";
  const avatarAlt = user?.name || "My Profile";
  const avatarFallback = user?.name?.charAt(0) || 'A';

  const creditDisplay = user ? (
    user.role === 'Sugar Daddy' ? (
      <Button asChild variant="ghost" size="icon">
        <Link href="/payment" className="relative">
          <Gem className="h-6 w-6" />
          <Badge className="absolute -top-1 -right-2 h-5 w-5 justify-center rounded-full p-0">
            {user.credits}
          </Badge>
          <span className="sr-only">{user.credits} credits remaining</span>
        </Link>
      </Button>
    ) : (
      <Button variant="ghost" size="icon" className="relative">
        <Gem className="h-6 w-6" />
        <Badge
          variant="secondary"
          className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
        >
          <Infinity className="h-4 w-4" />
        </Badge>
        <span className="sr-only">Unlimited credits</span>
      </Button>
    )
  ) : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-primary dark:text-foreground" />
          <span className="text-xl font-headline font-bold text-primary dark:text-foreground">
            Sugar Connect
          </span>
        </Link>

        {isLoggedIn && (
          <nav className="hidden items-center gap-4 md:flex">
            {renderNavLinks()}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {isLoggedIn ? (
              <>
                {user?.role === 'Sugar Daddy' && (
                  <Button asChild>
                    <Link href="/payment">
                      <Gem className="mr-2 h-4 w-4" /> Buy Credits
                    </Link>
                  </Button>
                )}
                <ThemeSwitcher />
                {creditDisplay}
                {renderAccountMenuItems(false)}
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href="/signup">Join Free</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <ThemeSwitcher />
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && (
              <>
                <ThemeSwitcher />
                {creditDisplay}
              </>
            )}
            {isLoggedIn ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                   <div className="flex flex-col gap-4 py-6">
                        {renderNavLinks(true)}
                         <Separator className="my-2" />
                         <Button asChild variant="ghost" className="w-full justify-start font-semibold text-base">
                            <Link href="/profile/1">
                              <Avatar className="mr-2 h-6 w-6">
                                <AvatarImage src={avatarSrc} alt={avatarAlt} data-ai-hint="placeholder" />
                                <AvatarFallback>{avatarFallback}</AvatarFallback>
                              </Avatar>
                              My Profile
                            </Link>
                         </Button>
                        {isAdmin && (
                          <Button asChild variant="ghost" className="w-full justify-start font-semibold text-base">
                            <Link href="/admin">
                              <Shield className="mr-2 h-5 w-5 text-primary" /> Admin
                            </Link>
                          </Button>
                        )}
                        {renderAccountMenuItems(true)}
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                   <div className="flex flex-col gap-4 py-6">
                        <Button asChild className="w-full justify-start font-semibold text-base">
                          <Link href="/signup">Join Free</Link>
                        </Button>
                        <Button asChild variant="ghost" className="w-full justify-start font-semibold text-base">
                          <Link href="/login">Login</Link>
                        </Button>
                        <ThemeSwitcher />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
