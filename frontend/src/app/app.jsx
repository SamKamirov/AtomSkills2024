import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from '../pages/main/main';
import { StaffUnit } from '../components/staff-unit/staff-unit';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { Login } from '../components/login/login';

export const App = () => (
  <Routes>
    <Route index element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Main />} />
      <Route path="/staff-unit/:id" element={<StaffUnit />} />
    </Route>
    <Route path="/*" element={<Navigate to={'/'} replace />} />
  </Routes>
);
