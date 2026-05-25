# paalstack-react-mfe-starter

A production-ready **React Microfrontend (MFE) starter template** built with the `@paalstack/react-ui` component library. Use this as a foundation to quickly bootstrap new microfrontend applications that integrate into a Single-SPA shell.

## Tech Stack

| Tool                   | Version   | Purpose                           |
| ---------------------- | --------- | --------------------------------- |
| React                  | 19        | UI framework                      |
| TypeScript             | 5.6       | Type safety                       |
| Vite                   | 7         | Build tool & dev server           |
| Tailwind CSS           | 4         | Utility-first styling             |
| @paalstack/react-ui    | latest    | Component library                 |
| @paalstack/react-hooks | latest    | Reusable React hooks              |
| @paalstack/react-icons | latest    | Icon set                          |
| Single-SPA             | 6         | MFE orchestration                 |
| Module Federation      | @originjs | Code sharing across MFEs          |
| TanStack Query         | 5         | Server state management           |
| Zustand                | 5         | Client state management           |
| React Router           | 7         | Client-side routing (hash router) |
| React Hook Form        | 7         | Form management                   |
| Zod                    | 4         | Schema validation                 |
| Vitest                 | 4         | Unit testing                      |
| React Testing Library  | 16        | Component testing                 |

## Prerequisites

- **Node.js** >= 22
- **pnpm** >= 10

## Getting Started

### 1. Clone / Use this Template

