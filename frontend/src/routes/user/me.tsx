import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/me')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/user/me"!</div>;
}
