import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/me')({
  component: () => <div>Hello "/user/me"!</div>,
});
