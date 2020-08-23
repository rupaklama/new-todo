import React, {useContext, useReducer } from 'react'

// import our Context object & reducer
import { TodosContext, todosReducer } from '../context/todosContext';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
export default function TodoApp() {

  // useContext hook to use initial state from Context object
  const initialState = useContext(TodosContext);

  // two params in useReducer - reducer func & initial state
  // [updated state, dispatch func - to dispatch an action & update our state in context object]
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoList />
      <TodoForm />
    </TodosContext.Provider>
  )
}

// createContext returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around children components that can have an access to the Context Object

// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property
