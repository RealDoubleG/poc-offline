import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from 'dto/task';
import { fetchApiTasks } from '../thunks/tasksThunk';
import { RequestStatus } from 'dto/requestStatus';
import { createTaskInApi } from '../thunks/tasksThunk';

// import { fetchTasks } from './thunk';

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
  hasConnection: true
};

const tasksSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTasks.pending, (state) => {
        state.getTasksLoading = 'pending';
      })
      .addCase(fetchApiTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.getTasksLoading = 'succeeded';
      })
      .addCase(fetchApiTasks.rejected, (state) => {
        state.getTasksLoading = 'failed';
      })
      .addCase(createTaskInApi.pending, (state) => {
        state.createTaskLoading = 'pending';
      })
      .addCase(createTaskInApi.fulfilled, (state) => {
        state.createTaskLoading = 'succeeded';
      })
      .addCase(createTaskInApi.rejected, (state) => {
        state.createTaskLoading = 'failed';
      });
  },
  name: 'tasksSlice',
  initialState,
  reducers: {
    setHaveInternetConnection(state, action: PayloadAction<boolean>) {
      state.hasConnection = action.payload;
    }
  }
});

export const { actions: taskSliceActions, reducer: tasksSliceReducer } =
  tasksSlice;
