import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Sugar Connect',
  description: 'Get in touch with the Sugar Connect support team. We are here to help with any questions or issues you may have.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
       <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Contact Us
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We're here to help. Whether you have a question about your account, a suggestion, or need support, please don't hesitate to reach out.
        </p>
      </div>

      <div className="mt-12 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6"/> Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we will get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Account Issue" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your issue or question in detail..." rows={6} required />
              </div>
              <Button type="submit" className="w-full !mt-6" size="lg">
                Submit Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
