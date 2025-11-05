import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForum } from '../../contexts/ForumContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ForumThread } from '../../types';
import CommunityGuidelinesModal from '../../components/forum/CommunityGuidelinesModal';
import { useAuth } from '../../contexts/AuthContext';

const ThreadListPage: React.FC = () => {
    const { sectionSlug } = useParams<{ sectionSlug: string }>();
    const navigate = useNavigate();
    const { sections, getThreads, loading } = useForum();
    const { t, language } = useLanguage();
    const { currentUser } = useAuth();
    const [threads, setThreads] = useState<ForumThread[]>([]);
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    
    const section = sections.find(s => s.slug === sectionSlug);

    useEffect(() => {
        if (section) {
            getThreads(section.id).then(setThreads);
        }
    }, [section, getThreads]);

    const handleNewThreadClick = () => {
        if (currentUser && !currentUser.has_accepted_rules) {
            setIsRulesModalOpen(true);
        } else {
            navigate(`/foro/${sectionSlug}/new`);
        }
    };

    const handleRulesAccepted = () => {
        setIsRulesModalOpen(false);
        navigate(`/foro/${sectionSlug}/new`);
    };

    if (loading && threads.length === 0) {
        return <div className="text-center p-8">{t('forum.loadingThreads')}</div>;
    }

    if (!section) {
        return <div className="text-center p-8">{t('forum.errorLoading')}</div>;
    }
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(language, {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-poppins text-pure-white">{section.title[language]}</h1>
                    <p className="text-gray-400">{section.description[language]}</p>
                </div>
                <button onClick={handleNewThreadClick} className="bg-tech-blue text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap">
                    {t('forum.newThread')}
                </button>
            </div>
            
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg border border-tech-blue/20">
                {threads.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">{t('forum.noThreads')}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="border-b-2 border-tech-blue/30 text-sm text-gray-400 uppercase">
                                <tr>
                                    <th className="p-4 font-semibold">{t('forum.thread')}</th>
                                    <th className="p-4 font-semibold text-center">{t('forum.replies')}</th>
                                    <th className="p-4 font-semibold">{t('forum.lastActivity')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {threads.map(thread => (
                                    <tr key={thread.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                                        <td className="p-4">
                                            <Link to={`/foro/${section.slug}/${thread.id}`} className="font-semibold text-pure-white hover:text-tech-cyan transition-colors block">{thread.title}</Link>
                                            <span className="text-sm text-gray-500">{t('forum.by')} {thread.author_username || 'Usuario'}</span>
                                        </td>
                                        <td className="p-4 text-center text-gray-300 font-mono">{thread.reply_count || 0}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {formatDate(thread.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            {isRulesModalOpen && <CommunityGuidelinesModal onClose={() => setIsRulesModalOpen(false)} onSuccess={handleRulesAccepted} />}
        </>
    );
};

export default ThreadListPage;