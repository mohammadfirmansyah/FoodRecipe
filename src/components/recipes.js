/**
 * RECIPE COMPONENT - Recipe List Display
 * Renders a list of recipe items in a grid or list format.
 * This component is designed to show filtered recipes based on category.
 */

// Core React Native components
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from "react-native";
import React from "react";

// Responsive screen size utilities
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Hook for navigation between screens
import { useNavigation } from "@react-navigation/native";

/**
 * Recipe Component - Main Container
 * @param {Array} categories - List of available categories
 * @param {Array} foods - List of recipe items to display
 */
export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  /**
   * Render function for each recipe item
   * Called by FlatList for each item in the data array
   */
  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      {/* 
        Recipe Display Grid
        FlatList with 2 columns for efficient rendering
      */}
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          numColumns={2}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

/**
 * ArticleCard - Individual Recipe Card Component
 * Displays recipe thumbnail, name, and description
 * Clickable to navigate to recipe detail screen
 * @param {Object} item - Recipe data object
 * @param {Number} index - Position in the list
 * @param {Object} navigation - Navigation object for screen transitions
 */
const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[
        styles.cardContainer, 
        { paddingLeft: 20, paddingRight: 15}
      ]} 
      testID="articleDisplay"
    >
      {/* 
        Touchable Recipe Card
        Navigates to RecipeDetail screen on press
      */}
      <TouchableOpacity
        onPress={() => navigation.navigate('RecipeDetail', item)}
      >
        {/* Recipe Thumbnail Image */}
        <Image
          source={{ uri: item.recipeImage }}
          style={[styles.articleImage, { height: index % 3 === 0 ? hp(25) : hp(35) }]}
        />
        
        {/* Recipe Name */}
        <Text style={styles.articleText}>
          {item.recipeName.length > 20 
            ? item.recipeName.slice(0, 20) + '...' 
            : item.recipeName
          }
        </Text>
        
        {/* Recipe Description */}
        <Text style={styles.articleDescription}>
          {item.recipeDescription?.length > 30
            ? item.recipeDescription.slice(0, 30) + '...'
            : item.recipeDescription
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Styles for Recipe Components
 * Defines layout, spacing, and visual appearance
 */
const styles = StyleSheet.create({
  // Main container with horizontal margins
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  // Section title styling
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  // Loading state indicator position
  loading: {
    marginTop: hp(20),
  },
  // Individual recipe card container
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1, // Allows flexible sizing in grid
  },
  // Recipe image styling
  articleImage: {
    width: "100%",
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  // Recipe title text
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#52525B",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  // Recipe description text
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  // Row layout for multiple columns
  row: {
    justifyContent: "space-between",
  },
});
