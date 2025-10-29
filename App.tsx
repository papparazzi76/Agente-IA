import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SyllabusPage from './pages/SyllabusPage';
import ModulePage from './pages/ModulePage';
import CourseLandingPage from './pages/CourseLandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PlaygroundPage from './pages/PlaygroundPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import MarketplacePage from './pages/MarketplacePage';


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
              element={<ModulePage />} 
            />
            <Route path="/marketplace" element={<MarketplacePage />} />
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