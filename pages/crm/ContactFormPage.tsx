import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCRM } from '../../contexts/CRMContext';
import { Contact, ContactStatus } from '../../types';

const statusOptions: ContactStatus[] = ['Lead', 'Cliente Comprador', 'Cliente Vendedor', 'Pasado Cliente', 'Colaborador'];

const ContactFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { upsertContact, getContact, loading } = useCRM();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<ContactStatus>('Lead');
    const [notes, setNotes] = useState('');
    
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const contact = getContact(id);
            if (contact) {
                setName(contact.name);
                setEmail(contact.email || '');
                setPhone(contact.phone || '');
                setStatus(contact.status);
                setNotes(contact.notes || '');
            }
        }
    }, [id, isEditing, getContact]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const contactData: Partial<Contact> = { id, name, email, phone, status, notes };
        const result = await upsertContact(contactData);
        if (result) {
            navigate('/crm/contacts');
        } else {
            alert('Error al guardar el contacto.');
        }
    };

    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <h2 className="text-3xl font-bold font-poppins text-pure-white mb-6">
                {isEditing ? 'Editar Contacto' : 'Añadir Nuevo Contacto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Estado</label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value as ContactStatus)} required className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                           {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notas</label>
                    <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={5} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/crm/contacts')} className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                    <button type="submit" disabled={loading} className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-500">
                        {loading ? 'Guardando...' : 'Guardar Contacto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactFormPage;