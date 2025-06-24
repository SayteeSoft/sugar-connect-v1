import { Sparkles } from 'lucide-react';
import { AiMatchClient } from './AiMatchClient';

export default function AiMatchPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex flex-col items-center text-center">
        <Sparkles className="h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-headline font-bold">AI Matchmaker</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Let our advanced AI analyze your profile and preferences to find your most compatible matches. This tool helps you discover potential connections you might have missed.
        </p>
      </div>

      <AiMatchClient />
    </div>
  );
}
