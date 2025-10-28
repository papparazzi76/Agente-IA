import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCRM } from '../../contexts/CRMContext';
import { Property } from '../../types';

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <Link to={`/crm/properties/${property.id}`} className="block bg-gray-800/50 rounded-lg overflow-hidden border border-tech-blue/20 group card-glow-border">
        <div className="relative h-48 bg-gray-700">
            {property.photos && property.photos.length > 0 ? (
                <img 
                  src={property.photos[0]} 
                  alt={property.address} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            )}
             <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-black/50 rounded-full">{property.status}</div>
        </div>
        <div className="p-4">
            <p className="font-bold text-lg truncate text-pure-white">{property.address}</p>
            <p className="text-tech-cyan font-semibold text-xl">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(property.price)}</p>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{property.bedrooms} hab.</span>
                <span>{property.bathrooms} baños</span>
                <span>{property.area} m²</span>
            </div>
        </div>
    </Link>
);


const PropertiesListPage: React.FC = () => {
    const { properties, fetchProperties, loading, error } = useCRM();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);
    
    const filteredProperties = useMemo(() => {
        return properties
            .filter(p => statusFilter === 'Todos' || p.status === statusFilter)
            .filter(p => p.address.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [properties, searchTerm, statusFilter]);

    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold font-poppins text-pure-white">Mis Propiedades</h2>
                <Link to="/crm/properties/new" className="w-full md:w-auto bg-tech-blue text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 text-center">
                    Añadir Propiedad
                </Link>
            </div>

             <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por dirección..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue"
                >
                    <option>Todos</option>
                    <option>En Venta</option>
                    <option>En Alquiler</option>
                    <option>Vendido</option>
                    <option>Alquilado</option>
                </select>
            </div>
            
            {error && (
                <div className="bg-red-500/20 text-red-300 p-4 rounded-lg text-center mb-6 border border-red-500/50">
                    <p className="font-bold">Error al cargar los datos</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {loading && <div className="text-center p-8">Cargando propiedades...</div>}
            
            {!loading && !error && filteredProperties.length === 0 && (
                <div className="text-center py-12 px-6 bg-gray-800/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-300">No tienes propiedades todavía</h3>
                    <p className="text-gray-500 mt-2 mb-4">Empieza añadiendo tu primer inmueble para gestionarlo con la ayuda de la IA.</p>
                     <Link to="/crm/properties/new" className="bg-tech-cyan text-corporate-dark font-bold py-2 px-5 rounded-lg hover:bg-white transition-colors">
                        Añadir mi primera propiedad
                    </Link>
                </div>
            )}

            {!loading && !error && filteredProperties.length > 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map(prop => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertiesListPage;
