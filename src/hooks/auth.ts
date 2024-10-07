import axios from '@/lib/axios';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Status {
  success: boolean | string;
  message: string;
}

interface ErrorResponse {
  data: {
    [key: string]: string[];
  };
}

interface AuthProps {
  email: string;
  password: string;
  remember: boolean;
  setErrors: (errors: ErrorResponse['data']) => void;
  setStatus: (status: Status) => void;
}

interface RegisterProps extends AuthProps {
  first_name: string;
  last_name: string;
  password_confirmation: string;
}

interface ResetPasswordProps {
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: (errors: ErrorResponse['data']) => void;
  setStatus: (status: Status) => void;
}

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const register = useCallback(async ({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    setErrors,
    setStatus,
  }: RegisterProps) => {
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post('/register', {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      });
      localStorage.setItem('token', response.data.token);
      setStatus({
        success: true,
        message: 'Registration successful!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data);
        setStatus(error.response.data);
      } else {
        setStatus({
          success: false,
          message: 'An error occurred. Please try again.',
        });
      }
    }
  }, [router]);

  const login = useCallback(async ({
    email,
    password,
    setErrors,
    setStatus,
  }: AuthProps) => {
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setStatus({
        success: true,
        message: 'Login successful!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data);
        setStatus(error.response.data);
      } else {
        setStatus({
          success: false,
          message: 'An error occurred. Please try again.',
        });
      }
    }
  }, [router]);

  const forgotPassword = useCallback(async ({
    email,
    setErrors,
    setStatus,
  }: { email: string; setErrors: (errors: ErrorResponse['data']) => void; setStatus: (status: Status) => void; }) => {
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post('/forgot-password', { email });
      setStatus(response.data.status);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data);
        setStatus(error.response.data);
      } else {
        setStatus({
          success: false,
          message: 'An error occurred. Please try again.',
        });
      }
    }
  }, []);

  const resetPassword = useCallback(async ({
    email,
    password,
    password_confirmation,
    setErrors,
    setStatus,
  }: ResetPasswordProps) => {
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post('/reset-password', {
        email,
        password,
        password_confirmation,
      });
      setStatus(response.data.status);
      router.push('/login');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data);
        setStatus(error.response.data);
      } else {
        setStatus({
          success: false,
          message: 'An error occurred. Please try again.',
        });
      }
    }
  }, [router]);

  const resendEmailVerification = useCallback(async ({
    setStatus,
  }: { setStatus: (status: Status) => void; }) => {
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post('/email/verification-notification');
      setStatus(response.data.status);
    } catch (error: any) {
      setStatus({
        success: false,
        message: 'An error occurred. Please try again.',
      });
    }
  }, []);

  const logout = useCallback(async ({
    setStatus,
  }: { setStatus: (status: Status) => void; }) => {
    const token = localStorage.getItem('token');
    setStatus({
      success: 'load',
      message: 'Sending request!',
    });
    try {
      const response = await axios.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
      }
    } catch (error: any) {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  return {
    user,
    fetchUser,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
