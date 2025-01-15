import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/me')({
  component: Me,
});

function Me() {
  return <div>My account!</div>;
}
