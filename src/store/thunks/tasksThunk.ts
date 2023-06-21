import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'service/api';
import { RootState } from '../store';
import { Task } from 'dto/task';
import {
  clearDatabaseTasks,
  deleteTaskInDatabase,
  fetchDatabaseTasksByFinishedStatus,
  insertTaskInDatabase,
  updateTask
} from 'database/tasks';
import { useDispatch } from 'react-redux';

export const fetchApiTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, { rejectWithValue, getState }) => {
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

export const deleteTaskInApi = createAsyncThunk(
  'tasks/deleTaskInApi',
  async (taskId: number) => {
    try {
      await deleteTaskInDatabase(taskId);
      const response = await api.delete(`/tasks/${taskId}`);
      return response;
    } catch (error) {
      console.log('Deu erro: ', error);
    }
  }
);

export const finishTask = createAsyncThunk(
  'tasks/finishTask',
  async (task: Task) => {
    try {
      await updateTask(task);
      const response = await api.put(`/tasks/${task.id}`, task);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const finishTask = createAsyncThunk(
//   'tasks/finishTask',
//   async (task: Task) => {
//     // try {
//     dispatch(deleteTaskInApi(task.id));
//     dispatch(
//       createTaskInApi({
//         title: task.title,
//         finished: 1,
//         description: task.description
//       })
//     );
//     // } catch (error) {
//     // console.log(error);
//     // }
//   }
// );
