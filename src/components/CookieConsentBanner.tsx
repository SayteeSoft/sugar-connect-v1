'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // We run this effect only on the client
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay showing banner slightly to avoid flickering on page load
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setVisible(false);
    localStorage.setItem('cookie_consent', 'true');
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 inset-x-0 z-[100] bg-card/95 backdrop-blur-sm border-t p-4 transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-card-foreground text-center md:text-left">
          We use cookies to ensure you get the best experience on our website.
        </p>
        <Button onClick={handleAccept} className="flex-shrink-0">Accept and Close</Button>
      </div>
    </div>
  );
}
