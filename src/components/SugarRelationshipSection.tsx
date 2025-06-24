'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";


export function SugarRelationshipSection() {
  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground mb-10">
          What is a Sugar Relationship?
        </h2>
        <Tabs defaultValue="sugar-daddy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
            <TabsTrigger value="sugar-daddy">Sugar Daddy</TabsTrigger>
            <TabsTrigger value="sugar-baby">Sugar Baby</TabsTrigger>
          </TabsList>
          <TabsContent value="sugar-daddy">
             <Card className="mt-6 text-left bg-card">
                <CardContent className="p-6">
                    <p className="text-base text-muted-foreground leading-relaxed">
                        A Sugar Daddy is typically a successful, generous, and experienced individual who enjoys mentoring and providing financial support or gifts to a partner in exchange for companionship. They appreciate the vitality and perspective a Sugar Baby brings into their life and seek a relationship based on mutual respect and clearly defined expectations.
                    </p>
                </CardContent>
             </Card>
          </TabsContent>
          <TabsContent value="sugar-baby">
             <Card className="mt-6 text-left bg-card">
                <CardContent className="p-6">
                    <p className="text-base text-muted-foreground leading-relaxed">
                        A Sugar Baby is an ambitious, attractive, and intelligent individual who seeks a relationship with someone who can offer mentorship, financial assistance, and a lifestyle they might not otherwise have access to. They value the wisdom and experience of a Sugar Daddy and are open to a relationship built on honesty, companionship, and mutual benefits.
                    </p>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
        
        <p className="mt-10 text-lg text-muted-foreground leading-relaxed">
          Sugar dating, in its modern form, has elevated the world of traditional dating relationships, making it more satisfying for both partners. Like-minded people can find each other and explore relationships on their own terms, free from the judgement they may feel from their friends, family, or wider society.
        </p>

      </div>
    </section>
  );
}
