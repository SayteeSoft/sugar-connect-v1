
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a mock login. In a real app, you would call an API.
    if (email === 'saytee.software@gmail.com' && password === '12345') {
      // For the prototype, we'll just assume a successful login redirects the admin
      router.push('/admin');
    } else {
      // In a real app, you'd show a proper error message.
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-grow flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://web-developer.one/imgs/sugar-daddy-002.jpg')",
          }}
          data-ai-hint="romantic london night"
        />
        <div className="absolute inset-0 bg-black/50" />
        <Card className="w-full max-w-md mx-auto z-10 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
            <CardDescription>Login to continue to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full !mt-6" size="lg">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
