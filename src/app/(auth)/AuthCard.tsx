'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';

interface AuthCardProps {
  logo: ReactNode;
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ logo, children }) => {
  const { fetchUser, user } = useAuth() as {
    fetchUser: () => void;
    user: { [key: string]: any } | null;
  };

  useEffect(() => {
    fetchUser();
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [fetchUser, user]);

  return (
    <div className="grid justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        {logo}
      </div>

      <div className="md:min-w-[350px] w-76">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
