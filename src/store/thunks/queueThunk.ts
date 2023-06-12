import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  deleteOfflineRequest,
  listOfflineRequests
} from 'database/offlineApiRequests';
import { OfflineRequest } from 'dto/offlineRequest';
import { RootState } from 'store/store';

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

export const makeSync = createAsyncThunk(
  'makeSync',
  async (queueAction: OfflineRequest) => {
    try {
      deleteOfflineRequest(queueAction.id);
      const config = JSON.parse(queueAction.apiRequest);
      await axios.request(config);
    } catch (error) {
      console.log('erro', error);
    }
  }
);
