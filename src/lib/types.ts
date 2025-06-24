export interface UserProfile {
  id: string;
  name: string;
  age: number;
  email: string;
  location: string;
  interests: string[];
  bio: string;
  profileImage: string;
  isVerified: boolean;
  gallery: string[];
  ethnicity: string;
}
