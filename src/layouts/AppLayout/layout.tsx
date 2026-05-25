import { Container, Flex, HStack, Text } from '@paalstack/react-ui';
import { type FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router';

import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'About', to: ROUTES.ABOUT },
] as const;

const AppLayout: FC = () => {
  const { pathname } = useLocation();

  return (
    <Flex className="bg-background font-poppins text-foreground min-h-screen flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <HStack as="header" className="border-border bg-background border-b px-6 py-4">
        <Container className="flex w-full max-w-6xl items-center justify-between">
          <Link to={ROUTES.HOME}>
            <Text as="span" className="text-primary text-xl font-semibold">
              Paalstack MFE Starter
            </Text>
          </Link>

          <HStack as="nav" className="gap-6">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-colors ${
                  pathname === to
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
          </HStack>
        </Container>
      </HStack>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <Container as="main" className="max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </Container>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Flex
        as="footer"
        className="border-border bg-background flex-col items-center gap-2 border-t px-6 py-4"
      >
        <Text className="text-muted-foreground text-sm">
          Built with{' '}
          <Text as="code" className="bg-muted rounded px-1 py-0.5 font-mono text-sm">
            @paalstack/react-ui
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};

export { AppLayout };
