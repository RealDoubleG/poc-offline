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
  async (queueActions: OfflineRequest[], { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    if (state.connection.hasInternetConnection) {
      queueActions.forEach(async (action) => {
        try {
          const config = JSON.parse(action.apiRequest);
          await axios
            .request(config)
            .then(() => {
              deleteOfflineRequest(action.id);
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('erro', error);
        }
      });
    } else {
      return;
    }
  }
);
