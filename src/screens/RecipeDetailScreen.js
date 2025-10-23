/**
 * RECIPE DETAIL SCREEN - Full Recipe Information Display
 * Shows comprehensive details of a selected recipe.
 * Includes image, title, category, ingredients, instructions, and favorite toggle.
 */

// Core React Native components
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Navigation and Redux hooks
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

/**
 * RecipeDetailScreen Component
 * @param {Object} props - Contains route params with recipe data
 */
export default function RecipeDetailScreen(props) {
  // Extract recipe data from navigation params
  const recipe = props.route.params;

  // Redux setup
  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );
  
  // Check if current recipe is in favorites
  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  );

  const navigation = useNavigation();

  /**
   * Toggle Favorite Function
   * Adds or removes recipe from favorites
   */
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Recipe Image Container */}
      <View style={styles.imageContainer} testID="imageContainer">
        {/* TODO: Add recipe image here */}
      </View>

      {/* Top Action Buttons (positioned over image) */}
      <View style={styles.topButtonsContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        
        {/* Favorite Toggle Button */}
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            { backgroundColor: "white" },
          ]}
        >
          {/* Shows filled heart if favorited, outline if not */}
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Content Section */}
      <View style={styles.contentContainer}>
        {/* Title and Category Section */}
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {/* TODO: Display recipe title */}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {/* TODO: Display recipe category */}
          </Text>
        </View>
        
        {/* Miscellaneous Info (time, servings, etc.) */}
        <View style={styles.miscContainer} testID="miscContainer">
          {/* TODO: Add recipe metadata */}
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionContainer}>
          {/* TODO: Add ingredients list */}
        </View>

        {/* Instructions Section */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          {/* TODO: Add cooking instructions */}
        </View>
        
        {/* Description Section */}
        {/* TODO: Add recipe description */}
      </View>
    </ScrollView>
  );
}

/**
 * Styles for Recipe Detail Screen
 * Comprehensive styling for all recipe detail elements
 */
const styles = StyleSheet.create({
  // Main container
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  // Scroll content bottom padding
  scrollContent: {
    paddingBottom: 30,
  },
  // Centers recipe image horizontally
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  // Large hero image at top
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  // Buttons overlay container
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  // Circular back button
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
    fontWeight: "bold",
  },
  // Circular favorite button
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: wp(5),
  },
  favoriteButtonText: {
    fontSize: hp(2),
    color: "red",
  },
  // Content area below image
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  // Recipe title and category container
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  // Large bold recipe name
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
  },
  mealName: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Roboto",
  },
  // Recipe category text
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF",
  },
  mealCategory: {
    fontSize: hp(2),
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  // Container for metadata icons (time, servings)
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
  // Individual metadata item
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
    fontFamily: "Lato",
  },
  // Section container (ingredients, instructions)
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  // Section heading
  sectionTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Lato",
  },
  // Ingredients list styling
  ingredientsList: {
    marginLeft: wp(4),
  },
  // Individual ingredient item
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  // Bullet point for ingredient
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  // Ingredient text
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    fontFamily: "Lato",
  },
  // Instructions text styling
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
    fontFamily: "Lato",
  },
  // Description text
  descriptionText: {
    fontSize: hp(1.8),
    color: "#4B5563",
    textAlign: "justify",
    lineHeight: hp(2.5),
  },
  // Video link styling
  videoLink: {
    fontSize: hp(2.2),
    color: "#1E90FF",
    textDecorationLine: "underline",
    marginTop: 10,
    fontFamily: "Roboto",
  },
  // Error state container
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#D9534F",
  },
});
