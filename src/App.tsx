import { ErrorBoundary, ErrorInternalResponse, ThemeProvider } from '@paalstack/react-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type FC } from 'react';
import { RouterProvider } from 'react-router';

import { queryClient } from '@/libs/query-client';
import { type AppProps } from '@/types/app';

import { getAppRouter } from './router';
import './styles/index.css';

/**
 * Root application component.
 *
 * Wraps the app with all required providers:
 * - ErrorBoundary (catches unhandled render errors)
 * - QueryClientProvider (TanStack Query)
 * - ThemeProvider (@paalstack/react-ui theme context)
 * - RouterProvider (React Router hash router)
 *
 * In Single-SPA mode the shell may inject `baseHref` via AppProps.
 */
const App: FC<AppProps> = () => {
  const appRouter = getAppRouter();
  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorInternalResponse error={error as Error} />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={appRouter} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
