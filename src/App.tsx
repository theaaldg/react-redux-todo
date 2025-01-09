import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addTodo, deleteTodo, saveEdit, startEditing, Todo, toggleTodoStatus, setCurrentTodo, setCurrentEdit, fetchTodos } from "./store/todoSlice";





function App() {
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const currentTodo = useSelector((state: RootState) => state.todoReducer.currentTodo as unknown as Todo || null);
  const isEditing = useSelector((state: RootState) => state.todoReducer.isEditing as unknown as boolean);
  const currentEdit = useSelector((state: RootState) => state.todoReducer.currentEdit as unknown as Todo || null);
  const isLoading = useSelector((state: RootState) => state.todoReducer.isLoading as unknown as Todo || null);

  const dispatch = useDispatch<typeof store.dispatch>();

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <button onClick={() => dispatch(fetchTodos())}>Fetch todos</button>}


      <div className="todo-input">
        <input
          type="text"
          placeholder="Ajouter une tâche"
          value={currentTodo}
          onChange={(e) => dispatch(setCurrentTodo(e.target.value))}
        />
        <button onClick={() => dispatch(addTodo(currentTodo))}>Ajouter</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.status}`}>
            {
              isEditing && currentEdit?.id === todo.id ? (
                <div className="edit-section">
                  <input
                    type="text"
                    value={currentEdit.text}
                    onChange={(e) => dispatch(setCurrentEdit({ ...currentEdit, text: e.target.value }))}
                  />
                  <button onClick={() => dispatch(saveEdit())}>Valider</button>
                </div>
              ) : (
                <>
                  <p className="todo-text">{todo.text}</p>
                  <div className="todo-actions">
                    <button onClick={() => dispatch(toggleTodoStatus(todo.id))}>
                      {todo.status === "done" ? "Non fait" : "Fait"}
                    </button>
                    <button onClick={() => dispatch(startEditing(todo))}>Editer</button>
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>Supprimer</button>
                  </div>
                </>
              )
            }
          </div>
        ))}
      </div>
    </div >
  );
}

export default App;