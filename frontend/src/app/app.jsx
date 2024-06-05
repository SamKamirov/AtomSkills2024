import React from 'react';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import {Main} from '../pages/main/main';
import {StaffUnit} from '../components/staff-unit/staff-unit';

export const App = () => (
    <Routes>
        <Route path='/'>
            <Route path='/dashboard' element={<Main />} />
            <Route path='/staff-unit/:id' element={<StaffUnit />} />
        </Route>
    </Routes>
);
