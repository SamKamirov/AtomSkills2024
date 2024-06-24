import { Bounce, ToastContainer } from "react-toastify";
import React from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/ReactToastify.css';

export const Toast = () => (
  <>
    <Outlet />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Bounce} />
  </>
)
