import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Import global styles and Tailwind CSS
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { ProgressProvider } from './contexts/ProgressContext.tsx';
import { CRMProvider } from './contexts/CRMContext.tsx';
import { ForumProvider } from './contexts/ForumContext.tsx';
import { QuoteProvider } from './contexts/QuoteContext.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <ProgressProvider>
          <CRMProvider>
            <ForumProvider>
              <QuoteProvider>
                <App />
              </QuoteProvider>
            </ForumProvider>
          </CRMProvider>
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
