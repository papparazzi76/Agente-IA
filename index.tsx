import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { QuoteProvider } from './contexts/QuoteContext';


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
          <QuoteProvider>
            <App />
          </QuoteProvider>
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);