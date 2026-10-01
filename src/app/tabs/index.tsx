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
import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';
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
  const [randomTranslate, setRandomTranslate] = useState<string>('');

  const getRandomRotateDegree = () => {
    const randomNumber = Math.floor(Math.random() * 7) - 3;
    return randomNumber;
  }

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
   
    <Text style={styles.date}>{day}, {month} {dayNumber}</Text>
    <View style={styles.entriesContainer}>
      <View style={styles.topSection}>
               <Text style={{
                 color: '#7a65559c',
                 position: 'absolute',
                 top: -12,

               }}>✦✦✦</Text>

         </View>
         {
         journalItems.length > 0 ?
         journalItems
         .sort((a, b) => new Date(b.genericDate).getTime() - new Date(a.genericDate).getTime())
         .map((item, index) => (
      <View key={index} style={[styles.entryContainer, { transform: [{ rotate: `${getRandomRotateDegree()}deg` }] }]} 
      >
        <View style={styles.tape}>
          </View>
        {
          showDeleteOption !== index ?   <Pressable style={styles.closeButton} onPress={() => setShowDeleteOption(index)}>
         <Ionicons name="ellipsis-horizontal" size={24} color="#eccdbc"
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
          {item.catName === 'Coffee' ? (
  <CoffeeIcon width={30} height={30} />
) : item.catName === 'Books' ? (
  <BookIcon width={30} height={30} />
) : 
  item.catName === 'Songs' ? (
    <MusicIcon width={30} height={30} />
  ) : 
  item.catName === 'Tiny Treats' ? (
    <CookiesIcon width={30} height={30} />
  ) : 
  item.catName === 'Moments' ? (
    <GalleryIcon width={30} height={30} />
  ) :
  item.catName === 'Favorites' ? (
    <FavoriteIcon width={30} height={30} />
) :

(
  <Image
    source={item.icon}
    style={{ width: 30, height: 30 }}
  />
)}
          </View>
          <View>
              <Text style={styles.entryName}>{item.name}</Text>
        <Text style={styles.entryDetails}>{item.details}</Text>
        {
          item.note &&   <View style={styles.entryNotesContainer}>
        <Text   style={styles.entryNote}>{item.note}</Text>

        </View>
        }
      

      
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
  width: '100%',
},

scrollContent: {
  paddingHorizontal: 18,
  paddingTop: 8,
  paddingBottom: 30,
  width: '100%',
  

},
  greeting: {
    width: '100%',
    fontSize: 28,
    fontFamily: Fonts.handBold,
    color: '#413023',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',

  },
  topSection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: '#F4EDE0',
    borderTopWidth: 1,
    borderColor: '#7a655530',
    marginBottom: 12
  },
  tape:{
position: 'absolute',
  top: -12,
  left: '40%',
  width: 54,
  height: 29,
  backgroundColor: 'rgba(255, 215, 130, 0.69)',
  transform: [{ rotate: '-2deg' }],
  },
  date:{
    fontSize: 18,
    fontFamily: Fonts.hand,
    color: '#7A6555',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
   entriesContainer: {
   paddingVertical: Spacing.two,
    gap: Spacing.three,
    width: '100%',
    
    


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
    paddingVertical: Spacing.three,
    borderWidth:1,
    borderColor: '#D4C0A8',
    backgroundColor: '#FDF7EE',
    borderRadius: 15,
    shadowColor: "#2C1A10",
    shadowOffset:{
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4
  },
  entryName: {
    fontSize: 20,
    color: "#2C1A10",
    fontFamily: Fonts.handBold

  },
  entryDetails:{
    fontSize: 11.5,
    fontWeight: 400,
    color: "#4A2C1A",
    fontFamily: Fonts.handBold,
  },
  entryNotesContainer:{
    display: 'flex',
    flexDirection: 'row',
    borderLeftWidth: 3,
    borderLeftColor: '#D4C0A8',
    paddingVertical: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  entryNote:{
    fontSize: 11.5,
    fontWeight: 400,
    color: '#7A6555',
    fontFamily: Fonts.hand,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5ecd7',
    borderRadius: 25,
    width:50,
    height:50,
   padding:10
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

