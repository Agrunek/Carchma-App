import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/advert/$id')({
  component: () => <div>Hello "/advert/$id"!</div>,
});
