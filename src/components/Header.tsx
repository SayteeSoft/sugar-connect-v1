'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
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

const navLinks = [
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/profile/1', label: 'Profile', icon: UserCircle },
  { href: '/ai-match', label: 'AI Match', icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();
  // A simple way to determine auth status for the prototype
  const isLoggedIn = ['/search', '/messages', '/ai-match', '/profile', '/admin'].some(path => pathname.startsWith(path));
  // Simple flag to identify the admin user for the prototype
  const isAdmin = true;

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Button
        key={link.href}
        asChild
        variant="ghost"
        className={cn(
          'justify-start font-semibold text-base transition-colors duration-200',
          pathname === link.href
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary',
          isMobile && 'w-full'
        )}
      >
        <Link href={link.href}>
          <link.icon className="mr-2 h-5 w-5 text-primary" />
          {link.label}
        </Link>
      </Button>
    ));

  const renderAccountMenuItems = (isMobile = false) => {
      const commonButtonClasses = 'w-full justify-start font-semibold text-base';
      const commonIconClasses = 'mr-2 h-5 w-5 text-primary';

      if (isMobile) {
          return (
              <>
                  <Separator className="my-2" />
                  <Button asChild variant="ghost" className={cn(commonButtonClasses)}>
                      <Link href="/profile/1">
                          <UserCircle className={cn(commonIconClasses)} />
                          My Profile
                      </Link>
                  </Button>
                  {isAdmin ? (
                      <Button asChild variant="ghost" className={cn(commonButtonClasses)}>
                          <Link href="/admin">
                              <Shield className={cn(commonIconClasses)} />
                              Admin Dashboard
                          </Link>
                      </Button>
                  ) : (
                      <Button variant="ghost" className={cn(commonButtonClasses)}>
                          <CreditCard className={cn(commonIconClasses)} />
                          Buy Credits
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
      }

      return (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <UserCircle className="h-6 w-6" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                      <Link href="/profile/1">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                      </Link>
                  </DropdownMenuItem>
                  {isAdmin ? (
                      <DropdownMenuItem asChild>
                          <Link href="/admin">
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Admin Dashboard</span>
                          </Link>
                      </DropdownMenuItem>
                  ) : (
                      <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Buy Credits</span>
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
              </DropdownMenuContent>
          </DropdownMenu>
      )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-primary" />
          <span className="text-xl font-headline font-bold text-primary">
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
              renderAccountMenuItems(false)
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <div className="flex flex-col gap-4 py-6">
                  {isLoggedIn ? (
                    <>
                      {renderNavLinks(true)}
                      {renderAccountMenuItems(true)}
                    </>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="w-full justify-start font-semibold text-base">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full justify-start font-semibold text-base">
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
