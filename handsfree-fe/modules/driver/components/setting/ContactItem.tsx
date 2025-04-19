import { EmergencyContact } from "../../types/setting-types";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

interface ContactItemProps {
  item: EmergencyContact;
  index: number;
  onDelete: (index: number) => void;
}

const ContactItem: FC<ContactItemProps> = ({ item, index, onDelete }) => {
  const router = useRouter();

  return (
    <View className="bg-white rounded-[5px] p-[15px] mb-2.5 flex-row justify-between items-center">
      <View className="flex-row max-w-[80%]">
        <Avatar.Icon
          size={40}
          icon="account"
          style={{ backgroundColor: "#E8E8E8" }}
        />
        <View className="ml-2.5 flex-col">
          <Text className="text-base font-medium text-black">{item.name}</Text>
          <Text className="text-sm text-[#6A6A6A]">{item.phone}</Text>
        </View>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => {
            router.push("/driver/emergency-call");
          }}
        >
          <Entypo name="phone" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-2.5" onPress={() => onDelete(index)}>
          <AntDesign name="delete" size={24} color="#FF3D00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactItem;
