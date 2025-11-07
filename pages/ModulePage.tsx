import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { modules, documentContents } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import FlashcardViewer from '../components/FlashcardViewer';

const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-tech-blue group-hover:text-tech-cyan transition-colors" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const DownloadIconDisabled = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-tech-cyan flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

const CompletionButton: React.FC<{moduleId: string, itemId: string, children: React.ReactNode}> = ({moduleId, itemId, children}) => {
    const { moduleProgress, toggleItemComplete } = useProgress();
    const isCompleted = moduleProgress[moduleId]?.includes(itemId);

    return (
        <button 
            onClick={() => toggleItemComplete(moduleId, itemId)}
            className={`w-full mt-8 text-left flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                isCompleted 
                ? 'bg-tech-cyan/20 border-tech-cyan text-tech-cyan shadow-lg' 
                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {isCompleted ? (
                <CheckCircleIcon />
            ) : (
                <div className="w-6 h-6 mr-3 border-2 border-gray-400 rounded-full flex-shrink-0"></div>
            )}
            <span className="font-semibold">{children}</span>
        </button>
    );
};

const createHtmlContent = (title: string, content: string) => {
  const formattedContent = content
    .trim()
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; color: #333; }
    h1, h2, h3 { color: #000; }
    p { text-align: justify; }
    ul, ol { padding-left: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${formattedContent.replace(/\|/g, '</td><td>').replace(/---/g, '</td></tr><tr><td>')}
</body>
</html>`;
};

const createDownloadFilename = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, '') // remove non-word chars
      .replace(/[\s_-]+/g, '-') // collapse whitespace and replace by -
      .replace(/^-+|-+$/g, ''); // remove leading/trailing dashes
};

