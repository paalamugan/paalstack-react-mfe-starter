import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { render } from '@/test/test-utils';

import { ExampleCard } from './component';

describe('ExampleCard', () => {
  it('renders the title', () => {
    render(<ExampleCard title="My Card" />);
    expect(screen.getByText('My Card')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<ExampleCard title="Card" description="Card description text" />);
    expect(screen.getByText('Card description text')).toBeInTheDocument();
  });

  it('does not render a description element when omitted', () => {
    render(<ExampleCard title="No Desc" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('renders children inside CardContent when provided', () => {
    render(
      <ExampleCard title="With Child">
        <button>Click me</button>
      </ExampleCard>
    );
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('sets data-qa attribute when provided', () => {
    render(<ExampleCard title="QA Card" data-qa="example-card" />);
    expect(screen.getByTestId('example-card')).toBeInTheDocument();
  });

  it('renders the title as a heading', () => {
    render(<ExampleCard title="Heading Card" />);
    expect(screen.getByText('Heading Card')).toBeInTheDocument();
  });
});
