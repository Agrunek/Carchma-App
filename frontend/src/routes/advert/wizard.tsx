import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/advert/wizard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/advert/wizard"!</div>;
}
