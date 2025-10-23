/**
 * WELCOME SCREEN - App Splash/Landing Page
 * First screen users see when opening the app.
 * Features animated logo with expanding rings and auto-navigation to home.
 */

// Core React Native components
import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";

// Expo StatusBar for controlling status bar appearance
import { StatusBar } from "expo-status-bar";

// Responsive sizing utilities
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Animation library for smooth effects
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

// Navigation hook for screen transitions
import { useNavigation } from "@react-navigation/native";

/**
 * WelcomeScreen Component
 * Displays animated welcome splash screen
 */
export default function WelcomeScreen() {
  // Shared values for animating ring expansions (controlled by Reanimated)
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  // Get navigation object
  const navigation = useNavigation();

  /**
   * useEffect - Runs on component mount
   * Animates rings and auto-navigates to Home screen
   */
  useEffect(() => {
    // Reset ring paddings to 0
    ring1padding.value = 0;
    ring2padding.value = 0;
    
    // Animate first ring expansion after 100ms
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    
    // Animate second ring expansion after 300ms (slightly delayed)
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    // Navigate to Home screen after 2.5 seconds
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []); // Empty dependency array = runs once on mount

  return (
    <View style={styles.container}>
      {/* Light status bar for better visibility on amber background */}
      <StatusBar style="light" />

      {/* 
        Animated Logo with Expanding Rings
        Outer ring (ring2) expands first, then inner ring (ring1)
      */}
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        <Animated.View style={[styles.ring, { padding: ring1padding }]}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2024/08/29/02/47/italian-9005494_1280.png'
            }}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* App Title and Tagline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

/**
 * Styles for Welcome Screen
 * Centered layout with amber background
 */
const styles = StyleSheet.create({
  // Full screen centered container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24", // Warm amber color
  },
  // Circular ring with semi-transparent white background
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999, // Creates perfect circle
  },
  // Logo image sizing (responsive)
  logo: {
    width: hp(20),
    height: hp(20),
  },
  // Container for title and subtitle
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  // Large bold title
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3, // Spaced out letters for elegance
  },
  // Smaller subtitle text
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
});
