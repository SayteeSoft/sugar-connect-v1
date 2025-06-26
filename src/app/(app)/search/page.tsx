
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import type { UserProfile } from '@/lib/types';
import { UserProfileCard } from '@/components/UserProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SearchPage() {
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [allInterests, setAllInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [profilesData, locationsData, interestsData] = await Promise.all([
        db.getProfiles(),
        db.getLocations(),
        db.getAllInterests(),
      ]);

      const updatedProfiles = profilesData.map(p => {
        const stored = localStorage.getItem(`user-profile-${p.id}`);
        try {
          return stored ? { ...p, ...JSON.parse(stored) } : p;
        } catch (e) {
          console.error("Failed to parse profile from localStorage", e);
          return p;
        }
      });
      
      setAllProfiles(updatedProfiles);
      setFilteredProfiles(updatedProfiles);
      setLocations(locationsData);
      setAllInterests(interestsData.sort());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleApplyFilters = () => {
    let results = [...allProfiles];

    // Age filter
    results = results.filter(p => p.age >= ageRange[0] && p.age <= ageRange[1]);

    // Location filter
    if (selectedLocation && selectedLocation !== 'all') {
        results = results.filter(p => p.location.toLowerCase() === selectedLocation);
    }

    // Interests filter
    if (selectedInterests.length > 0) {
        results = results.filter(p => 
            selectedInterests.every(interest => (p.interests || []).includes(interest))
        );
    }
    
    setFilteredProfiles(results);
  };

  return (
    <div className="container mx-auto py-8">
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
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
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
                <Label>Interests</Label>
                <ScrollArea className="h-40 rounded-md border p-4">
                  <div className="space-y-2">
                    {allInterests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => handleInterestChange(interest)}
                        />
                        <Label
                          htmlFor={`interest-${interest}`}
                          className="font-normal cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
           <h1 className="text-3xl font-headline font-bold mb-6">Discover Profiles</h1>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                 <Card key={index} className="overflow-hidden">
                    <div className="animate-pulse">
                      <div className="aspect-square w-full bg-muted" />
                      <div className="p-4 bg-gradient-to-t from-black/10 to-transparent">
                          <div className="h-6 w-1/2 rounded-md bg-muted" />
                          <div className="mt-2 h-4 w-1/3 rounded-md bg-muted" />
                      </div>
                    </div>
                  </Card>
              ))}
            </div>
          ) : (
            filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProfiles.map((profile) => (
                    <UserProfileCard key={profile.id} user={profile} isLoggedIn={true} />
                  ))}
                </div>
              ) : (
                <Card className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-lg font-semibold">No profiles match your criteria.</p>
                        <p className="text-muted-foreground mt-1">Try adjusting your filters.</p>
                    </div>
                </Card>
              )
          )}
        </main>
      </div>
    </div>
  );
}
