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

export default function SignupPage() {
    const router = useRouter();
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
        // Mock signup logic
        setTimeout(() => {
            console.log('New user signed up:', { email, role });
            // In a real app, you would create the user and then log them in.
            // For this mock, we just redirect to login.
            setLoading(false);
            router.push('/login');
        }, 1500);
    };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">100% Free Signup</CardTitle>
        <CardDescription>Join our exclusive community today.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent className="grid gap-6">
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
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit" disabled={loading}>
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
  );
}
