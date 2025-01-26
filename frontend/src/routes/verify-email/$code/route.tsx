import { createFileRoute } from '@tanstack/react-router';
import { verifyEmail } from '@/middleware/api';

export const Route = createFileRoute('/verify-email/$code')({
  loader: async ({ params }) => {
    await verifyEmail(params.code);
  },
});
