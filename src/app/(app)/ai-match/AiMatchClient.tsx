'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ServerCrash, Lightbulb } from 'lucide-react';
import { getAiMatches } from './actions';

export function AiMatchClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[] | null>(null);

  const handleGenerateMatches = async () => {
    setLoading(true);
    setError(null);
    setMatches(null);
    try {
      const result = await getAiMatches();
      if (result.success) {
        setMatches(result.matches);
      } else {
        setError(result.error ?? 'An unknown error occurred.');
      }
    } catch (e) {
      setError('Failed to connect to the AI service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <Button size="lg" onClick={handleGenerateMatches} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate My AI Matches'
          )}
        </Button>
      </div>

      <div className="mt-8">
        {error && (
          <Alert variant="destructive">
            <ServerCrash className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {matches && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
                Your AI-Powered Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Based on your profile, here are some people you might connect with.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                {matches.map((match, index) => (
                  <li key={index}>{match}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
