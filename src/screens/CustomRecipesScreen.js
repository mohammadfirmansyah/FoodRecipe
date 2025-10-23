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
  console.log('favoriteRecipe from custom', favoriteRecipe);
  
  // Check if current recipe is favorited
  const isFavourite = favoriteRecipe.includes(recipe.idCategory);

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
          <Text style={styles.backButtonText}>GoBack</Text>
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
        
        {/* Ingredients Section - Parse semicolon-separated list */}
        {recipe.ingredients && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.split(';').map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
              </View>
            ))}
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
  // Large recipe image with rounded bottom corners
  recipeImage: {
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
  },
  // Content area below image
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  // Large bold recipe title
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(2),
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
  // Individual ingredient item container
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: hp(1),
    paddingLeft: wp(2),
  },
  // Bullet point for ingredients
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F59E0B",
    marginTop: hp(0.8),
    marginRight: wp(2),
  },
  // Ingredient text styling
  ingredientText: {
    fontSize: hp(1.8),
    color: "#4B5563",
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
  // Circular back button (white background)
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  // Text style for back button
  backButtonText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
  },
  // Circular favorite button (white background)
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    marginRight: wp(5),
    backgroundColor: "white",
  },
  // Text style for favorite button (heart symbol)
  favoriteButtonText: {
    fontSize: hp(3),
    color: "#f43f5e",
  },
  // Recipe description text
  contentText: {
    fontSize: hp(1.6),
    color: "#4B5563",
  },
});
  