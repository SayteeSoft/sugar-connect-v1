
"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const allTerms = [
    {
        term: "Sugar Daddy (SD)",
        definition: "A successful and generous individual, typically older, who provides financial support, gifts, or mentorship to a younger partner in exchange for companionship."
    },
    {
        term: "Sugar Mommy (SM)",
        definition: "A successful and generous woman who provides financial support, gifts, or mentorship to a younger partner in exchange for companionship. The female equivalent of a Sugar Daddy."
    },
    {
        term: "Sugar Baby (SB)",
        definition: "An ambitious and often younger person who receives gifts, financial support, or mentorship from a Sugar Daddy or Sugar Mommy in a mutually beneficial relationship."
    },
    {
        term: "Arrangement",
        definition: "The mutually agreed-upon terms and expectations that form the basis of a sugar relationship. This can cover everything from the frequency of dates to the nature of the support provided."
    },
    {
        term: "Allowance",
        definition: "A regular, fixed financial payment given by a Sugar Daddy or Sugar Mommy to a Sugar Baby. This is often provided on a weekly or monthly basis to help with living expenses."
    },
    {
        term: "Pay Per Meet (PPM)",
        definition: "An arrangement where the Sugar Baby receives a specific amount of financial support or a gift for each date or meeting. This is often used at the beginning of an arrangement."
    },
    {
        term: "Mutually Beneficial Relationship",
        definition: "The core principle of sugar dating, where both partners are clear about their expectations and feel they are benefiting from the relationship. It emphasizes transparency and mutual satisfaction."
    },
    {
        term: "Discretion",
        definition: "The practice of keeping the details of the arrangement private and confidential. It is a key element of many sugar relationships to protect the privacy of both individuals."
    },
    {
        term: "Splenda Daddy",
        definition: "A term for an individual who wants to be a Sugar Daddy but lacks the financial means to provide the level of support typically expected. They may offer less substantial gifts or support."
    },
    {
        term: "Salt Daddy",
        definition: "A fake or deceptive individual who pretends to be a Sugar Daddy with no intention of providing any support. The term implies they are 'salty' or bitter."
    }
];

export default function GlossaryPage() {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredTerms = allTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Glossary of Terms</CardTitle>
          <CardDescription className="text-lg">
            Understand the language of the sugar dating world.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-10">
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search terms..." 
                    className="pl-10 h-12 text-base" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredTerms.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left hover:no-underline">
                        {item.term}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {item.definition}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
           {filteredTerms.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No terms found matching your search.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
