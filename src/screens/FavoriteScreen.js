/**
 * FAVORITE SCREEN - User's Favorite Recipes
 * Displays all recipes that user has marked as favorite.
 * Fetches data from Redux store and shows empty state if no favorites.
 */

import React from "react";

// Redux hook to access global state
import { useSelector } from "react-redux";

// Core React Native components
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Navigation hook
import { useNavigation } from "@react-navigation/native";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/**
 * FavoriteScreen Component
 * Shows list of all favorited recipes
 */
export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Get favorite recipes from Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];
  
  // Debug logs to track favorites data
  console.log(favoriteRecipes.favoriterecipes);
  console.log('favoriteRecipesList', favoriteRecipesList);

  /**
   * Empty State Render
   * Shows message and back button when no favorites exist
   */
  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Favorites List Render
   * Shows heading and list of favorite recipes
   */
  return (
    <>
      {/* Screen Heading */}
      <View testID="FavoriteRecipes">
        <Text
          style={{ 
            fontSize: hp(3.8), 
            marginTop: hp(4), 
            marginLeft: 20 
          }}
          className="font-semibold text-neutral-600"
        >
          My Favorite Recipes
        </Text>
      </View>
    
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>
    
      {/* TODO: Add FlatList to display favorite recipes */}
      {/* TODO: Each item should show image, title, and be clickable */}
    </>
  );
}

/**
 * Styles for Favorite Screen
 * Includes empty state, list, and card styling
 */
const styles = StyleSheet.create({
  // Centered container for empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Empty state message text
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },
  // FlatList content container padding
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  // Individual recipe card styling
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  // Thumbnail image in recipe card
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  // Recipe title in card
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
  },
});
