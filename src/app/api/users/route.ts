
import { NextResponse } from 'next/server';
import { readData } from '../auth/login/route';
import type { User } from '@/types';

export async function GET() {
    try {
        const db = await readData();

        // It's critical to remove the password hashes before sending user data to the client.
        const safeUsers = db.users.map(user => {
            const { passwordHash, ...safeUser } = user;
            return safeUser;
        });

        return NextResponse.json({ 
            users: safeUsers,
            profiles: db.profiles 
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
