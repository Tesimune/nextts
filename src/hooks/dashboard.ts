import axios from '@/lib/axios';
import { useCallback } from 'react';

export interface DashboardResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface UseDashboardProps {
  setResponse: (response: DashboardResponse) => void;
}

export const useDashboard = () => {
  const dashboard = useCallback(async ({ setResponse }: UseDashboardProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse({
        success: true,
        message: 'Request successful!',
        data: response.data,
      });
    } catch (error: any) {
      setResponse({
        success: false,
        message: error.response?.data?.message || 'Failed!',
      });
    }
  }, []);

  return {
    dashboard,
  };
};
