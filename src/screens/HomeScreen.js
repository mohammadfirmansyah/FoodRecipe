/**
 * HOME SCREEN - Main Recipe Dashboard
 * Central hub displaying recipe categories and food items.
 * Users can filter recipes by category and navigate to details.
 * This is the primary screen after welcome splash.
 */

// Core React Native components
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

// Expo status bar for controlling device status bar
import { StatusBar } from "expo-status-bar";

// Responsive sizing utilities for different screen sizes
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Custom components for categories and food display
import Categories from "../components/categories";
import FoodItems from "../components/recipes";

// Import offline data (bundled in APK - no internet needed)
import { categoriesData, recipesData } from "../data/recipesData";

/**
 * HomeScreen Component
 * Main application screen showing recipe categories and items
 * FULLY OFFLINE - All data and images bundled in APK
 */
export default function HomeScreen() {
  // State for tracking which category is currently selected
  const [activeCategory, setActiveCategory] = useState("Chicken");

  /**
   * Categories Array - OFFLINE DATA
   * All categories loaded from local bundled data (no internet needed)
   */
  const [categories] = useState(categoriesData);

  /**
   * All Food Items Array - OFFLINE DATA
   * Complete recipe database bundled in APK (no internet needed)
   */
  const [allFood] = useState(recipesData);

  /**
   * Handle Category Change
   * Updates the active category when user taps a category button
   * This triggers re-filtering of the food list
   */
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  /**
   * Filter Foods by Active Category
   * Returns only food items that match the currently selected category
   * This creates a dynamic filtered list for display
   */
  const filteredfoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  return (
    <View style={styles.container}>
      {/* Status bar styling (dark icons) */}
      <StatusBar style="dark" />
      
      {/* Main scrollable content area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        testID="scrollContainer"
      >
        {/* Header Section with Avatar and Greeting */}
        <View style={styles.headerContainer} testID="headerContainer">
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
            }}
            style={styles.avatar}
          />
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>

        {/* Welcome Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        {/* Category List Component */}
        <View testID="categoryList">
          <Categories 
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Filtered Food Items Component */}
        <View testID="foodList">
          <FoodItems 
            categories={categories}
            foods={filteredfoods}
          />
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Styles for Home Screen
 * Defines layout, spacing, and visual appearance
 */
const styles = StyleSheet.create({
  // Main container filling entire screen
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Scroll content with bottom padding and top spacing
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14),
  },
  // Header container with avatar and greeting
  headerContainer: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  // Circular avatar image
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  // Greeting text with rounded background
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B",
    fontWeight: "600",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 9999, // Creates pill shape
    textAlign: "center",
  },
  // Container for welcome title
  titleContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  // Large welcome title
  title: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#52525B",
  },
  // Subtitle with same styling as title
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600",
    color: "#52525B",
  },
  // Highlighted word (orange color)
  highlight: {
    color: "#F59E0B",
  },
});
