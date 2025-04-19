import { routeClarificationItems } from "../data/route-clarification-data";
import { RouteClarificationItem } from "../../driver/types/route-clarification-types";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const RouteClarification = () => {
  return (
    <View style={styles.container} className="">
      <View style={styles.header}>
        <Text style={styles.title}>Route Clarification</Text>
        <TouchableOpacity
          onPress={() => {
            // toggleRouteClarification();
          }}
          style={styles.closeButton}
        >
          <Entypo name="cross" size={30} color="red" />
        </TouchableOpacity>
      </View>

      {routeClarificationItems.map((item, index) => (
        <RouteItem
          key={index}
          locationName={item.locationName}
          action={item.action}
          currentPoint={item.currentPoint}
          finalPoint={item.finalPoint}
        />
      ))}
    </View>
  );
};

const RouteItem = ({
  locationName,
  action,
  currentPoint,
  finalPoint,
}: RouteClarificationItem) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
      }}
    >
      {currentPoint === true && (
        <View style={[{ backgroundColor: "#4285F4" }, styles.icon]}>
          <Entypo name="triangle-down" size={12} color="white" />
        </View>
      )}

      {finalPoint === true && (
        <View style={styles.icon}>
          <FontAwesome6 name="location-dot" size={16} color="#E95F5F" />
        </View>
      )}

      {!currentPoint && !finalPoint && (
        <View style={styles.icon}>
          <Entypo name="dot-single" size={16} color="black" />
        </View>
      )}

      <View style={{ marginLeft: 10, maxWidth: width * 0.6 }}>
        <Text style={styles.locationName}>
          {locationName}
          {action !== "" && (
            <Text>
              {"\n"}
              <Text style={styles.action}>{action}</Text>
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    maxWidth: width * 0.77,
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 15,
    marginLeft: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 18,
    borderRadius: 20,
    marginTop: 2,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  action: {
    fontSize: 14,
    fontWeight: "400",
    color: "#979797",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  closeButton: {
    marginRight: 5,
    marginBottom: 20,
  },
});

export default RouteClarification;
