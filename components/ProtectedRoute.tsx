import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  roles?: Array<'student' | 'admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { currentUser, loading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-tech-blue"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // Si el usuario está bloqueado, redirigir al dashboard con un mensaje
  if (currentUser.is_blocked) {
      return <Navigate to="/dashboard" state={{ error: t('auth.errorAccountBlocked') }} replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Redirect to dashboard if user role is not authorized
    // Pass an error message in the state to be displayed on the dashboard
    return <Navigate to="/dashboard" state={{ error: t('auth.errorAccessDenied') }} replace />;
  }

  return children;
};

export default ProtectedRoute;