
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { User, Profile, Role } from '@/types';
import bcrypt from 'bcrypt';
import { readData, writeData } from '@/lib/data-access';
import { getStore } from '@netlify/blobs';

const uploadDir = path.join(process.cwd(), 'public/uploads');

const ensureUploadDirExists = async () => {  
  if (process.env.NETLIFY_CONTEXT) return;
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export async function POST(req: Request) {
  await ensureUploadDirExists();
  
  try {
    const db = await readData();
    let { users, profiles } = db;

    const formData = await req.formData();
    
    const isNewUser = formData.get('isNewUser') === 'true';
    if (isNewUser) {
        const newUserString = formData.get('user') as string;
        const newProfileString = formData.get('profile') as string;
        const password = formData.get('password') as string;

        if (!newUserString || !newProfileString || !password) {
            return NextResponse.json({ message: 'New user data is missing.' }, { status: 400 });
        }
        const newUser: Omit<User, 'passwordHash'> = JSON.parse(newUserString);
        const newProfile: Profile = JSON.parse(newProfileString);

        if (users.find((u: User) => u.email === newUser.email)) {
            return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const userWithHash: User = { ...newUser, passwordHash };

        users.push(userWithHash);
        profiles.push(newProfile);

        await writeData({ ...db, users, profiles });

        const { passwordHash: _, ...userToReturn } = userWithHash;

        return NextResponse.json({ 
            message: 'User created successfully',
            user: userToReturn,
            profile: newProfile
        }, { status: 201 });
    }

    const userIdToUpdate = formData.get('userId') as string;

    if (!userIdToUpdate) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    const userIndex = users.findIndex((u: User) => u.id === userIdToUpdate);
    const profileIndex = profiles.findIndex((p: Profile) => p.userId === userIdToUpdate);

    if (userIndex === -1 || profileIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToUpdate: User = { ...users[userIndex] };
    const profileToUpdate: Profile = { ...profiles[profileIndex] };

    if (!profileToUpdate.attributes) {
        profileToUpdate.attributes = {};
    }

    const toStringOrUndefined = (field?: FormDataEntryValue | null): string | undefined => {
        if (field === undefined || field === null || typeof field !== 'string') {
            return undefined;
        }
        return field.trim() === "" ? undefined : field;
    };
    
    const toStringOrExisting = (field: FormDataEntryValue | null, existingValue: string) => {
        return typeof field === 'string' ? field : existingValue;
    }

    userToUpdate.name = toStringOrExisting(formData.get('name'), userToUpdate.name);
    userToUpdate.email = toStringOrExisting(formData.get('email'), userToUpdate.email);
    userToUpdate.location = toStringOrExisting(formData.get('location'), userToUpdate.location);
    userToUpdate.age = Number(formData.get('age')) || userToUpdate.age;
    
    const creditsValue = formData.get('credits');
    if (creditsValue) {
        userToUpdate.credits = creditsValue === 'unlimited' ? 'unlimited' : Number(creditsValue);
    }
    
    const sexValue = formData.get('sex') as User['sex'];
    if (sexValue && (sexValue === 'Male' || sexValue === 'Female')) {
        userToUpdate.sex = sexValue;
    }

    const roleValue = formData.get('role') as Role;
    if (roleValue && (roleValue === 'Sugar Daddy' || roleValue === 'Sugar Baby' || roleValue === 'Admin')) {
        userToUpdate.role = roleValue;
    }
    
    profileToUpdate.about = toStringOrExisting(formData.get('about'), profileToUpdate.about);

    const wantsString = formData.get('wants') as string;
    if (wantsString) {
      try {
        profileToUpdate.wants = JSON.parse(wantsString);
      } catch {}
    }

    const interestsString = formData.get('interests') as string;
    if (interestsString) {
      try {
        profileToUpdate.interests = JSON.parse(interestsString);
      } catch {}
    }

    profileToUpdate.attributes.height = toStringOrUndefined(formData.get('height'));
    profileToUpdate.attributes.bodyType = (formData.get('bodyType') as Profile['attributes']['bodyType']) || undefined;
    profileToUpdate.attributes.ethnicity = (formData.get('ethnicity') as Profile['attributes']['ethnicity']) || undefined;
    profileToUpdate.attributes.hairColor = (formData.get('hairColor') as Profile['attributes']['hairColor']) || undefined;
    profileToUpdate.attributes.eyeColor = (formData.get('eyeColor') as Profile['attributes']['eyeColor']) || undefined;
    profileToUpdate.attributes.smoker = (formData.get('smoker') as Profile['attributes']['smoker']) || undefined;
    profileToUpdate.attributes.drinker = (formData.get('drinker') as Profile['attributes']['drinker']) || undefined;
    profileToUpdate.attributes.piercings = (formData.get('piercings') as Profile['attributes']['piercings']) || undefined;
    profileToUpdate.attributes.tattoos = (formData.get('tattoos') as Profile['attributes']['tattoos']) || undefined;

    const writeFile = async (file: File) => {
      const filename = `${Date.now()}_${file.name}`;
      if (process.env.NETLIFY_CONTEXT) {
        const store = getStore('uploads');
        await store.set(filename, await file.arrayBuffer(), { metadata: { type: file.type } });
        return `/api/uploads/${filename}`;
      } else {
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        return `/uploads/${filename}`;
      }
    };

    const avatarFile = formData.get('avatar') as File | null;
    if (avatarFile instanceof File && avatarFile.size > 0) {
        userToUpdate.avatarUrl = await writeFile(avatarFile);
    }
    
    const existingGallery = formData.get('existingGallery');
    const newGalleryFiles = formData.getAll('gallery').filter(f => f instanceof File) as File[];

    let finalGallery: string[] = [];

    if (existingGallery && typeof existingGallery === 'string') {
        try {
            finalGallery = JSON.parse(existingGallery);
        } catch {}
    } else {
        finalGallery = profileToUpdate.gallery || [];
    }

    for (const file of newGalleryFiles) {
        const path = await writeFile(file);
        finalGallery.push(path);
    }
    
    profileToUpdate.gallery = finalGallery;
    
    users[userIndex] = userToUpdate;
    profiles[profileIndex] = profileToUpdate;

    await writeData({ ...db, users, profiles });
    
    const { passwordHash: _, ...userToReturn } = userToUpdate;

    return NextResponse.json({ 
        message: 'Profile updated successfully',
        user: userToReturn,
        profile: profileToUpdate
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: `Error updating profile: ${errorMessage}` }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
        }

        const db = await readData();
        let { users, profiles } = db;
        
        const userToDelete = users.find((u: User) => u.id === userId);

        if (!userToDelete) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        if (userToDelete.email === 'saytee.software@gmail.com') {
            return NextResponse.json({ message: 'Cannot delete administrator account.' }, { status: 403 });
        }

        const updatedUsers = users.filter((u: User) => u.id !== userId);
        const updatedProfiles = profiles.filter((p: Profile) => p.userId !== userId);

        await writeData({ ...db, users: updatedUsers, profiles: updatedProfiles });

        return NextResponse.json({ message: 'User deleted successfully.' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting user:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: `Error deleting user: ${errorMessage}` }, { status: 500 });
    }
}
