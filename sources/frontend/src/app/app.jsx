import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/main/dashboard';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { Login } from '../components/login/login';
import { Admin } from '../pages/admin';
import { Registry } from '../components/login/registry';
import { Task } from '../pages/task/task';
import { Toast } from '../components/toast/toast';
import { Lesson } from '../components/lesson/lesson';
import { Sertificates } from '../pages/sertificates/sertificates';
import { Statistics } from '../pages/statistics/statistics';
import { TaskView } from '../components/task-view/task-view';

export const App = () => (
  <Routes>
    <Route element={<Toast />}>
      <Route index element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path='/task/:id' element={<Task />} />
        <Route path='/lesson/:id' element={<Lesson />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sertificates" element={<Sertificates />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/tasks/view/:id" element={<TaskView />} />

      </Route>
      <Route path="/*" element={<Navigate to={'/dashboard'} replace />} />
    </Route>
  </Routes>
);
