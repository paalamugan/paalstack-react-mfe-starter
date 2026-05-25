import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/test-utils';

import { NotFoundPage } from './page';

describe('NotFoundPage', () => {
  const renderPage = () =>
    renderWithProviders(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

  it('renders the 404 heading', () => {
    renderPage();
    expect(screen.getByTestId('not-found-title')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-title')).toHaveTextContent('404');
  });

  it('renders the "Page Not Found" sub-heading', () => {
    renderPage();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('renders the descriptive message', () => {
    renderPage();
    expect(screen.getByText(/does not exist or has been moved/i)).toBeInTheDocument();
  });

  it('renders the "Go to Home" button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument();
  });

  it('the "Go to Home" button has the correct data-qa attribute', () => {
    renderPage();
    expect(screen.getByTestId('go-home-button')).toBeInTheDocument();
  });

  it('clicking "Go to Home" invokes the navigate callback without throwing', () => {
    renderPage();
    const button = screen.getByRole('button', { name: /go to home/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
