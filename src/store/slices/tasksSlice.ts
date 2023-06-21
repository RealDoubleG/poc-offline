import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from 'dto/task';
import {
  deleteTaskInApi,
  fetchApiFinishedTasks,
  fetchApiTasks,
  finishTask
} from '../thunks/tasksThunk';
import { RequestStatus } from 'dto/requestStatus';
import { createTaskInApi } from '../thunks/tasksThunk';

interface initialStateProps {
  getTasksLoading: RequestStatus;
  createTaskLoading: RequestStatus;
  finishTaskLoading: RequestStatus;
  deleteTaskLoading: RequestStatus;
  tasks: Task[];
  hasConnection: boolean | null;
  finishedTasks: Task[];
  getFinishedTasksLoading: RequestStatus;
}

const initialState: initialStateProps = {
  getTasksLoading: 'idle',
  createTaskLoading: 'idle',
  finishTaskLoading: 'idle',
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
      })
      .addCase(fetchApiFinishedTasks.rejected, (state) => {
        state.getFinishedTasksLoading = 'failed';
      })
      .addCase(deleteTaskInApi.pending, (state) => {
        state.deleteTaskLoading = 'pending';
      })
      .addCase(deleteTaskInApi.fulfilled, (state) => {
        state.deleteTaskLoading = 'succeeded';
      })
      .addCase(deleteTaskInApi.rejected, (state) => {
        state.deleteTaskLoading = 'failed';
      })
      .addCase(finishTask.pending, (state) => {
        state.finishTaskLoading = 'pending';
      })
      .addCase(finishTask.fulfilled, (state) => {
        state.finishTaskLoading = 'succeeded';
      })
      .addCase(finishTask.rejected, (state) => {
        state.finishTaskLoading = 'failed';
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
    },
    resetDeleteTaskLoading(state) {
      state.deleteTaskLoading = 'idle';
    },
    resetFinishTaskLoading(state) {
      state.finishTaskLoading = 'idle';
    }
  }
});

export const { actions: taskSliceActions, reducer: tasksSliceReducer } =
  tasksSlice;
