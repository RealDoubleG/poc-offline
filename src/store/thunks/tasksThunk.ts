import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'service/api';
import { RootState } from '../store';
import { Task } from 'dto/task';
import {
  clearDatabaseTasks,
  fetchDatabaseTasks,
  insertTaskInDatabase
} from 'database/tasks';
import { clearDatabaseOfflineRequests } from 'database/offlineApiRequests';

export const fetchApiTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;

      if (state.connection.hasInternetConnection) {
        clearDatabaseOfflineRequests();
        clearDatabaseTasks();
        const { data } = await api.get('/tasks');

        data.forEach((task: Task) => {
          insertTaskInDatabase({
            id: task.id,
            title: task.title,
            description: task.description,
            finished: task.finished
          });
        });
      }

      const tasks = await fetchDatabaseTasks();

      return tasks;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error);
    }
  }
);

export const createTaskInApi = createAsyncThunk(
  'tasks/createTask',
  async (task: Task) => {
    console.log(task);
    try {
      await insertTaskInDatabase(task);
      console.log('aaaaa');
      const response = await api.post('/tasks', task);
      return response;
    } catch (error) {
      console.log('Deu erro:', error);
    }
  }
);
