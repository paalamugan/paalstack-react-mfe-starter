import { Heading, Separator, Text, Typography, VStack } from '@paalstack/react-ui';
import { type FC } from 'react';

const STRUCTURE_ENTRIES = [
  { path: 'src/apis/', description: 'API layer — axios requests + TypeScript types' },
  { path: 'src/components/', description: 'Shared UI components (not page-specific)' },
  { path: 'src/constants/', description: 'App-wide constants and route definitions' },
  { path: 'src/hooks/', description: 'Custom React hooks — queries, mutations, utilities' },
  { path: 'src/layouts/', description: 'Page layout wrappers (AppLayout, etc.)' },
  { path: 'src/libs/', description: 'Third-party library configuration (QueryClient)' },
  { path: 'src/pages/', description: 'Route-level page components' },
  { path: 'src/schemas/', description: 'Zod validation schemas for forms and APIs' },
  { path: 'src/services/', description: 'Business-logic service layer' },
  { path: 'src/stores/', description: 'Zustand global state stores' },
  { path: 'src/styles/', description: 'Global CSS + Tailwind v4 theme configuration' },
  { path: 'src/types/', description: 'Shared TypeScript type definitions' },
  { path: 'src/utils/', description: 'Utility / helper functions' },
] as const;

const AboutPage: FC = () => {
  return (
    <VStack className="items-start gap-8">
      {/* ── Heading ───────────────────────────────────────────────────── */}
      <VStack className="items-start gap-3">
        <Heading as="h1">About This Starter</Heading>
        <Text className="text-muted-foreground max-w-2xl text-sm">
          This boilerplate is a starting point for building microfrontend applications using the{' '}
          <Text as="strong" className="text-foreground">
            @paalstack/react-ui
          </Text>{' '}
          component library. It follows the same project conventions and structure as production MFE
          applications, making it easy for teams to onboard and start building features immediately.
        </Text>
      </VStack>

      <Separator />

      {/* ── Project structure ─────────────────────────────────────────── */}
      <VStack className="w-full items-start gap-4">
        <Heading as="h2" className="text-foreground">
          Project Structure
        </Heading>
        <Text className="text-muted-foreground text-sm">
          Each module follows a consistent{' '}
          <Text as="code" className="bg-muted rounded px-1 font-mono text-xs">
            component.tsx / page.tsx + index.ts
          </Text>{' '}
          barrel pattern.
        </Text>

        <Typography.UL
          as="ul"
          className="border-border bg-muted/30 w-full items-start gap-2 rounded-lg border p-4"
        >
          {STRUCTURE_ENTRIES.map(({ path, description }) => (
            <Text as="li" key={path} className="text-foreground flex items-start gap-2 text-sm">
              <Text
                as="code"
                className="bg-muted text-primary shrink-0 rounded px-1.5 py-0.5 font-mono text-xs"
              >
                {path}
              </Text>
              <Text as="span" className="text-muted-foreground">
                {description}
              </Text>
            </Text>
          ))}
        </Typography.UL>
      </VStack>

      <Separator />

      {/* ── Conventions ───────────────────────────────────────────────── */}
      <VStack className="items-start gap-3">
        <Heading as="h2" className="text-foreground text-xl font-semibold">
          File Conventions
        </Heading>
        <VStack
          as="ul"
          className="text-muted-foreground list-inside list-disc items-start gap-1.5 text-sm"
        >
          {[
            'Components: component.tsx + index.ts barrel export',
            'Pages: page.tsx + index.ts (with optional components/ sub-folder)',
            'Hooks: hook.ts + index.ts',
            'API modules: api.ts + type.ts + index.ts',
            'Test files co-located next to the source file (*.test.tsx)',
          ].map((item) => (
            <Text as="li" key={item}>
              {item}
            </Text>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export { AboutPage };
