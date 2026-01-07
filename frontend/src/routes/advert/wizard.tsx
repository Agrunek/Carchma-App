import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/advert/wizard')({
  component: () => <div>Hello "/advert/wizard"!</div>,
});
