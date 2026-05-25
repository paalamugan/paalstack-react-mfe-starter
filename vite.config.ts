/**
 * Vite Configuration for Paalstack React MFE Starter
 *
 * This configuration sets up a React microfrontend using:
 * - Vite for fast development and optimized builds
 * - Module Federation for sharing code across microfrontends
 * - Single-SPA for micro-frontend orchestration
 * - Tailwind CSS v4 for styling
 *
 * Customization Guide:
 * 1. Update 'name' in federation config to match your app name (camelCase)
 * 2. Update 'port' in server and preview configs if needed (default: 9001)
 * 3. Add/remove 'remotes' for other microfrontends you want to consume
 * 4. Add/remove 'exposes' for modules you want to share with other apps
 * 5. Update 'shared' dependencies based on your needs
 */

import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: { mode: string }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  /**
   * GitHub Pages Base Path
   *
   * When deploying to GitHub Pages the app is served at:
   *   https://<user>.github.io/<repo-name>/
   *
   * Set VITE_BASE_URL in your .env or GitHub Actions secret to match your
   * repository name (e.g. '/paalstack-react-mfe-starter/').
   * Leave empty ('') or '/' for deployments at the domain root.
   */
  const BASE_URL = env.VITE_BASE_URL ?? '/';

  /**
   * Shared Remote URL Configuration
   *
   * This URL points to the "shared" microfrontend's remoteEntry.js file.
   * The remoteEntry.js is the entry point for module federation.
   *
   * Configuration:
   * 1. Create a .env file in the project root (use .env.example as template)
   * 2. Set VITE_SHARED_REMOTE_URL=http://your-server:port/assets/remoteEntry.js
   * 3. Or use the default: http://localhost:9002/assets/remoteEntry.js
   *
   * Usage:
   * - In development: Points to locally running shared MFE (typically port 9002)
   * - In production: Points to deployed shared MFE URL
   * - This value is injected into index.html via vite-plugin-html
   *
   * Example .env:
   * VITE_SHARED_REMOTE_URL=http://localhost:9002/assets/remoteEntry.js
   * VITE_SHARED_REMOTE_URL=https://cdn.example.com/shared/remoteEntry.js
   */
  const VITE_SHARED_REMOTE_URL =
    env.VITE_SHARED_REMOTE_URL || 'http://localhost:9002/assets/remoteEntry.js';

  return defineConfig({
    // Base public path — set to '/<repo-name>/' for GitHub Pages
    base: BASE_URL,

    plugins: [
      // Paths plugin for TypeScript paths
      tsconfigPaths(),

      // React plugin with Fast Refresh and React Compiler support
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),

      // Tailwind CSS v4 plugin
      tailwindcss(),

      // Module Federation plugin for micro-frontend architecture
      federation({
        // CUSTOMIZE: Change this to your app name (camelCase, no spaces)
        // Example: 'myDashboard', 'userProfile', 'orderManagement'
        name: 'reactApp',

        // Output filename for the federated module entry point
        filename: 'remoteEntry.js',

        // CUSTOMIZE: Add remote microfrontends that this app will consume
        // Format: 'remoteName': 'http://url/to/remoteEntry.js'
        remotes: {
          shared: VITE_SHARED_REMOTE_URL,
          // Add more remotes here as needed:
          // anotherApp: 'http://localhost:9003/assets/remoteEntry.js',
        },

        // CUSTOMIZE: Expose modules for other apps to consume
        // Format: './ModuleName': './src/path/to/component.tsx'
        exposes: {
          './App': './src/App.spa.tsx',
          // Add more exposed modules here:
          // './Counter': './src/components/Counter/component.tsx',
        },

        shared: [
          'react',
          'react-dom',
          'react-router',
          'zustand',
          '@tanstack/react-query',
          '@paalstack/react-ui',
          '@paalstack/react-icons',
          '@paalstack/react-hooks',
        ],
      }),

      // HTML plugin for injecting environment variables into index.html
      // This replaces <%= sharedRemoteUrl %> in index.html with the actual URL
      createHtmlPlugin({
        minify: false,
        inject: {
          data: {
            // Injects the shared remote URL into the SystemJS import map in index.html
            // This allows SystemJS to resolve 'shared' module imports at runtime
            sharedRemoteUrl: VITE_SHARED_REMOTE_URL,
            // Add more variables here to inject into index.html:
            // anotherSharedRemoteUrl: 'http://localhost:9003/assets/remoteEntry.js',
          },
        },
      }),
    ],

    // Development server configuration
    server: {
      // CUSTOMIZE: Change port if 9001 is already in use
      port: 9001,

      // Enable CORS for cross-origin requests (required for module federation)
      cors: true,

      // Optional: Uncomment to open browser automatically
      // open: true,
    },

    // Preview server configuration (for testing production builds locally)
    preview: {
      port: 9001,
      cors: true,
    },

    // Production build configuration
    build: {
      // Target modern browsers for smaller bundle size
      target: 'esnext',

      // Minification - set to true for production, false for debugging
      minify: false,

      // Keep CSS in a single file for consistency
      cssCodeSplit: false,

      // Rollup-specific options
      rollupOptions: {
        output: {
          // SystemJS format required for Single-SPA
          format: 'system',
        },
      },
    },

    // Experimental features
    experimental: {
      // Use relative URLs in build output for deployment flexibility
      renderBuiltUrl() {
        return { relative: true };
      },
    },
  });
};
