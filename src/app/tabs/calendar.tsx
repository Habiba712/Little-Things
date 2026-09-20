
import { View, Text , StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

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
  const [myEntries, setMyEntries] = useState<[ItemState]>([]);

  const getEntries = async () => {
    const getArray = await SecureStore.getItemAsync('journal-entry');
    if(getArray){
      const journalItems = getArray ? JSON.parse(getArray) : [];
      // console.log(journalItems);
      const todayEntries = journalItems.filter((item: any) => item.genericDate.split('T')[0] === selectedDay);
      console.log('tttt',todayEntries);
      setMyEntries(todayEntries);

    }
   
    
  }

  useEffect(() => {
    getEntries();
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
          <Text style={styles.header}>Calendar</Text>
      <Calendar
      onDayPress={(day : any) => {
        setSelectedDay(day.dateString);
      }}
       style={styles.calendar}
       theme={{
    backgroundColor: '#FFF9F3',
    calendarBackground: '#FFF9F3',
    textSectionTitleColor: '#7A5C45',
    selectedDayBackgroundColor: '#C2936F',
    selectedDayTextColor: '#C2936F',
    clickedDayBackgroundColor: '#a64b06',
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
   <View>
     {
       myEntries.length > 0 ?
       myEntries
       .sort((a, b) => new Date(b.genericDate).getTime() - new Date(a.genericDate).getTime())
       .map((item, index) => (
     <View key={index} style={styles.entryContainer}>
      <Text style={styles.entryDate}>{item.date}</Text>
       <Text style={styles.entryName}>{item.name}</Text>
       <Text style={styles.entryDetails}>{item.details}</Text>
       <Text   style={styles.entryNote}>{item.note}</Text>
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
    paddingHorizontal: 10,

    paddingTop: 8,
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
  borderRadius: 20,
  paddingHorizontal: 10,
  paddingVertical: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  backgroundColor: '#FFF9F3',
  
},
entryDate:{
  fontFamily: 'SourceSans3_400Regular',
  fontSize: 18,
  fontWeight: 'bold',
  color: '#413023',
  display: 'flex',
  justifyContent: 'flex-start',
 
  textAlign: 'left',

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
noEntries:{
  fontSize: 13,
  fontWeight: 500,
  color: '#585757',
  textAlign: 'center',
  paddingVertical: 10,
}
});
