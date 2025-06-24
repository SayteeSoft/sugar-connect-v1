import { BadgeCheck, Lock, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const securityFeatures = [
  {
    icon: BadgeCheck,
    title: 'Verified Members',
    description: 'Video verification allows you to know that potential dates look like their photos.',
  },
  {
    icon: Lock,
    title: 'Secure Accounts',
    description: 'Industry-leading account protection helps keep your profile and information safe.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'We have a dedicated team of customer service agents to support you.',
  },
];

export function SecuritySection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
          High level security & privacy
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
