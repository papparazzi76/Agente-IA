import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForum } from '../../contexts/ForumContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { ForumThread, ForumPost } from '../../types';
import CommunityGuidelinesModal from '../../components/forum/CommunityGuidelinesModal';

const ThreadDetailPage: React.FC = () => {
    const { threadId } = useParams<{ threadId: string }>();
    const { getThread, getPosts, createPost, loading } = useForum();
    const { t, language } = useLanguage();
    const { currentUser } = useAuth();
    
    const [thread, setThread] = useState<ForumThread | null>(null);
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [replyContent, setReplyContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    const [pendingReply, setPendingReply] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (threadId) {
            getThread(threadId).then(setThread);
            getPosts(threadId).then(setPosts);
        }
    }, [threadId, getThread, getPosts]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [posts]);

    const executePostReply = async (content: string) => {
        if (!content.trim() || !threadId) return;
        
        setIsPosting(true);
        const newPost = await createPost(threadId, content);
        if (newPost) {
            const postWithAuthor: ForumPost = { ...newPost, author_username: currentUser?.username };
            setPosts(prev => [...prev, postWithAuthor]);
            setReplyContent('');
            setPendingReply(null);
        }
        setIsPosting(false);
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (currentUser && !currentUser.has_accepted_rules) {
            setPendingReply(replyContent);
            setIsRulesModalOpen(true);
            return;
        }
        
        await executePostReply(replyContent);
    };

    const handleRulesAcceptedForReply = async () => {
        setIsRulesModalOpen(false);
        if (pendingReply) {
            await executePostReply(pendingReply);
        }
    };

    if (loading && !thread) {
        return <div className="text-center p-8">{t('forum.loadingThread')}</div>;
    }

    if (!thread) {
        return <div className="text-center p-8">{t('forum.errorLoading')}</div>;
    }
    
     const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(language, { dateStyle: 'long', timeStyle: 'short' });
    };

    return (
        <>
            <h1 className="text-3xl font-bold font-poppins text-pure-white mb-6">{thread.title}</h1>
            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                             <p className="font-semibold text-tech-cyan">{post.author_username || 'Usuario'}</p>
                             <p className="text-sm text-gray-400">{formatDate(post.created_at)}</p>
                        </div>
                        <div className="prose prose-invert max-w-none prose-p:text-gray-300">
                           <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div ref={messagesEndRef} className="mt-8 pt-8 border-t border-tech-blue/30">
                <h2 className="text-2xl font-bold font-poppins text-pure-white mb-4">{t('forum.reply')}</h2>
                 <form onSubmit={handleReplySubmit}>
                    <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder={t('forum.replyPlaceholder')}
                        rows={5}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-tech-blue focus:border-tech-blue"
                    />
                    <div className="flex justify-end mt-4">
                        <button type="submit" disabled={isPosting || !replyContent.trim()} className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-500">
                            {isPosting ? `${t('auth.loading')}...` : t('forum.postReply')}
                        </button>
                    </div>
                 </form>
            </div>

            {isRulesModalOpen && (
                <CommunityGuidelinesModal 
                    onClose={() => {
                        setIsRulesModalOpen(false);
                        setPendingReply(null);
                    }} 
                    onSuccess={handleRulesAcceptedForReply} 
                />
            )}
        </>
    );
};

export default ThreadDetailPage;