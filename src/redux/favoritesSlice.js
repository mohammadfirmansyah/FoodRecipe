/**
 * FAVORITES SLICE - Favorite Recipes State Management
 * This slice handles adding/removing recipes from favorites.
 * Like a bookmark system for recipes users love.
 * Favorites are persisted to AsyncStorage for permanent storage.
 */

// createSlice simplifies Redux logic (actions + reducer in one place)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage key for favorites
const FAVORITES_STORAGE_KEY = "favoriteRecipes";

/**
 * Load Favorites from AsyncStorage
 * Async thunk to load favorites when app starts
 */
export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  }
);

/**
 * Initial State
 * Defines the default state when app first loads
 */
const initialState = {
  // Array to store all favorite recipes
  favoriterecipes: [],
  // Loading state
  isLoading: false,
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
     * Works with both regular recipes (idFood) and custom recipes (title)
     * @param {Object} state - Current Redux state
     * @param {Object} action - Action with recipe payload
     */
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      
      // Create unique identifier - use idFood for regular recipes, title for custom recipes
      const getRecipeId = (r) => r.idFood || r.title;
      const recipeId = getRecipeId(recipe);
      
      // Check if recipe already exists in favorites
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => getRecipeId(item) === recipeId
      );
      
      if (existingIndex >= 0) {
        // Recipe exists - Remove it from favorites
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe doesn't exist - Add it to favorites
        state.favoriterecipes.push(recipe);
      }
      
      // Save to AsyncStorage
      AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(state.favoriterecipes)
      ).catch((error) => console.error("Error saving favorites:", error));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favoriterecipes = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavorites.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export actions for use in components
export const { toggleFavorite } = favoritesSlice.actions;

// Export reducer to be used in store
export default favoritesSlice.reducer;
