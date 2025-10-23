/**
 * REDUX STORE - Global State Management Configuration
 * This is the central storage of our app's state.
 * Think of it as a brain that remembers data across all screens.
 */

// configureStore creates a Redux store with good defaults
import { configureStore } from '@reduxjs/toolkit';

// Import reducer that manages favorite recipes state
import favoritesReducer from './favoritesSlice';

/**
 * Store Configuration
 * Combines all reducers into a single store
 * Each reducer manages a specific part of the state
 */
const store = configureStore({
  reducer: {
    // 'favorites' key: accessible via state.favorites
    favorites: favoritesReducer,
  },
});

export default store;
