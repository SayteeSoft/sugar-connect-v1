import type { UserProfile } from './types';

const allProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Amelia',
    age: 24,
    location: 'London',
    interests: ['Art', 'Travel', 'Fine Dining'],
    bio: 'A student of art history with a passion for exploring new cultures. I enjoy gallery openings, weekend trips to Paris, and discovering hidden culinary gems.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
  {
    id: '2',
    name: 'Oliver',
    age: 35,
    location: 'Manchester',
    interests: ['Business', 'Fitness', 'Watches'],
    bio: 'Entrepreneur with a focus on tech startups. When I\'m not working, I\'m in the gym or planning my next investment. Looking for an intelligent and ambitious partner.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
  {
    id: '3',
    name: 'Isabella',
    age: 28,
    location: 'Edinburgh',
    interests: ['Literature', 'Horses', 'Charity'],
    bio: 'I split my time between managing a family charity foundation and my passion for equestrian sports. A good book and a quiet evening are my idea of heaven.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: false,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'Mixed / Multiple ethnic groups',
  },
  {
    id: '4',
    name: 'George',
    age: 42,
    location: 'Bristol',
    interests: ['Sailing', 'Architecture', 'Jazz'],
    bio: 'Architect with a love for the sea. I spend my weekends sailing along the coast. Searching for a companion to share adventures and quiet moments with.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
  {
    id: '5',
    name: 'Sophia',
    age: 22,
    location: 'Birmingham',
    interests: ['Fashion', 'Social Media', 'Dancing'],
    bio: 'Fashion blogger and social media influencer. My life is fast-paced and exciting. Looking for someone who can keep up and enjoys the finer things.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'Asian / Asian British',
  },
  {
    id: '6',
    name: 'Harry',
    age: 31,
    location: 'London',
    interests: ['Finance', 'Golf', 'Cars'],
    bio: 'Investment banker in the city. Work hard, play hard is my motto. I enjoy weekends on the golf course and driving my sports car.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: false,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
  {
    id: '7',
    name: 'Charlotte',
    age: 29,
    location: 'Leeds',
    interests: ['Yoga', 'Vegan cooking', 'Music'],
    bio: 'Lawyer by day, yoga enthusiast by night. I believe in a balanced life of professional ambition and personal wellness. Seeking a genuine connection.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
  {
    id: '8',
    name: 'Arthur',
    age: 50,
    location: 'Cornwall',
    interests: ['Wine', 'History', 'Gardening'],
    bio: 'Retired surgeon, now a vineyard owner in Cornwall. Life is slower now, and I appreciate the simple pleasures. Looking for a graceful and kind partner.',
    profileImage: 'https://placehold.co/400x400.png',
    isVerified: true,
    gallery: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x400.png',
    ],
    ethnicity: 'White',
  },
];

const conversations = [
    {
      id: 'conv1',
      userId: '2',
      userName: 'Oliver',
      lastMessage: 'I\'m intrigued by your profile. Tell me more about your work.',
      avatar: 'https://placehold.co/400x400.png',
      unreadCount: 2,
    },
    {
      id: 'conv2',
      userId: '4',
      userName: 'George',
      lastMessage: 'I saw you enjoy sailing. We should connect.',
      avatar: 'https://placehold.co/400x400.png',
      unreadCount: 0,
    },
     {
      id: 'conv3',
      userId: '8',
      userName: 'Arthur',
      lastMessage: 'A vineyard sounds lovely. I\'ve always wanted to visit Cornwall.',
      avatar: 'https://placehold.co/400x400.png',
      unreadCount: 0,
    },
];

const messages = {
    conv1: [
        { id: 'msg1', sender: 'Oliver', text: 'Hello, I came across your profile and was very impressed.' },
        { id: 'msg2', sender: 'Me', text: 'Hi Oliver, thank you! Your profile is quite impressive as well.' },
        { id: 'msg3', sender: 'Oliver', text: 'I\'m intrigued by your profile. Tell me more about your work.' },
    ],
    conv2: [
        { id: 'msg1', sender: 'George', text: 'I saw you enjoy sailing. We should connect.' },
    ],
     conv3: [
        { id: 'msg1', sender: 'Arthur', text: 'A vineyard sounds lovely. I\'ve always wanted to visit Cornwall.' },
    ],
};

// Simulate a database
export const db = {
  getProfiles: async () => allProfiles,
  getFeaturedProfiles: async () => allProfiles.slice(0, 4),
  getProfileById: async (id: string) => allProfiles.find(p => p.id === id),
  getProfileByName: async (name: string) => allProfiles.find(p => p.name === name),
  getConversations: async () => conversations,
  getMessages: async () => messages,
  getLocations: async () => [...new Set(allProfiles.map(p => p.location))],
  getAllInterests: async () => [...new Set(allProfiles.flatMap(p => p.interests))],
};
