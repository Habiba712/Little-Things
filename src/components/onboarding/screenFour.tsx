
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';


const {width} = Dimensions.get('window');

export default function ScreenFour() {

    const [name, setName] = useState<string | null>(null);
    const handleOnboarding = async () => {
        console.log(name);
        await SecureStore.setItemAsync('name', name || '');
        // await SecureStore.setItemAsync('onboarded', 'true');
        router.replace('/tabs');
    };
   
  return (
    <View style={styles.listScreen}>
      <Text style={styles.itemTitle}>One more thing</Text>
      <Text style={styles.itemSubtitle}>
      Your Name
        </Text>
        <TextInput style={{borderWidth: 1, borderColor: '#bf9371', padding: 10, borderRadius: 5, marginTop: 20, width: '80%'}} placeholder="Your Name"
        onChangeText={(text) => setName(text)}
        />
       <Pressable onPress={handleOnboarding} style={{backgroundColor: '#000000', padding: 10, borderRadius: 5, marginTop: 20}}>
        <Text style={{color: '#e2b38f', fontSize: 14}}>Save</Text>
       </Pressable>
    </View>
  );
}
const styles = StyleSheet.create(
    {
listScreen:{
    width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemSubtitle:{
    fontSize: 14,
  }
  });