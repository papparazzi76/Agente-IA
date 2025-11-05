import React from 'react';
import { useForum } from '../../contexts/ForumContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface CommunityGuidelinesModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;


const CommunityGuidelinesModal: React.FC<CommunityGuidelinesModalProps> = ({ onClose, onSuccess }) => {
    const { acceptForumRules, loading } = useForum();
    const { t } = useLanguage();

    const handleAccept = async () => {
        const success = await acceptForumRules();
        if (success) {
            onSuccess();
        } else {
            alert("Hubo un error al aceptar las normas. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn" 
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-lg max-w-2xl w-full border border-tech-blue/30 shadow-2xl relative max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-2xl font-bold font-poppins text-pure-white">{t('forum.rulesTitle')}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <p className="text-gray-300 mb-6">{t('forum.rulesIntro')}</p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start"><CheckIcon />{t('forum.rule1')}</li>
                        <li className="flex items-start"><CheckIcon />{t('forum.rule2')}</li>
                        <li className="flex items-start"><CheckIcon />{t('forum.rule3')}</li>
                        <li className="flex items-start"><CheckIcon />{t('forum.rule4')}</li>
                    </ul>
                </div>
                <div className="p-6 border-t border-gray-700 flex-shrink-0">
                    <button 
                        onClick={handleAccept} 
                        disabled={loading}
                        className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500"
                    >
                        {loading ? `${t('auth.loading')}...` : t('forum.acceptRules')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityGuidelinesModal;