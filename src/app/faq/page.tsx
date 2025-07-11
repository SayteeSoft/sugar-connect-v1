
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

const allFaqs = [
  {
    question: "What is Sugar Connect?",
    answer:
      "Sugar Connect is a premier online platform designed to connect successful, established individuals (Sugar Daddies and Mommies) with ambitious, attractive people (Sugar Babies) for transparent and mutually beneficial relationships.",
  },
  {
    question: "Is my privacy protected on Sugar Connect?",
    answer:
      "Absolutely. Your privacy and discretion are our top priorities. We utilize advanced security protocols and offer privacy settings that give you full control over your profile's visibility and personal information.",
  },
  {
    question: "How do I create a successful profile?",
    answer:
      "A successful profile is honest, detailed, and features high-quality photos. Be clear about your expectations and what you can offer in a relationship. A complete profile with verified photos gets significantly more attention.",
  },
  {
    question: "What is a 'mutually beneficial relationship'?",
    answer:
      "A mutually beneficial relationship is a partnership where both parties are upfront about their needs and expectations, and both feel they are gaining something valuable from the arrangement. This can include companionship, mentorship, financial support, and shared experiences.",
  },
  {
    question: "How does messaging work on the site?",
    answer:
      "Once you find a profile you're interested in, you can send a message directly. Sugar Daddies use credits to unlock conversations, while Sugar Babies can reply for free. This system ensures that interactions are initiated by genuinely interested members.",
  },
  {
    question: "What is the difference between 'allowance' and 'Pay Per Meet' (PPM)?",
    answer:
      "'Allowance' is a fixed amount provided on a regular basis (e.g., weekly or monthly) to support a lifestyle. 'Pay Per Meet' (PPM) refers to an arrangement where a gift or support is provided for each date. The terms are agreed upon by the members involved.",
  },
  {
    question: "Are there safety features on the platform?",
    answer:
      "Yes, we have several safety features, including profile verification, robust reporting and blocking tools, and a dedicated support team to address any concerns. We encourage all members to follow our safety guidelines for a secure experience.",
  },
  {
    question: "Can I use the site for free?",
    answer:
      "Sugar Babies can create a profile, browse members, and reply to messages for free. Sugar Daddies can sign up and browse for free but will need to purchase credits to initiate conversations and unlock premium features.",
  },
];

export default function FaqPage() {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredFaqs = allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl md:text-4xl font-headline text-primary">Frequently Asked Questions</CardTitle>
          <CardDescription className="text-lg">
            Find answers to common questions about Sugar Connect and sugar dating.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-10">
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search questions..." 
                    className="pl-10 h-12 text-base" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left hover:no-underline">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
           {filteredFaqs.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No questions found matching your search.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
