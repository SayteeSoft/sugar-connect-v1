'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const testimonialsPerPage = 3;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = testimonials.length - testimonialsPerPage;
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const displayedTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            What Our Members Say
          </h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= testimonials.length - testimonialsPerPage}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                </div>
                <blockquote className="flex flex-col flex-grow">
                  <p className="text-base text-foreground font-body italic flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        data-ai-hint="portrait"
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <cite className="font-semibold text-foreground not-italic">
                        {testimonial.name}
                      </cite>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
