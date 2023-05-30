import { createAsyncThunk } from '@reduxjs/toolkit';
import { listOfflineRequests } from 'database/offlineApiRequests';

export const fetchQueueActions = createAsyncThunk(
  'fetchQueueActions',
  async () => {
    try {
      const queueActions = await listOfflineRequests();

      return queueActions;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
