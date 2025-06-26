import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary | Sugar Connect',
  description: 'Understand the common terms and phrases used in the world of sugar dating with our comprehensive glossary.',
};

const glossaryTerms = [
  {
    term: 'Sugar Daddy (SD) / Sugar Mommy (SM)',
    definition: 'A successful, generous, and mature individual who provides financial support, mentorship, or gifts to a younger partner in exchange for companionship.',
  },
  {
    term: 'Sugar Baby (SB)',
    definition: 'An ambitious, attractive individual who seeks financial support, a certain lifestyle, or mentorship from a Sugar Daddy or Sugar Mommy.',
  },
  {
    term: 'Arrangement',
    definition: 'The terms of a sugar relationship, agreed upon by both parties. It outlines expectations, boundaries, and the nature of the support provided.',
  },
  {
    term: 'Allowance',
    definition: 'A regular sum of money given by a Sugar Daddy/Mommy to a Sugar Baby as part of their arrangement. It can be provided on a weekly or monthly basis.',
  },
  {
    term: 'PPM (Pay Per Meet)',
    definition: 'An arrangement where the Sugar Baby receives a pre-agreed amount of financial support each time they meet with their Sugar Daddy/Mommy.',
  },
  {
    term: 'Mutually Beneficial Relationship',
    definition: 'The core principle of sugar dating. A relationship where both partners get what they want and need, with clear and honest communication.',
  },
  {
    term: 'NSA (No Strings Attached)',
    definition: 'A relationship without the expectation of long-term commitment or emotional entanglement. The focus is on enjoying the present moment.',
  },
  {
    term: 'Splenda Daddy/Mommy',
    definition: 'A term for someone who wants to be a Sugar Daddy/Mommy but may not have the financial means to provide a significant allowance, offering other forms of support instead.',
  },
  {
    term: 'Freestyle',
    definition: 'The practice of finding a sugar relationship offline, in public places like upscale bars, hotels, or events, rather than through a dedicated website.',
  },
];

export default function GlossaryPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Sugar Dating Glossary
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          New to the sugar bowl? This glossary will help you understand the lingo.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {glossaryTerms.map((item) => (
          <Card key={item.term}>
            <CardHeader>
              <CardTitle>{item.term}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.definition}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
