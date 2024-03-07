import { makeObservable, observable, action } from 'mobx';

class TodoStore {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      editTodo: action,
      deleteTodo: action,
    });
  }

  addTodo = (todo) => {
    this.todos.push(todo);
  };

  editTodo = (id, newText) => {
    const todoToEdit = this.todos.find(todo => todo.id === id);
    if (todoToEdit) {
      todoToEdit.text = newText;
    }
  };

  deleteTodo = (id) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };
}

const todoStore = new TodoStore();
export default todoStore;
