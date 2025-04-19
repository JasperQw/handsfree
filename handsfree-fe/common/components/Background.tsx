import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface BackgroundProps {
  children: ReactNode;
  colors?: [string, string];
}

const Background: React.FC<BackgroundProps> = ({ children, colors }) => {
  return (
    <LinearGradient
      colors={colors || ["#E5EBF0", "#ffffff"]} // Default colors if none are provided
      start={{ x: 0, y: 1 }} // Start at the top right corner
      end={{ x: 1, y: 0 }} // End at the bottom left corner
      style={styles.background} // Apply styles to the gradient
    >
      <SafeAreaView style={styles.background}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Background;
