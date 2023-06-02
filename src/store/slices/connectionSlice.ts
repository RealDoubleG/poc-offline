import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@dto/requestStatus';
interface initialStateProps {
  hasInternetConnection: boolean;
  makeSyncLoading: RequestStatus;
}

const initialState: initialStateProps = {
  hasInternetConnection: true,
  makeSyncLoading: 'idle'
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
