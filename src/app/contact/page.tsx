
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const ACCESS_KEY = "3ee1a7f3-b3d8-4b7d-a39a-3f40659920cb";

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Have a question or feedback? Fill out the form below to get in
          touch.
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-lg">
          <form action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value={ACCESS_KEY} />
            <input type="hidden" name="redirect" value="https://web3forms.com/success" />
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Regarding my account" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
