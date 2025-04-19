import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

const AssistantIcon = () => {
  return (
    <View className="items-center justify-center w-[60px] h-[60px] bg-[#416732] rounded-[40px] ml-2.5">
      <LottieView
        source={require("../../../assets/lottie/robot_talking.json")}
        loop={true}
        autoPlay={true}
        style={styles.icon}
      />
    </View>
  );
};

export default AssistantIcon;

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: "125%",
    height: "125%",
  },
});
