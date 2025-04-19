import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ManualAlertSentScreen = () => {
  const router = useRouter();

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white px-5">
        <View className="w-[250px] h-[250px] rounded-full bg-white/10 justify-center items-center mb-6">
          <Image
            source={require("../../assets/images/alert_sent_avatar.png")}
            className="w-[220px] h-[220px]"
            resizeMode="contain"
          />
        </View>

        <Text className="text-2xl font-semibold text-center mb-2">
          Alert Sent to Grab Central
        </Text>
        <Text className="text-lg text-center text-gray-500 mb-10">
          Grab Central has been notified of your potential emergency and is
          aware of your situation.
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.replace("/");
          }}
          className="bg-red-500 w-full py-4 rounded-xl mt-10 px-5"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ManualAlertSentScreen;
