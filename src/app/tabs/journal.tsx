import { Spacing } from '@/constants/theme';
import {View, Text, StyleSheet, Image, Pressable, TextInput, ImageURISource, ScrollView, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import JournalEntryDetails from '@/components/journal/journalEntryDetails';
import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';


export default function JournalScreen() {
  const now = new Date();
  const [refreshing, setRefreshing] = useState(false);
  const currentDate = now.toLocaleString('en-US', { weekday: 'long' }) + ', ' + now.toLocaleString('en-US', { month: 'long' }) + ' ' + now.getDate();
  const [todayEntries, setTodayEntries] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const getTodayEntries = async () =>{
    const getArray = await SecureStore.getItemAsync('journal-entry');
    if(getArray){
      const journalItems = getArray ? JSON.parse(getArray) : [];
      // console.log(journalItems);
      const todayEntries = journalItems.filter((item: any) => item.date === currentDate);
      // console.log('ttt',todayEntries);
      setTodayEntries(todayEntries);

    }
    else{
      return [];
    }
    setRefreshing(false);
  }

  useEffect(() => {
    setShowDetails(false);
    getTodayEntries().then(entries => {
      // console.log(entries);
    });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getTodayEntries().then(entries => {
      // console.log(entries);
    });
  };
  return (
    <SafeAreaView
    style={styles.container} edges={['top']}>
      <ScrollView
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#08f165"
         />
      }
      >
        {
          showDetails ? <>
          <JournalEntryDetails items={todayEntries} onBack={() => setShowDetails(false)} />
          </> :
          <>
            <Text style={styles.header}>Journal</Text>
        <View style={styles.entriesContainer}>

            <Pressable  
            onPress={() => setShowDetails(true)}
            
            style={styles.entryContainer}>
               <Text style={styles.entryName}>{currentDate}</Text>
                <View style={styles.detailsContainer}>
                    {
                  todayEntries.map((item, index) => (
                    <View key={index} >
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
                  ))
                }
                <Text>
                  {todayEntries.length === 0 ? '0' : todayEntries.length} things.
                </Text>
                </View>
              
            </Pressable>

          </View>
          </>
        }
    

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    header: {
  
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#413023',
    display: 'flex',  
    justifyContent: 'flex-start',
    textAlign: 'left',
  },

scrollContent: {
  paddingHorizontal: 18,
  flex: 1,

},
   entriesContainer: {
   paddingVertical: Spacing.two,
    gap: Spacing.three,


  },
entryContainer: {
    gap: Spacing.one,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderWidth:1,
    borderColor: '#c2936f',
    backgroundColor: '#e2b38f',
    borderRadius: 10,
  },
  detailsContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    gap: Spacing.two,
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
})