import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const HomePage = lazy(() => import('../views/HomePage'));
const TournamentsPage = lazy(() => import('../views/TournamentsPage'));
const TournamentPage = lazy(() => import('../views/TournamentPage'));
const RulesPage = lazy(() => import('../views/RulesPage'));
const ProfilePage = lazy(() => import('../views/ProfilePage'));
const ChatPage = lazy(() => import('../views/ChatPage'));
const ErrorPage = lazy(() => import('../views/Error'));

export const ProtectedRoutes = () => {
  const routes = useRoutes(
    [
      { path: '/', element: <HomePage /> },
      { path: '/tournaments', element: <TournamentsPage /> },
      { path: '/tournament/:slug', element: <TournamentPage /> },
      { path: '/rules', element: <RulesPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  );
  return routes;
};
