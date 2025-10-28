import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCRM } from '../../contexts/CRMContext';
import { Property } from '../../types';
import AIToolModal from '../../components/crm/AIToolModal';

type AiTool = 'adCopy';

const PropertyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProperty, fetchProperties, loading, deleteProperty, upsertProperty } = useCRM();
    const [property, setProperty] = useState<Property | null>(null);
    const [activeTool, setActiveTool] = useState<AiTool | null>(null);

    const fetchProperty = useCallback(() => {
        if (id) {
            const prop = getProperty(id);
            if (prop) {
                setProperty(prop);
            }
        }
    }, [id, getProperty]);

    useEffect(() => {
        // Fetch all properties first to ensure getProperty works on direct navigation
        fetchProperties().then(() => {
            if (id) {
                const prop = getProperty(id);
                if (prop) {
                    setProperty(prop);
                }
            }
        });
    }, [id, fetchProperties, getProperty]);

    const handleDelete = async () => {
        if (property && window.confirm(`¿Estás seguro de que quieres eliminar la propiedad en ${property.address}?`)) {
            await deleteProperty(property.id);
            navigate('/crm/properties');
        }
    };
    
    const handleSaveFromTool = async (updates: Partial<Property>) => {
        if (property) {
            const updated = await upsertProperty({ ...property, ...updates });
            if (updated) {
                setProperty(updated);
                setActiveTool(null);
            }
        }
    }

    if (loading && !property) {
        return <div className="text-center p-8">Cargando propiedad...</div>;
    }

    if (!property) {
        return <div className="text-center p-8">Propiedad no encontrada.</div>;
    }

    return (
        <>
            <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-3xl font-bold font-poppins text-pure-white">{property.address}</h2>
                        <span className={`px-3 py-1 text-sm font-bold rounded-full ${property.status === 'En Venta' || property.status === 'En Alquiler' ? 'bg-green-500/20 text-green-300' : 'bg-gray-600 text-gray-300'}`}>{property.status}</span>
                    </div>
                    <div className="flex gap-2">
                        <Link to={`/crm/properties/${property.id}/edit`} className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">Editar</Link>
                         <button onClick={handleDelete} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Eliminar</button>
                    </div>
                </div>

                {/* Photo Gallery */}
                {property.photos && property.photos.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="md:col-span-2">
                            <img src={property.photos[0]} alt="Main" className="w-full h-96 object-cover rounded-lg" loading="lazy" decoding="async"/>
                        </div>
                        {property.photos.slice(1).map((photo, index) => (
                             <img key={index} src={photo} alt={`View ${index + 1}`} className="w-full h-48 object-cover rounded-lg" loading="lazy" decoding="async"/>
                        ))}
                     </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold font-poppins text-tech-cyan mb-4">Detalles Principales</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="text-center"><div className="text-gray-400 text-sm">Precio</div><div className="font-bold text-lg">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(property.price)}</div></div>
                                <div className="text-center"><div className="text-gray-400 text-sm">Tipo</div><div className="font-bold text-lg">{property.type}</div></div>
                                <div className="text-center"><div className="text-gray-400 text-sm">Superficie</div><div className="font-bold text-lg">{property.area} m²</div></div>
                                <div className="text-center"><div className="text-gray-400 text-sm">Habitaciones</div><div className="font-bold text-lg">{property.bedrooms}</div></div>
                                <div className="text-center"><div className="text-gray-400 text-sm">Baños</div><div className="font-bold text-lg">{property.bathrooms}</div></div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold font-poppins text-tech-cyan mb-4">Descripción</h3>
                            <p className="whitespace-pre-wrap">{property.description || 'No hay descripción disponible.'}</p>
                        </div>
                        
                         <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold font-poppins text-tech-cyan mb-4">Características</h3>
                             <div className="flex flex-wrap gap-2">
                                {property.features?.split(',').map((feat, i) => feat.trim() && <span key={i} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">{feat.trim()}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* AI Tools */}
                    <aside>
                        <div className="bg-gray-800/50 p-6 rounded-lg sticky top-24">
                            <h3 className="text-xl font-bold font-poppins text-tech-cyan mb-4">Asistente IA</h3>
                            <div className="space-y-3">
                                <button onClick={() => setActiveTool('adCopy')} className="w-full text-left bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors">Generar Anuncios</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
             {activeTool && (
                <AIToolModal
                    tool={activeTool}
                    property={property}
                    onClose={() => setActiveTool(null)}
                    onSaveDescription={(text) => handleSaveFromTool({ description: text })}
                />
            )}
        </>
    );
};

export default PropertyDetailPage;
