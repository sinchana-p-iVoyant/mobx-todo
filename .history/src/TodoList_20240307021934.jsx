import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from './TodoStore';
import './TodoList.css';

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      todoStore.addTodo({
        id: Math.random(),
        text: newTodoText,
      });
      setNewTodoText('');
    }
  };

  const handleStartEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const handleCancelEditTodo = () => {
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const handleSaveEditedTodo = (id) => {
    todoStore.editTodo(id, editedTodoText);
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const handleDeleteTodo = (id) => {
    todoStore.deleteTodo(id);
  };

  return (
    <div className="todo-list-container">
      <div>
        <input
            className="todo-input"
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button className="todo-button" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todoStore.todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingTodoId === todo.id ? (
              <>
                <input
                  className="todo-input"
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button className="todo-button edit-button" onClick={() => handleSaveEditedTodo(todo.id)}>Save</button>
                <button className="todo-button cancel-button" onClick={handleCancelEditTodo}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button className="todo-button edit-button" onClick={() => handleStartEditTodo(todo.id, todo.text)}>Edit</button>
              </>
            )}
            <button className="todo-button delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(TodoList);
