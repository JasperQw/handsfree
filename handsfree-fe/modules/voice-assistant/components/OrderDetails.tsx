import { IOrderDetails } from "../../driver/types/order-details-types";
import { Entypo, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const { width } = Dimensions.get("window");

interface OrderDetailsProps {
  orderDetails: IOrderDetails;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderDetails }) => {
  const {
    name,
    pickUpAddress,
    pickUpLocation,
    dropOffAddress,
    dropOffLocation,
    paymentAmount,
    paymentMethod,
    phone,
  } = orderDetails;
  return (
    <View className="absolute bottom-32 mx-5 bg-white rounded-xl left-0 right-0">
      {/* Close Button */}

      {/* Customer Name and Phone Number */}
      <View
        className="bg-white"
        style={[styles.customerContainer, { justifyContent: "space-between" }]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Icon icon="account" size={40} style={styles.avatarIcon} />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.customerName}>{name}</Text>
            <Text style={styles.customerPhoneNumber}>{phone}</Text>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            
          }}
        >
          <Entypo name="cross" size={30} color="red" />
        </TouchableOpacity> */}
      </View>

      {/* Pickup/ Dropoff Location and Address */}
      <View style={styles.locationBox}>
        {/* Pickup Location */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 18,
              height: 18,
              backgroundColor: "#4285F4",
              borderRadius: 20,
            }}
          >
            <Entypo name="triangle-down" size={12} color="white" />
          </View>
          <View>
            <Text style={styles.customerName}>{pickUpLocation}</Text>
            <Text
              style={[
                styles.customerPhoneNumber,
                { fontWeight: "500", color: "#979797", maxWidth: width * 0.5 },
              ]}
            >
              {pickUpAddress}
            </Text>
          </View>
        </View>

        {/* Dropoff Location */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 18,
              height: 18,
              backgroundColor: "transparent",
              borderRadius: 20,
            }}
          >
            <FontAwesome6 name="location-dot" size={16} color="#E95F5F" />
          </View>
          <View>
            <Text style={styles.customerName}>{dropOffLocation}</Text>
            <Text
              style={[
                styles.customerPhoneNumber,
                { fontWeight: "500", color: "#979797", maxWidth: width * 0.5 },
              ]}
            >
              {dropOffAddress}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.paymentBox}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <MaterialIcons name="payment" size={16} color="#D3E1F1" />
          <Text style={styles.customerName}>{paymentMethod}</Text>
        </View>

        <Text style={styles.customerName}>{paymentAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: width * 0.95,
    maxWidth: width * 0.77,
    marginBottom: 10,
  },
  avatarIcon: {
    marginRight: 10,
    backgroundColor: "#E8E8E8",
  },
  customerName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  customerPhoneNumber: {
    fontWeight: "500",
    fontSize: 12,
    color: "#B7BABF",
  },
  locationBox: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: width * 0.95,
    maxWidth: width * 0.77,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#F7F9FC",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default OrderDetails;
