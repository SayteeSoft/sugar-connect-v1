import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs | Sugar Connect',
  description: 'Find answers to frequently asked questions about Sugar Connect, including how to sign up, account details, and safety tips.',
};

const faqs = [
  {
    question: 'What is a sugar relationship?',
    answer: 'A sugar relationship is a mutually beneficial arrangement between two consenting adults. Typically, it involves an older, wealthier partner (Sugar Daddy/Mommy) providing financial support or mentorship to a younger partner (Sugar Baby) in exchange for companionship.',
  },
  {
    question: 'Is Sugar Connect free?',
    answer: 'Signing up and creating a profile on Sugar Connect is 100% free for all users. This allows you to browse profiles and see who is in your area. To access premium features like unlimited messaging, you will need to purchase credits or a subscription.',
  },
  {
    question: 'How do I create a good profile?',
    answer: 'Be honest and clear about who you are and what you\'re looking for. Use high-quality, recent photos. A well-written, detailed bio will attract more attention. Specify your interests, what you can offer, and what you expect from a relationship.',
  },
  {
    question: 'How do you ensure member safety?',
    answer: 'We take safety very seriously. We offer a profile verification system to confirm identities and use advanced tools to monitor for suspicious activity. We also provide safety tips and encourage all members to be cautious when sharing personal information and meeting for the first time.',
  },
  {
    question: 'What is the difference between a Sugar Daddy and a Sugar Baby?',
    answer: 'A Sugar Daddy (or Sugar Mommy) is typically a successful, established individual who is generous and willing to provide support. A Sugar Baby is an ambitious person who seeks the lifestyle, mentorship, or support that a Sugar Daddy can offer.',
  },
  {
    question: 'Can I use the site discreetly?',
    answer: 'Absolutely. We understand the need for privacy. You have control over your profile visibility and can choose what information to share. We recommend using a unique email address for your account and avoiding personally identifiable information in your public bio.',
  },
];

export default function FaqsPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have questions? We have answers. Here are some of the most common inquiries we receive from our members.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
