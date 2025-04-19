import { Stack, Tabs } from "expo-router";
import React from "react";

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
        name="client-chat"
        options={{
          title: "Chat",
        }}
      />
      <Stack.Screen
        name="driver-setting"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="emergency-call"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="phone-call"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="incoming-phone-call"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
