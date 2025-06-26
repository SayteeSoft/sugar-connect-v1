'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // We run this effect only on the client.
    // By removing the localStorage check, this will now appear on every page load.
    // Delay showing banner slightly to avoid flickering on page load
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setVisible(false);
    // By removing the localStorage.setItem, the consent is not saved,
    // so the banner will reappear on the next page load.
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
