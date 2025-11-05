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

// FIX: Added missing CRM type definitions.
// CRM Types
export type PropertyType = 'Piso' | 'Chalet' | 'Adosado' | 'Local' | 'Oficina' | 'Terreno';
export type PropertyStatus = 'Captación' | 'En Venta' | 'En Alquiler' | 'Reservado' | 'Vendido' | 'Alquilado';

export interface Property {
  id: string;
  user_id: string;
  created_at: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  area: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string;
  photos: string[];
}

export type ContactStatus = 'Lead' | 'Cliente Comprador' | 'Cliente Vendedor' | 'Pasado Cliente' | 'Colaborador';

export interface Contact {
  id: string;
  user_id: string;
  created_at: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  status: ContactStatus;
  notes?: string | null;
}

// FIX: Added missing Forum type definitions.
// Forum Types
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
  author_username?: string | null;
  reply_count?: number | null;
}

export interface ForumPost {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_username?: string | null;
}
