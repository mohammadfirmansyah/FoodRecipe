/**
 * CUSTOM RECIPES SCREEN - User Recipe Detail View
 * Displays detailed view of user-created recipes.
 * Shows image, title, description with favorite functionality.
 */

// Core React Native components
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

// Navigation hooks for routing and params
import { useNavigation, useRoute } from "@react-navigation/native";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Redux hooks and actions for state management
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

/**
 * CustomRecipesScreen Component
 * Shows full details of a user-generated recipe
 */
export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // Get route params (recipe object passed from previous screen)
  const route = useRoute();
  const { recipe } = route.params || {};
  console.log('recipe', recipe);
  
  // Get favorite recipes from Redux store
  const favoriteRecipe = useSelector(
    (state) => state.favorites.favoriterecipes
  );
  
  // Check if current recipe is favorited - use title as unique identifier
  const isFavourite = favoriteRecipe?.some(
    (favRecipe) => favRecipe.title === recipe.title
  );

  /**
   * Handle No Recipe Data
   * Shows error message if recipe data is missing
   */
  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Recipe Details Available</Text>
      </View>
    );
  }

  /**
   * Toggle Favorite Function
   * Dispatches Redux action to add/remove from favorites
   */
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent} 
      testID="scrollContent"
    >
      {/* Recipe Image Section */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.image && (
          <Image 
            source={{ uri: recipe.image }} 
            style={styles.recipeImage} 
          />
        )}
      </View>
      
      {/* Top Action Buttons (Back & Favorite) */}
      <View
        style={styles.topButtonsContainer} 
        testID="topButtonsContainer"
      >
        {/* Back Button - Navigate to previous screen */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        {/* Favorite Toggle Button - Shows heart icon */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          {/* Shows filled heart if favorited, outline if not */}
          <Text style={styles.favoriteButtonText}>
            {isFavourite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Content Section */}
      <View style={styles.contentContainer} testID="contentContainer">
        {/* Recipe Title */}
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        
        {/* Recipe Category - if available */}
        {recipe.category && (
          <Text style={styles.recipeCategory}>{recipe.category}</Text>
        )}
        
        {/* Miscellaneous Info - Only show if at least one field has data */}
        {(recipe.prepTime || recipe.servings || recipe.calories || recipe.difficulty) && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.miscScrollContent}
            style={styles.miscScrollContainer}
          >
            {/* Time - Only show if exists */}
            {recipe.prepTime && (
              <View style={styles.miscItem}>
                <Text style={styles.miscIcon}>🕒</Text>
                <Text style={styles.miscText}>{recipe.prepTime}</Text>
              </View>
            )}
            
            {/* Servings - Only show if exists */}
            {recipe.servings && (
              <View style={styles.miscItem}>
                <Text style={styles.miscIcon}>👥</Text>
                <Text style={styles.miscText}>{recipe.servings}</Text>
              </View>
            )}
            
            {/* Calories - Only show if exists */}
            {recipe.calories && (
              <View style={styles.miscItem}>
                <Text style={styles.miscIcon}>🔥</Text>
                <Text style={styles.miscText}>{recipe.calories}</Text>
              </View>
            )}
            
            {/* Difficulty Level - Only show if exists */}
            {recipe.difficulty && (
              <View style={styles.miscItem}>
                <Text style={styles.miscIcon}>🎚️</Text>
                <Text style={styles.miscText}>{recipe.difficulty}</Text>
              </View>
            )}
          </ScrollView>
        )}
        
        {/* Ingredients Section - Parse semicolon-separated list */}
        {recipe.ingredients && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.split(';').map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Instructions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Styles for Custom Recipe Screen
 * Clean layout with image at top, content below
 */
const styles = StyleSheet.create({
  // Main container with white background
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  // Scroll content padding at bottom
  scrollContent: {
    paddingBottom: 30,
  },
  // Centers image horizontally
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  // Large recipe image matching RecipeDetailScreen
  recipeImage: {
    width: wp(98),
    height: hp(45), // Match RecipeDetailScreen
    borderRadius: 20,
    marginTop: 4,
  },
  // Content area below image
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  // Large bold recipe title - matching RecipeDetailScreen
  recipeTitle: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  // Recipe category text
  recipeCategory: {
    fontSize: hp(2),
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  // Horizontal scroll container for misc info
  miscScrollContainer: {
    marginBottom: hp(2),
  },
  // Content wrapper with padding for horizontal scroll
  miscScrollContent: {
    paddingHorizontal: wp(4),
    gap: 12,
  },
  // Individual metadata item with min width
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    minWidth: 100,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#333",
  },
  // Section container with spacing
  sectionContainer: {
    marginBottom: hp(2),
  },
  // Section heading (e.g., "Ingredients", "Instructions")
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  // Ingredients list container - matching RecipeDetailScreen
  ingredientsList: {
    marginLeft: wp(4),
  },
  // Individual ingredient item - matching RecipeDetailScreen
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1", // Yellow background like original
    borderRadius: 8,
    elevation: 2,
  },
  // Bullet point for ingredients - matching RecipeDetailScreen
  ingredientBullet: {
    backgroundColor: "#FFD700", // Gold color
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  // Ingredient text styling - matching RecipeDetailScreen
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    flex: 1,
  },
  // Positioned buttons overlay on image
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  // Circular back button - matching RecipeDetailScreen
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  // Text style for back button
  backButtonText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#333",
  },
  // Circular favorite button - matching RecipeDetailScreen (larger)
  favoriteButton: {
    padding: hp(2),
    borderRadius: 50,
    backgroundColor: "white",
    marginRight: wp(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Text style for favorite button (heart symbol)
  favoriteButtonText: {
    fontSize: hp(4), // Larger heart icon
    color: "#f43f5e",
  },
  // Recipe description text
  contentText: {
    fontSize: hp(1.6),
    color: "#4B5563",
  },
});
  