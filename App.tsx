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
import CRMPage from './pages/CRMPage';
import PropertiesListPage from './pages/crm/PropertiesListPage';
import PropertyFormPage from './pages/crm/PropertyFormPage';
import PropertyDetailPage from './pages/crm/PropertyDetailPage';
import ContactsListPage from './pages/crm/ContactsListPage';
import ContactFormPage from './pages/crm/ContactFormPage';


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