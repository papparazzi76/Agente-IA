import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SyllabusPage from './pages/SyllabusPage';
import ModulePage from './pages/ModulePage';
import CourseLandingPage from './pages/CourseLandingPage';
import AuthPage from './pages/AuthPage';
import PlaygroundPage from './pages/PlaygroundPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import MarketplacePage from './pages/MarketplacePage';
import WebDesignPage from './pages/WebDesignPage';
import AppliedAIPage from './pages/AppliedAIPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import AutomationProductivityPage from './pages/AutomationProductivityPage';
import LegalDocumentationPage from './pages/LegalDocumentationPage';
import PremiumExtrasPage from './pages/PremiumExtrasPage';
import DashboardPage from './pages/DashboardPage';
// FIX: Import CRM and Forum page components.
import CRMPage from './pages/CRMPage';
import PropertiesListPage from './pages/crm/PropertiesListPage';
import PropertyDetailPage from './pages/crm/PropertyDetailPage';
import PropertyFormPage from './pages/crm/PropertyFormPage';
import ContactsListPage from './pages/crm/ContactsListPage';
import ContactFormPage from './pages/crm/ContactFormPage';
import ForumPage from './pages/ForumPage';
import ForumHomePage from './pages/forum/ForumHomePage';
import ThreadListPage from './pages/forum/ThreadListPage';
import ThreadDetailPage from './pages/forum/ThreadDetailPage';
import NewThreadPage from './pages/forum/NewThreadPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="tech-background flex flex-col min-h-screen text-pure-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/temario" element={<SyllabusPage />} />
            <Route 
              path="/modulo/:moduleId" 
              element={<ProtectedRoute><ModulePage /></ProtectedRoute>} 
            />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/web-design" element={<WebDesignPage />} />
            <Route path="/marketplace/applied-ai" element={<AppliedAIPage />} />
            <Route path="/marketplace/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/marketplace/automation-productivity" element={<AutomationProductivityPage />} />
            <Route path="/marketplace/legal-documentation" element={<LegalDocumentationPage />} />
            <Route path="/marketplace/premium-extras" element={<PremiumExtrasPage />} />
            <Route path="/venta-curso" element={<CourseLandingPage />} />
            <Route path="/compra" element={<Navigate to="/venta-curso" replace />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            
            <Route
              path="/playground"
              element={<ProtectedRoute><PlaygroundPage /></ProtectedRoute>}
            />

            {/* FIX: Added routes for CRM section */}
            <Route path="/crm" element={<ProtectedRoute><CRMPage /></ProtectedRoute>}>
              <Route index element={<Navigate to="properties" replace />} />
              <Route path="properties" element={<PropertiesListPage />} />
              <Route path="properties/new" element={<PropertyFormPage />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="properties/:id/edit" element={<PropertyFormPage />} />
              <Route path="contacts" element={<ContactsListPage />} />
              <Route path="contacts/new" element={<ContactFormPage />} />
              <Route path="contacts/:id/edit" element={<ContactFormPage />} />
            </Route>

            {/* FIX: Added routes for Forum section */}
            <Route path="/foro" element={<ProtectedRoute><ForumPage /></ProtectedRoute>}>
              <Route index element={<ForumHomePage />} />
              <Route path=":sectionSlug" element={<ThreadListPage />} />
              <Route path=":sectionSlug/new" element={<NewThreadPage />} />
              <Route path=":sectionSlug/:threadId" element={<ThreadDetailPage />} />
            </Route>
            
            <Route
              path="/admin"
              element={<ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute>}
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <BackToTopButton />
        <Chatbot />
      </div>
    </HashRouter>
  );
};

export default App;
