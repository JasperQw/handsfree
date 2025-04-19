import Background from "../../common/components/Background";
import InfoCard from "../../modules/sos/components/crash-report/InfoCard";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CrashReportPage() {
  const router = useRouter();

  return (
    <>
      <Background>
        <ScrollView className="flex-1 px-5 pt-4 bg-white">
          <View className="items-center my-2">
            <Image
              source={require("../../assets/images/crash_icon.png")}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
            />
          </View>

          {/* Time & Location */}
          <View className="flex-row items-center justify-center mb-2">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="ml-2 text-[#6B7280] text-sm">
              8:05 am, 28 Feb 2025
            </Text>
          </View>
          <View className="flex-row items-center justify-center mb-2">
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            {/* Kept multiline text structure */}
            <Text className="ml-2 text-[#6B7280] text-sm">
              Jln Profesor Diraja Ungku Aziz{"\n"}Petaling Jaya, Selangor
            </Text>
          </View>

          {/* Condition Boxes */}
          <View className="flex-row justify-between mb-4">
            <View className="bg-gray-100 w-[48%] p-4 rounded-xl items-center">
              <Image
                source={require("../../assets/images/traffic_condition.png")}
                className="w-[47px] h-[47px]"
              />
              <Text className="mt-2 text-sm text-gray-500 text-center">
                Traffic Condition
              </Text>
            </View>

            <View className="bg-gray-100 w-[48%] p-4 rounded-xl items-center">
              <MaterialIcons name="bolt" size={30} color="red" />
              <Text className="mt-2 text-sm font-semibold text-red-600 text-center">
                High
              </Text>
              <Text className="mt-2 text-sm text-gray-500 text-center">
                Estimated Severity
              </Text>
            </View>
          </View>

          {/* Last 1 Min Data */}
          <View className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-2 text-base font-semibold text-gray-700">
              Last 1 min
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>
          <View className="flex-row flex-wrap justify-between">
            <InfoCard
              label="Car Plate"
              value="EMAS 69"
              valueClassName="text-red-600"
            />
            <InfoCard label="Speed" value="55 km/h" />
            <InfoCard label="Weather" value="32° ☁️" />
            <InfoCard label="Road Type" value="Highway" />
          </View>

          {/* Map View */}
          <View className="mt-6 items-center mb-5">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Impact Location
            </Text>
            <Image
              source={require("../../assets/images/crash_location.png")}
              className="w-full h-[200px] rounded-xl"
              resizeMode="cover"
            />
          </View>

          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.push("/")} // Navigate back to the home screen
            className="bg-emerald-500 w-1/2 py-4 rounded-xl mb-[30px] mx-auto"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Back to Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Background>
    </>
  );
}
