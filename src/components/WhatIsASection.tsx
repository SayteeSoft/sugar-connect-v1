'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export function WhatIsASection() {
  const [activeTab, setActiveTab] = useState('sugar-daddy');

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-6">
          What is a...
        </h2>
        <Tabs defaultValue="sugar-daddy" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
            <TabsTrigger value="sugar-daddy">Sugar Daddy</TabsTrigger>
            <TabsTrigger value="sugar-baby">Sugar Baby</TabsTrigger>
          </TabsList>
          <Card className="mt-6 bg-card text-left">
              <CardContent className="p-6">
          <TabsContent value="sugar-daddy">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Sugar Daddy is a successful and generous individual who is willing to provide financial support and mentorship to a partner in exchange for companionship and a mutually beneficial relationship.
            </p>
          </TabsContent>
          <TabsContent value="sugar-baby">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Sugar Baby is an ambitious and attractive person who seeks a mature partner to provide them with a certain lifestyle and support their goals, in return for their company and affection.
            </p>
          </TabsContent>
              </CardContent>
          </Card>
        </Tabs>
      </div>
    </section>
  );
}
