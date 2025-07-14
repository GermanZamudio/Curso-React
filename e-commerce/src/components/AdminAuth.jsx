import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminAuth({ children }) {
  //Al configurar al que tiene id=1 como isAdmin, solo verifico el localStorage. Simula dato dado del backend
  const token = localStorage.getItem('token');          
  const isAdmin = localStorage.getItem('isAdmin') === 'true';  

  if (!token) {
    // No está logueado, redirige a login
    return <Navigate to="/Login" replace />;
  }

  if (!isAdmin) {
    // Está logueado pero NO es admin, redirige a home
    return <Navigate to="/" replace />;
  }

  // Si pasó ambos chequeos, muestra el contenido (admin)
  return children;
}