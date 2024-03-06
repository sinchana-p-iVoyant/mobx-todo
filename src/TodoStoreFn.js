// TodoStore.js
import { makeObservable, observable, action } from 'mobx';

const createTodoStore = () => {
  const todoStore = {
    todos: [],
    addTodo: action(function(todo) {
      todoStore.todos.push(todo);
    }),
    editTodo: action(function(id, newText) {
      const todoToEdit = todoStore.todos.find(todo => todo.id === id);
      if (todoToEdit) {
        todoToEdit.text = newText;
      }
    }),
    deleteTodo: action(function(id) {
      todoStore.todos = todoStore.todos.filter(todo => todo.id !== id);
    })
  };

  makeObservable(todoStore, {
    todos: observable,
    addTodo: action,
    editTodo: action,
    deleteTodo: action
  });

  return todoStore;
};

const todoStore = createTodoStore();
export default todoStore;
