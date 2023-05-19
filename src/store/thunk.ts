import { createAsyncThunk } from '@reduxjs/toolkit';
import { insertTask } from 'database/tasks';
import api from 'service/api';
import { RootState } from './store';
import { Task } from 'dto/task';
import { fetchTasks as fetchDatabaseTasks } from 'database/tasks';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    try {
      if (state.hasConnection === true) {
        const apiResponse: Task[] = await api.get('/tasks');
        apiResponse.forEach((task) =>
          insertTask({
            id: task.id,
            title: task.title,
            description: task.description,
            finished: task.finished
          })
        );
      }
      // const databaseResponse = await fetchTasks();
      // console.log('aqui esta o q veio do banco => ', databaseResponse);
      // return databaseResponse;
      fetchDatabaseTasks()
        .then((tasks) => {
          console.log('Dados da tabela "task":', tasks);
          return tasks;
        })
        .catch((error) => {
          console.error('Erro ao buscar os dados da tabela "task":', error);
          return error;
        });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
