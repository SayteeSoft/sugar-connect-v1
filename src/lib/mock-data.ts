
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
export const mockUsers: Omit<User, 'passwordHash'>[] = [
    {
      "id": "1",
      "name": "Admin",
      "email": "saytee.software@gmail.com",
      "age": 49,
      "location": "London, UK",
      "role": "Admin",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Admin_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p1"
    },
    {
      "id": "4",
      "name": "Darianna",
      "email": "darianna.art@gmail.com",
      "age": 22,
      "location": "London, UK",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Darianna_Gemini_Generated_Image(small)-001.jpg",
      "profileId": "p4"
    },
    {
      "id": "5",
      "name": "Kateryna",
      "email": "kate.marketing@gmail.com",
      "age": 24,
      "location": "Birmingham, UK",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Kateryna_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p5"
    },
    {
      "id": "3",
      "name": "Mark",
      "email": "mark.investor@gmail.com",
      "age": 45,
      "location": "Edinburgh, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "/profile-images/Male_Gemini_Generated_Image (small)-002.jpg",
      "profileId": "p3"
    },
    {
      "id": "6",
      "name": "Sofia",
      "email": "sofia@gmail.com",
      "age": 26,
      "location": "Cartagena, CO",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Sofia_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p6"
    },
    {
      "id": "7",
      "name": "James",
      "email": "james@gmail.com",
      "age": 38,
      "location": "Medellín, CO",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "/profile-images/Male_Gemini_Generated_Image (small)-002.jpg",
      "profileId": "p7"
    },
    {
      "id": "8",
      "name": "Vanessa",
      "email": "vanessa@gmail.com",
      "age": 21,
      "location": "Frankfurt, DE",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Vansessa_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p8"
    },
    {
      "id": "9",
      "name": "Richard",
      "email": "richard@gmail.com",
      "age": 49,
      "location": "London, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "/profile-images/Male_Gemini_Generated_Image (small)-002.jpg",
      "profileId": "p9"
    },
    {
      "id": "10",
      "name": "Olivia",
      "email": "olivia@gmail.com",
      "age": 23,
      "location": "Medellín, CO",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Female_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p10"
    },
    {
      "id": "11",
      "name": "William",
      "email": "william@gmail.com",
      "age": 45,
      "location": "Cardiff, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "/profile-images/Male_Gemini_Generated_Image (small)-002.jpg",
      "profileId": "p11"
    },
    {
      "id": "12",
      "name": "Cecilia",
      "email": "cecilia@gmail.com",
      "age": 25,
      "location": "Rio, Brazil",
      "role": "Sugar Baby",
      "credits": "unlimited",
      "avatarUrl": "/profile-images/Female_Gemini_Generated_Image (small)-001.jpg",
      "profileId": "p12"
    },
    {
      "id": "13",
      "name": "George",
      "email": "george@gmail.com",
      "age": 55,
      "location": "London, UK",
      "role": "Sugar Daddy",
      "credits": 10,
      "avatarUrl": "/profile-images/Male_Gemini_Generated_Image (small)-002.jpg",
      "profileId": "p13"
    }
];

export const mockProfiles: Profile[] = [];

export const featuredProfiles = mockUsers.filter(u => u.role !== 'Admin').slice(0, 4);
