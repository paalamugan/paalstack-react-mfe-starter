import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@paalstack/react-ui';
import { type FC } from 'react';

const FEATURES = [
  {
    title: 'React 19',
    description:
      'Built with the latest React including the React Compiler for automatic memoization and optimizations.',
  },
  {
    title: 'Single-SPA MFE',
    description:
      'Module Federation and Single-SPA ready for seamless microfrontend orchestration across teams.',
  },
  {
    title: 'Tailwind CSS v4',
    description:
      'Utility-first CSS with Tailwind v4 and @paalstack/react-ui design tokens for consistent theming.',
  },
  {
    title: 'TanStack Query',
    description:
      'Powerful async state management for server state with caching, synchronization, and DevTools.',
  },
  {
    title: 'Vitest + RTL',
    description:
      'Fast unit testing with Vitest and React Testing Library pre-configured with 80% coverage enforcement.',
  },
  {
    title: 'TypeScript Strict',
    description:
      'Strict TypeScript configuration with comprehensive ESLint flat config and Prettier formatting.',
  },
] as const;

const HomePage: FC = () => {
  return (
    <VStack className="items-start gap-10">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <VStack className="items-start gap-4">
        <Heading as="h1">Welcome to Paalstack React MFE Starter</Heading>
        <Text className="text-muted-foreground max-w-2xl text-lg">
          A production-ready microfrontend boilerplate built with React&nbsp;19, Vite&nbsp;7,
          Single-SPA, Tailwind CSS v4, and{' '}
          <Text as="code" className="bg-muted rounded px-1 py-0.5 font-mono text-sm">
            @paalstack/react-ui
          </Text>
          .
        </Text>
      </VStack>

      {/* ── Feature grid ──────────────────────────────────────────────── */}
      <Grid className="w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <GridItem key={feature.title}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export { HomePage };
