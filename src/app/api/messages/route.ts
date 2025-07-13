
import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data-access';
import type { Message } from '@/types';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get('conversationId');

    if (!conversationId) {
        return NextResponse.json({ message: 'Conversation ID is required' }, { status: 400 });
    }

    try {
        const db = await readData();
        const messages = db.messages?.filter(m => m.conversationId === conversationId) || [];
        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { conversationId, senderId, receiverId, text } = await req.json();

        if (!conversationId || !senderId || !receiverId || !text) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const db = await readData();

        const newMessage: Message = {
            id: String(Date.now()),
            conversationId,
            senderId,
            receiverId,
            text,
            timestamp: new Date().toISOString(),
        };

        if (!db.messages) {
            db.messages = [];
        }
        db.messages.push(newMessage);

        await writeData(db);

        return NextResponse.json({ message: 'Message sent successfully', sentMessage: newMessage }, { status: 201 });

    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}
