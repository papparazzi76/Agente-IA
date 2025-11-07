import React from 'react';
import { Navigate } from 'react-router-dom';

// This page seems to be deprecated in favor of CourseLandingPage.
// The /compra route now redirects to /venta-curso in App.tsx.
// This component is a placeholder to prevent build errors from an empty file
// and redirects to the correct page if it were ever accessed directly.
const PurchasePage: React.FC = () => {
  return <Navigate to="/venta-curso" replace />;
};

export default PurchasePage;
