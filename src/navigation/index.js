/**
 * NAVIGATION INDEX - App Navigation Configuration
 * This file sets up all the routes and screens in our app.
 * It's like a map that tells the app which screen to show and when.
 */

import * as React from "react";

// NavigationContainer wraps our entire navigation structure
import { NavigationContainer } from "@react-navigation/native";

// Stack Navigator allows screens to stack on top of each other (like cards)
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all screen components that users can navigate to
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyRecipeScreen from "../screens/MyRecipeScreen";
import CustomRecipesScreen from "../screens/CustomRecipesScreen";
import RecipesFormScreen from "../screens/RecipesFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

// Create Stack Navigator instance for managing screen transitions
const Stack = createNativeStackNavigator();

/**
 * AppNavigation - Main Navigation Component
 * Defines all available screens and navigation behavior
 */
function AppNavigation() {
  return (
    // Container manages navigation state and linking
    <NavigationContainer>
      {/* 
        Stack Navigator Configuration:
        - initialRouteName: First screen shown when app launches
        - headerShown: false hides the default header on all screens
      */}
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        {/* Define all navigable screens with unique names */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="MyFood" component={MyRecipeScreen} />
        <Stack.Screen 
          name="CustomRecipesScreen" 
          component={CustomRecipesScreen} 
        />
        <Stack.Screen 
          name="RecipesFormScreen" 
          component={RecipesFormScreen} 
        />
        <Stack.Screen 
          name="FavoriteScreen" 
          component={FavoriteScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
