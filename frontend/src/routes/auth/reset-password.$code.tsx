import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/reset-password/$code')({
  component: () => <div>Hello "/auth/reset-password/$code"!</div>,
});
