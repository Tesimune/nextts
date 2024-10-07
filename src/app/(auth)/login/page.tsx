'use client';

import { FormEvent, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Notify from '@/components/Notify';
import { useAuth } from '@/hooks/auth';

interface Errors {
  email?: string[];
  password?: string[];
}

const Login: React.FC = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [shouldRemember, setShouldRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState({});

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

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
          {errors.email && <InputError messages={errors.email} className="mt-2" />}
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
            autoComplete="current-password"
          />
          {errors.password && <InputError messages={errors.password} className="mt-2" />}
        </div>

        {/* Remember Me */}
        {/* <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setShouldRemember(event.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div> */}

        <div className="flex items-center justify-between mt-4">
          <Link href="/register" className="underline text-sm text-gray-600 hover:text-gray-900">
            Register?
          </Link>

          <Link href="/forgot-password" className="underline text-sm text-gray-600 hover:text-gray-900">
            Forgot your password?
          </Link>

          <Button className="ml-3">Login</Button>
        </div>

        {/* Status Message */}
        <Notify status={status} />
      </form>
    </>
  );
};

export default Login;
