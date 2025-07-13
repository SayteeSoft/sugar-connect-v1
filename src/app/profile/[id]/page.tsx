
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Edit, MessageSquare, Heart, CheckCircle, Mail, MapPin, Star, Mars, Venus, Flag, Ban } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { User, Profile } from "@/types";
import { useEffect, useState } from "react";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ViewField = ({ label, value }: { label: string, value?: string | number | null }) => {
    return (
        <div className="flex justify-between items-center text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value ? String(value) : <span className="text-muted-foreground/70">Not specified</span>}</p>
        </div>
    )
}

export default function OtherUserProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const { user: currentUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setProfile] = useState<Profile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Voting state
  const [metCount, setMetCount] = useState(0);
  const [notMetCount, setNotMetCount] = useState(0);
  const [userVote, setUserVote] = useState<'met' | 'notMet' | null>(null);
  const [canVote, setCanVote] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return;
      setDataLoading(true);
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const foundUser = data.users.find((u: User) => u.id === id);
        const foundProfile = data.profiles.find((p: Profile) => p.userId === id);

        if (foundUser && foundProfile) {
            setUser(foundUser);
            setProfile(foundProfile);
            setMetCount(foundProfile.metCount || 0);
            setNotMetCount(foundProfile.notMetCount || 0);

            if (currentUser) {
              // Check if current user has already voted
              const existingVote = foundProfile.votes?.[currentUser.id];
              if (existingVote) {
                  setUserVote(existingVote);
              }
              // User can vote if they are logged in and NOT viewing their own profile
              setCanVote(currentUser.id !== foundUser.id);
            }

        } else {
            setUser(null);
            setProfile(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [id, currentUser]);
  
  // If the current user is viewing their own profile, redirect to the editable /profile page
  useEffect(() => {
    if (!loading && currentUser && currentUser.id === id) {
      router.push('/profile');
    }
  }, [currentUser, id, loading, router]);

  const handleVote = (voteType: 'met' | 'notMet') => {
    if (!canVote || userVote) return; // Can't vote if not allowed or already voted

    if (voteType === 'met') {
      setMetCount(prev => prev + 1);
    } else {
      setNotMetCount(prev => prev + 1);
    }
    setUserVote(voteType);
    
    // In a real app, you would send this vote to the backend API
    toast({
        title: "Vote Recorded",
        description: "Thank you for your feedback!",
    });
  };

  const handleFavorite = () => {
      setIsFavorite(!isFavorite);
      toast({
          title: !isFavorite ? "Added to Favorites" : "Removed from Favorites",
          description: `${user?.name} has been ${!isFavorite ? 'added to' : 'removed from'} your favorites.`,
      });
  };

  const handleMessage = () => {
      // In a real app, this might open a specific chat window.
      // For now, we'll navigate to the main messages page.
      router.push('/messages');
  };

  const handleReport = () => {
      toast({
          title: "Profile Reported",
          description: `Thank you for reporting ${user?.name}. Our team will review this profile.`,
      });
  };

  const handleBlock = () => {
      toast({
          title: "User Blocked",
          description: `You have successfully blocked ${user?.name}. You will no longer see their profile.`,
      });
      // In a real app, you would also redirect the user away from this profile.
      router.push('/search');
  };

  if (loading || dataLoading) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardContent className="p-4">
                            <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                 </div>
                 <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-48 w-full" />
                 </div>
            </div>
        </div>
    );
  }

  // Render nothing if we are about to redirect, to prevent a flash of content.
  if (currentUser && currentUser.id === id) {
    return null; 
  }

  if (!user || !userProfile) {
    notFound();
    return null;
  }
  
  const isEmailVisible = userVote === 'met';
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6 sticky top-24">
            <Card>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={400}
                    height={400}
                    className="rounded-lg w-full aspect-square object-cover"
                    data-ai-hint="profile photo"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-primary/80 text-primary-foreground backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4 mr-1"/>
                      Verified
                  </Badge>
                  {user.role !== 'Admin' && (
                     <Badge variant={user.role === 'Sugar Daddy' ? 'default' : 'secondary'} className="absolute bottom-3 left-3">
                        {user.role}
                    </Badge>
                  )}
                </div>
                <div className="space-y-4 text-left">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            {user.name}
                            {user.role === 'Admin' && <Star className="h-5 w-5 text-yellow-400 fill-current" />}
                        </h1>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1 text-left">
                        <div className="flex items-center gap-2">
                           <MapPin className="h-4 w-4" />
                           <span>{user.location}</span>
                        </div>
                        {user.sex && (
                          <div className="flex items-center gap-2">
                            {user.sex === 'Male' ? <Mars className="h-4 w-4" /> : <Venus className="h-4 w-4" />}
                            <span>{user.sex}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                           <Mail className="h-4 w-4" />
                           <span className={cn(!isEmailVisible && "blur-sm")}>{user.email}</span>
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
             <div className="flex gap-2">
                <Button className="w-full" onClick={handleMessage}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                </Button>
                 <Button variant="outline" className="w-full" onClick={handleFavorite}>
                    <Heart className={cn("mr-2 h-4 w-4", isFavorite && "fill-destructive text-destructive")} />
                    {isFavorite ? 'Favorited' : 'Favorite'}
                </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>About {user.name}</CardTitle>
                <TooltipProvider>
                  <div className="flex items-center gap-1">
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-primary" onClick={handleFavorite}>
                                  <Heart className={cn("h-5 w-5", isFavorite && "fill-destructive text-destructive")} />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Add to Favorites</p></TooltipContent>
                      </Tooltip>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-primary" onClick={handleMessage}>
                                  <MessageSquare className="h-5 w-5"/>
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Send Message</p></TooltipContent>
                      </Tooltip>
                      <AlertDialog>
                          <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-primary">
                                      <Flag className="h-5 w-5"/>
                                  </Button>
                                </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent><p>Report Profile</p></TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Report {user.name}?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      Reporting this user will submit their profile for review by our team. Are you sure you want to proceed?
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleReport}>Report Profile</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:bg-accent hover:text-destructive">
                                          <Ban className="h-5 w-5"/>
                                      </Button>
                                  </AlertDialogTrigger>
                              </TooltipTrigger>
                              <TooltipContent><p>Block User</p></TooltipContent>
                          </Tooltip>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Block {user.name}?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      This will prevent them from seeing your profile and messaging you. This action can be undone in your settings. Are you sure?
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleBlock}>Block User</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                  </div>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{userProfile.about || 'No information provided.'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wants &amp; Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Wants</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
                      {userProfile.wants.length > 0 ? userProfile.wants.map((want, index) => (
                          <Badge key={index} variant="secondary">{want}</Badge>
                      )) : <p className="text-sm text-muted-foreground">No wants specified.</p>}
                  </div>
                </div>
                 <div>
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="flex flex-wrap gap-2 items-center p-2 min-h-10">
                      {userProfile.interests.length > 0 ? userProfile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">{interest}</Badge>
                      )) : <p className="text-sm text-muted-foreground">No interests specified.</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.gallery && userProfile.gallery.length > 0 ? (
                  <GalleryLightbox 
                    images={userProfile.gallery}
                    renderThumbnails={({ openLightbox }) => (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userProfile.gallery.map((src, index) => (
                          <div key={index} className="relative group cursor-pointer" onClick={() => openLightbox(index)}>
                            <Image 
                              src={src} 
                              alt={`Gallery image ${index + 1}`} 
                              width={200} 
                              height={200} 
                              className="rounded-md w-full aspect-square object-cover"
                              data-ai-hint="gallery photo"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">This user hasn't added any photos to their gallery yet.</p>
                )}
              </CardContent>
            </Card>

            {canVote && (
            <Card>
              <CardHeader>
                  <CardTitle>Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">Have you met {user.name} in person?</p>
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={userVote === 'met' ? 'default' : 'outline'}
                      className="relative h-12 text-base"
                      onClick={() => handleVote('met')}
                      disabled={!!userVote}
                    >
                        We Met
                        <Badge variant={userVote === 'met' ? 'secondary' : 'default'} className="absolute -top-2 -right-2 h-6 w-6 justify-center">
                            {metCount}
                        </Badge>
                    </Button>
                    <Button 
                       variant={userVote === 'notMet' ? 'destructive' : 'outline'}
                       className="relative h-12 text-base"
                       onClick={() => handleVote('notMet')}
                       disabled={!!userVote}
                    >
                       Didn't Meet
                       <Badge variant={userVote === 'notMet' ? 'secondary' : 'default'} className="absolute -top-2 -right-2 h-6 w-6 justify-center">
                           {notMetCount}
                       </Badge>
                    </Button>
                </div>
                {userVote && <p className="text-xs text-muted-foreground text-left mt-4">Thank you. Your vote has been recorded.</p>}
              </CardContent>
            </Card>
            )}

            <Card>
              <CardHeader>
                  <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ViewField label="Age" value={user.age} />
                <ViewField label="Height" value={userProfile.attributes.height} />
                <ViewField label="Body Type" value={userProfile.attributes.bodyType} />
                <ViewField label="Ethnicity" value={userProfile.attributes.ethnicity} />
                <ViewField label="Hair Color" value={userProfile.attributes.hairColor} />
                <ViewField label="Eye Color" value={userProfile.attributes.eyeColor} />
                <ViewField label="Smoker" value={userProfile.attributes.smoker} />
                <ViewField label="Drinker" value={userProfile.attributes.drinker} />
                <ViewField label="Piercings" value={userProfile.attributes.piercings} />
                <ViewField label="Tattoos" value={userProfile.attributes.tattoos} />
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
