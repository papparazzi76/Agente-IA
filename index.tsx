import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProgressProvider } from './contexts/ProgressContext';
// FIX: Import CRMProvider and ForumProvider to make contexts available.
import { CRMProvider } from './contexts/CRMContext';
import { ForumProvider } from './contexts/ForumContext';


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
          {/* FIX: Add CRMProvider and ForumProvider to the component tree. */}
          <CRMProvider>
            <ForumProvider>
              <App />
            </ForumProvider>
          </CRMProvider>
        </ProgressProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
);
