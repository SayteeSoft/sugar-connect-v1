'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Heart, Search, MessageSquare, Sparkles, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/search', label: 'Search', icon: Search },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/ai-match', label: 'AI Match', icon: Sparkles },
];

export function Header() {
  const pathname = usePathname();
  // A simple way to determine auth status for the prototype
  const isLoggedIn = ['/search', '/messages', '/ai-match', '/profile'].some(path => pathname.startsWith(path));
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
               <Button asChild variant="ghost" size="icon">
                <Link href="/profile/Amelia">
                  <UserCircle className="h-6 w-6" />
                </Link>
              </Button>
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
             {isAdmin && (
              <Button asChild variant="outline">
                <Link href="/admin">Admin</Link>
              </Button>
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
                       <Button asChild variant="ghost" className="w-full justify-start font-semibold text-base">
                        <Link href="/profile/Amelia">
                          <UserCircle className="mr-2 h-5 w-5 text-primary" />
                          My Profile
                        </Link>
                      </Button>
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
                  {isAdmin && (
                    <Button asChild variant="outline" className="w-full justify-start font-semibold text-base">
                      <Link href="/admin">
                        Admin
                      </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
