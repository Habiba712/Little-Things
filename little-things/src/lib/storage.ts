import * as SecureStore from 'expo-secure-store';

export const storage = {
  getItem: (key: string) => SecureStore.getItem(key),
  setItem: (key: string, value: string) => SecureStore.setItem(key, value),
  deleteItem: (key: string) => SecureStore.deleteItemAsync(key),
};
