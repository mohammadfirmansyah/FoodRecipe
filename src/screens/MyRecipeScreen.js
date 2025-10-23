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
      try {
        // Retrieve recipes from AsyncStorage using key "customrecipes"
        const storedrecipes = await AsyncStorage.getItem("customrecipes");
        
        // Check if recipes exist, parse JSON and update state
        if (storedrecipes) {
          setrecipes(JSON.parse(storedrecipes));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        // Set loading to false after fetch completes
        setLoading(false);
      }
    };

    fetchrecipes();
  }, []); // Runs once on mount

  /**
   * Handle Add Recipe
   * Navigates to form screen for creating new recipe
   */
  const handleAddrecipe = () => {
    // Navigate to RecipesFormScreen to add new recipe
    navigation.navigate("RecipesFormScreen");
  };

  /**
   * Handle Recipe Click
   * Opens detailed view of selected recipe
   */
  const handlerecipeClick = (recipe) => {
    // Navigate to CustomRecipesScreen with recipe data as parameter
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  /**
   * Delete Recipe
   * Removes recipe from AsyncStorage by index
   */
  const deleterecipe = async (index) => {
    try {
      // Create a copy of the recipes array
      const updatedrecipes = [...recipes];
      
      // Remove recipe at specified index (removes 1 element)
      updatedrecipes.splice(index, 1);
      
      // Update AsyncStorage with new recipes array
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedrecipes));
      
      // Update component state with new recipes
      setrecipes(updatedrecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  /**
   * Edit Recipe
   * Opens form screen in edit mode with pre-filled data
   */
  const editrecipe = (recipe, index) => {
    // Navigate to RecipesFormScreen with recipe data and index for editing
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
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
                  {/* Recipe Image - Display if available */}
                  {recipe.image && (
                    <Image 
                      source={{ uri: recipe.image }} 
                      style={styles.recipeImage} 
                    />
                  )}
                  
                  {/* Recipe Title */}
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  
                  {/* Recipe Description - Show first 50 characters */}
                  <Text 
                    style={styles.recipeDescription} 
                    testID="recipeDescp"
                  >
                    {recipe.description && recipe.description.length > 50
                      ? recipe.description.substring(0, 50) + "…"
                      : recipe.description}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Action Buttons */}
                <View 
                  style={styles.actionButtonsContainer} 
                  testID="editDeleteButtons"
                >
                  {/* Edit Button - Opens form with pre-filled data */}
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editrecipe(recipe, index)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  
                  {/* Delete Button - Removes recipe from storage */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleterecipe(index)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
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
  // Add button styling (blue, centered dynamically)
  addButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    alignItems: "center",
    alignSelf: "center", // Center horizontally
    borderRadius: 5,
    marginBottom: hp(2),
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
  