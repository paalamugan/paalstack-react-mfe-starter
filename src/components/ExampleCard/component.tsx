/**
 * ExampleCard — a reusable card demonstrating the component pattern using
 * @paalstack/react-ui Card primitives.
 *
 * Pattern:
 * - component.tsx  → implementation
 * - index.ts       → barrel export (re-exports from component.tsx)
 *
 * Replace this component with your own shared UI components.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@paalstack/react-ui';
import { type FC, type ReactNode } from 'react';

export type ExampleCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  /** Optional `data-qa` attribute for test selection */
  'data-qa'?: string;
};

const ExampleCard: FC<ExampleCardProps> = ({ title, description, children, 'data-qa': dataQa }) => {
  return (
    <Card data-qa={dataQa} className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export { ExampleCard };
