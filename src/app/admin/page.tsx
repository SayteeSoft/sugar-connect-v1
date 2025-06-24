import { db } from '@/lib/db';
import { Shield } from 'lucide-react';
import { AdminClient } from './AdminClient';

export default async function AdminPage() {
  const profiles = await db.getProfiles();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center text-center">
        <Shield className="h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-headline font-bold">Admin Dashboard</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Manage user profiles, view activity, and oversee the platform.
        </p>
      </div>

      <AdminClient profiles={profiles} />
    </div>
  );
}
