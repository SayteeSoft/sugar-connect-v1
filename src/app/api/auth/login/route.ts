
import { NextResponse } from 'next/server';
import type { User } from '@/types';
import bcrypt from 'bcrypt';
import { readData } from '@/lib/data-access';


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
