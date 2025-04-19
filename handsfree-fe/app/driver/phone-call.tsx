import Background from "../../common/components/Background";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

const PhoneCallPage = () => {
  const [isSpeakerOn, setSpeakerOn] = useState(false);
  const [isWebCamOn, setWebCamOn] = useState(false);
  const [isCallEnded, setCallEnded] = useState(false);
  const router = useRouter();
  const endCall = () => {
    setCallEnded(true);
    router.dismiss();
  };

  const onSpeakerPress = () => {
    const newStatus = !isSpeakerOn;
    setSpeakerOn(newStatus);
  };

  const onWebCamPress = () => {
    const newStatus = !isWebCamOn;
    setWebCamOn(newStatus);
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
        <Text className="mt-10 text-xl">00 : 28</Text>

        {/* Bottom Controls */}
        <View className="absolute bottom-0 w-full h-24 px-10 flex-row justify-between items-center bg-white rounded-t-[50px] shadow-md">
          <TouchableOpacity
            className="border border-gray-300 bg-gray-100 rounded-lg p-3"
            onPress={onSpeakerPress}
          >
            <MaterialIcons
              name={isSpeakerOn ? "volume-up" : "volume-off"}
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-300 bg-gray-100 rounded-lg p-3"
            onPress={onWebCamPress}
          >
            <Ionicons
              name={isWebCamOn ? "videocam" : "videocam-off-outline"}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* End Call Button */}
        <View className="absolute bottom-[50px]">
          <TouchableOpacity
            className={`border-8 border-gray-300 rounded-lg p-4 ${isCallEnded ? "bg-gray-400" : "bg-red-600"}`}
            onPress={endCall}
            disabled={isCallEnded}
          >
            <MaterialIcons name="call-end" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default PhoneCallPage;
