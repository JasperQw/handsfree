import { FC } from "react";
import { Text, View } from "react-native";

interface InfoCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const InfoCard: FC<InfoCardProps> = ({
  label,
  value,
  valueClassName = "text-gray-800",
}) => {
  return (
    <View className="bg-gray-100 w-[48%] p-4 rounded-xl mb-4 items-center">
      <Text className={`text-base font-semibold mb-1 ${valueClassName}`}>
        {value}
      </Text>
      <Text className="text-xs text-gray-500 text-center">{label}</Text>
    </View>
  );
};

export default InfoCard;
