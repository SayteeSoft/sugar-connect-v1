
import { z } from "zod";

export type Role = 'Sugar Daddy' | 'Sugar Baby' | 'Admin';
export type TestimonialRole = 'Sugar Daddy' | 'Sugar Baby';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  location: string;
  sex?: 'Male' | 'Female';
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
  metCount?: number;
  notMetCount?: number;
  votes?: Record<string, 'met' | 'notMet'>;
  attributes: {
    bodyType?: 'Slim' | 'Athletic' | 'Average' | 'Curvy';
    hairColor?: 'Brown' | 'Black' | 'Blonde' | 'Chestnut' | 'Grey' | 'Auburn' | 'Red';
    smoker?: 'Yes' | 'Socially' | 'Sometimes' | 'No';
    piercings?: 'Yes' | 'No';
    height?: string;
    ethnicity?: 'Black/African Decent' | 'North/African Decent' | 'East Asian' | 'South Asian' | 'Hispanic/Latino' | 'Middle Eastern' | 'Native America/Indegenious' | 'White/Caucasian';
    eyeColor?: 'Blue' | 'Brown' | 'Green' | 'Grey' | 'Hazel';
    drinker?: 'Yes' | 'Socially' | 'Sometimes' | 'No';
    tattoos?: 'Yes' | 'No';
  };
}

export interface Testimonial {
  name: string;
  role: TestimonialRole;
  quote: string;
  avatarUrl: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.union([
    z.string(), // For existing image URLs
    z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
]);

const avatarFileSchema = z.union([
    z.string(),
    z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
]).optional();


// We can infer the type from the zod schema used in the profile page
export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  blank: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  sex: z.enum(["Male", "Female"]).optional(),
  role: z.enum(["Sugar Daddy", "Sugar Baby", "Admin"]),
  location: z.string().min(2, "Location is required."),
  about: z.string().optional(),
  wants: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  interests: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  age: z.coerce.number().min(18, "You must be at least 18."),
  height: z.string().optional(),
  bodyType: z.enum(["Slim", "Athletic", "Average", "Curvy"]).optional(),
  ethnicity: z.enum(["White/Caucasian", "Black/African Decent", "North/African Decent", "East Asian", "South Asian", "Hispanic/Latino", "Middle Eastern", "Native America/Indegenious"]).optional(),
  hairColor: z.enum(["Brown", "Black", "Blonde", "Chestnut", "Grey", "Auburn", "Red"]).optional(),
  eyeColor: z.enum(["Blue", "Brown", "Green", "Grey", "Hazel"]).optional(),
  smoker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  drinker: z.enum(["Yes", "Socially", "Sometimes", "No"]).optional(),
  piercings: z.enum(["Yes", "No"]).optional(),
  tattoos: z.enum(["Yes", "No"]).optional(),
  avatar: avatarFileSchema,
  gallery: z.array(z.union([fileSchema, z.object({ file: fileSchema })])).optional().default([]),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
