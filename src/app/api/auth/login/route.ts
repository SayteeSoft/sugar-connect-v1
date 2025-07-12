
import { NextResponse } from 'next/server';
import type { User } from '@/types';
import { getStore } from '@netlify/blobs';
import bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import path from 'path';

const DB_KEY = 'users-db';

// A robust function to seed initial admin data in the respective data store.
const seedInitialData = async () => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    
    const initialData = {
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
        ]
    };

    if (process.env.NETLIFY_CONTEXT === 'production') {
        const store = getStore('data');
        await store.setJSON(DB_KEY, initialData);
    } else {
        const filePath = path.join(process.cwd(), 'src', 'lib', 'data.json');
        await fs.writeFile(filePath, JSON.stringify(initialData, null, 4));
    }
    return initialData;
};


// A robust function to read data from the correct source based on environment.
const readData = async () => {
    // In production, always use Netlify Blobs.
    if (process.env.NETLIFY_CONTEXT === 'production') {
        const store = getStore('data');
        const data = await store.get(DB_KEY, { type: 'json' });
        if (data) return data;
        return seedInitialData(); // Seed if no data exists in production.
    }

    // In local development, use the local data.json file.
    try {
        const filePath = path.join(process.cwd(), 'src', 'lib', 'data.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
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


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }
        
        const db = await readData();
        const { users } = db;

        const user = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user || !user.passwordHash) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        const { passwordHash, ...userToReturn } = user;

        return NextResponse.json({ 
            message: 'Login successful',
            user: userToReturn,
        }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
