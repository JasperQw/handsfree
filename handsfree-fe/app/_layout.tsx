import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import useDriverSettingStore from "../modules/driver/stores/driver-setting-store";
import VoiceAssistantOverlay from "../modules/voice-assistant/components/VoiceAssistantOverlay";
import useChatStore from "../modules/driver/stores/chat-store";
import { getChatHistoryAPI } from "../modules/driver/api/driver-api";
import OrderDetails from "../modules/voice-assistant/components/OrderDetails";
import useAIAssistantStore from "../modules/voice-assistant/stores/ai-assistant-store";
import useWebSocket from "../modules/websocket/hooks/useWebSocket";
import useVoiceAssistant from "../modules/voice-assistant/hooks/useVoiceAssistant";
import useShakingDetect from "../modules/sos/hooks/useShakingDetect";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useWebSocket();
  useVoiceAssistant();
  useShakingDetect();
  const isAIAssistantEnabled = useDriverSettingStore(
    (state) => state.isAIAssistantEnabled
  );

  const setMessages = useChatStore((state) => state.setChatMessages);
  const orderDetails = useAIAssistantStore((state) => state.orderDetails);

  const getChatHistory = async () => {
    try {
      const data = await getChatHistoryAPI();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="driver" options={{ headerShown: false }} />

        <Stack.Screen name="sos" options={{ headerShown: false }} />
      </Stack>
      {isAIAssistantEnabled && <VoiceAssistantOverlay />}

      {orderDetails && <OrderDetails orderDetails={orderDetails} />}
    </PaperProvider>
  );
};

export default RootLayout;
