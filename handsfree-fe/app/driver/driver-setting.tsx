import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Switch } from "react-native-paper";
import {
  getEmergencyContacts,
  saveEmergencyContacts,
} from "../../modules/driver/utils/emergency-contacts-store-utils";
import { EmergencyContact } from "../../modules/driver/types/setting-types";
import NewEmergencyTextButton from "../../modules/driver/components/setting/NewEmergencyTextButton";
import useDriverSettingStore from "../../modules/driver/stores/driver-setting-store";
import Background from "../../common/components/Background";
import ContactItem from "../../modules/driver/components/setting/ContactItem";

const DriverSettingPage = () => {
  const isAIAssistantEnabled = useDriverSettingStore(
    (state) => state.isAIAssistantEnabled
  );
  const toggleAIAssistantEnable = useDriverSettingStore(
    (state) => state.toggleAIAssistantEnable
  );
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const loadContacts = async () => {
      const storedContacts = await getEmergencyContacts();
      setContacts(storedContacts || []);
    };
    loadContacts();
  }, []);

  const deleteEmergencyContact = async (indexToDelete: number) => {
    const updatedContacts = contacts.filter(
      (_, index) => index !== indexToDelete
    );
    setContacts(updatedContacts);
    await saveEmergencyContacts(updatedContacts);
  };

  const addContact = async () => {
    if (!name || !phone) return;

    const newContact = { name, phone };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    await saveEmergencyContacts(updatedContacts);

    setName("");
    setPhone("");
    setModalVisible(false);
  };

  const toggleAddEmergencyContactModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <Background>
      <View className="flex-1 p-5">
        {/* AI Assistant Toggle */}
        <Text className="text-[15px] font-medium mb-2.5 text-[#6A6A6A]">
          HEX AI Assistant
        </Text>
        <View className="bg-white rounded-[10px] p-[15px] shadow-md flex-row justify-between items-center mb-[30px]">
          <View className="max-w-[80%]">
            <Text className="text-base font-medium text-black">
              Enable HEX AI Assistant
            </Text>
            <Text className="text-xs text-[#6A6A6A] mt-1.5 font-light">
              Enhance your workflow with smart automation and intuitive support.
            </Text>
          </View>
          <Switch
            value={isAIAssistantEnabled}
            onValueChange={toggleAIAssistantEnable}
            color="#4B8DF8"
            trackColor={{ false: "#767577", true: "#4B8DF8" }}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
        </View>

        {/* Emergency Contacts */}
        <Text className="text-[15px] font-medium mb-2.5 text-[#6A6A6A]">
          Emergency Contacts
        </Text>
        <FlatList
          data={contacts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ContactItem
              item={item}
              index={index}
              onDelete={deleteEmergencyContact}
            />
          )}
          ListFooterComponent={() => (
            <NewEmergencyTextButton onPress={toggleAddEmergencyContactModal} />
          )}
        />

        {/* Modal to Add Contact */}
        <Modal transparent visible={isModalVisible} animationType="slide">
          <TouchableWithoutFeedback onPress={toggleAddEmergencyContactModal}>
            <View className="flex-1 bg-black/50 justify-center items-center">
              <TouchableWithoutFeedback>
                <View className="w-[80%] bg-white rounded-[10px] px-5 py-[30px] items-center">
                  <TouchableOpacity
                    onPress={toggleAddEmergencyContactModal}
                    className="absolute top-2.5 right-2.5" // Position adjusted slightly
                  >
                    <AntDesign name="closecircleo" size={24} color="#9A9A9A" />
                  </TouchableOpacity>
                  <Text className="mt-2.5 text-lg font-bold mb-5 text-black">
                    Add Emergency Contact
                  </Text>
                  <TextInput
                    className="text-base font-medium w-full border border-gray-300 rounded-[5px] p-2.5 mb-[15px]"
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                  />
                  <TextInput
                    className="text-base font-medium w-full border border-gray-300 rounded-[5px] p-2.5 mb-[15px]"
                    placeholder="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                  <TouchableOpacity
                    className="bg-[#4B8DF8] p-2.5 rounded-[5px] mb-2.5 w-full items-center"
                    onPress={addContact}
                  >
                    <Text className="text-base text-white font-bold">Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </Background>
  );
};

export default DriverSettingPage;
