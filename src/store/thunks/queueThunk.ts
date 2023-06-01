import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  deleteOfflineRequest,
  listOfflineRequests
} from 'database/offlineApiRequests';
import { OfflineRequest } from 'dto/offlineRequest';

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
  async (queueActions: OfflineRequest[]) => {
    try {
      queueActions.forEach(async (action: OfflineRequest) => {
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
    } catch (error) {}
  }
);
