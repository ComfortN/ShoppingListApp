export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item,
  });
  
  export const editItem = (id, updatedItem) => ({
    type: 'EDIT_ITEM',
    payload: { id, updatedItem },
  });
  
  export const deleteItem = (id) => ({
    type: 'DELETE_ITEM',
    payload: id,
  });
  