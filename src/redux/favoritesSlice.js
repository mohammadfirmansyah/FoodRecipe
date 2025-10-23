/**
 * FAVORITES SLICE - Favorite Recipes State Management
 * This slice handles adding/removing recipes from favorites.
 * Like a bookmark system for recipes users love.
 */

// createSlice simplifies Redux logic (actions + reducer in one place)
import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial State
 * Defines the default state when app first loads
 */
const initialState = {
  // Array to store all favorite recipes
  favoriterecipes: [],
};

/**
 * Favorites Slice
 * Contains state, reducers, and auto-generated actions
 */
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // TODO: Add toggleFavorite reducer to add/remove recipes
    // This will handle the logic for favoriting/unfavoriting
  },
});

// Export actions for use in components
export const { toggleFavorite } = favoritesSlice.actions;

// Export reducer to be used in store
export default favoritesSlice.reducer;
