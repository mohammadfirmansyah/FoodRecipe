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
    /**
     * Toggle Favorite Reducer
     * Adds recipe to favorites if not present, removes if already favorited
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action with recipe payload
     */
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      
      // Check if recipe already exists in favorites by comparing idFood
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );
      
      if (existingIndex >= 0) {
        // Recipe exists - Remove it from favorites
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe doesn't exist - Add it to favorites
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

// Export actions for use in components
export const { toggleFavorite } = favoritesSlice.actions;

// Export reducer to be used in store
export default favoritesSlice.reducer;
