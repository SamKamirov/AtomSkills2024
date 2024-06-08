import React from "react";
import ReactDOM from 'react-dom/client'
import { App } from "./app/app";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { checkAuthAction } from "./store/app-data";

const root = ReactDOM.createRoot(
  document.getElementById('root')
)

store.dispatch(checkAuthAction());

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
