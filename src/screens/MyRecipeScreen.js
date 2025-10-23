/**
 * MY RECIPE SCREEN - User's Personal Recipe Collection
 * Displays recipes created by the user with CRUD operations.
 * Allows adding, viewing, editing, and deleting custom recipes.
 */

// Core React Native components
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

// AsyncStorage for local data persistence
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigation hook
import { useNavigation } from "@react-navigation/native";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/**
 * MyRecipeScreen Component
 * Main screen for managing user's custom recipes
 */
export default function MyRecipeScreen() {
  const navigation = useNavigation();
  
  // State management
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * useEffect - Load recipes on component mount
   * Fetches saved recipes from AsyncStorage
   */
  useEffect(() => {
    const fetchrecipes = async () => {
      // TODO: Retrieve recipes from AsyncStorage
      // TODO: Parse JSON and set to state
      // TODO: Set loading to false
    };

    fetchrecipes();
  }, []); // Runs once on mount

  /**
   * Handle Add Recipe
   * Navigates to form screen for creating new recipe
   */
  const handleAddrecipe = () => {
    // TODO: Navigate to RecipesFormScreen
  };

  /**
   * Handle Recipe Click
   * Opens detailed view of selected recipe
   */
  const handlerecipeClick = (recipe) => {
    // TODO: Navigate to CustomRecipesScreen with recipe data
  };

  /**
   * Delete Recipe
   * Removes recipe from AsyncStorage by index
   */
  const deleterecipe = async (index) => {
    // TODO: Filter out recipe at given index
    // TODO: Update AsyncStorage
    // TODO: Update state
  };

  /**
   * Edit Recipe
   * Opens form screen in edit mode with pre-filled data
   */
  const editrecipe = (recipe, index) => {
    // TODO: Navigate to RecipesFormScreen with edit params
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{"Back"}</Text>
      </TouchableOpacity>

      {/* Add New Recipe Button */}
      <TouchableOpacity 
        onPress={handleAddrecipe} 
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add New recipe</Text>
      </TouchableOpacity>

      {/* Loading State or Recipe List */}
      {loading ? (
        // Show spinner while loading
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        // Scrollable recipe grid
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            // Empty state message
            <Text style={styles.norecipesText}>No recipes added yet.</Text>
          ) : (
            // Map through recipes and display cards
            recipes.map((recipe, index) => (
              <View 
                key={index} 
                style={styles.recipeCard} 
                testID="recipeCard"
              >
                {/* Recipe Content - Clickable */}
                <TouchableOpacity 
                  testID="handlerecipeBtn" 
                  onPress={() => handlerecipeClick(recipe)}
                >
                  {/* Recipe Title */}
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  
                  {/* Recipe Description */}
                  <Text 
                    style={styles.recipeDescription} 
                    testID="recipeDescp"
                  >
                    {/* TODO: Display recipe description */}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Action Buttons */}
                <View 
                  style={styles.actionButtonsContainer} 
                  testID="editDeleteButtons"
                >
                  {/* TODO: Add Edit button */}
                  {/* TODO: Add Delete button */}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

/**
 * Styles for My Recipe Screen
 * Grid layout with card-based recipe display
 */
const styles = StyleSheet.create({
  // Main container with light gray background
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  // Back button at top
  backButton: {
    marginBottom: hp(1.5),
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
  },
  // Add button styling (blue, centered)
  addButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    width: 300,
    marginLeft: 500,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  // Scroll container with flexbox grid layout
  scrollContainer: {
    paddingBottom: hp(2),
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap', // Enables grid wrapping
  },
  // Empty state text
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  // Individual recipe card
  recipeCard: {
    width: 400,
    height: 300,
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
  },
  // Recipe image thumbnail
  recipeImage: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginBottom: hp(1),
  },
  // Recipe title text
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  // Recipe description text
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  // Container for edit/delete buttons
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  // Edit button (green)
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  // Delete button (red)
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});
  