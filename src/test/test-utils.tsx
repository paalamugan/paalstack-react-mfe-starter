/**
 * Custom Test Utilities
 *
 * Provides a `renderWithProviders` helper that wraps components with all
 * required providers (QueryClient, ThemeProvider) for integration-style tests.
 *
 * Usage:
 *   import { render, renderWithProviders, screen } from '@/test/test-utils';
 *
 *   // Simple unit test (no providers needed):
 *   render(<MyComponent />);
 *
 *   // Component that uses useQuery, useAppStore, etc.:
 *   renderWithProviders(<MyComponent />);
 */

import { ThemeProvider } from '@paalstack/react-ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type FC, type ReactNode } from 'react';

import { createTestQueryClient } from '@/libs/query-client';

type AllProvidersProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

/**
 * Render with all providers (QueryClient + ThemeProvider).
 * Use this for components that rely on React Query hooks or theme context.
 */
const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

/**
 * Plain render without providers.
 * Use this for pure presentational components.
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { ...options });
};

// Re-export everything from @testing-library/react
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

export { customRender as render, renderWithProviders };
