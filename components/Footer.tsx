import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { documentContents } from '../constants';

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
            <h2 className="text-2xl font-bold font-poppins text-pure-white">
              Agente<span className="text-tech-cyan">IA</span>
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8" style={{ animationDelay: '200ms' }}>
            <div>
              <h3 className="font-semibold text-pure-white tracking-wider uppercase mb-4">{t('footer.courseTitle')}</h3>
              <ul className="space-y-2">
                <li><Link to="/temario" className={linkStyle}>{t('footer.courseSyllabus')}</Link></li>
                <li><Link to="/compra" className={linkStyle}>{t('footer.coursePricing')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-pure-white tracking-wider uppercase mb-4">{t('footer.accountTitle')}</h3>
              <ul className="space-y-2">
                {currentUser ? (
                  <li><Link to="/dashboard" className={linkStyle}>{t('footer.accountDashboard')}</Link></li>
                ) : (
                  <li><Link to="/auth" className={linkStyle}>{t('footer.accountLogin')}</Link></li>
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