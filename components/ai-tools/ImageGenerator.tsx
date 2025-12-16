import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { useLanguage } from '../../contexts/LanguageContext';
import VoiceInputButton from './VoiceInputButton';
import TutorialModal, { TutorialStep } from '../TutorialModal';

const decorationStyles = [
    { key: 'styleMinimalist' }, { key: 'styleIndustrial' },
    { key: 'styleNordic' }, { key: 'styleBohemian' },
    { key: 'styleModern' }, { key: 'styleClassic' },
    { key: 'styleRustic' }, { key: 'styleCoastal' },
];

const roomTypes = [
    { key: 'roomTypeSalon' }, { key: 'roomTypeSalonCocina' }, { key: 'roomTypeCocina' }, 
    { key: 'roomTypeBaño' }, { key: 'roomTypeAseo' }, { key: 'roomTypeDormitorioPrincipal' }, 
    { key: 'roomTypeDormitorioIndividual' }, { key: 'roomTypeDormitorioJuvenil' }, 
    { key: 'roomTypeDormitorioInfantil' }, { key: 'roomTypeTerraza' }, { key: 'roomTypeJardin' }, 
    { key: 'roomTypeDespacho' }, { key: 'roomTypeTrastero' }
];

const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

const ImageGenerator: React.FC = () => {
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isTutorialOpen, setIsTutorialOpen] = useState(false);
    
    // State for text-to-image
    const [prompt, setPrompt] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    
    // State for image editing
    const [originalImage, setOriginalImage] = useState<{data: string, type: string} | null>(null);
    const [editedImage, setEditedImage] = useState<{data: string, type: string} | null>(null);
    const [editRoomType, setEditRoomType] = useState(roomTypes[0].key);
    const [editDecorationStyle, setEditDecorationStyle] = useState(decorationStyles[0].key);
    const [customEditPrompt, setCustomEditPrompt] = useState('');

    const tutorialSteps: TutorialStep[] = language === 'es' ? [
        {
            title: "Generar Imágenes desde Cero",
            content: "Describe la imagen que quieres en el cuadro de texto. Sé detallado con el estilo, la iluminación y los muebles. Ej: 'Salón moderno con grandes ventanales y luz natural'. Pulsa 'Generar Imagen'."
        },
        {
            title: "Subir Imagen para Editar",
            content: "Si quieres modificar una foto real (ej. Home Staging Virtual), pulsa en <strong>'Seleccionar Imagen'</strong>. Esto abrirá el modo de edición."
        },
        {
            title: "Ediciones Rápidas",
            content: "Usa el botón <strong>'Eliminar Muebles'</strong> para vaciar una habitación automáticamente. O selecciona un tipo de estancia y estilo para <strong>'Redecorar'</strong> el espacio con un solo clic."
        },
        {
            title: "Edición Personalizada",
            content: "¿Quieres algo específico? En el cuadro 'Edición Personalizada', escribe instrucciones como 'cambia el suelo a madera' o 'añade una planta en la esquina'."
        }
    ] : [
        {
            title: "Gerar Imagens do Zero",
            content: "Descreva a imagem que pretende na caixa de texto. Seja detalhado com o estilo, a iluminação e os móveis. Ex: 'Sala moderna com grandes janelas e luz natural'. Clique em 'Gerar Imagem'."
        },
        {
            title: "Carregar Imagem para Editar",
            content: "Se quiser modificar uma foto real (ex. Home Staging Virtual), clique em <strong>'Selecionar Imagem'</strong>. Isto abrirá o modo de edição."
        },
        {
            title: "Edições Rápidas",
            content: "Use o botão <strong>'Remover Mobília'</strong> para esvaziar um cómodo automaticamente. Ou selecione um tipo de divisão e estilo para <strong>'Redecorar'</strong> o espaço com um clique."
        },
        {
            title: "Edição Personalizada",
            content: "Quer algo específico? Na caixa 'Edição Personalizada', escreva instruções como 'muda o chão para madeira' ou 'adiciona uma planta no canto'."
        }
    ];

    const handleDownload = (imageUrl: string, filename: string) => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleTextToImageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setGeneratedImageUrl('');

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError("Error de configuración: La clave de API para los servicios de IA no está disponible. Póngase en contacto con el soporte.");
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey });
            
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '16:9',
                },
            });

            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            setGeneratedImageUrl(`data:image/jpeg;base64,${base64ImageBytes}`);
        } catch (err) {
            console.error(err);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setOriginalImage({ data: base64String, type: file.type });
                setEditedImage(null);
                setGeneratedImageUrl('');
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageEdit = async (editPrompt: string) => {
        const imageToEdit = editedImage || originalImage;
        if (!imageToEdit) return;

        setIsLoading(true);
        setError('');

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            setError("Error de configuración: La clave de API para los servicios de IA no está disponible. Póngase en contacto con el soporte.");
            setIsLoading(false);
            return;
        }
        
        try {
            const ai = new GoogleGenAI({ apiKey });
            const imagePart = {
                inlineData: { mimeType: imageToEdit.type, data: imageToEdit.data },
            };
            const textPart = { text: editPrompt };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const imagePartResponse = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);

            if (imagePartResponse && imagePartResponse.inlineData) {
                const newEditedImage = {
                    data: imagePartResponse.inlineData.data,
                    type: imagePartResponse.inlineData.mimeType
                };
                setEditedImage(newEditedImage);
            } else {
                 setError(t('playground.common.error'));
            }

        } catch (err) {
            console.error(err);
            setError(t('playground.common.error'));
        } finally {
            setIsLoading(false);
        }
    };

    const displayEditedImageUri = editedImage ? `data:${editedImage.type};base64,${editedImage.data}` : null;

    return (
        <div>
            <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold font-poppins">{t('playground.imageGenerator.title')}</h2>
                <button 
                    onClick={() => setIsTutorialOpen(true)}
                    className="ml-3 text-gray-400 hover:text-tech-cyan transition-colors"
                    title="Ver Tutorial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <p className="text-gray-400 mb-6">{t('playground.imageGenerator.description')}</p>

            {!originalImage ? (
                <>
                    <form onSubmit={handleTextToImageSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="prompt">{t('playground.imageGenerator.promptLabel')}</label>
                            <div className="relative">
                                <textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                    placeholder={t('playground.imageGenerator.promptPlaceholder')}
                                    required
                                    rows={3}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue"
                                />
                                <VoiceInputButton onTranscript={setPrompt} onError={setError} targetId="prompt" />
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                            {isLoading ? t('playground.imageGenerator.generating') : t('playground.imageGenerator.generateButton')}
                        </button>
                    </form>
                    
                    <div className="my-8 flex items-center text-center">
                        <hr className="flex-grow border-gray-600" />
                        <span className="px-4 text-gray-400 font-semibold">{t('playground.imageGenerator.orSeparator')}</span>
                        <hr className="flex-grow border-gray-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-center">{t('playground.imageGenerator.uploadTitle')}</h3>
                        <label htmlFor="image-upload" className="w-full cursor-pointer bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300 flex items-center justify-center text-center">
                            <UploadIcon /> {t('playground.imageGenerator.uploadButton')}
                        </label>
                        <input type="file" id="image-upload" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleFileChange} />
                    </div>
                </>
            ) : (
                <div>
                    <h3 className="text-xl font-bold font-poppins mb-4">{t('playground.imageGenerator.editingAreaTitle')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">{t('playground.imageGenerator.originalImage')}</h4>
                            <img src={`data:${originalImage.type};base64,${originalImage.data}`} alt="Original" className="rounded-lg w-full shadow-lg" />
                            <button onClick={() => setOriginalImage(null)} className="w-full mt-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
                                {t('playground.imageGenerator.changeImageButton')}
                            </button>
                        </div>

                        <div>
                             <h4 className="text-lg font-semibold mb-2">{t('playground.imageGenerator.quickEditsTitle')}</h4>
                             <div className="space-y-4">
                                <button onClick={() => handleImageEdit(t('playground.imageGenerator.removeFurniturePrompt'))} disabled={isLoading} className="w-full bg-tech-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500">
                                     {t('playground.imageGenerator.removeFurnitureButton')}
                                 </button>
                                 <div className="space-y-2">
                                     <label className="block text-sm font-medium text-gray-300" htmlFor="editRoomType">{t('playground.imageGenerator.roomTypeLabel')}</label>
                                     <select id="editRoomType" value={editRoomType} onChange={e => setEditRoomType(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue">
                                         {roomTypes.map(rt => <option key={rt.key} value={rt.key}>{t(`playground.imageGenerator.${rt.key}`)}</option>)}
                                     </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="editDecorationStyle">{t('playground.imageGenerator.decorationStyleLabel')}</label>
                                    <div className="flex gap-2">
                                        <select 
                                            id="editDecorationStyle" 
                                            value={editDecorationStyle} 
                                            onChange={e => setEditDecorationStyle(e.target.value)} 
                                            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-tech-blue focus:border-tech-blue"
                                        >
                                            {decorationStyles.map(style => <option key={style.key} value={style.key}>{t(`playground.imageGenerator.${style.key}`)}</option>)}
                                        </select>
                                        <button 
                                            onClick={() => handleImageEdit(t('playground.imageGenerator.decoratePromptPrefix', { 
                                                roomType: t(`playground.imageGenerator.${editRoomType}`),
                                                style: t(`playground.imageGenerator.${editDecorationStyle}`)
                                            }))}
                                            disabled={isLoading}
                                            className="bg-tech-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500 flex-shrink-0"
                                        >
                                            {t('playground.imageGenerator.generateButton')}
                                        </button>
                                    </div>
                                 </div>
                             </div>
                             
                             <div className="mt-6 pt-6 border-t border-gray-700">
                                <h4 className="text-lg font-semibold mb-2">{t('playground.imageGenerator.customEditTitle')}</h4>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300" htmlFor="customEditPrompt">
                                        {t('playground.imageGenerator.customEditPromptLabel')}
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="customEditPrompt"
                                            value={customEditPrompt}
                                            onChange={e => setCustomEditPrompt(e.target.value)}
                                            placeholder={t('playground.imageGenerator.customEditPromptPlaceholder')}
                                            rows={3}
                                            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 pr-12 focus:ring-tech-blue focus:border-tech-blue"
                                        />
                                        <VoiceInputButton onTranscript={setCustomEditPrompt} onError={setError} targetId="customEditPrompt" />
                                    </div>
                                    <button
                                        onClick={() => handleImageEdit(customEditPrompt)}
                                        disabled={isLoading || !customEditPrompt.trim()}
                                        className="w-full bg-tech-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-500"
                                    >
                                        {t('playground.imageGenerator.customEditButton')}
                                    </button>
                                </div>
                            </div>
                             
                             <div className="mt-8">
                                 {isLoading && (
                                    <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md min-h-[200px]">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                                        <p className="text-gray-300 text-center">{t('playground.imageGenerator.generating')}</p>
                                    </div>
                                 )}
                                 {displayEditedImageUri && !isLoading && (
                                     <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-lg font-semibold">{t('playground.imageGenerator.editedImage')}</h4>
                                            <button onClick={() => handleDownload(displayEditedImageUri, 'agenteia-edited.jpeg')} className="flex items-center bg-green-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                                <DownloadIcon /> {t('playground.imageGenerator.downloadButton')}
                                            </button>
                                        </div>
                                         <img src={displayEditedImageUri} alt="Edited" className="rounded-lg w-full shadow-lg" />
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            )}
            
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            
            <div className="mt-8">
                {isLoading && !originalImage && (
                    <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-md h-64">
                         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tech-blue mb-4"></div>
                        <p className="text-gray-300">{t('playground.imageGenerator.generating')}</p>
                    </div>
                )}
                {generatedImageUrl && !isLoading && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">{t('playground.imageGenerator.outputTitle')}</h3>
                            <button onClick={() => handleDownload(generatedImageUrl, 'agenteia-generated.jpeg')} className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                <DownloadIcon /> {t('playground.imageGenerator.downloadButton')}
                            </button>
                        </div>
                        <img src={generatedImageUrl} alt="Generated" className="rounded-lg shadow-lg w-full" />
                    </div>
                )}
            </div>

            <TutorialModal 
                isOpen={isTutorialOpen} 
                onClose={() => setIsTutorialOpen(false)} 
                steps={tutorialSteps} 
                toolTitle={t('playground.imageGenerator.title')} 
            />
        </div>
    );
};

export default ImageGenerator;