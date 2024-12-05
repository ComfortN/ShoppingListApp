const initialState = {
    items: [],
  };
  
  const listReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return { ...state, items: [...state.items, action.payload] };
      case 'EDIT_ITEM':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? action.payload.updatedItem : item
          ),
        };
      case 'DELETE_ITEM':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default listReducer;
  