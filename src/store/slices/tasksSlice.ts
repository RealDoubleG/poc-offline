import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from 'dto/task';
import { fetchApiFinishedTasks, fetchApiTasks } from '../thunks/tasksThunk';
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
  finishedTasks: Task[];
  getFinishedTasksLoading: RequestStatus;
}

const initialState: initialStateProps = {
  getTasksLoading: 'idle',
  createTaskLoading: 'idle',
  editTaskLoading: 'idle',
  deleteTaskLoading: 'idle',
  tasks: [] as Task[],
  hasConnection: true,
  finishedTasks: [] as Task[],
  getFinishedTasksLoading: 'idle'
};

const tasksSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTasks.pending, (state) => {
        state.getTasksLoading = 'pending';
      })
      .addCase(fetchApiTasks.fulfilled, (state, action) => {
        state.getTasksLoading = 'succeeded';
        state.tasks = action.payload;
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
      })
      .addCase(fetchApiFinishedTasks.pending, (state) => {
        state.getFinishedTasksLoading = 'pending';
      })
      .addCase(fetchApiFinishedTasks.fulfilled, (state, action) => {
        state.getFinishedTasksLoading = 'succeeded';
        state.finishedTasks = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchApiFinishedTasks.rejected, (state) => {
        state.getFinishedTasksLoading = 'failed';
      });
  },
  name: 'tasksSlice',
  initialState,
  reducers: {
    setHaveInternetConnection(state, action: PayloadAction<boolean>) {
      state.hasConnection = action.payload;
    },
    resetCreateTaskLoading(state) {
      state.createTaskLoading = 'idle';
    }
  }
});

export const { actions: taskSliceActions, reducer: tasksSliceReducer } =
  tasksSlice;
