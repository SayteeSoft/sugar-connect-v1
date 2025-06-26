import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Target } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Sugar Connect',
  description: 'Learn more about Sugar Connect, our mission, and what makes us the leading platform for mutually beneficial relationships.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">About Sugar Connect</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Welcome to the UK’s premier destination for sugar dating. We are dedicated to fostering transparent, honest, and mutually beneficial relationships.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">What We Do</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We provide a sophisticated and secure platform where successful, generous individuals (Sugar Daddies & Mommies) can connect with ambitious, attractive people (Sugar Babies). Our focus is on creating genuine connections built on respect and clear expectations.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to redefine the modern relationship by providing a space where people can be upfront about their needs and desires. We believe that honesty and mutual benefit are the cornerstones of any successful partnership, and we strive to empower our members to find the arrangement that works for them.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">What Makes Us Different</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Unlike traditional dating sites, Sugar Connect is built for a specific purpose. We offer advanced search filters, profile verification to ensure safety, and a community that understands the dynamics of sugar relationships. We are committed to quality, discretion, and success for our members.
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="mt-20 text-center">
        <h2 className="text-3xl font-headline font-bold text-foreground">A Relationship on Your Terms</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Fed up with playing games? With Sugar Connect, you don’t have to. Members are encouraged to be open about what they are looking for, whether it’s mentorship, financial support, companionship, or simply a different kind of dating experience. This upfront approach saves time and leads to more satisfying connections. Join a community where everyone knows the score from the very beginning.
        </p>
      </div>
    </div>
  );
}
