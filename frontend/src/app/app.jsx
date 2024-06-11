import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/main/dashboard';
import { CoursePreview } from '../components/preview/course-preview';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { Login } from '../components/login/login';
import { GroupPreview } from '../components/preview/group-preview';
import { Admin } from '../pages/admin';

export const App = () => (
  <Routes>
    <Route index element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course-unit/:id" element={<CoursePreview />} />
      <Route path="/group-unit/:id" element={<GroupPreview />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
    <Route path="/*" element={<Navigate to={'/'} replace />} />
  </Routes>
);
