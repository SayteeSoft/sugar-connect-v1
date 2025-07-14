
import { getStore } from '@netlify/blobs';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import type { User, Profile, AppData } from '@/types';

const DB_KEY = 'users-db';
const localDbPath = path.join(process.cwd(), 'src', 'lib', 'data.json');

// A robust function to seed initial admin data in the respective data store.
export const seedInitialData = async (): Promise<AppData> => {
    // Await the hash generation properly
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const initialData: AppData = {
        users: [
             {
                "id": "1",
                "name": "Admin",
                "email": "saytee.software@gmail.com",
                "passwordHash": passwordHash,
                "age": 49,
                "location": "London, UK",
                "role": "Admin",
                "credits": "unlimited",
                "avatarUrl": "/profile-images/Admin_Gemini_Generated_Image (small)-001.jpg",
                "profileId": "p1"
            }
        ],
        profiles: [
            {
                "id": "p1",
                "userId": "1",
                "about": "Site administrator.",
                "wants": [],
                "interests": [],
                "gallery": [],
                "attributes": {
                    "height": "6'0\"",
                    "bodyType": "Athletic",
                    "ethnicity": "Black/African Decent",
                    "hairColor": "Black",
                    "eyeColor": "Brown",
                    "smoker": "No",
                    "drinker": "No",
                    "piercings": "No",
                    "tattoos": "No"
                }
            }
        ],
        messages: []
    };

    if (process.env.NETLIFY) {
        const store = getStore('data');
        await store.setJSON(DB_KEY, initialData);
    } else {
        await fs.writeFile(localDbPath, JSON.stringify(initialData, null, 2));
    }
    return initialData;
};

// A robust function to read data from the correct source based on environment.
export const readData = async (): Promise<AppData> => {
    // In production or any Netlify context, always use Netlify Blobs.
    if (process.env.NETLIFY) {
        const store = getStore('data');
        try {
            const data = await store.get(DB_KEY, { type: 'json' });
            if (data && data.users && data.users.length > 0) return data;
            return seedInitialData(); // Seed if no data exists in production.
        } catch(e) {
             return seedInitialData();
        }
    }

    // In local development, use the local data.json file.
    try {
        const fileContent = await fs.readFile(localDbPath, 'utf-8');
        // Handle empty file case
        if (!fileContent) {
            return seedInitialData();
        }
        const data = JSON.parse(fileContent);
        // Basic validation to see if the file is empty or corrupted
        if (!data || !data.users || data.users.length === 0) {
            return seedInitialData();
        }
        return data;
    } catch (error) {
        // If the file doesn't exist or is invalid, create it with seed data.
        return seedInitialData();
    }
};

// A robust function to write data to the correct source
export const writeData = async (data: AppData) => {
    if (process.env.NETLIFY) {
        const store = getStore('data');
        await store.setJSON(DB_KEY, data);
    } else {
        await fs.writeFile(localDbPath, JSON.stringify(data, null, 2));
    }
};
