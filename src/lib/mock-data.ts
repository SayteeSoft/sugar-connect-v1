
import type { User, Profile, Testimonial } from '@/types';

// In a real app, you'd fetch this data from a database.
// The initial state is loaded from this file, and then updated
// in memory and via the API for persistence during local development.
export let users: User[] = [
    {
      "id": "1",
      "name": "Admin",
      "email": "saytee.software@gmail.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 49,
      "location": "London, UK",
      "role": "Admin",
      "credits": "unlimited",
      "avatarUrl": "/public/profile-images/Admin_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p1"
    },
    {
      "id": "2",
      "name": "James",
      "email": "james.tech@example.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 38,
      "location": "Manchester, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p2"
    },
    {
      "id": "3",
      "name": "Mark",
      "email": "mark.investor@example.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 45,
      "location": "Edinburgh, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p3"
    },
    {
      "id": "4",
      "name": "Darianna",
      "email": "darianna.art@example.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 22,
      "location": "London, UK",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p4"
    },
    {
      "id": "5",
      "name": "Kateryna",
      "email": "kate.marketing@example.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 24,
      "location": "Birmingham, UK",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p5"
    },
    {
      "id": "6",
      "name": "Sofia",
      "email": "sofia.design@example.com",
      "passwordHash": "$2b$10$K7L1J2i/WH3a.tZ2z.eNbu8s/.wLqaS4D1e5e.w2a0e4c5b6d7e8f",
      "age": 26,
      "location": "London, UK",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "https://placehold.co/400x400.png",
      "profileId": "p6"
    }
  ];
export let profiles: Profile[] = [
    {
      "id": "p1",
      "userId": "1",
      "about": "Site administrator.",
      "wants": [],
      "interests": [],
      "gallery": [],
      "attributes": {
        "ethnicity": "Black/African Decent",
        "height": "6'0\"",
        "bodyType": "Athletic",
        "hairColor": "Black",
        "eyeColor": "Brown",
        "smoker": "No",
        "drinker": "No",
        "piercings": "No",
        "tattoos": "No"
      }
    },
    {
      "id": "p2",
      "userId": "2",
      "about": "Tech CEO who works hard and plays harder.",
      "wants": [
        "Mentorship",
        "Travel"
      ],
      "interests": [
        "Fine dining",
        "Technology",
        "Yachting"
      ],
      "gallery": [],
      "attributes": {
        "height": "6'1\"",
        "bodyType": "Athletic",
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
      "id": "p3",
      "userId": "3",
      "about": "Investor and lover of the great outdoors.",
      "wants": [
        "Adventure",
        "Companionship"
      ],
      "interests": [
        "Hiking",
        "Investing",
        "Wine tasting"
      ],
      "gallery": [],
      "attributes": {
        "height": "5'11\"",
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
      "id": "p4",
      "userId": "4",
      "about": "Art student with a love for adventure and exploring new cultures.",
      "wants": [
        "Financial Support",
        "Travel"
      ],
      "interests": [
        "Painting",
        "Museums",
        "Photography"
      ],
      "gallery": [],
      "attributes": {
        "height": "5'5\"",
        "bodyType": "Slim",
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
      "id": "p5",
      "userId": "5",
      "about": "Recent graduate starting my career in marketing.",
      "wants": [
        "Mentorship",
        "Networking"
      ],
      "interests": [
        "Social media",
        "Fashion",
        "Concerts"
      ],
      "gallery": [],
      "attributes": {
        "height": "5'7\"",
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
      "about": "Fashion designer with an eye for beauty and a heart for adventure.",
      "wants": [
        "Luxury lifestyle",
        "Spoiling"
      ],
      "interests": [
        "Haute couture",
        "Skiing",
        "Art galleries"
      ],
      "gallery": [],
      "attributes": {
        "height": "5'6\"",
        "bodyType": "Slim",
        "ethnicity": "White/Caucasian",
        "hairColor": "Brown",
        "eyeColor": "Brown",
        "smoker": "No",
        "drinker": "Socially",
        "piercings": "No",
        "tattoos": "No"
      }
    }
  ];


export const testimonials: Testimonial[] = [
    { name: 'Darianna', role: 'Sugar Baby', quote: "Art student with a love for adventure and exploring new cultures.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Kateryna', role: 'Sugar Baby', quote: "Recent graduate starting my career in marketing.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Mark', role: 'Sugar Daddy', quote: "Investor and lover of the great outdoors.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'Sofia', role: 'Sugar Baby', quote: "Fashion designer with an eye for beauty and a heart for adventure.", avatarUrl: 'https://placehold.co/40x40.png' },
    { name: 'James', role: 'Sugar Daddy', quote: "Tech CEO who works hard and plays harder.", avatarUrl: 'https://placehold.co/40x40.png' },
];

export const featuredProfiles = users.filter(u => u.role !== 'Admin').slice(0, 4);

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
