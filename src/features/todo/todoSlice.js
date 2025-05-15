import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(({ id }) => id != action.payload);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(({ id }) => id == action.payload);
      if (todo) todo.completed = !todo.completed;
    },
  },
});

export const {addTodo , removeTodo , toggleComplete} = todoSlice.actions
export default todoSlice.reducer
