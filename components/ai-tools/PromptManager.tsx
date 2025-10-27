import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Prompt {
  id: string;
  name: string;
  content: string;
}

interface PromptManagerProps {
  toolKey: string;
  defaultPrompt: { name: string, content: string };
  onPromptChange: (newPromptContent: string) => void;
  variables?: string[];
  warningText?: string;
}

const STORAGE_PREFIX = 'agenteIA-prompts-';

const PromptManager: React.FC<PromptManagerProps> = ({ toolKey, defaultPrompt, onPromptChange, variables, warningText }) => {
  const { t } = useLanguage();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [activePromptId, setActivePromptId] = useState<string>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const storageKey = `${STORAGE_PREFIX}${toolKey}`;

  useEffect(() => {
    try {
      const savedPrompts = localStorage.getItem(storageKey);
      if (savedPrompts) {
        setPrompts(JSON.parse(savedPrompts));
      }
    } catch (e) {
      console.error("Failed to load prompts from localStorage", e);
    }
  }, [storageKey]);

  useEffect(() => {
    const activePrompt = activePromptId === 'default'
      ? defaultPrompt
      : prompts.find(p => p.id === activePromptId);
    
    onPromptChange(activePrompt?.content || defaultPrompt.content);
  }, [activePromptId, prompts, defaultPrompt, onPromptChange]);

  const handleSavePrompt = (promptToSave: Prompt) => {
    let updatedPrompts;
    if (prompts.some(p => p.id === promptToSave.id)) {
      updatedPrompts = prompts.map(p => p.id === promptToSave.id ? promptToSave : p);
    } else {
      updatedPrompts = [...prompts, promptToSave];
    }
    setPrompts(updatedPrompts);
    localStorage.setItem(storageKey, JSON.stringify(updatedPrompts));
    setEditingPrompt(null);
  };
  
  const handleDeletePrompt = (id: string) => {
    if (window.confirm(t('playground.promptManager.confirmDelete'))) {
        const updatedPrompts = prompts.filter(p => p.id !== id);
        setPrompts(updatedPrompts);
        localStorage.setItem(storageKey, JSON.stringify(updatedPrompts));
        if(activePromptId === id) {
            setActivePromptId('default');
        }
    }
  };

  const PromptEditor: React.FC<{ prompt: Prompt, onSave: (p: Prompt) => void, onCancel: () => void }> = ({ prompt, onSave, onCancel }) => {
    const [name, setName] = useState(prompt.name);
    const [content, setContent] = useState(prompt.content);
    
    const handleSave = () => {
        onSave({ ...prompt, name, content });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4 border border-tech-blue/30">
            <h3 className="text-lg font-bold mb-4">{prompt.id ? t('playground.promptManager.editPrompt') : t('playground.promptManager.createNew')}</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="promptName">{t('playground.promptManager.promptNameLabel')}</label>
                    <input type="text" id="promptName" value={name} onChange={e => setName(e.target.value)} placeholder={t('playground.promptManager.promptNamePlaceholder')} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="promptContent">{t('playground.promptManager.promptContentLabel')}</label>
                    <textarea id="promptContent" value={content} onChange={e => setContent(e.target.value)} required rows={10} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue font-mono text-sm" />
                </div>
                {variables && variables.length > 0 && (
                    <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded-md">
                        <p className="font-bold">{t('playground.promptManager.variablesTitle')}</p>
                        <p>{t('playground.promptManager.variablesDescription')}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {variables.map(v => <code key={v} className="bg-tech-blue/20 text-tech-cyan px-1.5 py-0.5 rounded-sm">{`{{${v}}}`}</code>)}
                        </div>
                    </div>
                )}
                 {warningText && (
                    <div className="text-sm text-yellow-300 bg-yellow-500/10 p-3 rounded-md border border-yellow-500/30">
                        <p className="font-bold">{t('playground.promptManager.warning')}</p>
                        <p>{warningText}</p>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">{t('playground.promptManager.cancelButton')}</button>
                    <button onClick={handleSave} className="bg-tech-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">{t('playground.promptManager.saveButton')}</button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="my-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-grow w-full">
            <label htmlFor="prompt-selector" className="block text-sm font-medium text-gray-300 mb-1">{t('playground.promptManager.selectPrompt')}</label>
            <select
                id="prompt-selector"
                value={activePromptId}
                onChange={e => setActivePromptId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue"
            >
                <option value="default">{defaultPrompt.name} ({t('playground.promptManager.defaultPrompt')})</option>
                {prompts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto mt-2 sm:mt-6 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors self-end">
            {t('playground.promptManager.managePrompts')}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn" onClick={() => setIsModalOpen(false)}>
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full border border-tech-blue/30 shadow-2xl relative max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold font-poppins text-pure-white">{t('playground.promptManager.modalTitle')}</h2>
                    <button onClick={() => { setIsModalOpen(false); setEditingPrompt(null); }} className="p-1 rounded-full text-gray-400 hover:bg-gray-700">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {editingPrompt ? (
                        <PromptEditor prompt={editingPrompt} onSave={handleSavePrompt} onCancel={() => setEditingPrompt(null)} />
                    ) : (
                        <>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center p-3 bg-gray-700/50 rounded-md">
                                    <span className="font-semibold text-gray-300">{defaultPrompt.name} ({t('playground.promptManager.defaultPrompt')})</span>
                                </li>
                                {prompts.map(p => (
                                    <li key={p.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-md">
                                        <span className="font-semibold">{p.name}</span>
                                        <div className="space-x-2">
                                            <button onClick={() => setEditingPrompt(p)} className="text-tech-blue hover:underline text-sm">{t('playground.promptManager.editPrompt')}</button>
                                            <button onClick={() => handleDeletePrompt(p.id)} className="text-red-500 hover:underline text-sm">{t('playground.promptManager.deleteButton')}</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setEditingPrompt({ id: crypto.randomUUID(), name: '', content: '' })} className="mt-4 w-full bg-tech-blue/80 text-white font-bold py-2 px-4 rounded-lg hover:bg-tech-blue transition-colors">
                                {t('playground.promptManager.createNew')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PromptManager;
