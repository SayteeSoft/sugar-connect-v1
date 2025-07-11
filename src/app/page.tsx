import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Heart, Lock, ShieldCheck, Headset, Users, CalendarClock, UserCheck, Star, ArrowRight } from "lucide-react";
import { featuredProfiles, testimonials } from "@/lib/mock-data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-32 md:py-48 bg-hero text-white" data-ai-hint="stylish couple city">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-lg">
            <span style={{ color: '#800080' }}>SD</span> Connect
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            <span style={{ color: '#800080' }}>SD</span> Connect is &apos;Sugar Daddy&apos; Connect
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              <Link href="/signup?role=Sugar+Baby">I&apos;m a Sugar Baby</Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              <Link href="/signup?role=Sugar+Daddy">I&apos;m a Sugar Daddy</Link>
            </Button>
          </div>
          <Button asChild size="lg" className="mt-4 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/signup">
              <Heart className="mr-2 h-5 w-5" /> Find Your Match
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">Featured Profiles</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProfiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden group">
                <div className="relative">
                  <Image src={profile.avatarUrl} alt={profile.name} width={400} height={400} className="object-cover w-full h-64" data-ai-hint={`${profile.name === 'Darianna' ? 'art student' : profile.name === 'Kateryna' ? 'marketing graduate' : profile.name === 'Mark' ? 'outdoors investor' : 'fashion designer' }`}/>
                  <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{profile.name}, {profile.age}</h3>
                      <p className="text-sm">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Members Say */}
      <section className="py-12 md:py-20 section-bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">What Our Members Say</h2>
          <Carousel className="mt-8 max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full">
                      <CardContent className="pt-6">
                        <p className="italic">&quot;{testimonial.quote}&quot;</p>
                      </CardContent>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={`https://placehold.co/40x40.png`} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      
      {/* What is a Sugar Relationship? */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold font-headline">What is a Sugar Relationship?</h2>
            <p className="mt-4 text-muted-foreground">
                Sugar dating, in its modern form, has elevated the world of traditional dating relationships, making it more satisfying for both partners. Like-minded people can find each other and explore relationships on their own terms, free from the judgement they may feel from their friends, family, or wider society.
            </p>
        </div>
      </section>

      {/* What is a... */}
      <section className="py-12 md:py-20 section-bg-accent">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Tabs defaultValue="sugar-daddy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sugar-daddy">Sugar Daddy</TabsTrigger>
                    <TabsTrigger value="sugar-baby">Sugar Baby</TabsTrigger>
                </TabsList>
                <TabsContent value="sugar-daddy" className="pt-4">
                    <p>A Sugar Daddy is a successful and generous individual who is willing to provide financial support and mentorship to a partner in exchange for companionship and a mutually beneficial relationship.</p>
                </TabsContent>
                <TabsContent value="sugar-baby" className="pt-4">
                    <p>A Sugar Baby is an ambitious and attractive person who seeks a mature partner to provide them with a certain lifestyle and support their goals, in return for their company and affection.</p>
                </TabsContent>
            </Tabs>
        </div>
      </section>

      {/* High Level Security */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">High Level Security & Privacy</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <UserCheck className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Verified Members</h3>
              <p className="mt-2 text-muted-foreground">Video verification allows you to know that potential dates look like their photos.</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Secure Accounts</h3>
              <p className="mt-2 text-muted-foreground">Industry-leading account protection helps keep your profile and information safe.</p>
            </div>
            <div className="flex flex-col items-center">
              <Headset className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">24/7 Support</h3>
              <p className="mt-2 text-muted-foreground">We have a dedicated team of customer service agents to support you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-12 md:py-20 section-bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">By The Numbers</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Average Sugar Baby</h3>
              <p className="mt-2 text-2xl font-semibold">Age: 23</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">6x More Sugar Babies</h3>
              <p className="mt-2 text-2xl font-semibold">than Sugar Daddies</p>
            </div>
            <div className="flex flex-col items-center">
              <CalendarClock className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Average Time to Find a Match</h3>
              <p className="mt-2 text-2xl font-semibold">4 Days</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
