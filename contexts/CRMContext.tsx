import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { supabase } from '../supabase';
import { useAuth } from './AuthContext';
import { Property, Contact } from '../types';

interface CRMContextType {
  properties: Property[];
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  fetchContacts: () => Promise<void>;
  getProperty: (id: string) => Property | undefined;
  getContact: (id: string) => Contact | undefined;
  upsertProperty: (propertyData: Partial<Property>) => Promise<Property | null>;
  upsertContact: (contactData: Partial<Contact>) => Promise<Contact | null>;
  deleteProperty: (id: string) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  uploadPropertyPhoto: (file: File) => Promise<string | null>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (dbError) {
        console.error('Error fetching properties:', dbError.message);
        setError('No se pudieron cargar las propiedades. Esto puede deberse a un problema de permisos en la base de datos. Por favor, asegúrate de que la seguridad a nivel de fila (RLS) está configurada correctamente en tu tabla "properties" de Supabase.');
    } else {
        setProperties(data || []);
    }
    setLoading(false);
  }, [currentUser]);

  const fetchContacts = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });
    if (dbError) {
        console.error('Error fetching contacts:', dbError.message);
        setError('No se pudieron cargar los contactos. Por favor, asegúrate de que la seguridad a nivel de fila (RLS) está configurada correctamente en tu tabla "contacts" de Supabase.');
    } else {
        setContacts(data || []);
    }
    setLoading(false);
  }, [currentUser]);

  const getProperty = (id: string) => properties.find(p => p.id === id);
  const getContact = (id: string) => contacts.find(c => c.id === id);

  const upsertProperty = async (propertyData: Partial<Property>) => {
    if (!currentUser) return null;
    setLoading(true);
    setError(null);
    const dataToUpsert = { ...propertyData, user_id: currentUser.id };
    const { data, error: dbError } = await supabase.from('properties').upsert(dataToUpsert).select().single();
    if (dbError) {
        console.error('Error upserting property', dbError.message);
        setError(`Error al guardar la propiedad: ${dbError.message}`);
        setLoading(false);
        return null;
    }
    await fetchProperties();
    setLoading(false);
    return data;
  };
  
  const upsertContact = async (contactData: Partial<Contact>) => {
    if (!currentUser) return null;
    setLoading(true);
    setError(null);
    const dataToUpsert = { ...contactData, user_id: currentUser.id };
    const { data, error: dbError } = await supabase.from('contacts').upsert(dataToUpsert).select().single();
     if (dbError) {
        console.error('Error upserting contact', dbError.message);
        setError(`Error al guardar el contacto: ${dbError.message}`);
        setLoading(false);
        return null;
    }
    await fetchContacts();
    setLoading(false);
    return data;
  };

  const deleteProperty = async (id: string) => {
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from('properties').delete().eq('id', id);
    if (dbError) {
        console.error('Error deleting property', dbError.message);
        setError(`Error al eliminar la propiedad: ${dbError.message}`);
    } else {
        await fetchProperties();
    }
    setLoading(false);
  };
  
  const deleteContact = async (id: string) => {
    setLoading(true);
    setError(null);
    const { error: dbError } = await supabase.from('contacts').delete().eq('id', id);
    if (dbError) {
        console.error('Error deleting contact', dbError.message);
        setError(`Error al eliminar el contacto: ${dbError.message}`);
    } else {
        await fetchContacts();
    }
    setLoading(false);
  };
  
  const uploadPropertyPhoto = async (file: File) => {
      if (!currentUser) return null;
      setError(null);
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`;
      
      const { data, error: storageError } = await supabase.storage
        .from('property-photos')
        .upload(fileName, file);

      if (storageError) {
          console.error('Error uploading file:', storageError.message);
          setError(`Error al subir la foto: ${storageError.message}`);
          return null;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('property-photos').getPublicUrl(data.path);
      return publicUrl;
  };

  const value = {
    properties,
    contacts,
    loading,
    error,
    fetchProperties,
    fetchContacts,
    getProperty,
    getContact,
    upsertProperty,
    upsertContact,
    deleteProperty,
    deleteContact,
    uploadPropertyPhoto,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};