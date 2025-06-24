import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { EditProfileForm } from './EditProfileForm';

export default async function EditProfilePage({ params }: { params: { id: string } }) {
  const user = await db.getProfileById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center text-center">
        <Pencil className="h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-headline font-bold">Edit Profile</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Modify the details for {user.name}.
        </p>
      </div>

      <div className="mt-8">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}
