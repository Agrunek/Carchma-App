import { createLazyFileRoute } from '@tanstack/react-router';
import RouterFeedback from '@/components/templates/RouterFeedback';

export const Route = createLazyFileRoute('/verify-email/$code')({
  component: VerifyEmail,
  errorComponent: VerifyEmailError,
});

function VerifyEmail() {
  return <RouterFeedback>Pomyślnie zweryfikowano adres email!</RouterFeedback>;
}

function VerifyEmailError() {
  return <RouterFeedback>Podany kod weryfikacyjny nie działa...</RouterFeedback>;
}
