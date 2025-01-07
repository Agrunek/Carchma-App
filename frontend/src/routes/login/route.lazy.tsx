import type { LoginInputs } from '@/components/templates/LoginForm';

import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import LoginForm from '@/components/templates/LoginForm';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  const [loading, setLoading] = useState(false);

  const handleResult = (data: LoginInputs) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm loading={loading} onSubmit={handleResult} />
    </div>
  );
}
