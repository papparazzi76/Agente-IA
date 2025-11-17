import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { modules } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import FlashcardViewer from '../components/FlashcardViewer';
import { useProgress } from '../contexts/ProgressContext';
import { Module } from '../types';

const CheckCircleIcon = ({ completed }: { completed: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-3 flex-shrink-0 ${completed ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ModuleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { language, t } = useLanguage();
    const { moduleProgress, toggleItemComplete, getModuleProgress } = useProgress();

    const module = modules.find(m => m.id === id);

    if (!module) {
        return (
            <div className="container mx-auto px-6 py-12 text-center animate-fadeIn">
                <h1 className="text-4xl font-bold font-poppins mb-4">Módulo no encontrado</h1>
                <Link to="/curso" className="text-tech-blue hover:underline">{t('moduleDetail.backLink')}</Link>
            </div>
        );
    }
    
    const progress = getModuleProgress(module);
    const completedItems = moduleProgress[module.id] || [];

    const isItemCompleted = (itemId: string) => completedItems.includes(itemId);
    const handleToggle = (itemId: string) => toggleItemComplete(module.id, itemId);

    return (
        <div className="animate-fadeIn">
            <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 text-pure-white bg-corporate-dark/50">
                <div className="absolute inset-0 bg-gradient-to-b from-corporate-dark via-corporate-dark/80 to-corporate-dark"></div>
                 <div className="container mx-auto px-6 relative z-10">
                    <Link to="/curso" className="text-tech-blue hover:underline font-semibold mb-6 inline-block">&larr; {t('moduleDetail.backLink')}</Link>
                    <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-2 leading-tight">{module.hero.title[language]}</h1>
                    <p className="text-lg md:text-xl text-gray-300 font-inter max-w-4xl">{module.hero.subtitle[language]}</p>
                </div>
            </section>
            
            <section className="py-12">
                 <div className="container mx-auto px-6 max-w-6xl">
                    <div className="sticky top-[88px] z-20 bg-gray-900/80 backdrop-blur-md p-4 rounded-lg border border-tech-blue/20 mb-8">
                        <h3 className="text-lg font-semibold mb-2">Progreso del Módulo</h3>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div className="bg-tech-cyan h-4 rounded-full transition-all duration-500" style={{ width: `${progress.percentage}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 text-right">{progress.percentage}% completado ({progress.completed} de {progress.total})</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                             <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                                <h2 className="text-3xl font-bold font-poppins text-tech-cyan mb-6">{module.content.learnTitle[language]}</h2>
                                <ul className="space-y-4">
                                    {module.content.points.map((point, index) => (
                                        <li key={index} className="flex items-start text-lg text-gray-300">
                                            <svg className="w-6 h-6 text-tech-cyan mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            <span>{point[language]}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center mt-6 p-3 rounded-md bg-gray-900/50">
                                    <CheckCircleIcon completed={isItemCompleted('content')} />
                                    <button onClick={() => handleToggle('content')} className="font-semibold">{isItemCompleted('content') ? 'Marcar como no leído' : 'Marcar como leído'}</button>
                                </div>
                            </div>
                            
                            {module.videos && module.videos.length > 0 && (
                                <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                                    <h2 className="text-3xl font-bold font-poppins text-tech-cyan mb-6">{t('moduleDetail.videosTitle')}</h2>
                                    <div className="space-y-8">
                                        {module.videos.map((video, index) => (
                                            <div key={index}>
                                                <h3 className="text-xl font-semibold mb-3">{video.title[language]}</h3>
                                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                                    <iframe src={video.embedUrl} title={video.title[language]} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                                                </div>
                                                <div className="flex items-center mt-4 p-3 rounded-md bg-gray-900/50">
                                                     <CheckCircleIcon completed={isItemCompleted(`video-${index}`)} />
                                                     <button onClick={() => handleToggle(`video-${index}`)} className="font-semibold">{isItemCompleted(`video-${index}`) ? 'Marcar como no visto' : 'Marcar como visto'}</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {module.flashcards && module.flashcards.length > 0 && (
                                <div className="bg-transparent p-0 rounded-lg">
                                    <h2 className="text-3xl font-bold font-poppins text-tech-cyan mb-6">{t('moduleDetail.flashcardsTitle')}</h2>
                                    <FlashcardViewer flashcards={module.flashcards} />
                                    <div className="flex items-center mt-4 p-3 rounded-md bg-gray-800/50">
                                         <CheckCircleIcon completed={isItemCompleted('flashcards')} />
                                         <button onClick={() => handleToggle('flashcards')} className="font-semibold">{isItemCompleted('flashcards') ? 'Marcar como no repasado' : 'Marcar como repasado'}</button>
                                    </div>
                                </div>
                            )}

                        </div>
                        <aside className="lg:col-span-1">
                             <div className="sticky top-[180px] bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <h3 className="text-2xl font-bold font-poppins text-tech-cyan mb-4">{t('moduleDetail.resourcesTitle')}</h3>
                                {module.resources.downloads.length > 0 ? (
                                    <ul className="space-y-3">
                                        {module.resources.downloads.map((res, index) => (
                                            <li key={index}>
                                                <a href={res.url} download className="flex items-center text-gray-300 hover:text-tech-cyan transition-colors group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                    <span className="group-hover:underline">{res.text[language]}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400">No hay recursos para este módulo.</p>
                                )}
                                <div className="flex items-center mt-6 p-3 rounded-md bg-gray-900/50">
                                     <CheckCircleIcon completed={isItemCompleted('resources')} />
                                     <button onClick={() => handleToggle('resources')} className="font-semibold">{isItemCompleted('resources') ? 'Marcar como no descargado' : 'Marcar como descargado'}</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ModuleDetailPage;
