'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Heart } from "lucide-react";
import { Footer } from "@/components/Footer";

const ethnicities = [
  "White",
  "Black / African / Caribbean",
  "Asian / Asian British",
  "Mixed / Multiple ethnic groups",
  "Other ethnic group",
];

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-primary" />
              </div>
            <CardTitle className="text-3xl font-headline">100% Free Signup</CardTitle>
            <CardDescription>It only takes a minute to create your free profile and find your match.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Amelia" required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Rose" required />
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="24" required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="London" required />
                  </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select your ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    {ethnicities.map((ethnicity) => (
                      <SelectItem key={ethnicity} value={ethnicity}>
                        {ethnicity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Your Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little bit about yourself and what you're looking for." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" placeholder="e.g. Art, Travel, Fine Dining" />
                <p className="text-xs text-muted-foreground">Separate interests with a comma.</p>
              </div>
              <Button type="submit" className="w-full !mt-6" size="lg">
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
