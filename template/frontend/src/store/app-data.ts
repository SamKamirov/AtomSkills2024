import { createSlice } from "@reduxjs/toolkit";
import { Nullable } from "vitest"
import { fetchTodos, uploadTodo } from "../api/api-actions";
import { SliceNames } from "./app-data-selectors";

export type ToDo = {
    id: number;
    text: string;
}

export type TAddTodo = Omit<ToDo, 'id'>

type TInitialState = {
    todos: Nullable<ToDo[]>;
    isLoading: boolean;
}
const initialState: TInitialState = {
    todos: null,
    isLoading: false
}

export const AppData = createSlice({
    name: SliceNames.AppData,
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todos = action.payload;
        })
        .addCase(uploadTodo.fulfilled, (state) => {
            state.isLoading = false;
        })
    },
})