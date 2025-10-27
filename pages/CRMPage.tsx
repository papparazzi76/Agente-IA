import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const CRMPage: React.FC = () => {
    const { t } = useLanguage();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive 
            ? 'bg-tech-blue text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;

    return (
        <div className="animate-fadeIn">
            <section className="relative py-16 text-pure-white bg-corporate-dark">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl font-bold font-poppins mb-2">CRM Inmobiliario</h1>
                    <p className="text-lg text-gray-400">Gestiona tus propiedades y contactos</p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-tech-blue/20 sticky top-24">
                            <nav className="space-y-2">
                                <NavLink to="/crm/properties" className={navLinkClass}>
                                    Propiedades
                                </NavLink>
                                <NavLink to="/crm/contacts" className={navLinkClass}>
                                    Contactos
                                </NavLink>
                            </nav>
                        </div>
                    </aside>
                    <main className="flex-grow">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CRMPage;