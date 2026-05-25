/**
 * Vitest Configuration
 *
 * This configuration sets up Vitest for testing React components with:
 * - jsdom environment for DOM API support
 * - React Testing Library integration
 * - Code coverage reporting
 * - Path aliases from tsconfig.json
 */

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Support for TypeScript path aliases
    react(), // React plugin with Fast Refresh
  ],

  // Make VITE_ env vars available in import.meta.env during tests even when
  // .env.local is absent (e.g. CI). Values are overridden by real .env files
  // when present, so local developer experience is unchanged.
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://api.example.com'),
    'import.meta.env.VITE_DEBUG_MODE': JSON.stringify('false'),
  },

  test: {
    // Use jsdom for DOM API support (needed for React Testing Library)
    environment: 'jsdom',

    // Setup files to run before each test file
    setupFiles: ['./src/test/setup.ts'],

    // Global test configuration
    globals: true,

    // CSS handling
    css: true,

    // Code coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'cobertura'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '**/*.test.*',
        '**/*.spec.*',
        'dist/',
        // Entry/bootstrap files — no testable logic
        'src/main.tsx',
        'src/App.tsx',
        'src/App.spa.tsx',
        'src/router.tsx',
        'src/env.ts',
        'src/vite-env.d.ts',
        // Static assets — no executable code
        'src/assets/**',
        // Pure barrel re-export files — covered by their implementation tests
        'src/**/index.ts',
      ],
      // Enforce 80% coverage on the tested files
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // Include and exclude patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
