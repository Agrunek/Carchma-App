import { createFileRoute } from '@tanstack/react-router';
import Header from '@/components/organisms/Header';

export const Route = createFileRoute('/')({
  component: () => <Header />,
});
