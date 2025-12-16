import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuoteProvider } from './contexts/QuoteContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ForumProvider } from './contexts/ForumContext';
import ErrorBoundary from './components/ErrorBoundary';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ForumProvider>
            <ProgressProvider>
              <QuoteProvider>
                <App />
              </QuoteProvider>
            </ProgressProvider>
          </ForumProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);