'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Navigation from '@/app/(app)/Navigation';
import Loading from '@/app/(app)/Loading';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { fetchUser, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      setLoading(false);
    };

    fetchData();

    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [fetchUser, user, loading]);

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 scroll">
      <Navigation user={user} />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
