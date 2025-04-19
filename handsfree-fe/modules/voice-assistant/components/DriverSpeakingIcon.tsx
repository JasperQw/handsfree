import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const DriverSpeakingIcon = ({}) => {
  return (
    <TouchableOpacity className="items-center justify-center w-[60px] h-[60px] bg-white rounded-[40px] overflow-hidden border-[#4285F4] border-2 ml-2.5">
      <LottieView
        source={require("../../../assets/lottie/soundwave.json")}
        loop={true}
        autoPlay={true}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default DriverSpeakingIcon;

const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
  },
});
