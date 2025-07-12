import type { User, Profile, Testimonial } from '@/types';
import data from './data.json';

// In a real app, you'd fetch this data from a database.
// For our local dev environment, we'll read from a JSON file.
export let users: User[] = data.users;
export let profiles: Profile[] = data.profiles;


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
