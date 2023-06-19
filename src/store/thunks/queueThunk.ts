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
      const config = JSON.parse(queueAction.apiRequest);
      await axios.request(config);

      deleteOfflineRequest(queueAction.id);
    } catch (error) {
      console.log('erro', error);
    }
  }
);

export const makeSynchronization = createAsyncThunk(
  'makeSynchronization',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    if (state.queue.queueActions.length !== 0) {
      for (const queueAction of state.queue.queueActions) {
        try {
          const config = JSON.parse(queueAction.apiRequest);
          await axios.request(config);
          deleteOfflineRequest(queueAction.id);
        } catch (error) {
          console.error(`Request ${queueAction.id} failed. Error:`, error);
        }
        console.log('aweaea', queueAction);
      }
    }
  }
);
