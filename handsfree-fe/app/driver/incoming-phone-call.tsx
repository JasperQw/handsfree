import Background from "../../common/components/Background";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

const IncomingPhoneCallPage = () => {
  const [isActionMade, setIsActionMade] = useState(false);
  const router = useRouter();

  const acceptCall = () => {
    setIsActionMade(true);
    router.replace("/driver/phone-call");
  };

  const endCall = () => {
    setIsActionMade(true);
    router.dismiss();
  };

  return (
    <Background>
      <View className="flex-1 items-center">
        <Text className="mt-32 text-3xl font-semibold text-center">Ming</Text>

        <Avatar.Image
          source={require("../../assets/images/passenger_profile_pic.png")}
          size={120}
          className="mt-5 w-32 h-32 rounded-full"
        />

        {/* End Call Button */}
        <View className="absolute bottom-[50px] flex-row left-0 right-0 justify-evenly">
          <View>
            <TouchableOpacity
              className={`border-8 border-gray-300 rounded-lg p-4 ${isActionMade ? "bg-gray-400" : "bg-green-600"}`}
              onPress={acceptCall}
              disabled={isActionMade}
            >
              <MaterialIcons name="call" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              className={`border-8 border-gray-300 rounded-lg p-4 ${isActionMade ? "bg-gray-400" : "bg-red-600"}`}
              onPress={endCall}
              disabled={isActionMade}
            >
              <MaterialIcons name="call-end" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default IncomingPhoneCallPage;
