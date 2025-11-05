import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForum } from '../../contexts/ForumContext';
import { useLanguage } from '../../contexts/LanguageContext';

const NewThreadPage: React.FC = () => {
    const { sectionSlug } = useParams<{ sectionSlug: string }>();
    const navigate = useNavigate();
    const { sections, createThread } = useForum();
    const { t, language } = useLanguage();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    const section = sections.find(s => s.slug === sectionSlug);

    if (!section) {
        return <div className="text-center p-8 text-red-500">{t('forum.errorLoading')}</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);
        setError('');

        const newThread = await createThread(section.id, title, content);
        
        if (newThread) {
            navigate(`/foro/${sectionSlug}/${newThread.id}`);
        } else {
            setError('Hubo un error al crear el tema. Por favor, inténtalo de nuevo.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="bg-gray-900/50 p-6 md:p-8 rounded-lg border border-tech-blue/20">
            <div className="mb-6">
                <Link to={`/foro/${sectionSlug}`} className="text-tech-blue hover:underline">&larr; {t('forum.backToThreads')}</Link>
                <h1 className="text-3xl font-bold font-poppins text-pure-white mt-2">{t('forum.newThreadTitle')}</h1>
                <p className="text-gray-400">en la sección: {section.title[language]}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">{t('forum.threadTitleLabel')}</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={t('forum.threadTitlePlaceholder')}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue"
                    />
                </div>
                 <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">{t('forum.threadContentLabel')}</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={t('forum.threadContentPlaceholder')}
                        required
                        rows={10}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-tech-blue focus:border-tech-blue"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-500"
                    >
                        {isSubmitting ? `${t('auth.loading')}...` : t('forum.submitThread')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewThreadPage;