```bash
git clone https://github.com/paalamugan/paalstack-react-mfe-starter.git my-app
cd my-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and set your values:

```env
VITE_SHARED_REMOTE_URL="http://localhost:9002/assets/remoteEntry.js"
VITE_API_BASE_URL="https://api.example.com/v1"
VITE_DEBUG_MODE=false
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:9001](http://localhost:9001) in your browser.

## Available Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Start development server on port 9001  |
| `pnpm build`         | Build for production (SystemJS output) |
| `pnpm preview`       | Preview production build locally       |
| `pnpm preview:watch` | Watch + preview mode                   |
| `pnpm type-check`    | Run TypeScript type checking           |
| `pnpm lint`          | Run ESLint                             |
| `pnpm lint:fix`      | Fix ESLint errors automatically        |
| `pnpm format`        | Format with Prettier                   |
| `pnpm test`          | Run tests once                         |
| `pnpm test:watch`    | Run tests in watch mode                |
| `pnpm test:ui`       | Open Vitest UI                         |
| `pnpm test:coverage` | Run tests with coverage report         |
| `pnpm commit`        | Interactive conventional commit        |
| `pnpm clean`         | Remove dist and Vite cache             |
| `pnpm clean:all`     | Remove dist, cache, and node_modules   |

## Project Structure

```
src/
├── App.tsx              # Root component with providers
├── App.spa.tsx          # Single-SPA lifecycle exports (bootstrap/mount/unmount)
├── main.tsx             # Standalone dev entry point
├── router.tsx           # App router (hash router)
├── env.ts               # Validated environment variables (@t3-oss/env-core)
├── vite-env.d.ts        # Vite client type declarations
│
├── apis/                # API layer — axios requests + TypeScript types
│   └── example/
│       ├── api.ts       # Axios API functions
│       ├── type.ts      # Request/response types
│       └── index.ts     # Barrel export
│
├── components/          # Shared UI components (not page-specific)
│   └── ExampleCard/
│       ├── component.tsx
│       └── index.ts
│
├── constants/           # App-wide constants
│   └── routes/
│       ├── constant.ts
│       └── index.ts
│
├── hooks/               # Custom React hooks
│   ├── mutations/       # TanStack Query mutation hooks
│   └── queries/         # TanStack Query query hooks
│
├── layouts/             # Page layout wrappers
│   └── AppLayout/
│       ├── layout.tsx
│       └── index.ts
│
├── libs/                # Third-party library configuration
│   └── query-client/
│       ├── lib.ts
│       └── index.ts
│
├── pages/               # Route-level page components
│   ├── HomePage/
│   │   ├── page.tsx
│   │   └── index.ts
│   ├── AboutPage/
│   │   ├── page.tsx
│   │   └── index.ts
│   └── NotFoundPage/
│       ├── page.tsx
│       └── index.ts
│
├── schemas/             # Zod validation schemas
├── services/            # Business logic services
├── stores/              # Zustand global state stores
│
├── styles/
│   └── index.css        # Global styles + Tailwind v4 config
│
├── test/
│   ├── setup.ts         # Vitest setup (jest-dom, RTL config)
│   └── test-utils.tsx   # Custom render utilities
│
├── types/               # Shared TypeScript type definitions
└── utils/               # Utility/helper functions
```

## File & Folder Conventions

Each module follows this pattern:

```
ComponentName/
├── component.tsx   # The implementation
├── index.ts        # Barrel export (re-exports from component.tsx)
```

For pages:

```
PageName/
├── page.tsx        # The page component
├── index.ts        # Barrel export
└── components/     # Page-specific sub-components (optional)
```

For hooks:

```
useHookName/
├── hook.ts         # The hook implementation
└── index.ts        # Barrel export
```

## Microfrontend Configuration

### Standalone Development

The app runs standalone at `http://localhost:9001` during development. The `src/main.tsx` entry point mounts the React app normally.

### MFE / Single-SPA Mode

`src/App.spa.tsx` exports Single-SPA lifecycle functions (`bootstrap`, `mount`, `unmount`) using `single-spa-react`. This file is exposed via Module Federation as `./App`.

### Module Federation

Configure remotes and exposes in `vite.config.ts`:

```ts
federation({
  name: 'myApp', // CUSTOMIZE: Your app name (camelCase)
  filename: 'remoteEntry.js',
  remotes: {
    shared: VITE_SHARED_REMOTE_URL,
    // anotherApp: 'http://localhost:9003/assets/remoteEntry.js',
  },
  exposes: {
    './App': './src/App.spa.tsx',
    // './Counter': './src/components/Counter/component.tsx',
  },
  shared: ['react', 'react-dom', 'react-router', 'zustand', '@tanstack/react-query'],
});
```

## Adding New Pages

1. Create a new folder under `src/pages/`:

   ```
   src/pages/MyPage/
   ├── page.tsx
   └── index.ts
   ```

2. Add a route constant in `src/constants/routes/constant.ts`:

   ```ts
   export const ROUTES = {
     MY_PAGE: '/my-page',
   } as const;
   ```

3. Register the route in `src/router.tsx`:
   ```tsx
   import { MyPage } from '@/pages/MyPage';
   { path: ROUTES.MY_PAGE, element: <MyPage /> }
   ```

## Environment Variables

| Variable                 | Required | Description                           |
| ------------------------ | -------- | ------------------------------------- |
| `VITE_SHARED_REMOTE_URL` | No       | URL to shared MFE remoteEntry.js      |
| `VITE_API_BASE_URL`      | Yes      | Base URL for REST API calls           |
| `VITE_DEBUG_MODE`        | No       | Enable debug logging (`true`/`false`) |

All variables are validated at startup via `@t3-oss/env-core` + Zod. Missing required variables will throw a descriptive error.

## Testing

Tests use **Vitest** + **React Testing Library**. The `data-qa` attribute is used as the test ID selector (instead of `data-testid`).

```tsx
// In your component
<button data-qa="submit-button">Submit</button>;

// In your test
const button = screen.getByTestId('submit-button');
```

Run tests:

```bash
pnpm test               # Single run
pnpm test:watch         # Watch mode
pnpm test:coverage      # With coverage report (80% threshold enforced)
```

## Code Quality

- **ESLint** (v9 flat config) — TypeScript, React, React Hooks, jsx-a11y, TanStack Query
- **Prettier** — Code formatting with Tailwind class sorting
- **Husky** — Git hooks for pre-commit linting and commit message validation
- **lint-staged** — Only lint/format staged files
- **commitlint** — Enforces conventional commit messages

## License

MIT
