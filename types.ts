export type LocalizedString = {
  es: string;
  pt: string;
};

export interface Flashcard {
  question: LocalizedString;
  answer: LocalizedString;
  explanation: LocalizedString;
}

export interface Module {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    image: string;
  };
  content: {
    learnTitle: LocalizedString;
    points: LocalizedString[];
    mediaSrc?: string;
  };
  resources: {
    title: LocalizedString;
    downloads: {
      text: LocalizedString;
      url: string;
    }[];
  };
  videos?: {
    title: LocalizedString;
    embedUrl: string;
  }[];
  flashcards?: Flashcard[];
}

// FIX: Added missing types for the Forum feature.
// These types are used in ForumContext and related pages to provide type safety
// for data fetched from the database.
export interface ForumSection {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ForumThread {
  id: string;
  section_id: string;
  user_id: string;
  title: string;
  created_at: string;
  author_username?: string;
  reply_count?: number;
}

export interface ForumPost {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_username?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'student' | 'admin';
  is_blocked?: boolean;
  has_lifetime_access?: boolean;
  has_accepted_rules?: boolean;
  username?: string;
  avatar_url?: string;
}