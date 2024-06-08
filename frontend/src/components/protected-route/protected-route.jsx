import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.app.user);
  const isLoading = useSelector(state => state.app.loading);

  if (isLoading) {
    return <p>loading</p>
  }

  if (!user) {
    navigate('login')
  }

  return <Outlet />;
};
