export interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  profileImage: string;
  isVerified: boolean;
  gallery: string[];
}
