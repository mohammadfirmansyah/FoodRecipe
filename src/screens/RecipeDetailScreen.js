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
        {/* Recipe Thumbnail Image */}
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      {/* Top Action Buttons (positioned over image) */}
      <View style={styles.topButtonsContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        {/* Favorite Toggle Button */}
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
      <View style={styles.contentContainer}>
        {/* Title and Category Section */}
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          {/* Recipe Title */}
          <Text style={styles.mealName} testID="recipeTitle">
            {recipe.recipeName}
          </Text>
          
          {/* Recipe Category */}
          <Text style={styles.mealCategory} testID="recipeCategory">
            {recipe.category}
          </Text>
        </View>
        
        {/* Miscellaneous Info (time, servings, calories, difficulty) */}
        <View style={styles.miscContainer} testID="miscContainer">
          {/* Time */}
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🕒</Text>
            <Text style={styles.miscText}>35 Mins</Text>
          </View>
          
          {/* Servings */}
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>👥</Text>
            <Text style={styles.miscText}>03 Servings</Text>
          </View>
          
          {/* Calories */}
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🔥</Text>
            <Text style={styles.miscText}>103 Cal</Text>
          </View>
          
          {/* Difficulty Level */}
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🎚️</Text>
            <Text style={styles.miscText}>Medium</Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList} testID="ingredientsList">
            {recipe.ingredients?.map((i, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {i.ingredientName} {i.measure}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {recipe.recipeInstructions}
          </Text>
        </View>
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
