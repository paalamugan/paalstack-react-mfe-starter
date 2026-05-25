/**
 * useNavigation — a thin wrapper around react-router's `useNavigate`.
 *
 * Provides typed helpers for common navigation patterns used in this app.
 *
 * Usage:
 *   import { useNavigation } from '@/hooks/useNavigation';
 *   const { goHome, goTo } = useNavigation();
 */

import { useNavigate } from 'react-router';

import { ROUTES } from '@/constants/routes';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goHome = () => {
    void navigate(ROUTES.HOME);
  };

  const goTo = (path: string, options?: { replace?: boolean }) => {
    void navigate(path, options);
  };

  const goBack = () => {
    void navigate(-1);
  };

  return { goHome, goTo, goBack, navigate };
};
