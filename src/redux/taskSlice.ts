import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  task_name: string;
  completed: boolean;
}

interface TasksState {
  tasks?: Task[];
}

const initialState: TasksState = {};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    initializeData(state,action){
        console.log(action);
        state.tasks = action.payload;
    },
    addTask(state, action) {
      
      state.tasks?.push(action.payload);
    },
    toggleTask(state, action) {
      const task = state.tasks?.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks?.filter((t) => t.id !== action.payload);
    },
  },
});

export const { initializeData,addTask, deleteTask,toggleTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
