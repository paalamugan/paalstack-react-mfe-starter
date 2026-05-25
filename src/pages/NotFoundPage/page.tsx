import { Button, Empty, EmptyContent, EmptyDescription, EmptyTitle } from '@paalstack/react-ui';
import { type FC } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/constants/routes';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Empty className="min-h-[60vh]">
      <EmptyContent>
        <EmptyTitle className="text-primary text-8xl font-bold" data-qa="not-found-title">
          404
        </EmptyTitle>
        <EmptyTitle className="text-foreground text-2xl font-semibold">Page Not Found</EmptyTitle>
        <EmptyDescription>
          The page you are looking for does not exist or has been moved.
        </EmptyDescription>
        <Button
          variant="solid"
          size="md"
          onClick={() => void navigate(ROUTES.HOME)}
          className="mt-2"
          data-qa="go-home-button"
        >
          Go to Home
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export { NotFoundPage };
