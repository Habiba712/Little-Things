import * as Device from 'expo-device';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

import { Fonts } from '@/constants/theme';

export default function HomeScreen() {
    const now = new Date();
    const ref = useRef<View>(null);
    const [showDeleteOption, setShowDeleteOption] = useState<number | null>(null);
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const month = now.toLocaleString('en-US', { month: 'long' });
  const dayNumber = now.getDate();
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [journalItems, setJournalItems] = useState<any[]>([]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };
  const onDelete = async (item: any) => {
    const journalItems = await SecureStore.getItemAsync('journal-entry');
    if(journalItems){
      const journalItemsArray = JSON.parse(journalItems);
      const newArray = journalItemsArray.filter((journalItem: any) => journalItem.genericDate !== item.genericDate);
      await SecureStore.setItemAsync('journal-entry', JSON.stringify(newArray));
    }
    loadData();
  };
  const loadData = async () => {
      const name = await SecureStore.getItemAsync('name');
      setName(name);

      const value = await SecureStore.getItemAsync('journal-entry');
      console.log('value', value);

      if (value) {
        setJournalItems(JSON.parse(value));
      }
      setRefreshing(false);
    }

  useFocusEffect(
  useCallback(() => {
    
    loadData();
  }, [])
);

 
  return (
 <SafeAreaView style={styles.container}  edges={['top']}>
  <ScrollView 
  contentContainerStyle={styles.scrollContent}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#413023"
     />
  }
  >
 <Text style={styles.greeting}>Hey there, {name ? name : ''}</Text>
   
    <Text>{day}, {month} {dayNumber}</Text>
    <View style={styles.entriesContainer}>
         {
         journalItems.length > 0 ?
         journalItems
         .sort((a, b) => new Date(b.genericDate).getTime() - new Date(a.genericDate).getTime())
         .map((item, index) => (
      <View key={index} style={styles.entryContainer}>
        {
          showDeleteOption !== index ?   <Pressable style={styles.closeButton} onPress={() => setShowDeleteOption(index)}>
         <Ionicons name="close" size={24} color="#5f5e5e"
          />

        </Pressable>
        :
        <View style={styles.closeButton} >
          <Pressable style={styles.delButton} onPress={() => {
            onDelete(item);
            setShowDeleteOption(null)}}>
            <Text >Delete</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => setShowDeleteOption(null)}>
            <Text >Cancel</Text>
          </Pressable>
          </View>
        }
      
         
        <View style={styles.iconContainer}>
          <Image source={item.catIcon } style={{ width: 35, height: 35 }} />
          </View>
          <View>
              <Text style={styles.entryName}>{item.name}</Text>
        <Text style={styles.entryDetails}>{item.details}</Text>
        <Text   style={styles.entryNote}>{item.note}</Text>
      
            </View>

      </View>
    ))
   :
    <Text style={styles.noEntries}>No entries yet</Text>
  }
   
    </View>

  </ScrollView>
  
 </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
},

scrollContent: {
  paddingHorizontal: 18,
  paddingTop: 8,
  paddingBottom: 30,

},
  greeting: {
    width: '100%',
    fontSize: 24,
    fontFamily: Fonts.handBold,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',   
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  delButton:{
    borderWidth: 1,
    borderColor: '#9f0707e1',
    padding: 3,
    borderRadius: 10,
    backgroundColor: '#e2b38f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  cancelButton:{
    borderWidth: 1,
    borderColor: '#7c7272e1',
    padding: Spacing.one,
    borderRadius: 10,
    backgroundColor: '#e2b38f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  noEntries:{
    fontSize: 13,
    fontWeight: 500,
    color: '#585757',
    textAlign: 'center',
    paddingVertical: Spacing.two,
  }
});

