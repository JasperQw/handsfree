import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="alert-sent"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manual-alert-sent"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sos-safe"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="crash-report"
        options={{
          title: "Hypothetical Crash Report",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  headerTitleStyle: {
    color: "black",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Layout;
