import { ErrorRouterBoundary } from '@paalstack/react-ui';
import { Navigate, createHashRouter } from 'react-router';

import { ROUTES } from '@/constants/routes';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { AppLayout } from './layouts/AppLayout';

export const getAppRouter = () => {
  return createHashRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorRouterBoundary />,
      children: [
        { index: true, element: <Navigate to={ROUTES.HOME} replace /> },
        { path: ROUTES.HOME, element: <HomePage /> },
        { path: ROUTES.ABOUT, element: <AboutPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
};
