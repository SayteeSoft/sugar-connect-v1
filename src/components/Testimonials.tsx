'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jessica L.',
    role: 'Sugar Baby',
    avatar: 'https://placehold.co/100x100.png',
    quote: "Sugar Connect changed my life. I've met incredible people who have helped me pursue my dreams. It's more than just a dating site; it's a platform for ambition.",
  },
  {
    name: 'Robert H.',
    role: 'Sugar Daddy',
    avatar: 'https://placehold.co/100x100.png',
    quote: "As a busy executive, I value my time. This platform is efficient, discreet, and full of intelligent, driven individuals. It's a cut above the rest.",
  },
  {
    name: 'Chloe T.',
    role: 'Sugar Baby',
    avatar: 'https://placehold.co/100x100.png',
    quote: "I was skeptical at first, but the quality of connections here is unmatched. I've formed genuine relationships that have been wonderfully rewarding.",
  },
  {
    name: 'David G.',
    role: 'Sugar Daddy',
    avatar: 'https://placehold.co/100x100.png',
    quote: "A truly sophisticated experience. The profiles are verified, and the platform makes it easy to find exactly what you're looking for in a partner.",
  },
  {
    name: 'Maria S.',
    role: 'Sugar Baby',
    avatar: 'https://placehold.co/100x100.png',
    quote: "Finally, a site that understands mutual benefit and respect. The men I've met are gentlemen who appreciate my company and support my goals.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-10">
          What Our Members Say
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
              </div>
              <blockquote className="text-center">
                <p className="text-lg md:text-xl text-foreground font-body italic">
                  "{currentTestimonial.quote}"
                </p>
                <footer className="mt-6 flex items-center justify-center gap-4">
                    <Avatar>
                        <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} data-ai-hint="portrait" />
                        <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <cite className="font-semibold text-foreground not-italic">{currentTestimonial.name}</cite>
                        <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                    </div>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 -ml-5"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="bg-background/50 hover:bg-background/80 rounded-full h-10 w-10 -mr-5"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
