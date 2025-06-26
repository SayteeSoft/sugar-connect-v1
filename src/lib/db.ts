
import type { UserProfile } from './types';
import rawData from './mock-data.json';

// Data is now mutable to simulate a database.
// We parse the raw JSON data and convert date strings to Date objects.
const allProfiles: UserProfile[] = rawData.allProfiles.map(p => ({
  ...p,
  // Assuming allProfiles in JSON has string dates
  createdAt: new Date(p.createdAt),
  lastActive: new Date(p.lastActive),
}));

let conversations = rawData.conversations as {
    id: string;
    userId: string;
    userName: string;
    lastMessage: string;
    avatar: string;
    unreadCount: number;
}[];

type Messages = { [key: string]: { id: string; sender: string; text: string }[] };
let messages: Messages = rawData.messages;

let favorites = rawData.favorites;
let visitors = rawData.visitors;
let viewed = rawData.viewed;


// Simulate a database
export const db = {
  getProfiles: async () => allProfiles,
  getFeaturedProfiles: async () => allProfiles.slice(0, 4),
  getProfileById: async (id: string) => allProfiles.find(p => p.id === id),
  getProfileByName: async (name: string) => allProfiles.find(p => p.name === name),
  updateProfile: async (id: string, data: Partial<UserProfile>) => {
    const profileIndex = allProfiles.findIndex(p => p.id === id);
    if (profileIndex > -1) {
      allProfiles[profileIndex] = { ...allProfiles[profileIndex], ...data };
      return allProfiles[profileIndex];
    }
    return null;
  },
  getConversations: async () => conversations.map(c => ({...c, avatar: allProfiles.find(p => p.id === c.userId)?.profileImage || c.avatar})),
  getMessages: async () => messages,
  getLocations: async () => [...new Set(allProfiles.map(p => p.location))],
  getAllInterests: async () => [...new Set(allProfiles.flatMap(p => p.interests))],
  getFavorites: async () => allProfiles.filter(p => favorites.includes(p.id)),
  getVisitors: async () => allProfiles.filter(p => visitors.includes(p.id)),
  getViewed: async () => allProfiles.filter(p => viewed.includes(p.id)),
};
