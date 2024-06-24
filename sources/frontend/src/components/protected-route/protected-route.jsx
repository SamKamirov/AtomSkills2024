import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getToken } from '../../utils';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.app.user);
  const isLoading = useSelector(state => state.app.loading);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }

    if (user && user.username === 'admin') {
      navigate('/admin');
    }
  }, [token]);

  return <Outlet />;
};
