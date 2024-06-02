import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { store } from "../store";
import { useSelector } from "react-redux";
import { State } from "../types/state";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;