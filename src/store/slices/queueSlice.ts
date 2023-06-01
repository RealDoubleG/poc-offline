import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQueueActions } from 'store/thunks/queueThunk';
import { OfflineRequest } from 'dto/offlineRequest';
import { RequestStatus } from 'dto/requestStatus';

interface initialStateProps {
  queueActions: OfflineRequest[];
  queueActionsLoading: RequestStatus;
}

const initialState: initialStateProps = {
  queueActions: [] as OfflineRequest[],
  queueActionsLoading: 'idle'
};

const queueSlice = createSlice({
  name: 'connectionSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueActions.pending, (state) => {
        state.queueActionsLoading = 'pending';
      })
      .addCase(fetchQueueActions.fulfilled, (state, action) => {
        state.queueActions = action.payload;
        state.queueActionsLoading = 'succeeded';
      })
      .addCase(fetchQueueActions.rejected, (state) => {
        state.queueActionsLoading = 'failed';
      });
  }
});

export const { reducer: queueSliceReducer } = queueSlice;
