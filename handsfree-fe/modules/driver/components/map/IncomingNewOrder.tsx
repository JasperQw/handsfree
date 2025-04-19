import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useDriverOrderStore from "../../stores/driver-order-store";

const IncomingNewOrder = () => {
  const removeNewOrder = useDriverOrderStore((state) => state.removeNewOrder);
  return (
    <View className="absolute top-[30px] left-0 right-0 px-10">
      <View className="bg-white flex-1 p-6 gap-10 w-full rounded-t-[10px]">
        <View>
          <Text className="md:text-3xl sm: text-xl font-bold">
            New Order Received
          </Text>
          <Text className="md:text-base sm:text-sm text-[#979797] mb-3">
            Say 'Accept' to accept or 'Reject' to reject
          </Text>
          <View className="flex-row gap-2 items-center mb-2">
            <Ionicons
              name="caret-down-circle-sharp"
              size={24}
              color={"#4285F4"}
            />
            <Text className="md:text-xl sm:text-base">
              Restaurant Nasi Kandar, Resident Kerinchi
            </Text>
          </View>

          <View className="flex-row gap-2 items-center">
            <Ionicons name="location-sharp" size={24} color={"#E95F5F"} />
            <Text className="md:text-xl sm:text-base">
              Kolej Kediaman Ketujuh, Universiti Malaya
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2 items-center">
          <MaterialIcons name="payment" size={24} color="#D3E1F1" />
          <View className="flex-row justify-between flex-1">
            <Text className="md:text-xl sm:text-base font-bold">Cash</Text>
            <Text className="md:text-xl sm:text-base font-bold">RM 12.00</Text>
          </View>
        </View>
      </View>
      <View className="w-full h-[60px] bg-red-300 rounded-b-[10px] flex-row overflow-hidden">
        <TouchableHighlight
          onPress={removeNewOrder}
          className="flex-1 bg-red-400"
        >
          <View className="flex-1 bg-red-400 justify-center items-center">
            <Text className="font-bold text-xl">Reject</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={removeNewOrder} className="flex-1">
          <View className="flex-1 bg-green-400 justify-center items-center">
            <Text className="font-bold text-xl">Accept</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default IncomingNewOrder;