const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { getModuleProgress } = useProgress();
  
  if (!moduleId) {
    return <Navigate to="/temario" replace />;
  }
  
  const moduleIndex = modules.findIndex(m => m.id === moduleId);

  if (moduleIndex === -1) {
    return <Navigate to="/temario" replace />;
  }

  const module = modules[moduleIndex];
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;
  const progress = getModuleProgress(module);

  return (
    <div className="animate-fadeIn bg-corporate-dark">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 text-pure-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: `url(${module.hero.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-corporate-dark via-corporate-dark/80 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Link to="/temario" className="text-tech-blue hover:underline font-semibold mb-4 inline-block">
            &larr; {t('module.backToSyllabus')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-3 leading-tight">{module.hero.title[language]}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-inter max-w-3xl mx-auto">{module.hero.subtitle[language]}</p>
          <div className="max-w-xl mx-auto mt-8">
              <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-pure-white">{t('module.progress')}</span>
                  <span className="text-sm font-medium text-pure-white">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-tech-cyan h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress.percentage}%` }}></div>
              </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        <div className="bg-gray-900/50 rounded-lg p-8 md:p-12 shadow-2xl border border-tech-blue/20">
            <div className={`grid gap-12 ${module.content.mediaSrc ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                <div className="prose prose-invert max-w-none prose-h2:font-poppins prose-h2:text-3xl prose-h2:text-pure-white prose-p:text-gray-300 prose-li:text-gray-300">
                    <h2 className="!mb-6">{module.content.learnTitle[language]}</h2>
                    <ul className="space-y-4 !p-0">
                        {module.content.points.map((point, i) => (
                            <li key={i} className="flex items-start !m-0 !p-0">
                                <CheckCircleIcon />
                                <span>{point[language]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {module.content.mediaSrc && (
                    <div className="flex items-center justify-center">
                        <img 
                          src={module.content.mediaSrc} 
                          alt="Visual content" 
                          className="rounded-lg shadow-lg max-h-80 w-auto"
                          loading="lazy"
                          decoding="async"
                        />
                    </div>
                )}
            </div>
            <CompletionButton moduleId={module.id} itemId="content">{t('module.markContentComplete')}</CompletionButton>

            {module.resources.downloads.length > 0 && (
                 <div className="mt-16 pt-12 border-t border-gray-700">
                    <h2 className="font-poppins text-3xl text-pure-white mb-6">{module.resources.title[language]}</h2>
                    <div className="space-y-4">
                        {module.resources.downloads.map((item, i) => {
                            const originalFilename = item.url.split('/').pop() || '';
                            const fileContent = documentContents[originalFilename];
                            
                            if (fileContent) {
                                const isFullHtml = fileContent.trim().toLowerCase().startsWith('<!doctype html>');
                                const contentToEncode = isFullHtml
                                  ? fileContent
                                  : createHtmlContent(item.text[language], fileContent);
                                
                                const dataUri = `data:text/html;charset=utf-8,${encodeURIComponent(contentToEncode)}`;
                                const downloadFilename = `${createDownloadFilename(item.text['es'])}.html`;
                                return (
                                    <a href={dataUri} download={downloadFilename} key={i} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700/80 transition-all duration-300 group shadow-lg border border-gray-700 hover:border-tech-cyan/50">
                                        <div className="flex items-center">
                                            <DownloadIcon/>
                                            <span className="text-gray-200 font-medium group-hover:text-tech-cyan transition-colors">{item.text[language]}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-tech-blue bg-tech-blue/10 px-3 py-1 rounded-md border border-tech-blue/30 group-hover:bg-tech-blue group-hover:text-white transition-colors">
                                            {t('module.download')}
                                        </div>
                                    </a>
                                );
                            }
                            
                            return (
                                <div key={i} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg transition-colors opacity-60 cursor-not-allowed border border-gray-700">
                                    <div className="flex items-center">
                                        <DownloadIconDisabled/>
                                        <span className="text-gray-400 font-medium">{item.text[language]}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-500 bg-gray-700/50 px-3 py-1 rounded-md border border-gray-600">
                                        {t('module.download')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <CompletionButton moduleId={module.id} itemId="resources">{t('module.markResourcesComplete')}</CompletionButton>
                 </div>
            )}
        </div>
        
        {module.videos && module.videos.length > 0 && (
            module.videos.map((video, index) => (
                <section key={index} className="bg-gray-900/50 rounded-lg p-8 md:p-12 shadow-2xl border border-tech-blue/20 text-center">
                    <h2 className="font-poppins text-3xl md:text-4xl text-pure-white mb-8">{video.title[language]}</h2>
                    <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl shadow-tech-cyan/20 border-2 border-tech-blue/40">
                        <iframe 
                            src={video.embedUrl} 
                            title={video.title[language]}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                        ></iframe>
                    </div>
                    <CompletionButton moduleId={module.id} itemId={`video-${index}`}>{t('module.markVideoComplete', { number: index + 1 })}</CompletionButton>
                </section>
            ))
        )}

        {module.flashcards && module.flashcards.length > 0 && (
          <>
            <FlashcardViewer flashcards={module.flashcards} />
            <CompletionButton moduleId={module.id} itemId="flashcards">{t('module.markFlashcardsComplete')}</CompletionButton>
          </>
        )}

        <div className="mt-16 pt-8 border-t border-gray-700 flex justify-between items-center">
            {prevModule ? (
                <Link to={`/modulo/${prevModule.id}`} className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <ChevronLeftIcon /> {`${t('module.module')} ${prevModule.id}`}
                </Link>
            ) : <div/>}
            
            {nextModule ? (
                <Link to={`/modulo/${nextModule.id}`} className="inline-flex items-center px-4 py-2 bg-tech-blue text-white rounded-lg hover:bg-blue-500 transition-colors">
                    {`${t('module.module')} ${nextModule.id}`} <ChevronRightIcon />
                </Link>
            ) : (
                <button onClick={() => navigate('/compra')} className="bg-tech-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg">
                    {t('module.finishAndBuy')}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ModulePage;