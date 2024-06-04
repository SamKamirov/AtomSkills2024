import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi } from "../api/api";
import { AppData } from "./app-data";
import { SliceNames } from "./app-data-selectors";

const api = createApi();

const rootReducer = combineReducers({
    [SliceNames.AppData]: AppData.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
