
import { z } from "zod";

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
  role: Role;
  quote: string;
  avatarUrl: string;
}

// We can infer the type from the zod schema used in the profile page
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["Sugar Daddy", "Sugar Baby", "Admin"]),
  location: z.string().min(2, "Location is required."),
  about: z.string().optional(),
  wants: z.array(z.object({ value: z.string() })).optional(),
  interests: z.array(z.object({ value: z.string() })).optional(),
  age: z.coerce.number().min(18, "You must be at least 18."),
  height: z.coerce.number().optional(),
  bodyType: z.enum(["Slim", "Athletic", "Average", "Curvy"]).optional(),
  ethnicity: z.enum(["White/Caucasian", "Black/African Decent", "North/African Decent", "East Asian", "South Asian", "Hispanic/Latino", "Middle Eastern", "Native America/Indegenious"]).optional(),
  hairColor: z.enum(["Brown", "Black", "Blonde", "Chestnut", "Grey", "Auburn", "Red"]).optional(),
  eyeColor: z.enum(["Blue", "Brown", "Green", "Grey", "Hazel"]).optional(),
  smoker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  drinker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  piercings: z.enum(["Yes", "No"]).optional(),
  tattoos: z.enum(["Yes", "No"]).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
