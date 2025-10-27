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
  video?: {
    title: LocalizedString;
    embedUrl: string;
  };
  flashcards?: Flashcard[];
}

export type PropertyType = 'Piso' | 'Chalet' | 'Adosado' | 'Local' | 'Oficina' | 'Terreno';
export type PropertyStatus = 'Captación' | 'En Venta' | 'En Alquiler' | 'Reservado' | 'Vendido' | 'Alquilado';

export interface Property {
  id: string;
  user_id: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  area: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string;
  photos: string[]; // URLs from Supabase Storage
  created_at: string;
}

export type ContactStatus = 'Lead' | 'Cliente Comprador' | 'Cliente Vendedor' | 'Pasado Cliente' | 'Colaborador';

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  status: ContactStatus;
  notes?: string;
  created_at: string;
}