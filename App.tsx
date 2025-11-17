import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/CourseLandingPage';
import AuthPage from './pages/AuthPage';
import PlaygroundPage from './pages/PlaygroundPage';
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
import QuoteRequestModal from './components/QuoteRequestModal';
import SyllabusPage from './pages/SyllabusPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import AdminPage from './pages/AdminPage';
import ForumPage from './pages/ForumPage';
import ForumHomePage from './pages/forum/ForumHomePage';
import ThreadListPage from './pages/forum/ThreadListPage';
import NewThreadPage from './pages/forum/NewThreadPage';
import ThreadDetailPage from './pages/forum/ThreadDetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="tech-background flex flex-col min-h-screen text-pure-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/web-design" element={<WebDesignPage />} />
            <Route path="/marketplace/applied-ai" element={<AppliedAIPage />} />
            <Route path="/marketplace/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/marketplace/automation-productivity" element={<AutomationProductivityPage />} />
            <Route path="/marketplace/legal-documentation" element={<LegalDocumentationPage />} />
            <Route path="/marketplace/premium-extras" element={<PremiumExtrasPage />} />
            <Route path="/precios" element={<PricingPage />} />
            <Route path="/venta-curso" element={<Navigate to="/precios" replace />} />
            <Route path="/compra" element={<Navigate to="/precios" replace />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            
            <Route
              path="/playground"
              element={<ProtectedRoute><PlaygroundPage /></ProtectedRoute>}
            />

            <Route
              path="/curso"
              element={<ProtectedRoute><SyllabusPage /></ProtectedRoute>}
            />
            <Route
              path="/modulo/:id"
              element={<ProtectedRoute><ModuleDetailPage /></ProtectedRoute>}
            />

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