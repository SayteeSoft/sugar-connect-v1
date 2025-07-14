
'use server';

import { getStore } from '@netlify/blobs';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import type { User, Profile, AppData } from '@/types';

const DB_KEY = 'users-db';
const localDbPath = path.join(process.cwd(), 'src', 'lib', 'data.json');

// A robust function to seed initial data in the respective data store.
export const seedInitialData = async (): Promise<AppData> => {
    // Await the hash generation properly
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const initialData: AppData = {
      "users": [
        {
          "id": "1",
          "name": "Admin",
          "email": "saytee.software@gmail.com",
          "passwordHash": passwordHash,
          "age": 49,
          "location": "London, UK",
          "sex": "Male",
          "role": "Admin",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Admin_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p1"
        },
        {
          "id": "4",
          "name": "Darianna",
          "email": "darianna.art@gmail.com",
          "passwordHash": "$2b$10$dJ/zP.E6f2rL/2I1i8X.o.1eP8y.f3h4g5i6j7k8l9m0n1o2p3q4",
          "age": 22,
          "location": "London, UK",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Darianna_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p4"
        },
        {
          "id": "5",
          "name": "Kateryna",
          "email": "kate.marketing@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 24,
          "location": "Birmingham, UK",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Kateryna_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p5"
        },
        {
          "id": "3",
          "name": "Mark",
          "email": "mark.investor@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 45,
          "location": "Edinburgh, UK",
          "sex": "Male",
          "role": "Sugar Daddy",
          "credits": 10,
          "avatarUrl": "/api/uploads/Male_Gemini_Generated_Image_small-002.jpg",
          "profileId": "p3"
        },
        {
          "id": "6",
          "name": "Sofia",
          "email": "sofia@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 26,
          "location": "Cartagena, CO",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Sofia_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p6"
        },
        {
          "id": "7",
          "name": "James",
          "email": "james@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 38,
          "location": "Medellín, CO",
          "sex": "Male",
          "role": "Sugar Daddy",
          "credits": 10,
          "avatarUrl": "/api/uploads/Male_Gemini_Generated_Image_small-002.jpg",
          "profileId": "p7"
        },
        {
          "id": "8",
          "name": "Vanessa",
          "email": "vanessa@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 21,
          "location": "Frankfurt, DE",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Vansessa_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p8"
        },
        {
          "id": "9",
          "name": "Richard",
          "email": "richard@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 49,
          "location": "London, UK",
          "sex": "Male",
          "role": "Sugar Daddy",
          "credits": 10,
          "avatarUrl": "/api/uploads/Male_Gemini_Generated_Image_small-002.jpg",
          "profileId": "p9"
        },
        {
          "id": "10",
          "name": "Olivia",
          "email": "olivia@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 23,
          "location": "Medellín, CO",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Female_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p10"
        },
        {
          "id": "11",
          "name": "William",
          "email": "william@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 45,
          "location": "Cardiff, UK",
          "sex": "Male",
          "role": "Sugar Daddy",
          "credits": 10,
          "avatarUrl": "/api/uploads/Male_Gemini_Generated_Image_small-002.jpg",
          "profileId": "p11"
        },
        {
          "id": "12",
          "name": "Cecilia",
          "email": "cecilia@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 25,
          "location": "Rio, Brazil",
          "sex": "Female",
          "role": "Sugar Baby",
          "credits": "unlimited",
          "avatarUrl": "/api/uploads/Female_Gemini_Generated_Image_small-001.jpg",
          "profileId": "p12"
        },
        {
          "id": "13",
          "name": "George",
          "email": "george@gmail.com",
          "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
          "age": 55,
          "location": "London, UK",
          "sex": "Male",
          "role": "Sugar Daddy",
          "credits": 10,
          "avatarUrl": "/api/uploads/Male_Gemini_Generated_Image_small-002.jpg",
          "profileId": "p13"
        }
      ],
      "profiles": [
        {
          "id": "p1",
          "userId": "1",
          "about": "Site administrator :)",
          "wants": [
            "Financial Support"
          ],
          "interests": [
            "Music"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
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
        },
        {
          "id": "p4",
          "userId": "4",
          "about": "Art student with a love for adventure and exploring new cultures.",
          "wants": [
            "Travel",
            "Mentorship",
            "Fine Dining"
          ],
          "interests": [
            "Art",
            "Photography",
            "Museums"
          ],
          "gallery": [
            "/api/uploads/Darianna_Gemini_Generated_Image_small-002.jpg",
            "/api/uploads/Darianna_Gemini_Generated_Image_small-003.jpg",
            "/api/uploads/Darianna_Gemini_Generated_Image_small-004.jpg"
          ],
          "metCount": 5,
          "notMetCount": 12,
          "votes": {},
          "attributes": {
            "height": "5'5\"",
            "bodyType": "Slim",
            "ethnicity": "White/Caucasian",
            "hairColor": "Blonde",
            "eyeColor": "Blue",
            "smoker": "No",
            "drinker": "Socially",
            "piercings": "Yes",
            "tattoos": "No"
          }
        },
        {
          "id": "p5",
          "userId": "5",
          "about": "Recent graduate starting my career in marketing. I enjoy reading, fitness, and exploring new restaurants.",
          "wants": [
            "Networking",
            "Financial Support",
            "Companionship"
          ],
          "interests": [
            "Reading",
            "Fitness",
            "Cooking",
            "Fashion"
          ],
          "gallery": [
            "/api/uploads/Kateryna_Gemini_Generated_Image_small-002.jpg",
            "/api/uploads/Kateryna_Gemini_Generated_Image_small-003.jpg"
          ],
          "metCount": 2,
          "notMetCount": 8,
          "votes": {},
          "attributes": {
            "height": "5'7\"",
            "bodyType": "Athletic",
            "ethnicity": "White/Caucasian",
            "hairColor": "Brown",
            "eyeColor": "Green",
            "smoker": "No",
            "drinker": "No",
            "piercings": "No",
            "tattoos": "No"
          }
        },
        {
          "id": "p3",
          "userId": "3",
          "about": "Investor and lover of the great outdoors. Looking for a partner to join me on adventures.",
          "wants": [
            "Travel",
            "Adventure",
            "Companionship"
          ],
          "interests": [
            "Travel",
            "Investing",
            "Skiing",
            "Yachting"
          ],
          "gallery": [],
          "metCount": 1,
          "notMetCount": 3,
          "votes": {},
          "attributes": {
            "height": "6'1\"",
            "bodyType": "Average",
            "ethnicity": "White/Caucasian",
            "hairColor": "Brown",
            "eyeColor": "Brown",
            "smoker": "No",
            "drinker": "Socially",
            "piercings": "No",
            "tattoos": "No"
          }
        },
        {
          "id": "p6",
          "userId": "6",
          "about": "A vibrant soul who loves salsa dancing and sunny days.",
          "wants": [
            "Companionship",
            "Fine Dining"
          ],
          "interests": [
            "Dancing",
            "Beach",
            "Cooking"
          ],
          "gallery": [
            "/api/uploads/Sofia_Gemini_Generated_Image_small-002.jpg",
            "/api/uploads/Sofia_Gemini_Generated_Image_small-004.jpg",
            "/api/uploads/Sofia_Gemini_Generated_Image_small-003.jpg"
          ],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p7",
          "userId": "7",
          "about": "Entrepreneur with a passion for technology and travel.",
          "wants": [
            "Adventure",
            "Companionship"
          ],
          "interests": [
            "Tech",
            "Travel",
            "Hiking"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p8",
          "userId": "8",
          "about": "Student of languages, exploring the world one city at a time.",
          "wants": [
            "Travel",
            "Mentorship"
          ],
          "interests": [
            "Languages",
            "Art",
            "History"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p9",
          "userId": "9",
          "about": "A gentleman who appreciates the finer things in life.",
          "wants": [
            "Fine Dining",
            "Theatre",
            "Companionship"
          ],
          "interests": [
            "Wine",
            "Theatre",
            "Cars"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p10",
          "userId": "10",
          "about": "Lover of nature, animals, and quiet evenings.",
          "wants": [
            "Emotional Connection",
            "Companionship"
          ],
          "interests": [
            "Animals",
            "Hiking",
            "Reading"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p11",
          "userId": "11",
          "about": "Building my business and looking for someone to share the journey with.",
          "wants": [
            "Companionship",
            "Travel"
          ],
          "interests": [
            "Business",
            "Golf",
            "Travel"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p12",
          "userId": "12",
          "about": "Life is a party, and I'm looking for a dance partner.",
          "wants": [
            "Adventure",
            "Luxury Lifestyle"
          ],
          "interests": [
            "Dancing",
            "Music",
            "Fashion"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        },
        {
          "id": "p13",
          "userId": "13",
          "about": "Experienced man looking for a genuine connection.",
          "wants": [
            "Companionship",
            "Emotional Connection"
          ],
          "interests": [
            "Reading",
            "History",
            "Gardening"
          ],
          "gallery": [],
          "metCount": 0,
          "notMetCount": 0,
          "votes": {},
          "attributes": {}
        }
      ],
      "messages": [
        {
          "id": "msg1",
          "conversationId": "3-4",
          "senderId": "4",
          "receiverId": "3",
          "text": "Hi Mark, I saw your profile and I'm fascinated by your love for the outdoors!",
          "timestamp": "2024-05-20T10:00:00Z"
        },
        {
          "id": "msg2",
          "conversationId": "3-4",
          "senderId": "3",
          "receiverId": "4",
          "text": "Hi Darianna, thanks for reaching out. Your art is amazing. I'd love to hear more about it.",
          "timestamp": "2024-05-20T10:05:00Z"
        },
        {
          "id": "msg3",
          "conversationId": "3-4",
          "senderId": "4",
          "receiverId": "3",
          "text": "I'd love that! Maybe we could grab a coffee sometime this week?",
          "timestamp": "2024-05-20T10:10:00Z"
        },
        {
          "id": "msg4",
          "conversationId": "3-5",
          "senderId": "5",
          "receiverId": "3",
          "text": "Hey Mark, I noticed you're into investing. I'm just starting my career in marketing and would love to get your perspective on a few things.",
          "timestamp": "2024-05-21T11:00:00Z"
        },
        {
          "id": "msg5",
          "conversationId": "3-5",
          "senderId": "3",
          "receiverId": "5",
          "text": "Kateryna, I'd be happy to chat. I'm always open to mentoring ambitious people.",
          "timestamp": "2024-05-21T11:05:00Z"
        },
        {
          "id": "msg6",
          "conversationId": "6-7",
          "senderId": "6",
          "receiverId": "7",
          "text": "Your travel pictures look incredible! I've always wanted to visit Medellín.",
          "timestamp": "2024-05-22T12:00:00Z"
        },
        {
          "id": "msg7",
          "conversationId": "6-7",
          "senderId": "7",
          "receiverId": "6",
          "text": "You should! It's a beautiful city. Let me know if you ever decide to come, I can show you around.",
          "timestamp": "2024-05-22T12:05:00Z"
        },
        {
          "id": "msg8",
          "conversationId": "7-8",
          "senderId": "8",
          "receiverId": "7",
          "text": "I see you're into tech. I'm studying languages but I'm fascinated by the tech world.",
          "timestamp": "2024-05-23T14:00:00Z"
        },
        {
          "id": "admin-darianna-1",
          "conversationId": "1-4",
          "senderId": "4",
          "receiverId": "1",
          "text": "Hi Admin, I had a question about my profile visibility. Can you help?",
          "timestamp": "2024-05-24T09:00:00Z"
        },
        {
          "id": "admin-darianna-2",
          "conversationId": "1-4",
          "senderId": "1",
          "receiverId": "4",
          "text": "Hello Darianna, of course. What seems to be the issue?",
          "timestamp": "2024-05-24T09:05:00Z"
        },
        {
          "id": "admin-kateryna-1",
          "conversationId": "1-5",
          "senderId": "5",
          "receiverId": "1",
          "text": "Hello, I think there was an error with my last credit purchase.",
          "timestamp": "2024-05-24T10:00:00Z"
        },
        {
          "id": "admin-sofia-1",
          "conversationId": "1-6",
          "senderId": "6",
          "receiverId": "1",
          "text": "Just wanted to say I love the new layout!",
          "timestamp": "2024-05-24T11:00:00Z"
        },
        {
          "id": "admin-vanessa-1",
          "conversationId": "1-8",
          "senderId": "8",
          "receiverId": "1",
          "text": "Is there a way to report a suspicious profile?",
          "timestamp": "2024-05-24T12:00:00Z"
        },
        {
          "id": "admin-vanessa-2",
          "conversationId": "1-8",
          "senderId": "1",
          "receiverId": "8",
          "text": "Hi Vanessa, yes, you can report a profile directly from their page using the flag icon. We will investigate it immediately.",
          "timestamp": "2024-05-24T12:05:00Z"
        }
      ]
    };

    if (process.env.NODE_ENV === 'production') {
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
    if (process.env.NODE_ENV === 'production') {
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
    if (process.env.NODE_ENV === 'production') {
        const store = getStore('data');
        await store.setJSON(DB_KEY, data);
    } else {
        await fs.writeFile(localDbPath, JSON.stringify(data, null, 2));
    }
};

    