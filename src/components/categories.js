/**
 * CATEGORIES COMPONENT - Recipe Category Selector
 * Displays a horizontal scrollable list of recipe categories.
 * Users can tap categories to filter recipes or navigate to special screens.
 */

// Core React Native components for UI
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

// Hook to enable navigation between screens
import { useNavigation } from "@react-navigation/native";

// Responsive design helpers for different screen sizes
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Animation library for smooth entrance effects
import Animated, { FadeInDown } from "react-native-reanimated";

/**
 * Categories Component
 * @param {Array} categories - List of recipe categories to display
 * @param {String} activeCategory - Currently selected category
 * @param {Function} handleChangeCategory - Function to update active category
 */
export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  // Get navigation object to move between screens
  const navigation = useNavigation();

  return (
    // Animated wrapper with fade-in and spring effect
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      {/* 
        Horizontal ScrollView for category pills
        Hides scroll indicator for cleaner UI
      */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Special Button: My Food - Navigate to user's recipes */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MyFood")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Food</Text>
        </TouchableOpacity>

        {/* Special Button: My Favorites - Navigate to favorites */}
        <TouchableOpacity
          onPress={() => navigation.navigate("FavoriteScreen")}
          style={styles.categoryContainer}
        >
          <View style={[styles.imageContainer, styles.myFoodButton]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryText}>My Favorites</Text>
        </TouchableOpacity>

        {/* 
          Dynamic Category List
          Maps through categories array to render each category button
        */}
        {categories.map((cat, index) => {
          // Check if this category is currently active
          let isActive = cat.strCategory == activeCategory;
          
          // Apply different styling for active vs inactive
          let activeButtonStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryContainer}
            >
              {/* Category image with dynamic styling */}
              <View style={[styles.imageContainer, activeButtonStyle]}>
                <Image
                  source={cat.strCategoryThumb}
                  style={styles.categoryImage}
                />
              </View>
              {/* Category name label */}
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

/**
 * Styles for Categories Component
 * Uses StyleSheet.create for performance optimization
 */
const styles = StyleSheet.create({
  // Padding for scroll content - consistent with header
  scrollContainer: {
    paddingHorizontal: wp(4), // Match header padding for alignment
  },
  // Container for each category item
  categoryContainer: {
    alignItems: "center",
    marginRight: wp(4),
  },
  // Circular container for category image
  imageContainer: {
    borderRadius: 9999, // Large number creates perfect circle
    padding: 6,
  },
  // Orange background for selected category
  activeButton: {
    backgroundColor: "#F59E0B",
  },
  // Light gray background for unselected categories
  inactiveButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  // Category image sizing (responsive)
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: 9999,
  },
  // Text label below category image
  categoryText: {
    fontSize: hp(1.6),
    color: "#52525B",
    marginTop: hp(0.5),
  },
  // Green background for special buttons (My Food, Favorites)
  myFoodButton: {
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  myFoodText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp(1.5),
  },
});
  