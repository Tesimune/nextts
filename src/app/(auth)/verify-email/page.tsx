'use client';

import Button from '@/components/Button';
import Notify from '@/components/Notify';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

const Page: React.FC = () => {
  const { logout, resendEmailVerification } = useAuth();

  const [status, setStatus] = useState({});

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you did not receive the email, we will gladly send you another.
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          Resend Verification Email
        </Button>

        <button
          type="button"
          className="underline text-sm text-gray-600 hover:text-gray-900"
          onClick={() => logout({setStatus})}
        >
          Logout
        </button>
      </div>

      <Notify status={status} />
    </>
  );
}

export default Page;
