import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";

interface NewEmergencyTextButtonProps {
  onPress: () => void;
}

const NewEmergencyTextButton: FC<NewEmergencyTextButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className="text-base font-medium text-[#4B8DF8] mt-5">
        + Add New Emergency Contact
      </Text>
    </TouchableOpacity>
  );
};

export default NewEmergencyTextButton;
