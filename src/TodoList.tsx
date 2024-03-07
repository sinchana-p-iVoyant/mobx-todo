import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore, { Todo } from './TodoStoreFn';
import './TodoList.css';
import React from 'react';

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  const handleAddTodo = (): void => {
    if (newTodoText.trim() !== '') {
      todoStore.addTodo({
        id: Math.random(),
        title: newTodoText,
        completed: false, // Default to incomplete
      });
      setNewTodoText('');
    }
  };

  const handleStartEditTodo = (id: number, text: string): void => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const handleCancelEditTodo = (): void => {
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const handleSaveEditedTodo = (id: number): void => {
    todoStore.editTodo(id, editedTodoText);
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const handleDeleteTodo = (id: number): void => {
    todoStore.deleteTodo(id);
  };

  const handleToggleCompletion = (id: number): void => {
    todoStore.toggleTodoCompletion(id);
  };

  return (
    <div className="todo-list-container">
      <div className="input-container">
         <input
             className="todo-input"
             type="text"
             value={newTodoText}
             onChange={(e) => setNewTodoText(e.target.value)}
         />
         <button className="todo-button" onClick={handleAddTodo}>Add Todo</button>
       </div>
      <ul className="todo-list">
        {todoStore.todos.map((todoProxy: Todo) => {
          const todo = { ...todoProxy }; // Convert the proxy object to a regular object
          return (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompletion(todo.id)}
              />
              {editingTodoId === todo.id ? (
                <>
                  <input
                    className="edit-todo-input"
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                  />
                  <div className="todo-buttons">
                    <button className="todo-button edit-button" onClick={() => handleSaveEditedTodo(todo.id)}>Save</button>
                    <button className="todo-button cancel-button" onClick={handleCancelEditTodo}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
                  <div className="todo-buttons">
                    <button className="todo-button edit-button" onClick={() => handleStartEditTodo(todo.id, todo.title)}>Edit</button>
                  </div>
                </>
              )}
              <button className="todo-button delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default observer(TodoList);
