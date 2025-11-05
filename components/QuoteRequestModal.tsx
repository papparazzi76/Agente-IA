import React, { useState, useEffect } from 'react';
import { useQuote } from '../contexts/QuoteContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';

const categories = [
    { titleKey: 'marketplace.cat1Title', items: ['marketplace.cat1Item1', 'marketplace.cat1Item2', 'marketplace.cat1Item3', 'marketplace.cat1Item4']},
    { titleKey: 'marketplace.cat2Title', items: ['marketplace.cat2Item1', 'marketplace.cat2Item2', 'marketplace.cat2Item3', 'marketplace.cat2Item4']},
    { titleKey: 'marketplace.cat3Title', items: ['marketplace.cat3Item1', 'marketplace.cat3Item2', 'marketplace.cat3Item3', 'marketplace.cat3Item4']},
    { titleKey: 'marketplace.cat4Title', items: ['marketplace.cat4Item1', 'marketplace.cat4Item2', 'marketplace.cat4Item3', 'marketplace.cat4Item4']},
    { titleKey: 'marketplace.cat5Title', items: ['marketplace.cat5Item1', 'marketplace.cat5Item2', 'marketplace.cat5Item3']},
    { titleKey: 'marketplace.cat6Title', items: ['marketplace.cat6Item1', 'marketplace.cat6Item2', 'marketplace.cat6Item3', 'marketplace.cat6Item4']},
];

const AccordionItem: React.FC<{ category: typeof categories[0], open: boolean, onToggle: () => void }> = ({ category, open, onToggle }) => {
    const { t } = useLanguage();
    const { selectedProducts, toggleProduct } = useQuote();
    
    return (
        <div className="border-b border-gray-700">
            <button
                type="button"
                className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-700/50"
                onClick={onToggle}
            >
                <span className="font-semibold text-lg">{t(category.titleKey)}</span>
                <svg className={`w-6 h-6 transform transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-900/50 space-y-3">
                    {category.items.map(itemKey => (
                        <label key={itemKey} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-tech-cyan focus:ring-tech-cyan"
                                checked={selectedProducts.includes(itemKey)}
                                onChange={() => toggleProduct(itemKey)}
                            />
                            <span className="text-gray-300">{t(itemKey)}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

const QuoteRequestModal: React.FC = () => {
    const { isModalOpen, closeModal, selectedProducts, clearProducts } = useQuote();
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Automatically open the first category that has a selected product
        if (selectedProducts.length > 0) {
            const firstSelectedCategory = categories.find(cat => cat.items.some(item => selectedProducts.includes(item)));
            if (firstSelectedCategory) {
                setOpenAccordion(firstSelectedCategory.titleKey);
            }
        } else {
            setOpenAccordion(null);
        }
    }, [selectedProducts, isModalOpen]);

    const handleToggleAccordion = (titleKey: string) => {
        setOpenAccordion(prev => prev === titleKey ? null : titleKey);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const selectedProductNames = selectedProducts.map(key => t(key));

        try {
            const { error } = await supabase.functions.invoke('send-quote-request', {
                body: { name, email, message, products: selectedProductNames },
            });

            if (error) throw new Error(error.message);
            
            setStatus('success');
            clearProducts();
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };
    
    const handleClose = () => {
        closeModal();
        setTimeout(() => {
            setStatus('idle');
            setName('');
            setEmail('');
            setMessage('');
        }, 300); // Wait for modal close animation
    }

    if (!isModalOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn"
            onClick={handleClose}
        >
            <div
                className="bg-gray-800 rounded-lg max-w-2xl w-full border border-tech-blue/30 shadow-2xl relative max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-5 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-2xl font-bold font-poppins text-pure-white">{t('quote.modalTitle')}</h2>
                    <button onClick={handleClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700">&times;</button>
                </div>

                {status === 'success' || status === 'error' ? (
                     <div className="p-8 text-center">
                        <h3 className={`text-2xl font-bold mb-4 ${status === 'success' ? 'text-tech-cyan' : 'text-red-500'}`}>
                            {t(status === 'success' ? 'quote.successTitle' : 'quote.errorTitle')}
                        </h3>
                        <p className="text-gray-300 mb-6">
                            {t(status === 'success' ? 'quote.successMessage' : 'quote.errorMessage')}
                        </p>
                        <button onClick={handleClose} className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors">
                            {t('quote.closeButton')}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="p-6 overflow-y-auto">
                            <p className="text-gray-300 mb-6">{t('quote.intro')}</p>
                            <form id="quote-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('quote.nameLabel')}</label>
                                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder={t('quote.namePlaceholder')} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('quote.emailLabel')}</label>
                                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder={t('quote.emailPlaceholder')} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{t('quote.messageLabel')}</label>
                                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder={t('quote.messagePlaceholder')} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">{t('quote.productsTitle')}</h3>
                                    <div className="border border-gray-700 rounded-lg">
                                        {categories.map(cat => (
                                            <AccordionItem key={cat.titleKey} category={cat} open={openAccordion === cat.titleKey} onToggle={() => handleToggleAccordion(cat.titleKey)} />
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-5 border-t border-gray-700 flex-shrink-0 flex justify-end">
                            <button
                                type="submit"
                                form="quote-form"
                                disabled={status === 'sending' || selectedProducts.length === 0}
                                className="bg-tech-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? t('quote.sending') : t('quote.sendButton')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuoteRequestModal;