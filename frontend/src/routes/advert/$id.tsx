import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/advert/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/advert/$id"!</div>;
}
