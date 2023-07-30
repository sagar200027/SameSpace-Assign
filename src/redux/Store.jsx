// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers'; // Combine your reducers here if you have multiple

const store = configureStore({
  reducer: rootReducer,
});

export default store;
