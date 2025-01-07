import type { RegisterInputs } from '@/components/templates/RegisterForm';

import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import RegisterForm from '@/components/templates/RegisterForm';

export const Route = createLazyFileRoute('/register')({
  component: Register,
});

function Register() {
  const [loading, setLoading] = useState(false);

  const handleResult = (data: RegisterInputs) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <RegisterForm loading={loading} onSubmit={handleResult} />
    </div>
  );
}
