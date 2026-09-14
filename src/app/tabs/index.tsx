import * as Device from 'expo-device';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';


import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';



export default function HomeScreen() {
    const now = new Date();
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const month = now.toLocaleString('en-US', { month: 'long' });
  const dayNumber = now.getDate();
  const [name, setName] = useState<string | null>(null);
  const [journalItems, setJournalItems] = useState<any[]>([]);
  useFocusEffect(
  useCallback(() => {
    async function loadData() {
      const name = await SecureStore.getItemAsync('name');
      setName(name);

      const value = await SecureStore.getItemAsync('journal-entry');

      if (value) {
        setJournalItems(JSON.parse(value));
      }
    }

    loadData();
  }, [])
);

 
  return (
 <View style={styles.container}>
   <Text style={styles.greeting}>Hey there, {name ? name : ''}</Text>
   <View >
    <Text>{day}, {month} {dayNumber}</Text>
    <View style={styles.entriesContainer}>
         {journalItems.map((item, index) => (
      <View key={index} style={styles.entryContainer}>
        <Pressable style={styles.closeButton} onPress={() => console.log('close')}>
         <Ionicons name="close" size={24} color="#5f5e5e"
          style={styles.closeIcon} 
          />

        </Pressable>
         
        <View style={styles.iconContainer}>
          <Image source={item.catIcon} style={{ width: 35, height: 35 }} />
          </View>
          <View>
              <Text style={styles.entryName}>{item.name}</Text>
        <Text style={styles.entryDetails}>{item.details}</Text>
        <Text   style={styles.entryNote}>{item.note}</Text>
            </View>

      </View>
    ))}
    </View>

   </View>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
    width: '100%',
    paddingHorizontal: Spacing.four,
  },
  greeting: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#413023',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',

  },
   entriesContainer: {
   paddingVertical: Spacing.two,
    gap: Spacing.three,


  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  entryContainer: {
    gap: Spacing.one,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderWidth:1,
    borderColor: '#c2936f',
    backgroundColor: '#e2b38f',
    borderRadius: 10,
  },
  entryName: {
    fontSize: 13,
    fontWeight: 800
  },
  entryDetails:{
    fontSize: 11.5,
    fontWeight: 400
  },
  entryNote:{
    fontSize: 11.5,
    fontWeight: 400,
    color: '#5f3b21',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  closeButton:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeIcon:{
    color: '#8f8080e1',
  
  }
});

