import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/test-utils';

import { AboutPage } from './page';

describe('AboutPage', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /about this starter/i })
    ).toBeInTheDocument();
  });

  it('renders the @paalstack/react-ui mention', () => {
    render(<AboutPage />);
    expect(screen.getByText(/@paalstack\/react-ui/i)).toBeInTheDocument();
  });

  it('renders the Project Structure heading', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 2, name: /project structure/i })
    ).toBeInTheDocument();
  });

  it('renders key directory entries in the structure list', () => {
    render(<AboutPage />);
    expect(screen.getByText(/src\/apis\//i)).toBeInTheDocument();
    expect(screen.getByText(/src\/components\//i)).toBeInTheDocument();
    expect(screen.getByText(/src\/pages\//i)).toBeInTheDocument();
    expect(screen.getByText(/src\/hooks\//i)).toBeInTheDocument();
    expect(screen.getByText(/src\/stores\//i)).toBeInTheDocument();
  });
});
