
"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLayout } from '@/hooks/use-layout';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { setLayoutState } = useLayout();

  useEffect(() => {
    const consent = sessionStorage.getItem('cookie_consent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };
  
  const openCookiePolicy = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLayoutState(prevState => ({ ...prevState, showCookiePolicy: true }));
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 fade-in-50">
       <Card className="w-full max-w-6xl mx-auto">
         <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies. You can learn more by reading our Cookie Policy.{" "}
              <button onClick={openCookiePolicy} className="underline hover:text-primary">
                Click here for more.
              </button>
            </p>
            <Button onClick={handleAccept} className="shrink-0">
              Accept
            </Button>
         </div>
       </Card>
    </div>
  );
}
