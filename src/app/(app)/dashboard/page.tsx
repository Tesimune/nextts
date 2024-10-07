'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/app/(app)/Header';
import { useDashboard, DashboardResponse } from '@/hooks/dashboard';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [response, setResponse] = useState<DashboardResponse | null>(null);
  const { dashboard } = useDashboard();

  useEffect(() => {
    dashboard({ setResponse });
  }, [dashboard]);

  console.log(response);

  return (
    <>
      <Header title="Dashboard" />
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="py-2 px-6 bg-white border-b border-gray-200">
              {/* Your content here */}
            </div>
            <div className="py-2 px-6">
              {/* Additional content if needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
