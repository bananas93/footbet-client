import { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

const LoginPage = lazy(() => import('../views/LoginPage'));

export const AuthRoutes = () => {
  const routes = useRoutes(
    [
      { path: '/', element: <LoginPage /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  );
  return routes;
};
