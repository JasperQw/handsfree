import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native"; // Removed StyleSheet import

interface PopUpMenuProps {
  onClose: () => void;
}

const PopUpMenu: React.FC<PopUpMenuProps> = ({ onClose }) => {
  const router = useRouter();

  return (
    <View className="absolute left-5 bottom-28 w-52 bg-white z-10 rounded-xl elevation-5 shadow-md shadow-black px-5 py-1">
      <TouchableOpacity
        onPress={() => {
          router.push("/driver/client-chat");
          onClose();
        }}
        className="flex-row items-center py-2.5 px-1"
      >
        <Text className="text-sm leading-6 font-semibold text-black">
          Customer Chat
        </Text>
      </TouchableOpacity>
      <View className="border-b border-gray-200" />

      {/* for the on press of the order details place it into the OnPress function to make it visible */}
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}
        className="flex-row items-center py-2.5 px-1"
      >
        <Text className="text-sm leading-6 font-semibold text-black">
          Order details
        </Text>
      </TouchableOpacity>
      <View className="border-b border-gray-200" />

      <TouchableOpacity
        onPress={() => {
          //   toggleRouteClarification();
          onClose();
        }}
        className="flex-row items-center py-2.5 px-1"
      >
        <Text className="text-sm leading-6 font-semibold text-black">
          Route clarification
        </Text>
      </TouchableOpacity>
      <View className="border-b border-gray-200" />

      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
          onClose();
        }}
        className="flex-row items-center py-2.5 px-1"
      >
        <Text className="text-sm leading-6 font-semibold text-black">Home</Text>
      </TouchableOpacity>
      <View className="border-b border-gray-200" />

      <TouchableOpacity
        onPress={() => {
          router.push("/driver/driver-setting");
          onClose();
        }}
        className="flex-row items-center py-2.5 px-1"
      >
        <Text className="text-sm leading-6 font-semibold text-black">
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PopUpMenu;
