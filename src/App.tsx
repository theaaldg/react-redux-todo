import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import {
  addTodo,
  deleteTodo,
  saveEdit,
  startEditing,
  Todo,
  toggleTodoStatus,
  setCurrentTodo,
  setCurrentEdit,
  fetchTodos,
} from "./store/todoSlice";

function App() {
  // Récupère les états du store avec `useSelector`
  const todos = useSelector((state: RootState) => state.todo.todos); // Liste des tâches
  const currentTodo = useSelector((state: RootState) => state.todo.currentTodo); // Tâche en cours de saisie
  const isEditing = useSelector((state: RootState) => state.todo.isEditing); // Indicateur d'édition active
  const currentEdit = useSelector((state: RootState) => state.todo.currentEdit); // Détails de la tâche en cours de modification
  const isLoading = useSelector((state: RootState) => state.todo.isLoading); // Indicateur de chargement des tâches

  // Initialise `dispatch` pour envoyer des actions au store Redux
  const dispatch = useDispatch<typeof store.dispatch>();

  return (
    <div className="app-container">
      <h1>Todo List</h1>

      {/* Indique que les tâches sont en cours de chargement */}
      {isLoading && <p>Loading...</p>}

      {/* Bouton pour charger les tâches depuis une API */}
      {!isLoading && (
        <button onClick={() => dispatch(fetchTodos())}>Fetch todos</button>
      )}

      {/* Entrée pour ajouter une nouvelle tâche */}
      <div className="todo-input">
        <input
          type="text"
          placeholder="Ajouter une tâche" // Placeholder pour l'entrée
          value={currentTodo ?? ""} // Texte de la tâche en cours de saisie
          onChange={(e) => dispatch(setCurrentTodo(e.target.value))} // Met à jour le texte en cours
        />
        <button onClick={() => dispatch(addTodo(currentTodo))}>
          Ajouter
        </button>
      </div>

      {/* Affiche la liste des tâches */}
      <div className="todo-list">
        {todos.map((todo: Todo) => (
          <div key={todo.id} className={`todo-item ${todo.status}`}>
            {/* Si une tâche est en cours d'édition */}
            {isEditing && currentEdit?.id === todo.id ? (
              <div className="edit-section">
                {/* Entrée pour modifier la tâche */}
                <input
                  type="text"
                  value={currentEdit.text} // Texte actuel de la tâche
                  onChange={(e) =>
                    dispatch(setCurrentEdit({ ...currentEdit, text: e.target.value }))
                  }
                />
                <button onClick={() => dispatch(saveEdit())}>
                  Valider
                </button>
              </div>
            ) : (
              // Affiche les détails de la tâche et ses actions
              <>
                <p className="todo-text">{todo.text}</p>
                <div className="todo-actions">
                  {/* Bouton pour changer le statut de la tâche */}
                  <button onClick={() => dispatch(toggleTodoStatus(todo.id))}>
                    {todo.status === "done" ? "Non fait" : "Fait"}
                  </button>
                  {/* Bouton pour commencer à éditer la tâche */}
                  <button onClick={() => dispatch(startEditing(todo))}>
                    Editer
                  </button>
                  {/* Bouton pour supprimer la tâche */}
                  <button onClick={() => dispatch(deleteTodo(todo.id))}>
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
