import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/$id')({
  component: () => <div>Hello "/user/$id"!</div>,
});
