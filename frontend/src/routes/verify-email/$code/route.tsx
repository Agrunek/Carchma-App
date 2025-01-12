import { createFileRoute } from '@tanstack/react-router';
import { verifyEmail } from '@/middleware/api';

export const Route = createFileRoute('/verify-email/$code')({
  loader: ({ params }) => verifyEmail(params.code),
});
