import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/test-utils';

import { HomePage } from './page';

describe('HomePage', () => {
  it('renders the main welcome heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /paalstack react mfe starter/i })
    ).toBeInTheDocument();
  });

  it('renders the introductory description text', () => {
    render(<HomePage />);
    expect(screen.getByText(/production-ready microfrontend boilerplate/i)).toBeInTheDocument();
  });

  it('renders all 6 feature cards', () => {
    render(<HomePage />);
    // CardTitle renders as h3
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(6);
  });

  it('renders the React 19 feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('React 19')).toBeInTheDocument();
  });

  it('renders the Single-SPA MFE feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('Single-SPA MFE')).toBeInTheDocument();
  });

  it('renders the Tailwind CSS v4 feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('Tailwind CSS v4')).toBeInTheDocument();
  });

  it('renders the TanStack Query feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('TanStack Query')).toBeInTheDocument();
  });

  it('renders the Vitest + RTL feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('Vitest + RTL')).toBeInTheDocument();
  });

  it('renders the TypeScript Strict feature card', () => {
    render(<HomePage />);
    expect(screen.getByText('TypeScript Strict')).toBeInTheDocument();
  });

  it('mentions @paalstack/react-ui in the description', () => {
    render(<HomePage />);
    const matches = screen.getAllByText(/@paalstack\/react-ui/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});
