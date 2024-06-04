import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Main } from "../pages/main/main";

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main />}></Route>
        </Routes>
    </BrowserRouter>
)