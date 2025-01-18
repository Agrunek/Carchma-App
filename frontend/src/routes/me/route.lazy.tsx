import { createLazyFileRoute } from '@tanstack/react-router';
import Header from '@/components/organisms/Header';

export const Route = createLazyFileRoute('/me')({
  component: Me,
});

function Me() {
  return (
    <>
      <Header />
      <p>User screen</p>
    </>
  );
}
