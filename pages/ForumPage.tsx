import React from 'react';
import { Outlet, useLocation, Link, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useForum } from '../contexts/ForumContext';

const ForumPage: React.FC = () => {
    const { t, language } = useLanguage();
    const location = useLocation();
    const params = useParams();
    const { sections } = useForum();

    const getBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(x => x);
        const breadcrumbs = [{ name: t('header.navForum'), path: '/foro' }];
        
        if (params.sectionSlug) {
            const section = sections.find(s => s.slug === params.sectionSlug);
            if (section) {
                breadcrumbs.push({ name: section.title[language], path: `/foro/${section.slug}` });
            }
        }
        
        if (params.threadId) {
             breadcrumbs.push({ name: t('forum.thread'), path: location.pathname });
        }

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <div className="animate-fadeIn">
            <section className="relative py-16 text-pure-white bg-corporate-dark">
                <div className="container mx-auto px-6 relative z-10">
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            {breadcrumbs.map((crumb, index) => (
                                <li key={crumb.path} className="flex items-center">
                                    {index < breadcrumbs.length - 1 ? (
                                        <>
                                            <Link to={crumb.path} className="text-gray-400 hover:text-tech-cyan">{crumb.name}</Link>
                                            <svg className="h-5 w-5 text-gray-500 mx-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        </>
                                    ) : (
                                        <span className="text-pure-white font-semibold">{crumb.name}</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {location.pathname === '/foro' && (
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight text-glow">{t('forum.title')}</h1>
                            <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">{t('forum.subtitle')}</p>
                        </div>
                    )}
                </div>
            </section>
            <main className="container mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default ForumPage;