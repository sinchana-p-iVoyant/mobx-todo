import axios from 'axios';
import { makeObservable, observable, action } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoStore {
  // editTodo(id: number, editedTodoText: string): unknown;
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
  setTodos: (todos: Todo[]) => void;
  toggleTodoCompletion: (id: number) => void;
}

const createTodoStore = (): TodoStore => {
  
  const todoStore: TodoStore = {
  
    todos: [],

    addTodo: action(function(todo: Todo): void {
      todoStore.todos.push(todo);
    }),

    editTodo: action(function(id: number, newText: string): void {
      const todoToEdit = todoStore.todos.find(todo => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = newText;
      }
    }),

    deleteTodo: action(function(id: number): void {
      todoStore.todos = todoStore.todos.filter(todo => todo.id !== id);
    }),

    setTodos: action(function(todos: Todo[]): void {
      todoStore.todos = todos;
    }),

    toggleTodoCompletion: action(function(id: number): void {
      const todoToToggle = todoStore.todos.find(todo => todo.id === id);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    })

  };

  // -------------
  const fetchTodos = async (): Promise<void> => {
    try {
      // Run the Mockoon for this endpoint.
      const response = await axios.get<Todo[]>('http://localhost:4001/todos');
      const todos = response.data;
      todoStore.setTodos(todos); // Store todos in MobX store
      console.log(todoStore.todos)
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };

  // Fetch todos initially when the store is created
  fetchTodos();

  // -----------

  makeObservable(todoStore, {
    todos: observable,
    addTodo: action,
    editTodo: action,
    deleteTodo: action,
    setTodos: action,
    toggleTodoCompletion: action
  });

  return todoStore;
};

const todoStore = createTodoStore();
export default todoStore;
