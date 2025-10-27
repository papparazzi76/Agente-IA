import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCRM } from '../../contexts/CRMContext';
import { Property, PropertyStatus, PropertyType } from '../../types';

const propertyTypeOptions: PropertyType[] = ['Piso', 'Chalet', 'Adosado', 'Local', 'Oficina', 'Terreno'];
const propertyStatusOptions: PropertyStatus[] = ['Captación', 'En Venta', 'En Alquiler', 'Reservado', 'Vendido', 'Alquilado'];

const PropertyFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { upsertProperty, getProperty, uploadPropertyPhoto, loading: crmLoading } = useCRM();

    const [property, setProperty] = useState<Partial<Property>>({
        address: '',
        price: 0,
        type: 'Piso',
        status: 'En Venta',
        area: 0,
        bedrooms: 1,
        bathrooms: 1,
        description: '',
        features: '',
        photos: []
    });
    const [isUploading, setIsUploading] = useState(false);

    const isEditing = Boolean(id);

    const fetchPropertyData = useCallback(() => {
        if (isEditing) {
            const existingProperty = getProperty(id);
            if (existingProperty) {
                setProperty(existingProperty);
            }
        }
    }, [id, isEditing, getProperty]);

    useEffect(() => {
        fetchPropertyData();
    }, [fetchPropertyData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProperty(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setIsUploading(true);
        const files = Array.from(e.target.files);
        const uploadedUrls = await Promise.all(
            files.map(file => uploadPropertyPhoto(file))
        );
        const validUrls = uploadedUrls.filter((url): url is string => url !== null);
        setProperty(prev => ({ ...prev, photos: [...(prev.photos || []), ...validUrls] }));
        setIsUploading(false);
    };

    const handleRemovePhoto = (urlToRemove: string) => {
        setProperty(prev => ({ ...prev, photos: prev.photos?.filter(url => url !== urlToRemove) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await upsertProperty(property);
        if (result) {
            navigate(`/crm/properties/${result.id}`);
        } else {
            alert('Error al guardar la propiedad.');
        }
    };
    
    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <h2 className="text-3xl font-bold font-poppins text-pure-white mb-6">
                {isEditing ? 'Editar Propiedad' : 'Añadir Nueva Propiedad'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Dirección</label>
                    <input type="text" name="address" value={property.address} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Precio (€)</label>
                        <input type="number" name="price" value={property.price} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
                        <select name="type" value={property.type} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            {propertyTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                        <select name="status" value={property.status} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                            {propertyStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">Superficie (m²)</label>
                        <input type="number" name="area" value={property.area} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-300 mb-1">Habitaciones</label>
                        <input type="number" name="bedrooms" value={property.bedrooms} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-300 mb-1">Baños</label>
                        <input type="number" name="bathrooms" value={property.bathrooms} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                </div>
                
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                    <textarea name="description" value={property.description} onChange={handleChange} rows={6} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div>
                    <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-1">Características (separadas por comas)</label>
                    <input type="text" name="features" value={property.features} onChange={handleChange} placeholder="Piscina, Garaje, Terraza soleada..." className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Fotos</label>
                    <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {property.photos?.map(url => (
                            <div key={url} className="relative group">
                                <img src={url} alt="Property" className="w-full h-24 object-cover rounded-md" />
                                <button type="button" onClick={() => handleRemovePhoto(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        <label className="w-full h-24 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-800">
                            <div className="text-center">
                                {isUploading ? (
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-tech-blue mx-auto"></div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                )}
                            </div>
                            <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/crm/properties')} className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                    <button type="submit" disabled={crmLoading || isUploading} className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-500">
                        {crmLoading ? 'Guardando...' : 'Guardar Propiedad'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyFormPage;