import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserProfile } from '@/lib/types';
import { CheckCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileCardProps {
  user: UserProfile;
  isLoggedIn?: boolean;
}

const femaleNames = ['Amelia', 'Isabella', 'Sophia', 'Charlotte'];

export function UserProfileCard({ user, isLoggedIn = false }: UserProfileCardProps) {
  const isFemale = femaleNames.includes(user.name);
  const aiHint = isFemale ? 'woman portrait' : 'man portrait';

  const imageClasses = cn(
    "aspect-square w-full object-cover transition-all duration-300 group-hover:scale-105",
    !isLoggedIn && "filter saturate-50 opacity-80 group-hover:saturate-100 group-hover:opacity-100"
  );

  return (
    <Link href={`/profile/${user.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={user.profileImage}
              alt={user.name}
              width={400}
              height={400}
              className={imageClasses}
              data-ai-hint={aiHint}
            />
            {user.isVerified && (
              <Badge variant="default" className="absolute top-2 right-2 bg-primary/80 border-none text-primary-foreground">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
               <h3 className="text-xl font-bold font-headline">{user.name}, {user.age}</h3>
                <div className="flex items-center text-sm opacity-90 mt-1">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>{user.location}</span>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
