'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import { useAuth } from '@/hooks/auth';
import { useSearchParams } from 'next/navigation';
import Notify from '@/components/Notify';

interface Errors {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const PasswordReset: React.FC = () => {
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <>
      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            required
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError messages={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button>Reset Password</Button>
        </div>

        <Notify status={status} />
      </form>
    </>
  );
};

export default PasswordReset;
