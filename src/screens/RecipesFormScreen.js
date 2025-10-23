/**
 * RECIPES FORM SCREEN - Add/Edit Recipe Form
 * Form interface for creating new recipes or editing existing ones.
 * Collects title, image URL, and description from the user.
 */

// Core React Native components
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
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
  const [title, setTitle] = useState(
    recipeToEdit ? recipeToEdit.title : ""
  );
  const [image, setImage] = useState(
    recipeToEdit ? recipeToEdit.image : ""
  );
  const [description, setDescription] = useState(
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
      if (!title.trim() || !image.trim() || !description.trim()) {
        alert('Please fill in all fields');
        return;
      }

      // Create recipe object with form data
      const newrecipe = {
        title: title.trim(),
        image: image.trim(),
        description: description.trim(),
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
    <View style={styles.container}>
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

      {/* Title Input Field */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      
      {/* Image URL Input Field */}
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      
      {/* 
        Image Preview
        Shows image if URL is provided, placeholder if empty
      */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      
      {/* 
        Description Input Field
        Multiline for longer text entry
      */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[
          styles.input, 
          { height: hp(20), textAlignVertical: "top" }
        ]}
      />
      
      {/* Save Button */}
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Styles for Recipe Form
 * Clean, simple form layout with consistent spacing
 */
const styles = StyleSheet.create({
  // Main container with padding
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },
  // Back button at top left
  backButton: {
    marginBottom: hp(1),
    marginTop: hp(1),
  },
  backButtonText: {
    fontSize: hp(2.5),
    color: "#4F75FF",
    fontWeight: "600",
  },
  // Form title (Add/Edit Recipe)
  formTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: hp(2),
    textAlign: "center",
  },
  // Text input field styling
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(0.5),
    marginVertical: hp(1),
  },
  // Preview image styling
  image: {
    width: 300,
    height: 200,
    margin: wp(2),
  },
  // Placeholder text for empty image
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  // Save button styling with blue background
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  // Save button text (white, bold)
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
