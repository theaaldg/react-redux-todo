import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Définition de l'interface d'un Todo
export interface Todo {
  id: number;          // Identifiant unique de la tâche
  text: string;        // Description de la tâche
  status: "done" | "notDone"; // Statut : fait ou non fait
}

// État initial de la liste de tâches
const initialState: Todo[] = [
  {
    id: 1,
    text: "Faire la lessive",
    status: "done",
  },
];

// Création du slice Redux pour gérer l'état des tâches
const todoSlice = createSlice({
  name: "todos", // Nom du slice
  initialState: {
    todos: initialState,        // Liste des tâches
    isEditing: null as Todo | null, // Indicateur de la tâche en cours d'édition
    currentEdit: null as Todo | null, // Détails de la tâche en cours d'édition
    currentTodo: "",            // Texte de la tâche à ajouter
    isLoading: false,           // Indicateur de chargement des données
  },
  reducers: {
    // Ajoute une nouvelle tâche
    addTodo: (state, action) => {
      state.todos.push({
        id: state.todos.length + 1,
        text: action.payload, // Texte de la nouvelle tâche
        status: "notDone",
      });
      state.currentTodo = ""; // Réinitialise le champ d'ajout
    },
    // Supprime une tâche à partir de son ID
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Démarre l'édition d'une tâche
    startEditing: (state, action) => {
      state.isEditing = action.payload;
      state.currentEdit = { ...action.payload }; // Copie de la tâche à éditer
    },
    // Enregistre les modifications apportées à une tâche
    saveEdit: (state) => {
      if (state.currentEdit) {
        state.todos = state.todos.map((todo) =>
          todo.id === state.currentEdit?.id ? { ...todo, text: state.currentEdit.text } : todo
        );
        state.currentEdit = null;
        state.isEditing = null; // Termine l'édition
      }
    },
    // Change le statut d'une tâche (fait/non fait)
    toggleTodoStatus: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === "done" ? "notDone" : "done";
      }
    },
    // Met à jour le texte de la tâche à ajouter
    setCurrentTodo: (state, action) => {
      state.currentTodo = action.payload;
    },
    // Met à jour le texte de la tâche en cours d'édition
    setCurrentEdit: (state, action) => {
      if (state.currentEdit) {
        state.currentEdit.text = action.payload;
      }
    },
    // Met à jour l'indicateur d'édition
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  // Gestion des actions asynchrones (extraReducers)
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true; // Indique que les données sont en cours de chargement
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false; // Indique un échec du chargement
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload; // Met à jour la liste des tâches
        state.isLoading = false;      // Termine le chargement
      });
  },
});

// Action asynchrone pour récupérer les tâches depuis une API externe
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos", // Nom de l'action
  async () => {
    const response = await fetch("https://dummyjson.com/todos"); // Requête API
    const jsonResponse = await response.json();

    // Transforme les données de l'API en format compatible
    return jsonResponse.todos.map((todo: any) => ({
      text: todo.todo,
      id: todo.id,
      status: todo.completed ? "done" : "notDone",
    })) as Todo[];
  }
);

// Exporte le réducteur pour l'intégrer dans le store Redux
export default todoSlice.reducer;

// Exporte les actions pour pouvoir les utiliser dans les composants
export const {
  addTodo,
  deleteTodo,
  saveEdit,
  toggleTodoStatus,
  startEditing,
  setCurrentTodo,
  setIsEditing,
  setCurrentEdit,
} = todoSlice.actions;
