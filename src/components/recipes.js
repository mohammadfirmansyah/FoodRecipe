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
  TouchableOpacity,
  Dimensions 
} from "react-native";
import React, { useState, useEffect } from "react";

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
  const [numColumns, setNumColumns] = useState(2);

  /**
   * Calculate responsive columns based on screen width
   * Mobile: 2 columns, Tablet: 3-4 columns, Desktop: 4+ columns
   */
  useEffect(() => {
    const updateColumns = () => {
      const width = Dimensions.get('window').width;
      if (width >= 1200) {
        setNumColumns(4); // Desktop - 4 columns
      } else if (width >= 900) {
        setNumColumns(3); // Large tablet - 3 columns
      } else if (width >= 600) {
        setNumColumns(3); // Tablet - 3 columns
      } else {
        setNumColumns(2); // Mobile - 2 columns
      }
    };

    updateColumns();
    const subscription = Dimensions.addEventListener('change', updateColumns);
    
    return () => subscription?.remove();
  }, []);

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
        FlatList with responsive columns (2-4 depending on screen size)
      */}
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          numColumns={numColumns}
          key={`${numColumns}-columns`} // Key changes force re-render when columns change
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
      style={styles.cardContainer} 
      testID="articleDisplay"
    >
      {/* 
        Touchable Recipe Card
        Navigates to RecipeDetail screen on press
      */}
      <TouchableOpacity
        onPress={() => navigation.navigate('RecipeDetail', item)}
        style={styles.card}
      >
        {/* Recipe Thumbnail Image - Fixed 4:5 aspect ratio (horizontal) */}
        <Image
          source={item.recipeImage}
          style={styles.articleImage}
          resizeMode="cover"
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
  // Main container with horizontal margins matching header
  container: {
    marginHorizontal: wp(4), // Same padding as header
    marginTop: hp(2),
  },
  // Content container for list with bottom padding
  listContent: {
    paddingBottom: hp(4),
  },
  // Individual recipe card container with spacing
  cardContainer: {
    flex: 1,
    margin: wp(2), // Increased margin for better spacing
    maxWidth: 400, // Max card width for large screens
    minWidth: 140, // Min card width for small screens
  },
  // Touchable card wrapper with shadow
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden", // Ensures image stays within rounded corners
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  // Recipe image styling with 4:5 aspect ratio (horizontal rectangle)
  articleImage: {
    width: "100%",
    aspectRatio: 4 / 5, // Horizontal rectangle (width:height = 4:5)
    maxHeight: 180, // Reduced max height for more compact cards
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    resizeMode: 'cover', // Zoom image to fill container
  },
  // Recipe title text
  articleText: {
    fontSize: hp(1.7),
    fontWeight: "600",
    color: "#52525B",
    marginHorizontal: wp(3),
    marginTop: hp(1.2),
  },
  // Recipe description text
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280",
    marginHorizontal: wp(3),
    marginTop: hp(0.5),
    marginBottom: hp(1.5),
  },
  // Row layout for multiple columns
  row: {
    justifyContent: "flex-start",
    marginBottom: hp(1),
  },
});
