
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        router.push('/profile');
      } else {
        setError('Invalid email or password. Please try again.');
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
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Sign in to access your exclusive community.
        </p>
      </div>
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4 px-8">
              {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
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
                Sign In
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline hover:text-primary">
                  Sign up for free
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
    </div>
  );
}
