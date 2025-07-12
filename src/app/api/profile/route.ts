
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { users, profiles } from '@/lib/mock-data'; // Using mock data as a "database"
import type { User, Profile } from '@/types';

const uploadDir = path.join(process.cwd(), '/public/uploads');

// Helper function to ensure the upload directory exists.
const ensureUploadDirExists = async () => {  
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export async function POST(req: Request) {
  await ensureUploadDirExists();
  
  try {
    const formData = await req.formData();
    
    const userIdToUpdate = formData.get('userId') as string;

    if (!userIdToUpdate) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    const userIndex = users.findIndex(u => u.id === userIdToUpdate);
    const profileIndex = profiles.findIndex(p => p.userId === userIdToUpdate);

    if (userIndex === -1 || profileIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToUpdate: User = { ...users[userIndex] };
    const profileToUpdate: Profile = { ...profiles[profileIndex] };

    // Ensure attributes object exists
    if (!profileToUpdate.attributes) {
        profileToUpdate.attributes = {};
    }

    // Update text fields
    userToUpdate.name = (formData.get('name') as string) || userToUpdate.name;
    userToUpdate.location = (formData.get('location') as string) || userToUpdate.location;
    userToUpdate.age = Number(formData.get('age')) || userToUpdate.age;
    
    const roleValue = formData.get('role') as User['role'];
    if (roleValue && (roleValue === 'Sugar Daddy' || roleValue === 'Sugar Baby' || roleValue === 'Admin')) {
      userToUpdate.role = roleValue;
    }
    
    profileToUpdate.about = (formData.get('about') as string) || profileToUpdate.about;

    const wantsString = formData.get('wants') as string;
    if (wantsString) {
      try {
        profileToUpdate.wants = JSON.parse(wantsString);
      } catch {
        // Ignore if parsing fails
      }
    }

    const interestsString = formData.get('interests') as string;
    if (interestsString) {
      try {
        profileToUpdate.interests = JSON.parse(interestsString);
      } catch {
        // Ignore if parsing fails
      }
    }
    
    const toStringOrUndefined = (field?: FormDataEntryValue | null): string | undefined => {
        if (field === undefined || field === null || typeof field !== 'string' || field.trim() === '') {
            return undefined;
        }
        return field;
    };

    const newAttributes: Partial<Profile['attributes']> = {
        height: toStringOrUndefined(formData.get('height')),
        bodyType: formData.get('bodyType') as Profile['attributes']['bodyType'] || undefined,
        ethnicity: formData.get('ethnicity') as Profile['attributes']['ethnicity'] || undefined,
        hairColor: formData.get('hairColor') as Profile['attributes']['hairColor'] || undefined,
        eyeColor: formData.get('eyeColor') as Profile['attributes']['eyeColor'] || undefined,
        smoker: formData.get('smoker') as Profile['attributes']['smoker'] || undefined,
        drinker: formData.get('drinker') as Profile['attributes']['drinker'] || undefined,
        piercings: formData.get('piercings') as Profile['attributes']['piercings'] || undefined,
        tattoos: formData.get('tattoos') as Profile['attributes']['tattoos'] || undefined,
    };
    
    Object.keys(newAttributes).forEach(key => {
        const typedKey = key as keyof typeof newAttributes;
        const value = newAttributes[typedKey];
        if (value !== undefined) {
            (profileToUpdate.attributes as any)[typedKey] = value;
        }
    });

    const writeFile = async (file: File) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${file.name}`;
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        return `/uploads/${filename}`;
    };

    // Update avatar if a new one was uploaded
    const avatarFile = formData.get('avatar') as File | null;
    if (avatarFile && avatarFile.size > 0) {
        userToUpdate.avatarUrl = await writeFile(avatarFile);
    }

    // Update gallery if new images were uploaded
    const galleryFiles = formData.getAll('gallery') as File[];
    if (galleryFiles && galleryFiles.length > 0) {
        const newImagePaths: string[] = [];
        for (const file of galleryFiles) {
            if (file && file.size > 0) {
                const path = await writeFile(file);
                newImagePaths.push(path);
            }
        }

        if (newImagePaths.length > 0) {
             profileToUpdate.gallery = [...(profileToUpdate.gallery || []), ...newImagePaths];
        }
    }
    
    // "Save" the updated data back to our mock data store
    users[userIndex] = userToUpdate;
    profiles[profileIndex] = profileToUpdate;

    return NextResponse.json({ 
        message: 'Profile updated successfully',
        user: userToUpdate,
        profile: profileToUpdate
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: `Error updating profile: ${errorMessage}` }, { status: 500 });
  }
}
