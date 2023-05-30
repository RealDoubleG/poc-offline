import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { tasksSliceReducer } from './slices/tasksSlice';
import { connectionSliceReducer } from './slices/connectionSlice';
import { queueSliceReducer } from './slices/queueSlice';

export const rootReducer = combineReducers({
  tasks: tasksSliceReducer,
  connection: connectionSliceReducer,
  queue: queueSliceReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
