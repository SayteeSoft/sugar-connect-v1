import { Smile, Users, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    icon: Smile,
    title: 'Average Sugar Baby Age: 23',
  },
  {
    icon: Users,
    title: '6x More Sugar Babies than Sugar Daddies',
  },
  {
    icon: CalendarDays,
    title: 'Average Time to Find a Match: 4 Days',
  },
];

export function ByTheNumbersSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
          By The Numbers
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center p-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4 text-xl">{stat.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
