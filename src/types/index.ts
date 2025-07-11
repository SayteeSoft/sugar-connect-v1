export type Role = 'Sugar Daddy' | 'Sugar Baby' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  role: Role;
  credits: number | 'unlimited';
  avatarUrl: string;
  profileId: string;
}

export interface Profile {
  id: string;
  userId: string;
  about: string;
  wants: string[];
  interests: string[];
  gallery: string[];
  attributes: {
    bodyType?: 'Slim' | 'Athletic' | 'Average' | 'Curvy';
    hairColor?: 'Brown' | 'Black' | 'Blonde' | 'Chestnut' | 'Grey' | 'Auburn' | 'Red';
    smoker?: 'Yes' | 'Socially' | 'Sometimes' | 'No';
    piercings?: 'Yes' | 'No';
    height?: number; // in cm
    ethnicity?: 'Black/African Decent' | 'North/African Decent' | 'East Asian' | 'South Asian' | 'Hispanic/Latino' | 'Middle Eastern' | 'Native America/Indegenious' | 'White/Caucasian';
    eyeColor?: 'Blue' | 'Brown' | 'Green' | 'Grey' | 'Hazel';
    drinker?: 'Yes' | 'Socially' | 'Sometimes' | 'No';
    tattoos?: 'Yes' | 'No';
  };
}

export interface Testimonial {
  name: string;
  quote: string;
  avatarUrl: string;
}
