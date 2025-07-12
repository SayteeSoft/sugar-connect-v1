
import { NextResponse } from 'next/server';
import type { User } from '@/types';
import { getStore } from '@netlify/blobs';
import bcrypt from 'bcrypt';

const DB_KEY = 'users-db';

const readData = async () => {
    const store = getStore('data');
    const data = await store.get(DB_KEY, { type: 'json' });
    if (data) return data;

    // If no data, seed with the initial admin user
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
    await store.setJSON(DB_KEY, initialData);
    return initialData;
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
