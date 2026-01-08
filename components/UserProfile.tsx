import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const UserProfile: React.FC = () => {
  const { currentUser, refreshUserProfile } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser?.avatar_url) {
      setPreview(currentUser.avatar_url);
    }
  }, [currentUser]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        alert("La imagen es demasiado grande. Máximo 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (currentUser) {
            try {
                localStorage.setItem(`avatar_${currentUser.id}`, base64String);
                setPreview(base64String);
                refreshUserProfile(); 
            } catch (e) {
                console.error("Error saving to localStorage", e);
                alert("Error al guardar la imagen. Es posible que el almacenamiento local esté lleno.");
            }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentUser) return null;

  const initial = currentUser.username 
    ? currentUser.username.charAt(0).toUpperCase() 
    : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : '?');

  const displayName = currentUser.username || (currentUser.email ? currentUser.email.split('@')[0] : 'Usuario');

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg border border-tech-blue/20 card-glow-border w-full max-w-sm mx-auto mb-8">
        <div className="relative group cursor-pointer" onClick={handleImageClick} title="Cambiar foto de perfil">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-tech-blue/50 shadow-lg shadow-tech-blue/20 bg-gray-700 flex items-center justify-center relative">
                {preview ? (
                    <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl font-bold text-gray-400 select-none">
                        {initial}
                    </span>
                )}
            </div>
            
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            
            <div className="absolute bottom-0 right-0 bg-tech-blue rounded-full p-2 border-2 border-gray-800 shadow-md transform translate-x-1 translate-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </div>
        </div>
        
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
        />

        <h3 className="mt-4 text-xl font-bold text-white font-poppins text-center break-all">{displayName}</h3>
        <p className="text-gray-400 text-sm">{currentUser.email}</p>
        <div className="mt-3 px-3 py-1 rounded-full bg-tech-blue/20 text-tech-cyan text-xs uppercase font-semibold tracking-wider border border-tech-blue/30">
            {currentUser.role === 'admin' ? 'Administrador' : 'Agente'}
        </div>
    </div>
  );
};

export default UserProfile;