
import type { Testimonial, Role, TestimonialRole, User, Profile } from '@/types';

// This file provides static data for UI elements and should not be used as a database.
// Dynamic user data should be fetched from the API.

export const testimonials: Testimonial[] = [
    { name: 'Darianna', role: 'Sugar Baby', quote: "Art student with a love for adventure and exploring new cultures.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Kateryna', role: 'Sugar Baby', quote: "Recent graduate starting my career in marketing.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Mark', role: 'Sugar Daddy', quote: "Investor and lover of the great outdoors.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Sofia', role: 'Sugar Baby', quote: "Fashion designer with an eye for beauty and a heart for adventure.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'James', role: 'Sugar Daddy', quote: "Tech CEO who works hard and plays harder.", avatarUrl: 'https://placehold.co/40x40.png' },
];

export const wantOptions = [
    { value: "Mentorship", label: "Mentorship" },
    { value: "Financial Support", label: "Financial Support" },
    { value: "Networking", label: "Networking" },
    { value: "Travel", label: "Travel" },
    { value: "Luxury Lifestyle", label: "Luxury Lifestyle" },
    { value: "Shopping Sprees", label: "Shopping Sprees" },
    { value: "Fine Dining", label: "Fine Dining" },
    { value: "No Strings Attached", label: "No Strings Attached" },
    { value: "Discreet Arrangement", label: "Discreet Arrangement" },
    { value: "Emotional Connection", label: "Emotional Connection" },
    { value: "Companionship", label: "Companionship" },
    { value: "Adventure", label: "Adventure" },
];

export const interestOptions = [
    { value: "Art", label: "Art" },
    { value: "Travel", label: "Travel" },
    { value: "Fine Dining", label: "Fine Dining" },
    { value: "Theatre", label: "Theatre" },
    { value: "Wine Tasting", label: "Wine Tasting" },
    { value: "Sports", label: "Sports" },
    { value: "Music", label: "Music" },
    { value: "Movies", label: "Movies" },
    { value: "Reading", label: "Reading" },
    { value: "Cooking", label: "Cooking" },
    { value: "Fitness", label: "Fitness" },
    { value: "Photography", label: "Photography" },
    { value: "Fashion", label: "Fashion" },
    { value: "Technology", label: "Technology" },
    { value: "Yachting", label: "Yachting" },
    { value: "Investing", label: "Investing" },
    { value: "Museums", label: "Museums" },
    { value: "Concerts", label: "Concerts" },
    { value: "Skiing", label: "Skiing" },
];

// Mock user and profile data for UI component development where API data isn't needed.
// This is NOT the source of truth for the application.
export const mockUsers = [
    {
      "id": "1",
      "name": "Admin",
      "email": "saytee.software@gmail.com",
      "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
      "age": 49,
      "location": "London, UK",
      "role": "Admin" as Role,
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Admin_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p1"
    },
    {
      "id": "4",
      "name": "Darianna",
      "email": "darianna.art@example.com",
      "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
      "age": 22,
      "location": "London, UK",
      "role": "Sugar Baby" as Role,
      "credits": "unlimited",
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p4"
    },
    {
      "id": "5",
      "name": "Kateryna",
      "email": "kate.marketing@example.com",
      "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
      "age": 24,
      "location": "Birmingham, UK",
      "role": "Sugar Baby" as Role,
      "credits": "unlimited",
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p5"
    },
     {
      "id": "3",
      "name": "Mark",
      "email": "mark.investor@example.com",
      "passwordHash": "$2b$10$NotARealHashJustForShow.u6bA/3K/dIs43y/c6i26.46",
      "age": 45,
      "location": "Edinburgh, UK",
      "role": "Sugar Daddy" as Role,
      "credits": 10,
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p3"
    }
] as User[];

export const mockProfiles = [
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
] as Profile[];


export const featuredProfiles = mockUsers.filter(u => u.role !== 'Admin').slice(0, 4);
