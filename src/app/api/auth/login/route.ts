
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { User } from '@/types';
import { getStore } from '@netlify/blobs';
import bcrypt from 'bcrypt';

const dataPath = path.join(process.cwd(), 'src/lib/data.json');
const DB_KEY = 'db.json';

const readData = async () => {
    // Check if running on Netlify by looking for the NETLIFY environment variable
    if (process.env.NETLIFY) {
        const store = getStore('data');
        const data = await store.get(DB_KEY, { type: 'json' });
        // If no data in blob store, return a default structure
        return data || { users: [], profiles: [] };
    }

    // Otherwise, use local file system for development
    try {
        const fileContent = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist locally, return default structure
        console.error("Could not read local data.json:", error);
        return { users: [], profiles: [] };
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

        // Do not send the password hash to the client
        const { passwordHash, ...userToReturn } = user;

        return NextResponse.json({ 
            message: 'Login successful',
            user: userToReturn,
        }, { status: 200 });

    } catch (error)
        {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
