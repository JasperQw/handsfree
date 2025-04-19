import { useRouter } from "expo-router";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OfflineBanner from "../modules/home/components/OfflineBanner";
import SettingButton from "../modules/home/components/SettingButton";
import DriverProfile from "../modules/home/components/DriverProfile";
import OnlineButton from "../modules/home/components/OnlineButton";

const HomeScreen = () => {
  const router = useRouter();

  const navigateToDriver = () => {
    router.push("/driver");
  };

  const navigateToDriverSetting = () => {
    router.push("/driver/driver-setting");
  };

  return (
    <SafeAreaView className="flex-1">
      <Image
        source={require("../assets/images/home_page_map.png")}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute top-[50px] right-5 gap-10">
        <DriverProfile />
        <SettingButton onPress={navigateToDriverSetting} />
      </View>

      <View className="absolute bottom-12 w-full items-center px-10">
        <View className="space-y-3 items-center">
          <OnlineButton onPress={navigateToDriver} />
          <View className="h-6" />
          <OfflineBanner />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
