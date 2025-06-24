'use client';

import { useState } from 'react';
import { allProfiles } from '@/lib/mock-data';
import type { UserProfile } from '@/lib/types';
import { UserProfileCard } from '@/components/UserProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search as SearchIcon } from 'lucide-react';

const locations = [...new Set(allProfiles.map(p => p.location))];
const allInterests = [...new Set(allProfiles.flatMap(p => p.interests))];

export default function SearchPage() {
  const [profiles] = useState<UserProfile[]>(allProfiles);
  const [ageRange, setAgeRange] = useState([18, 65]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <SearchIcon className="mr-2 h-5 w-5" />
                Filter Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                 <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
                <Slider
                  defaultValue={[18, 65]}
                  min={18}
                  max={65}
                  step={1}
                  value={ageRange}
                  onValueChange={setAgeRange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" placeholder="e.g. Travel, Art" />
              </div>
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
           <h1 className="text-3xl font-headline font-bold mb-6">Discover Profiles</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => (
              <UserProfileCard key={profile.id} user={profile} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
