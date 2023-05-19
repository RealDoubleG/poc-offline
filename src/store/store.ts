import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { tasksReducer } from './tasksSlice';

export const store = configureStore({
  reducer: tasksReducer,
  middleware: [thunkMiddleware]
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
