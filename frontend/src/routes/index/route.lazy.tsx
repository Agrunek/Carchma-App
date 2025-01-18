import { createLazyFileRoute } from '@tanstack/react-router';
import Header from '@/components/organisms/Header';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <p>Home screen</p>
    </>
  );
}
