import React, { useContext } from 'react';

import { TodosContext } from '../context/todosContext';

export default function TodoList() {
  // state & dispatch passed as value={} property to this children component
  const { state, dispatch } = useContext(TodosContext);

  // setting up title
  const title =
    state.todos.length > 0
      ? `${state.todos.length} Todos`
      : 'Nonthing to do yet!';

  const renderTodos = state.todos.map(todo => {
    const { id, task } = todo;

    return (
      <li key={id}>
        <br />
        <span
          className={`cursor-pointer ${
            todo.completed && 'line-through text-grey-darkest'
          }`}
          onDoubleClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo })}
        >
          {task}
        </span>

        <br />
        <button
          onClick={() => dispatch({ type: 'SET_CURRENT_TODO', payload: todo })}
        >
          Edit
        </button>

        <br />
        <button
          onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo })}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1>{title}</h1>
      <ul>{renderTodos}</ul>
    </div>
  );
}
