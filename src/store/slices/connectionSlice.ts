import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasInternetConnection: true
};

const connectionSlice = createSlice({
  name: 'connectionSlice',
  initialState,
  reducers: {
    setInternetConnection(state, action: PayloadAction<boolean>) {
      state.hasInternetConnection = action.payload;
    }
  }
});

export const {
  actions: connectionSliceActions,
  reducer: connectionSliceReducer
} = connectionSlice;
