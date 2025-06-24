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

export default async function Home() {
  const featuredProfiles = await db.getFeaturedProfiles();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="romantic london night">
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

        <SugarRelationshipSection />

        <Testimonials />

        <SecuritySection />

        <ByTheNumbersSection />

      </main>

       <Footer />
    </div>
  );
}
