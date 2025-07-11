
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only run on the client
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 fade-in-50">
      <Card className="container mx-auto max-w-4xl p-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Cookie className="h-8 w-8 text-primary shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <p className="font-semibold">We use cookies</p>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. Learn more in our{' '}
                <Link href="/policies/cookies" className="underline hover:text-primary">
                  Cookie Policy
                </Link>.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button onClick={handleAccept}>Accept</Button>
              <Button variant="outline" onClick={handleDecline}>Decline</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
