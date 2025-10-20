import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./Reducer/reducerSlicer";

const rootReducer = combineReducers({ vacancies: vacanciesReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
