import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { documentContents } from '../constants';

const InstagramIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-3.25-8a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm5.25 0a2 2 0 10-4 0 2 2 0 004 0zm1.75-4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.84 13.57a.9.9 0 001.38.74l5.48-3.28a.9.9 0 000-1.58l-5.48-3.28a.9.9 0 00-1.38.74v6.56z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4s1.39.63 1.39 1.4v4.93h2.8zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);


const Footer: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const linkStyle = "text-gray-400 hover:text-tech-cyan transition-all duration-300 transform hover:-translate-y-px";

  const privacyPolicyContent = documentContents['politica_privacidad.html'];
  const privacyPolicyDataUri = privacyPolicyContent 
    ? `data:text/html;charset=utf-8,${encodeURIComponent(privacyPolicyContent)}`
    : '#';
  
  const termsOfServiceContent = documentContents['terminos_servicio.html'];
  const termsOfServiceDataUri = termsOfServiceContent
    ? `data:text/html;charset=utf-8,${encodeURIComponent(termsOfServiceContent)}`
    : '#';

  const legalNoticeContent = documentContents['aviso_legal.html'];
  const legalNoticeDataUri = legalNoticeContent
    ? `data:text/html;charset=utf-8,${encodeURIComponent(legalNoticeContent)}`
    : '#';

  return (
    <footer className="bg-transparent border-t border-tech-blue/30 shadow-[0_-4px_30px_rgba(0,191,255,0.1)] overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sequential-fade-in">
          <div className="col-span-1 md:col-span-1" style={{ animationDelay: '100ms' }}>
            <Link to="/">
              <img src="https://essjcgcsssyfwkqlshkc.supabase.co/storage/v1/object/sign/Logo/logo-agente-ia.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iY2I2NzRiZi0zZmI5LTQ0NWEtOTJlNi0yNDcyOGQyMzg4M2UiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvL2xvZ28tYWdlbnRlLWlhLnBuZyIsImlhdCI6MTc2MTY1NTEyNCwiZXhwIjoxNzkzMTkxMTI0fQ.KxpCPaSsjvM-Nf0SFWOoEBVHiWaeicWyoA8UPQVa0J0" alt="AgenteIA Logo" className="h-24 w-auto" />
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-tech-cyan transition-transform hover:scale-110" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-tech-cyan transition-transform hover:scale-110" aria-label="YouTube">
                <YouTubeIcon />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-tech-cyan transition-transform hover:scale-110" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8" style={{ animationDelay: '200ms' }}>
            <div>
              <h3 className="font-semibold text-pure-white tracking-wider uppercase mb-4">{t('footer.productsTitle')}</h3>
              <ul className="space-y-2">
                <li><Link to="/marketplace" className={linkStyle}>{t('header.navMarketplace')}</Link></li>
                <li><Link to="/precios" className={linkStyle}>{t('header.navPricing')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-pure-white tracking-wider uppercase mb-4">{t('footer.accountTitle')}</h3>
              <ul className="space-y-2">
                {!currentUser && (
                  <li><Link to="/auth" className={linkStyle}>{t('footer.accountLogin')}</Link></li>
                )}
                {currentUser && (
                  <li><Link to="/dashboard" className={linkStyle}>{t('header.navDashboard')}</Link></li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-pure-white tracking-wider uppercase mb-4">{t('footer.supportTitle')}</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('footer.alertContact')); }} className={linkStyle}>{t('footer.supportContact')}</a></li>
                {privacyPolicyContent ? (
                  <li><a href={privacyPolicyDataUri} download="politica_de_privacidad.html" className={linkStyle}>{t('footer.supportPrivacy')}</a></li>
                ) : (
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('footer.alertPrivacy')); }} className={linkStyle}>{t('footer.supportPrivacy')}</a></li>
                )}
                {termsOfServiceContent ? (
                  <li><a href={termsOfServiceDataUri} download="terminos_de_servicio.html" className={linkStyle}>{t('footer.supportTerms')}</a></li>
                ) : (
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('footer.alertTerms')); }} className={linkStyle}>{t('footer.supportTerms')}</a></li>
                )}
                {legalNoticeContent ? (
                  <li><a href={legalNoticeDataUri} download="aviso_legal.html" className={linkStyle}>{t('footer.supportLegalNotice')}</a></li>
                ) : (
                  <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('footer.alertTerms')); }} className={linkStyle}>{t('footer.supportLegalNotice')}</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-800 sequential-fade-in">
          <p style={{ animationDelay: '400ms' }}>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;