import React from 'react'

import {initialList, listReducer} from './contextList'
export default function App() {
  const [list, dispatchList] = React.useReducer(
    listReducer,
    initialList
  );

  // Since we are in a mapped list, we need to figure how to pass the specific item, 
  // or the item's identifier, which we want to change in the list, to the handler function. 
  // The most straightforward approach to this would be using an inline handler to sneak in the item,
  //  or item identifier in this case, as a parameter:

  function handleToggleComplete(id) {
    dispatchList({ type: 'UPDATE_ITEM', id });
  }
 

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
         <span
            style={{
              textDecoration: item.isComplete
                ? 'line-through'
                : 'none',
            }}
          >
            {item.task}
          </span>

          <button type="button" onClick={() => handleToggleComplete(item.id)}>
            {item.isComplete ? 'Undo' : 'Done'}
          </button>

        </li>
      ))}
    </ul>
  );
}
