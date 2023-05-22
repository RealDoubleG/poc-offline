import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'dto/requestStatus';
import { Task } from 'dto/task';
import { fetchTasks } from './thunk';
import { insertTask } from 'database/tasks';

interface initialStateProps {
  getTasksLoading: RequestStatus;
  createTaskLoading: RequestStatus;
  editTaskLoading: RequestStatus;
  deleteTaskLoading: RequestStatus;
  tasks: Task[];
  hasConnection: boolean | null;
}

const initialState: initialStateProps = {
  getTasksLoading: 'idle',
  createTaskLoading: 'idle',
  editTaskLoading: 'idle',
  deleteTaskLoading: 'idle',
  tasks: [] as Task[],
  hasConnection: null
};

const tasksSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.getTasksLoading = 'pending';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.getTasksLoading = 'succeeded';
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.getTasksLoading = 'failed';
      });
  },
  name: 'tasks',
  initialState,
  reducers: {
    setHaveInternetConnection(state, action: PayloadAction<boolean>) {
      state.hasConnection = action.payload;
    }
  }
});

export const { reducer: tasksReducer } = tasksSlice;

export const { setHaveInternetConnection } = tasksSlice.actions;
