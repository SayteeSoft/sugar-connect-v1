
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
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">
            Contact Us
          </CardTitle>
          <CardDescription className="text-lg">
            Have a question or feedback? Fill out the form below to get in
            touch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Regarding my account" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message here..."
                rows={5}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
