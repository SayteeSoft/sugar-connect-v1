
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { User, Profile, Role, ProfileFormValues } from '@/types';
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

async function handleNewUser(jsonData: any, db: { users: User[], profiles: Profile[] }) {
    const { user: newUser, profile: newProfile, password } = jsonData;
    
    if (!newUser || !newProfile || !password) {
        return NextResponse.json({ message: 'New user data is missing.' }, { status: 400 });
    }
    if (db.users.find((u: User) => u.email === newUser.email)) {
        return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userWithHash: User = { ...newUser, passwordHash };

    db.users.push(userWithHash);
    db.profiles.push(newProfile);

    await writeData(db);

    const { passwordHash: _, ...userToReturn } = userWithHash;

    return NextResponse.json({ 
        message: 'User created successfully',
        user: userToReturn,
        profile: newProfile
    }, { status: 201 });
}

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

async function handleUpdateUser(jsonData: any, formData: FormData, db: { users: User[], profiles: Profile[] }) {
    const { userId, ...updateData } = jsonData;

    if (!userId) {
        return NextResponse.json({ message: 'User ID is missing.' }, { status: 400 });
    }

    const userIndex = db.users.findIndex((u: User) => u.id === userId);
    const profileIndex = db.profiles.findIndex((p: Profile) => p.userId === userId);

    if (userIndex === -1 || profileIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userToUpdate: User = { ...db.users[userIndex] };
    const profileToUpdate: Profile = { ...db.profiles[profileIndex] };

    if (!profileToUpdate.attributes) {
        profileToUpdate.attributes = {};
    }

    // Update user fields from jsonData
    userToUpdate.name = updateData.name ?? userToUpdate.name;
    userToUpdate.email = updateData.email ?? userToUpdate.email;
    userToUpdate.location = updateData.location ?? userToUpdate.location;
    userToUpdate.age = Number(updateData.age) || userToUpdate.age;
    if (updateData.credits) {
        userToUpdate.credits = updateData.credits === 'unlimited' ? 'unlimited' : Number(updateData.credits);
    }
    if (updateData.sex) userToUpdate.sex = updateData.sex;
    if (updateData.role) userToUpdate.role = updateData.role;
    
    // Update profile fields from jsonData
    profileToUpdate.about = updateData.about ?? profileToUpdate.about;
    if (Array.isArray(updateData.wants)) profileToUpdate.wants = updateData.wants;
    if (Array.isArray(updateData.interests)) profileToUpdate.interests = updateData.interests;

    // Update attributes from jsonData
    profileToUpdate.attributes.height = updateData.height ?? profileToUpdate.attributes.height;
    profileToUpdate.attributes.bodyType = updateData.bodyType ?? profileToUpdate.attributes.bodyType;
    profileToUpdate.attributes.ethnicity = updateData.ethnicity ?? profileToUpdate.attributes.ethnicity;
    profileToUpdate.attributes.hairColor = updateData.hairColor ?? profileToUpdate.attributes.hairColor;
    profileToUpdate.attributes.eyeColor = updateData.eyeColor ?? profileToUpdate.attributes.eyeColor;
    profileToUpdate.attributes.smoker = updateData.smoker ?? profileToUpdate.attributes.smoker;
    profileToUpdate.attributes.drinker = updateData.drinker ?? profileToUpdate.attributes.drinker;
    profileToUpdate.attributes.piercings = updateData.piercings ?? profileToUpdate.attributes.piercings;
    profileToUpdate.attributes.tattoos = updateData.tattoos ?? profileToUpdate.attributes.tattoos;

    // Handle avatar file upload
    const avatarFile = formData.get('avatar');
    if (avatarFile instanceof File && avatarFile.size > 0) {
        userToUpdate.avatarUrl = await writeFile(avatarFile);
    }
    
    // Handle gallery update
    const existingGallery: string[] = Array.isArray(updateData.existingGallery) ? updateData.existingGallery : [];
    const newGalleryFiles = formData.getAll('gallery').filter(f => f instanceof File) as File[];

    let finalGallery = [...existingGallery];

    for (const file of newGalleryFiles) {
        const path = await writeFile(file);
        finalGallery.push(path);
    }
    
    profileToUpdate.gallery = finalGallery;
    
    // Save updated data to database
    db.users[userIndex] = userToUpdate;
    db.profiles[profileIndex] = profileToUpdate;

    await writeData(db);
    
    const { passwordHash: _, ...userToReturn } = userToUpdate;

    return NextResponse.json({ 
        message: 'Profile updated successfully',
        user: userToReturn,
        profile: profileToUpdate
    }, { status: 200 });
}

export async function POST(req: Request) {
  await ensureUploadDirExists();
  
  try {
    const db = await readData();
    const formData = await req.formData();
    const jsonDataString = formData.get('jsonData') as string;

    if (!jsonDataString) {
        return NextResponse.json({ message: 'jsonData field is missing.' }, { status: 400 });
    }
    
    const jsonData = JSON.parse(jsonDataString);

    if (jsonData.isNewUser) {
        return await handleNewUser(jsonData, db);
    } else {
        return await handleUpdateUser(jsonData, formData, db);
    }

  } catch (error) {
    console.error('Error processing profile update:', error);
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
