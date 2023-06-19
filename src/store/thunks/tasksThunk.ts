import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'service/api';
import { RootState } from '../store';
import { Task } from 'dto/task';
import {
  clearDatabaseTasks,
  fetchDatabaseTasks,
  fetchDatabaseTasksByFinishedStatus,
  insertTaskInDatabase
} from 'database/tasks';
import { clearDatabaseOfflineRequests } from 'database/offlineApiRequests';

export const fetchApiTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      // console.log(state.connection.hasInternetConnection);
      if (state.connection.hasInternetConnection) {
        // clearDatabaseOfflineRequests();
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

      const tasks = await fetchDatabaseTasksByFinishedStatus(false);
      return tasks;
    } catch (error) {
      console.log('erro aqui', error);
    }
  }
);

export const fetchApiFinishedTasks = createAsyncThunk(
  'tasks/getFinishedAPiTasks',
  async (finished: boolean, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;

      if (state.connection.hasInternetConnection) {
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

      const tasks = await fetchDatabaseTasksByFinishedStatus(true);
      return tasks;
    } catch (error) {
      console.log('erro aqui', error);
    }
  }
);

export const createTaskInApi = createAsyncThunk(
  'tasks/createTask',
  async (task: Task) => {
    try {
      await insertTaskInDatabase(task);
      const response = await api.post('/tasks', task);
      return response;
    } catch (error) {
      console.log('Deu erro:', error);
    }
  }
);

export const editTaskInApi = createAsyncThunk(
  'tasks/editTaskInAPi',
  async (task: Task, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;

      if (state.connection.hasInternetConnection) {
        fetchDatabaseTasksByFinishedStatus(true).then((a) => console.log('.'));
      }
    } catch (error) {}
  }
);
