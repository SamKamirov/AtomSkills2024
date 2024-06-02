import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types/state";

export enum SliceNames {
    AppData = 'AppData'
}

const selectTodos = (state: State) => state[SliceNames.AppData].todos;

export const getTodos = createSelector(
    [selectTodos],
    (todos) => todos
)