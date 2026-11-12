
import { View, Text , StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';

type ItemState = {
  name: string;
  details: string;
  note: string;
  catName: string;
  date: string;
  genericDate: string;
};
export default function CalendarScreen() {

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [myEntries, setMyEntries] = useState<ItemState[]>([]);

  const getEntries = async (selectedDay: string) => {
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Could not load journal entries');
      const { entries } = data;
      const todayEntries = entries.filter((item: ItemState) => item.genericDate.split('T')[0] === selectedDay);
      setMyEntries(todayEntries);
    } catch (error) {
      console.error('Could not load calendar entries', error);
    }
   
    
  }

  // useEffect(() => {
  //   getEntries(selectedDay);
  // }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Calendar</Text>
      <Calendar
      onDayPress={(day : any) => {
        setSelectedDay(day.dateString);
        getEntries(day.dateString);
        console.log('day',day.dateString);
      }}
       style={styles.calendar}
       theme={{
    backgroundColor: '#FFF9F3',
    calendarBackground: '#FFF9F3',
    textSectionTitleColor: '#7A5C45',
    selectedDayBackgroundColor: '#C2936F',
    selectedDayTextColor: '#C2936F',
    todayTextColor: '#A66A43',
    dayTextColor: '#3D2B1F',
    textDisabledColor: '#D8C8BB',
    arrowColor: '#3D2B1F',
    monthTextColor: '#3D2B1F',
    textDayFontFamily: 'SourceSans3_400Regular',
    textMonthFontFamily: 'Caveat_700Bold',
    textDayHeaderFontFamily: 'SourceSans3_600SemiBold',
    textMonthFontSize: 24,
    textDayFontSize: 15,
    textDayHeaderFontSize: 13,
  }}
      />
   {/* day entries */}  

 <View style={styles.entryContainer}>
   {
     myEntries.length > 0 &&
      <View style={styles.entryHeader}>
         <Text style={styles.entryDate}>{myEntries.length > 0 ? myEntries[0].date : ''}</Text>
<Pressable style={styles.entryButton}
        >
          <Text style={styles.entryButtonText}>View details
          </Text>
            <Ionicons name="arrow-forward" size={18} color="#925e37" />

        </Pressable>
        </View>
   }
  
     

     {
       myEntries.length > 0 ?
       myEntries
       .sort((a, b) => new Date(b.genericDate).getTime() - new Date(a.genericDate).getTime())
       .map((item, index) => (
     <View style={styles.entryDetails} key={index} >
     
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
                            ) : null
                            }
       <Text style={styles.entryName}>{item.name}</Text>

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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#c2936f',
    

    paddingTop: 8,
  },
  
scrollContent: {
  paddingHorizontal: 18,
  paddingTop: 8,
  paddingBottom: 30,
  width: '100%',
  

},
  header:{
     fontFamily: 'Caveat_700Bold',
    fontSize: 32,
    color: '#3D2B1F',
  },
  calendar: {
  marginTop: 20,
  borderRadius: 20,
  paddingBottom: 10,

},
entryContainer:{
  marginTop: 20,
  marginBottom: 20,
  borderRadius: 20,
  paddingHorizontal: 13,
  paddingVertical: 15,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  backgroundColor: '#FFF9F3',
  
},
entryHeader:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
},
entryDate:{
  fontFamily: Fonts.handBold,
  fontSize: 18,
  color: '#413023',
  display: 'flex',
  justifyContent: 'flex-start',
 
  textAlign: 'left',

},
entryButton:{
   display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 10,
},
entryButtonText:{
  fontFamily: Fonts.handBold,
  fontSize: 16,
  color: '#925e37',
 
},
entryName: {
  fontSize: 13,
 
  fontWeight: 600
},
entryDetails:{
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'flex-start',
 alignItems: 'center',
 gap: 10,
},
entryNote:{
  fontSize: 11.5,
  fontWeight: 400,
  color: '#5f3b21',
},
noEntries:{
  fontSize: 13,
  fontWeight: 500,
  color: '#585757',
  textAlign: 'center',
  paddingVertical: 10,
}
});
