import DirectionAlert from "../../modules/driver/components/map/DirectionAlert";
import DrivingBottom from "../../modules/driver/components/map/DrivingBottom";
import FloodAlert from "../../modules/driver/components/map/FloodAlert";
import PopUpMenu from "../../modules/driver/components/map/PopUpMenu";

import useAIAssistantStore from "../../modules/voice-assistant/stores/ai-assistant-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IncomingNewOrder from "../../modules/driver/components/map/IncomingNewOrder";
import useDriverOrderStore from "../../modules/driver/stores/driver-order-store";

const DriverPage = () => {
  const router = useRouter();
  const isShowRouteClarification = useAIAssistantStore(
    (state) => state.isRouteClarificationShow
  );

  const isNewOrderShow = useDriverOrderStore((state) => state.isNewOrderShow);

  const [showPopUpMenu, setShowPopUpMenu] = useState(false);

  const handleMenuPress = () => {
    setShowPopUpMenu((prev) => !prev);
  };
  return (
    <SafeAreaView className="flex-1">
      <Image
        source={require("../../assets/images/flood_bg.png")}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />

      {/* Direction Alert */}
      {!isNewOrderShow && (
        <View className="absolute top-[30px] left-0 right-0">
          {isShowRouteClarification === false && <DirectionAlert />}
          {isShowRouteClarification === true && <FloodAlert />}
        </View>
      )}

      {isNewOrderShow && <IncomingNewOrder />}

      {showPopUpMenu && <PopUpMenu onClose={handleMenuPress} />}

      <View className="absolute bottom-0 w-full z-10">
        <DrivingBottom
          onMenuPress={handleMenuPress}
          onShieldAlert={() => router.push("/sos?self=true")}
        />
      </View>
    </SafeAreaView>
  );
};

export default DriverPage;
