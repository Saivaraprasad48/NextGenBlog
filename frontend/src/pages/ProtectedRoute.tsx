import { Navigate, Route } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  element: ReactNode;
  path: string;
}

export function ProtectedRoute({ element, ...rest }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  
  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" replace />
  );
}