import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  status: "done" | "notDone";
}
const initialState: Todo[] = [
  {
    id: 1,
    text: "Faire la lessive",
    status: "done",
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: initialState,
    isEditing: null as Todo | null,
    currentEdit: null as Todo | null,
    currentTodo: null,
    isLoading: false
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: state.todos.length + 1, text: action.payload, status: "notDone"
      })
      state.currentTodo = null;
      state.currentEdit = null;
    },
    deleteTodo: (state, action) => {
      console.log(action);

      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    startEditing: (state, action) => {
      state.isEditing = action.payload;
      state.currentEdit = action.payload;
    },
    saveEdit: (state) => {
      state.todos = state.todos.map((todo) =>
        todo.id === state.currentEdit?.id ? { ...todo, text: state.currentEdit?.text } : todo
      );
      state.currentEdit = null;
      state.isEditing = null;
    },
    toggleTodoStatus: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === "done" ? "notDone" : "done";
      }
    },
    setCurrentTodo: (state, action) => {
      state.currentTodo = action.payload;
      return state
    },
    setCurrentEdit: (state, action) => {
      state.currentEdit = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        console.log('fetching todos')
        state.isLoading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log('fetch todos failed')
        state.isLoading = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;

      });
  }
});
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('https://dummyjson.com/todos')
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    const formatedData = jsonResponse.todos.map((todo: any) => {
      return ({
        text: todo.todo,
        id: todo.id,
        status: todo.completed ? 'done' : 'notDone'
      })
    })

    return formatedData as unknown as Todo[];
  })

export default todoSlice.reducer;
export const { addTodo, deleteTodo, saveEdit, toggleTodoStatus, startEditing, setCurrentTodo, setIsEditing, setCurrentEdit } = todoSlice.actions;