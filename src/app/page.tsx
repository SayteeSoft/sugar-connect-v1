import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserProfileCard } from '@/components/UserProfileCard';
import { db } from '@/lib/db';
import { Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Testimonials } from '@/components/Testimonials';
import { SecuritySection } from '@/components/SecuritySection';
import { ByTheNumbersSection } from '@/components/ByTheNumbersSection';
import { SugarRelationshipSection } from '@/components/SugarRelationshipSection';
import { HeroSection } from '@/components/HeroSection';

export default async function Home() {
  const featuredProfiles = await db.getFeaturedProfiles();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />

        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">Featured Profiles</h2>
            <p className="text-center text-muted-foreground mt-2 mb-10">Get a glimpse of our exclusive community.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProfiles.map(profile => (
                <UserProfileCard key={profile.id} user={profile} />
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        <SecuritySection />

        <ByTheNumbersSection />

        <SugarRelationshipSection />

      </main>

       <Footer />
    </div>
  );
}
