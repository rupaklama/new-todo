import { v4 as uuidv4 } from 'uuid';

// createContext hook to create initial context object
import { createContext } from 'react';

// our initial context object - STORE
export const TodosContext = createContext({
  todos: [
    { id: 1, task: 'Vaccum the room', completed: false },
    { id: 2, task: 'Wash Car', completed: false },
    { id: 3, task: 'Water the plants', completed: true },
  ],
  // to select our current todo & update state so that
  // we can edit our current todo, also,
  // to create single todo updated object
  currentTodo: {},
});

// creating Reducer to process & update our state object
// two params - our initial state & action types
export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      const toggledTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...action.payload, completed: !action.payload.completed }
          : todo
      );

      return {
        ...state,
        todos: toggledTodos,
      };

    case 'REMOVE_TODO':
      const filteredTodos = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      
      // to clear out input
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;

      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos,
      };

    // adding new object in our initial array to create a new array
    case 'ADD_TODO':
      const newTodo = {
        id: uuidv4(),
        task: action.payload,
        completed: false,
      };

      const addedTodos = [...state.todos, newTodo];
      return {
        ...state,
        // updated todos array with the new object to create a new array
        todos: addedTodos,
      };

    // to select our current todo & update state so that
    // we can edit our current todo
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload, // edit only current todo only
      };

    case 'UPDATE_TODO':
      // edit or updated todo
      const updatedTodo = { ...state.currentTodo, task: action.payload };

      // once we created updated todo object, put it in our todos array in context object
      // with findIndex()
      const updatedTodoIndex = state.todos.findIndex(
        todo => todo.id === state.currentTodo.id
      );

      // with updatedTodo & updatedTodoIndex, we will create a new array & update our context object
      const updatedTodos = [
        // we will take first part of todos array from the 0 index,
        // up to where our updated todo is
        ...state.todos.slice(0, updatedTodoIndex),
        // we will put the updated todo in array according to index value
        updatedTodo,
        // a slice of updated index to the end of the array
        ...state.todos.slice(updatedTodoIndex + 1),
      ];

      return {
        ...state,
        // clear the current todo values in state after updating it
        currentTodo: {},
        todos: updatedTodos,
      };
    default:
      return state;
  }
};
