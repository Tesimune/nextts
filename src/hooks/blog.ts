import axios from '@/lib/axios';

interface SetResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface BlogProps {
  setResponse: (response: SetResponse) => void;
}

interface ShowProps {
  slug: string;
  setResponse: (response: SetResponse) => void;
}

interface CreateProps {
  data: any;
  setResponse: (response: SetResponse) => void;
}

interface UpdateProps {
  data: any;
  slug: string;
  setResponse: (response: SetResponse) => void;
}

interface RemoveProps {
  slug: string;
  setResponse: (response: SetResponse) => void;
}

export const useBlog = () => {
  const all = async ({ setResponse }: BlogProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/blogs', {
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
  };

  const show = async ({ slug, setResponse }: ShowProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`/blog/${slug}`, {
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
  };

  const create = async ({ data, setResponse }: CreateProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('/blog', data, {
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
  };

  const update = async ({ data, slug, setResponse }: UpdateProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/investment/withdraw/${slug}`, data, {
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
  };

  const remove = async ({ slug, setResponse }: RemoveProps) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/investment/withdraw/${slug}`, {
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
  };

  return {
    all,
    show,
    create,
    update,
    remove,
  };
};
