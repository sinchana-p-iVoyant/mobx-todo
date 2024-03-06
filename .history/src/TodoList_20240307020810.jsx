import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from './TodoStore';

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null); // Track which todo is being edited

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      todoStore.addTodo({
        id: Math.random(),
        text: newTodoText,
      });
      setNewTodoText('');
    }
  };

  const handleEditTodo = (id, newText) => {
    todoStore.editTodo(id, newText);
    setEditingTodoId(null); // Exit edit mode after editing
  };

  const handleDeleteTodo = (id) => {
    todoStore.deleteTodo(id);
  };

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todoStore.todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? ( // If editing mode for this todo
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                />
                <button onClick={() => handleEditTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => setEditingTodoId(todo.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(TodoList);
