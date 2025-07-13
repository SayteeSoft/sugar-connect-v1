
"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Heart, Lock, ShieldCheck, Headset, Users, CakeSlice, HeartHandshake, Star } from "lucide-react";
import { featuredProfiles, testimonials } from "@/lib/mock-data";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function Home() {
  const { user } = useAuth();

  const displayedProfiles = useMemo(() => {
    if (user?.role === 'Sugar Daddy') {
      return featuredProfiles.filter(p => p.role === 'Sugar Baby');
    }
    if (user?.role === 'Sugar Baby') {
      return featuredProfiles.filter(p => p.role === 'Sugar Daddy');
    }
    // For guests or admins, show the default list
    return featuredProfiles;
  }, [user]);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{backgroundImage: "url('/sd-connect-hero-background.jpg')"}}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative mx-auto px-4 pb-16 text-center text-white">
          <h1 className="text-6xl md:text-8xl drop-shadow-lg font-headline font-extrabold">
            Sugar Connect
          </h1>
          <h2 className="mt-4 text-3xl md:text-4xl font-headline drop-shadow-md">
            For Sugar Daddy and Sugar Baby
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            An exclusive platform for ambitious and attractive individuals
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary dark:text-[#800080] hover:bg-gray-100 font-bold">
              <Link href="/signup?role=Sugar+Baby">I'm a Sugar Baby</Link>
            </Button>
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary dark:text-[#800080] hover:bg-gray-100 font-bold">
              <Link href="/signup?role=Sugar+Daddy">I'm a Sugar Daddy</Link>
            </Button>
          </div>
           <Button asChild size="lg" className="mt-4 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Link href="/signup">
              <Heart className="mr-2 h-5 w-5" /> Find Your Match
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline text-primary">Featured Profiles</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {displayedProfiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden group">
                <Link href={user ? `/profile/${profile.id}` : `/login`}>
                  <div className="relative">
                    <Image 
                        src={profile.avatarUrl} 
                        alt={profile.name} 
                        width={250} 
                        height={250} 
                        className={cn(
                            "object-cover w-full h-[250px] transition-all",
                            !user && "blur-md group-hover:blur-sm"
                        )}
                        data-ai-hint={`${profile.name === 'Darianna' ? 'art student' : profile.name === 'Kateryna' ? 'marketing graduate' : profile.name === 'Mark' ? 'outdoors investor' : 'fashion designer' }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{profile.name}, {profile.age}</h3>
                           {profile.name === 'Darianna' && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                           <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <p className="text-sm">{profile.location}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Members Say */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline text-primary">What Our Members Say</h2>
          <Carousel className="mt-8 max-w-6xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full p-6">
                      <div>
                        <div className="flex gap-0.5 text-primary mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                        </div>
                        <p className="italic text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                      </div>
                      <div className="flex items-center gap-4 mt-6">
                        <Avatar>
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
      
      {/* What is a Sugar Relationship? */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">What is a Sugar Relationship?</h2>
            <p className="mt-4 text-muted-foreground">
                Sugar dating, in its modern form, has elevated the world of traditional dating relationships, making it more satisfying for both partners. Like-minded people can find each other and explore relationships on their own terms, free from the judgement they may feel from their friends, family, or wider society.
            </p>
        </div>
      </section>

      {/* What is a... */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-headline mb-8 text-primary">What is a...</h2>
            <Tabs defaultValue="sugar-daddy" className="w-full">
                <TabsList className="bg-transparent p-0 justify-center gap-8">
                    <TabsTrigger value="sugar-daddy" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Sugar Daddy</TabsTrigger>
                    <TabsTrigger value="sugar-baby" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">Sugar Baby</TabsTrigger>
                </TabsList>
                <Card className="mt-6 text-left">
                  <CardContent className="p-6">
                    <TabsContent value="sugar-daddy" className="m-0">
                        <p className="text-muted-foreground">A Sugar Daddy is a successful and generous individual who is willing to provide financial support and mentorship to a partner in exchange for companionship and a mutually beneficial relationship.</p>
                    </TabsContent>
                    <TabsContent value="sugar-baby" className="m-0">
                        <p className="text-muted-foreground">A Sugar Baby is an ambitious and attractive person who seeks a mature partner to provide them with a certain lifestyle and support their goals, in return for their company and affection.</p>
                    </TabsContent>
                  </CardContent>
                </Card>
            </Tabs>
        </div>
      </section>

      {/* High Level Security */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline text-primary">High Level Security & Privacy</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-accent mb-4">
                    <ShieldCheck className="h-8 w-8 text-icon-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Verified Members</h3>
                  <p className="mt-2 text-muted-foreground">Video verification allows you to know that potential dates look like their photos.</p>
              </CardContent>
            </Card>
            <Card>
               <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-accent mb-4">
                    <Lock className="h-8 w-8 text-icon-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Secure Accounts</h3>
                  <p className="mt-2 text-muted-foreground">Industry-leading account protection helps keep your profile and information safe.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center flex flex-col items-center">
                  <div className="p-4 rounded-full bg-accent mb-4">
                    <Headset className="h-8 w-8 text-icon-primary" />
                  </div>
                  <h3 className="text-xl font-bold">24/7 Support</h3>
                  <p className="mt-2 text-muted-foreground">We have a dedicated team of customer service agents to support you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline text-primary">By The Numbers</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-4 bg-accent rounded-full mb-4">
                  <CakeSlice className="h-8 w-8 text-icon-primary" />
                </div>
                <h3 className="text-xl font-bold">Average Sugar Baby</h3>
                <p className="mt-1 text-muted-foreground">Age: 23</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-4 bg-accent rounded-full mb-4">
                  <Users className="h-8 w-8 text-icon-primary" />
                </div>
                <h3 className="text-xl font-bold">6x More Sugar Babies</h3>
                <p className="mt-1 text-muted-foreground">than Sugar Daddies</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-4 bg-accent rounded-full mb-4">
                  <HeartHandshake className="h-8 w-8 text-icon-primary" />
                </div>
                <h3 className="text-xl font-bold">Average Time to Find a Match</h3>
                <p className="mt-1 text-muted-foreground">4 Days</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}

    

    




    

    

    




    

    
