import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

export const useAuth = (url?: string) => {
  const navigate = useNavigate();

  const token = authService.getToken();

  useEffect(() => {
    if (token) {
      url && navigate(url);
    } else {
      navigate('/signin');
    }
  }, [token, url]);
};
