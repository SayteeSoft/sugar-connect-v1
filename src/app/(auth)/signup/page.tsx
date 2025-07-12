
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Role } from '@/types';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role | ''>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const roleFromQuery = searchParams.get('role');
        if (roleFromQuery === 'Sugar Daddy' || roleFromQuery === 'Sugar Baby') {
            setRole(roleFromQuery);
        }
    }, [searchParams]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) {
            setError('Please select your role.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const user = await signup(email, password, role);
            if (user) {
                router.push('/profile');
            } else {
                setError('An account with this email already exists.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">
          Create Your Account
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Join our exclusive community today. It&apos;s 100% free to sign up.
        </p>
      </div>
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Select your role and enter your details to begin.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="grid gap-6 px-8">
            {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
            <RadioGroup value={role} onValueChange={(value) => setRole(value as Role)} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="Sugar Daddy" id="sugar-daddy" className="peer sr-only" />
                <Label htmlFor="sugar-daddy" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  I am a Sugar Daddy
                </Label>
              </div>
              <div>
                <RadioGroupItem value="Sugar Baby" id="sugar-baby" className="peer sr-only" />
                <Label htmlFor="sugar-baby" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  I am a Sugar Baby
                </Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-8 pb-8">
            <Button className="w-full" type="submit" disabled={loading} size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
