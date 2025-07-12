
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { users, profiles } from '@/lib/mock-data'; // Using mock data as a "database"
import type { User, Profile } from '@/types';

// This disables the default body parser to allow formidable to handle the request stream.
export const config = {
  api: {
    bodyParser: false,
  },
};

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
  
  const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFiles: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filename: (name, ext, part) => {
        return `${Date.now()}_${Math.round(Math.random() * 1E9)}${ext}`;
      },
  });

  try {
    const [fields, files] = await form.parse(req);
    
    const userIdToUpdate = fields.userId?.[0];

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
    userToUpdate.name = fields.name?.[0] || userToUpdate.name;
    userToUpdate.location = fields.location?.[0] || userToUpdate.location;
    userToUpdate.age = Number(fields.age?.[0]) || userToUpdate.age;
    userToUpdate.role = fields.role?.[0] as User['role'] || userToUpdate.role;
    
    profileToUpdate.about = fields.about?.[0] || profileToUpdate.about;
    if (fields.wants?.[0]) {
      profileToUpdate.wants = JSON.parse(fields.wants[0]);
    }
    if (fields.interests?.[0]) {
      profileToUpdate.interests = JSON.parse(fields.interests[0]);
    }
    
    // Helper to safely convert form field to number or undefined
    const toNumberOrUndefined = (field?: string): number | undefined => {
        if (field === undefined || field === null || field.trim() === '') {
            return undefined;
        }
        const num = Number(field);
        return isNaN(num) ? undefined : num;
    };

    const newAttributes: Partial<Profile['attributes']> = {
        height: toNumberOrUndefined(fields.height?.[0]),
        bodyType: fields.bodyType?.[0] as Profile['attributes']['bodyType'] || undefined,
        ethnicity: fields.ethnicity?.[0] as Profile['attributes']['ethnicity'] || undefined,
        hairColor: fields.hairColor?.[0] as Profile['attributes']['hairColor'] || undefined,
        eyeColor: fields.eyeColor?.[0] as Profile['attributes']['eyeColor'] || undefined,
        smoker: fields.smoker?.[0] as Profile['attributes']['smoker'] || undefined,
        drinker: fields.drinker?.[0] as Profile['attributes']['drinker'] || undefined,
        piercings: fields.piercings?.[0] as Profile['attributes']['piercings'] || undefined,
        tattoos: fields.tattoos?.[0] as Profile['attributes']['tattoos'] || undefined,
    };
    
    // Filter out undefined/null values to avoid overwriting existing data with nothing
    Object.keys(newAttributes).forEach(key => {
        const typedKey = key as keyof typeof newAttributes;
        const value = newAttributes[typedKey];
        if (value !== undefined && value !== null) {
            (profileToUpdate.attributes as any)[typedKey] = value;
        }
    });


    // Update avatar if a new one was uploaded
    const avatarFile = files.avatar?.[0];
    if (avatarFile?.filepath) {
        userToUpdate.avatarUrl = `/uploads/${path.basename(avatarFile.filepath)}`;
    }

    // Update gallery if new images were uploaded
    const galleryFiles = files.gallery;
    if (galleryFiles && galleryFiles.length > 0) {
        const newImagePaths = galleryFiles.map(file => {
             if (file.filepath) {
                return `/uploads/${path.basename(file.filepath)}`;
            }
            return null;
        }).filter((path): path is string => path !== null);

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
    return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
  }
}
