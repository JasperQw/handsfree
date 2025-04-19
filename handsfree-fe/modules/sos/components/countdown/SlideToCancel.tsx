import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SLIDE_WIDTH = 260;
const CIRCLE_SIZE = 56;
const THUMB_OFFSET = 2;
const TEXT_CENTER = SLIDE_WIDTH / 2;

interface SlideToCancelProps {
  handleCancel: () => void;
  onSlideProgress?: (progress: number) => void;
}

const SlideToCancel: React.FC<SlideToCancelProps> = ({
  handleCancel,
  onSlideProgress,
}) => {
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = Math.min(
        Math.max(THUMB_OFFSET, event.translationX + THUMB_OFFSET),
        SLIDE_WIDTH - CIRCLE_SIZE
      );
      if (onSlideProgress) {
        const progress =
          (translateX.value - THUMB_OFFSET) /
          (SLIDE_WIDTH - CIRCLE_SIZE - THUMB_OFFSET);
        // Use runOnJS to call the state update function
        runOnJS(onSlideProgress)(Math.min(Math.max(progress, 0), 1));
      }
    },
    onEnd: () => {
      if (translateX.value > SLIDE_WIDTH - CIRCLE_SIZE - 10) {
        translateX.value = withSpring(THUMB_OFFSET);
        // Use runOnJS to call the navigation/cancel function
        runOnJS(handleCancel)();
      } else {
        translateX.value = withSpring(THUMB_OFFSET);
        // Reset progress if not cancelled
        if (onSlideProgress) {
          runOnJS(onSlideProgress)(0);
        }
      }
    },
  });

  const trackStyle = useAnimatedStyle(() => ({
    width: SLIDE_WIDTH - translateX.value,
    left: translateX.value,
  }));

  const textFadeStyle = useAnimatedStyle(() => ({
    opacity: translateX.value + CIRCLE_SIZE >= TEXT_CENTER ? 0 : 1,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView className="items-center justify-center mt-5 ">
      <View className="w-[260px] h-[56px] justify-center">
        <Animated.View
          className="absolute h-full bg-gray-300 rounded-full"
          style={trackStyle}
        />

        <Animated.View
          className="absolute w-full h-full justify-center items-center pl-[30px]"
          style={textFadeStyle}
        >
          <Text className="text-gray-500 text-base font-medium">
            Slide To Cancel {">>>"}
          </Text>
        </Animated.View>

        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            className="w-14 h-14 bg-white rounded-full justify-center items-center absolute left-[2px] shadow-md shadow-black"
            style={thumbStyle}
          >
            <AntDesign name="right" size={24} color="black" />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default SlideToCancel;
