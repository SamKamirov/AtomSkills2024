import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi } from "../api/api";
import reducer from "./app-data";

export const api = createApi();

export const store = configureStore({
  reducer: {
    app: reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
