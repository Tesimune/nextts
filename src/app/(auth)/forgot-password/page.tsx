'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Notify from '@/components/Notify';
import { useAuth } from '@/hooks/auth';

interface Errors {
  email?: string[];
}

const Page: React.FC = () => {
  const { forgotPassword } = useAuth()

  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email
        address and we will email you a password reset link that
        will allow you to choose a new one.
      </div>

      {/* Session Status */}
      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button>Email Password Reset Link</Button>
        </div>

        <Notify status={status} />
      </form>
    </>
  );
};

export default Page;
