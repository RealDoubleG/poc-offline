import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: {
    // Reducers da sua aplicação aqui
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware)
});

export default store;
