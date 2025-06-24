import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Gift, MessageSquare } from 'lucide-react';
import { ProfileActions } from './ProfileActions';

const femaleNames = ['Isabella', 'Sophia', 'Charlotte'];

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await db.getProfileById(params.id);

  if (!user) {
    notFound();
  }

  // The admin user (ID 1) was formerly female, so we keep the hint consistent
  const isFemale = femaleNames.includes(user.name) || user.id === '1';
  const aiHint = isFemale ? 'woman portrait' : 'man portrait';

  return (
    <div className="bg-background">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                 <Image
                    src={user.profileImage}
                    alt={user.name}
                    width={400}
                    height={400}
                    className="aspect-square w-full rounded-t-lg object-cover"
                    data-ai-hint={aiHint}
                />
                 <div className="p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h1 className="text-3xl font-bold font-headline">{user.name}, {user.age}</h1>
                      {user.isVerified && (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{user.location}</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                        <Button size="lg" className="w-full"><MessageSquare className="w-4 h-4 mr-2" /> Message</Button>
                        <Button size="lg" variant="secondary" className="w-full"><Gift className="w-4 h-4 mr-2" /> Send a Gift</Button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>About {user.name}</CardTitle>
                <ProfileActions userName={user.name} />
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{user.bio}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="text-base px-3 py-1">{interest}</Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {user.gallery.map((img, index) => (
                    <Image key={index} src={img} alt={`${user.name}'s gallery image ${index + 1}`} width={600} height={400} className="rounded-lg object-cover aspect-video" data-ai-hint="lifestyle photo" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
