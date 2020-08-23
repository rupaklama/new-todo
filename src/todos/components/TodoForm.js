import React, { useState, useContext, useEffect } from 'react';

import { TodosContext } from '../context/todosContext';

export default function TodoForm() {
  const [todo, setTodo] = useState('');

  // state & dispatch passed as value={} property to this children component
  // state: { currentTodo = {} } - nested destructuring to get only currentTodo from state,
  // initialized with empty object just if we try to access currentTodo & value is not set
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  // using useEffect to check to see if currentTodo has been updated
  useEffect(() => {
    // check to see if we have task in currentTodo,
    // if we have, display in the form input to update
    if (currentTodo.task) {
      setTodo(currentTodo.task);
    } else {
      setTodo('')
    }
    // if currentTodo.id - current select todo if changes run effect function
  }, [currentTodo.id, currentTodo.task]);

  const handleSubmit = event => {
    event.preventDefault();

    // check to see if we have current todo in state
    if (currentTodo.task) {
      dispatch({ type: 'UPDATE_TODO', payload: todo });
    } else {
      dispatch({ type: 'ADD_TODO', payload: todo });
    }

    setTodo('');
  };

  return (
    <div className="flex justify-center p-5">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-black border-solid border-2"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
      </form>
    </div>
  );
}
