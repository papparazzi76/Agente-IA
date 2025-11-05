import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import SyllabusPage from './pages/SyllabusPage.tsx';
import ModulePage from './pages/ModulePage.tsx';
import CourseLandingPage from './pages/CourseLandingPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import PlaygroundPage from './pages/PlaygroundPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import BackToTopButton from './components/BackToTopButton.tsx';
import Chatbot from './components/Chatbot.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import MarketplacePage from './pages/MarketplacePage.tsx';
import WebDesignPage from './pages/WebDesignPage.tsx';
import AppliedAIPage from './pages/AppliedAIPage.tsx';
import DigitalMarketingPage from './pages/DigitalMarketingPage.tsx';
import AutomationProductivityPage from './pages/AutomationProductivityPage.tsx';
import LegalDocumentationPage from './pages/LegalDocumentationPage.tsx';
import PremiumExtrasPage from './pages/PremiumExtrasPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CRMPage from './pages/CRMPage.tsx';
import PropertiesListPage from './pages/crm/PropertiesListPage.tsx';
import PropertyDetailPage from './pages/crm/PropertyDetailPage.tsx';
import PropertyFormPage from './pages/crm/PropertyFormPage.tsx';
import ContactsListPage from './pages/crm/ContactsListPage.tsx';
import ContactFormPage from './pages/crm/ContactFormPage.tsx';
import ForumPage from './pages/ForumPage.tsx';
import ForumHomePage from './pages/forum/ForumHomePage.tsx';
import ThreadListPage from './pages/forum/ThreadListPage.tsx';
import ThreadDetailPage from './pages/forum/ThreadDetailPage.tsx';
import NewThreadPage from './pages/forum/NewThreadPage.tsx';
import QuoteRequestModal from './components/QuoteRequestModal.tsx';

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
        <QuoteRequestModal />
      </div>
    </HashRouter>
  );
};

export default App;
