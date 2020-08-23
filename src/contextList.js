export const initialList = [
  {
    id: 'a',
    task: 'Learn React',
    isComplete: false,
  },
  {
    id: 'b',
    task: 'Learn GraphQL',
    isComplete: true,
  },
];

export const listReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ITEM':
      return state.map((item) => {
        if (item.id === action.id) {
          const updatedItem = {
            ...item,
            isComplete: !item.isComplete,
          };
 
          return updatedItem;
        }
 
        return item;
      });
    default:
      throw new Error();
  }
}