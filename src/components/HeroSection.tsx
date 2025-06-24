'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://web-developer.one/imgs/sugar-daddy-002.jpg')",
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
        data-ai-hint="romantic london night"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold !text-white drop-shadow-lg">Sugar Connect</h1>
        <p className="mt-4 text-lg md:text-2xl font-body max-w-2xl mx-auto !text-gray-200">An exclusive platform for ambitious and attractive individuals.</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white/90 hover:bg-white text-primary font-bold text-lg px-8 py-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
              <Link href="/signup">I'm a Sugar Baby</Link>
            </Button>
            <Button asChild size="lg" className="bg-white/90 hover:bg-white text-primary font-bold text-lg px-8 py-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
              <Link href="/signup">I'm a Sugar Daddy</Link>
            </Button>
          </div>
          <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full transition-transform duration-300 ease-in-out hover:scale-105">
            <Link href="/signup">
              <Heart className="mr-2 h-5 w-5" />
              Find Your Match
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
