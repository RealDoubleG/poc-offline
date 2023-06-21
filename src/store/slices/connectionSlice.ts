import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@dto/requestStatus';
import { makeSync, makeSynchronization } from 'store/thunks/queueThunk';
import { fetchQueueActions } from 'store/thunks/queueThunk';
interface initialStateProps {
  hasInternetConnection: boolean | void;
  fetchQueueActionsLoading: RequestStatus;
  makeSyncLoading: RequestStatus;
}

const initialState: initialStateProps = {
  hasInternetConnection: null,
  fetchQueueActionsLoading: 'idle',
  makeSyncLoading: 'idle'
};

const connectionSlice = createSlice({
  name: 'connectionSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueActions.pending, (state) => {
        state.fetchQueueActionsLoading = 'pending';
      })
      .addCase(fetchQueueActions.fulfilled, (state) => {
        state.fetchQueueActionsLoading = 'succeeded';
      })
      .addCase(fetchQueueActions.rejected, (state) => {
        state.fetchQueueActionsLoading = 'failed';
      })
      .addCase(makeSynchronization.pending, (state) => {
        state.makeSyncLoading = 'pending';
      })
      .addCase(makeSynchronization.fulfilled, (state) => {
        state.makeSyncLoading = 'succeeded';
      })
      .addCase(makeSynchronization.rejected, (state) => {
        state.makeSyncLoading = 'failed';
      });
  },
  reducers: {
    setInternetConnection(state, action: PayloadAction<boolean>) {
      state.hasInternetConnection = action.payload;
    },
    resetMakeSyncLoading(state) {
      state.makeSyncLoading = 'idle';
    }
  }
});

export const {
  actions: connectionSliceActions,
  reducer: connectionSliceReducer
} = connectionSlice;
