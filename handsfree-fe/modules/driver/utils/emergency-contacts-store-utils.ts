import { EmergencyContact } from "../types/setting-types";
import * as SecureStore from "expo-secure-store";

const EMERGENCY_CONTACTS_KEY = "emergencyContacts";

// Save emergency contacts to SecureStore
export const saveEmergencyContacts = async (contacts: EmergencyContact[]) => {
  try {
    const jsonValue = JSON.stringify(contacts);
    await SecureStore.setItemAsync(EMERGENCY_CONTACTS_KEY, jsonValue);
  } catch (e) {
    console.error("❌ Error saving emergency contacts:", e);
  }
};

// Retrieve emergency contacts from SecureStore
export const getEmergencyContacts = async (): Promise<EmergencyContact[]> => {
  try {
    const jsonValue = await SecureStore.getItemAsync(EMERGENCY_CONTACTS_KEY);
    const parsed = jsonValue != null ? JSON.parse(jsonValue) : [];
    return parsed;
  } catch (e) {
    console.error("❌ Error retrieving emergency contacts:", e);
    return [];
  }
};

// Delete emergency contacts from SecureStore
export const deleteEmergencyContacts = async (index: number) => {
  try {
    await SecureStore.deleteItemAsync(EMERGENCY_CONTACTS_KEY);
  } catch (e) {
    console.error("❌ Error deleting emergency contacts:", e);
  }
};
