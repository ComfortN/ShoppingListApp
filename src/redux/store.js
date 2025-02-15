import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import listReducer from './reducers/listReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: listReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ 
        serializableCheck: { 
            // Ignore these action types 
            ignoredActions: ['your/action/type'],
             // Ignore these field paths in all actions 
             ignoredActionPaths: ['meta.arg', 'payload.timestamp'], 
             // Ignore these paths in the state 
             ignoredPaths: ['items.dates'], 
            }, 
        }),
});

export default store;
