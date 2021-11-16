import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const LoginPage = lazy(() => import('../views/LoginPage'));

export const AuthRoutes = () => {
  const routes = useRoutes(
    [
      { path: '/', element: <LoginPage /> },
      { path: '*', element: <LoginPage /> },
    ],
  );
  return routes;
};
