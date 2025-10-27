import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCRM } from '../../contexts/CRMContext';
import { Contact } from '../../types';

const ContactsListPage: React.FC = () => {
    const { contacts, fetchContacts, loading, error } = useCRM();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const filteredContacts = useMemo(() => {
        return contacts.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [contacts, searchTerm]);

    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold font-poppins text-pure-white">Mis Contactos</h2>
                <Link to="/crm/contacts/new" className="w-full md:w-auto bg-tech-blue text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 text-center">
                    Añadir Contacto
                </Link>
            </div>

            <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 mb-6 focus:ring-tech-blue focus:border-tech-blue"
            />
            
            {error && (
                <div className="bg-red-500/20 text-red-300 p-4 rounded-lg text-center mb-6 border border-red-500/50">
                    <p className="font-bold">Error al cargar los datos</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {loading && <div className="text-center p-8">Cargando contactos...</div>}

            {!loading && !error && filteredContacts.length === 0 && (
                 <div className="text-center py-12 px-6 bg-gray-800/30 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-300">Aún no tienes contactos</h3>
                    <p className="text-gray-500 mt-2 mb-4">Añade tus clientes para empezar a gestionar tus relaciones.</p>
                     <Link to="/crm/contacts/new" className="bg-tech-cyan text-corporate-dark font-bold py-2 px-5 rounded-lg hover:bg-white transition-colors">
                        Añadir mi primer contacto
                    </Link>
                </div>
            )}

            {!loading && !error && filteredContacts.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-tech-blue/30">
                            <tr>
                                <th className="p-4 font-semibold">Nombre</th>
                                <th className="p-4 font-semibold">Email</th>
                                <th className="p-4 font-semibold">Teléfono</th>
                                <th className="p-4 font-semibold">Estado</th>
                                <th className="p-4 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map(contact => (
                                <tr key={contact.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="p-4 font-medium">{contact.name}</td>
                                    <td className="p-4 text-gray-400">{contact.email || '-'}</td>
                                    <td className="p-4 text-gray-400">{contact.phone || '-'}</td>
                                    <td className="p-4"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200">{contact.status}</span></td>
                                    <td className="p-4">
                                        <Link to={`/crm/contacts/${contact.id}/edit`} className="text-tech-cyan hover:underline font-semibold">Editar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContactsListPage;