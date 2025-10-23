/**
 * RECIPES FORM SCREEN - Add/Edit Recipe Form
 * Form interface for creating new recipes or editing existing ones.
 * Collects recipe name, image URL, ingredients list, and step-by-step instructions.
 */

// Core React Native components
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";

// AsyncStorage for local data persistence
import AsyncStorage from "@react-native-async-storage/async-storage";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/**
 * RecipesFormScreen Component
 * @param {Object} route - Contains navigation params (edit mode data)
 * @param {Object} navigation - Navigation object for screen transitions
 */
export default function RecipesFormScreen({ route, navigation }) {
  // Extract params: if editing, get recipe data and callback
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  
  // Form state: pre-fill if editing, empty if creating new
  const [recipeName, setRecipeName] = useState(
    recipeToEdit ? recipeToEdit.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    recipeToEdit ? recipeToEdit.image : ""
  );
  const [ingredients, setIngredients] = useState(
    recipeToEdit ? recipeToEdit.ingredients : ""
  );
  const [instructions, setInstructions] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  /**
   * Save Recipe Function
   * Handles both creating new recipes and updating existing ones
   * Stores data in AsyncStorage for persistence
   */
  const saverecipe = async () => {
    try {
      // Validate input fields
      if (!recipeName.trim() || !imageUrl.trim() || !ingredients.trim() || !instructions.trim()) {
        alert('Please fill in all fields');
        return;
      }

      // Create recipe object with form data
      const newrecipe = {
        title: recipeName.trim(),
        image: imageUrl.trim(),
        ingredients: ingredients.trim(), // Store as semicolon-separated string
        description: instructions.trim(),
      };

      // Retrieve existing recipes from AsyncStorage
      const existingRecipes = await AsyncStorage.getItem("customrecipes");
      
      // Parse retrieved data or start with empty array
      let recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      if (recipeToEdit) {
        // Update existing recipe at specific index
        recipes[recipeIndex] = newrecipe;
        
        // Notify parent component about the edit
        if (onrecipeEdited) {
          onrecipeEdited();
        }
      } else {
        // Add new recipe to array
        recipes.push(newrecipe);
      }

      // Save updated array back to AsyncStorage
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

      // Navigate back to previous screen
      navigation.goBack();
    } catch (error) {
      // Log any errors that occur during save process
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button - Cancel form and return to previous screen */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Form Title */}
        <Text style={styles.formTitle}>
          {recipeToEdit ? "Edit Recipe" : "Add New Recipe"}
        </Text>

        {/* Recipe Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipe Name *</Text>
          <TextInput
            placeholder="Enter recipe name"
            value={recipeName}
            onChangeText={setRecipeName}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        {/* Image URL Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image URL *</Text>
          <TextInput
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
          />
        </View>
        
        {/* Image Preview with responsive sizing */}
        {imageUrl ? (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.imagePreview}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderIcon}>🖼️</Text>
            <Text style={styles.placeholderText}>Image preview will appear here</Text>
          </View>
        )}
        
        {/* Ingredients Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingredients List *</Text>
          <Text style={styles.helperText}>
            Separate each ingredient with semicolon (;)
          </Text>
          <TextInput
            placeholder="Example: 2 cups flour; 1 egg; 1 tsp salt; 200ml milk"
            value={ingredients}
            onChangeText={setIngredients}
            multiline={true}
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        {/* Instructions Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Step-by-Step Instructions *</Text>
          <TextInput
            placeholder="Enter detailed cooking instructions..."
            value={instructions}
            onChangeText={setInstructions}
            multiline={true}
            numberOfLines={6}
            style={[styles.input, styles.textArea]}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        {/* Save Button */}
        <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            {recipeToEdit ? "Update Recipe" : "Save Recipe"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * Styles for Recipe Form
 * Modern, clean form layout with proper spacing and visual hierarchy
 */
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  // Scroll content padding
  scrollContent: {
    padding: wp(4),
    paddingBottom: hp(4),
  },
  // Back button at top left
  backButton: {
    marginBottom: hp(1),
    marginTop: hp(1),
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
    fontWeight: "600",
  },
  // Form title (Add/Edit Recipe)
  formTitle: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: hp(3),
    textAlign: "center",
  },
  // Container for each input field
  inputContainer: {
    marginBottom: hp(2.5),
  },
  // Label for input fields
  label: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#374151",
    marginBottom: hp(0.8),
  },
  // Helper text below label
  helperText: {
    fontSize: hp(1.6),
    color: "#6B7280",
    marginBottom: hp(0.8),
    fontStyle: "italic",
  },
  // Text input field styling
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: wp(3.5),
    fontSize: hp(1.9),
    color: "#111827",
  },
  // Multiline text area
  textArea: {
    height: hp(15),
    textAlignVertical: "top",
    paddingTop: hp(1.5),
  },
  // Image preview container with max width
  imagePreviewContainer: {
    width: "100%",
    maxHeight: hp(30),
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: hp(2),
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
  },
  // Preview image with contain mode
  imagePreview: {
    width: "100%",
    height: hp(30),
  },
  // Placeholder for empty image
  imagePlaceholder: {
    height: hp(25),
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2),
  },
  placeholderIcon: {
    fontSize: hp(6),
    marginBottom: hp(1),
  },
  placeholderText: {
    fontSize: hp(1.8),
    color: "#6B7280",
    textAlign: "center",
  },
  // Save button styling with blue background
  saveButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(2),
    alignItems: "center",
    borderRadius: 12,
    marginTop: hp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Save button text (white, bold)
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: hp(2.2),
  },
});
