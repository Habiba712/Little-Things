
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
import {
  JournalEntryDeleteModal,
  JournalEntryEditorModal,
  JournalForm,
} from '@/components/journal/journalEntryActions';

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
  const [calendarEntries, setCalendarEntries] = useState<any[]>([]);
  const [myEntries, setMyEntries] = useState<ItemState[]>([]);
  const [actionEntry, setActionEntry] = useState<any | null>(null);
  const [editEntry, setEditEntry] = useState<any | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const getEntries = async (day?: string) => {
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Could not load journal entries');
      const entries = Array.isArray(data?.entries) ? data.entries : [];
      setCalendarEntries(entries);
      if (day) {
        setMyEntries(entries.filter((item: ItemState) => item.genericDate?.split('T')[0] === day));
      }
    } catch (error) {
      console.error('Could not load calendar entries', error);
    }
   
    
  }

  useEffect(() => {
    getEntries();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const renderSticker = (category?: string) => {
    // if (category === 'Coffee') return <CoffeeIcon width={16} height={16} />;
    // if (category === 'Books') return <BookIcon width={16} height={16} />;
    // if (category === 'Songs') return <MusicIcon width={16} height={16} />;
    // if (category === 'Tiny Treats') return <CookiesIcon width={16} height={16} />;
    // if (category === 'Moments') return <GalleryIcon width={16} height={16} />;
    return <Text>🌸</Text>;
  };

  const renderCalendarDay = ({ date, state }: any) => {
    if (!date) return null;

    const dayEntries = calendarEntries.filter(
      (entry) => entry?.genericDate?.split('T')[0] === date.dateString,
    );
    const isToday = date.dateString === today;

    return (
      <Pressable
        style={styles.calendarDay}
        onPress={() => {
          setSelectedDay(date.dateString);
          getEntries(date.dateString);
        }}
      >
        <View style={[styles.dayNumber, isToday && styles.todayCircle]}>
          <Text style={[styles.dayNumberText, isToday && styles.todayNumberText, state === 'disabled' && styles.disabledDayText]}>
            {date.day}
          </Text>
        </View>
        <View style={styles.daySticker}>
          {dayEntries.length > 0 && renderSticker(dayEntries[0].catName)}
        </View>
      </Pressable>
    );
  };

  const updateEntry = async (form: JournalForm) => {
    if (!editEntry || !form.name.trim()) return;

    setUpdateError(null);
    setSaving(true);
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries/${editEntry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Could not update journal entry');
      setCalendarEntries((current) => current.map((entry) => entry._id === data.entry._id ? data.entry : entry));
      setMyEntries((current) => current.map((entry: any) => entry._id === data.entry._id ? data.entry : entry));
      setEditEntry(null);
      setActionEntry(null);
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Could not update journal entry');
      console.error('Could not update calendar journal entry', error);
    } finally {
      setSaving(false);
    }
  };

  const removeEntry = async () => {
    if (!deleteEntry) return;

    setDeleteError(null);
    setDeleting(true);
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/journal-entries/${deleteEntry._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message ?? 'Could not delete journal entry');
      }
      setCalendarEntries((current) => current.filter((entry) => entry._id !== deleteEntry._id));
      setMyEntries((current) => current.filter((entry: any) => entry._id !== deleteEntry._id));
      setDeleteEntry(null);
      setActionEntry(null);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Could not delete journal entry');
      console.error('Could not delete calendar journal entry', error);
    } finally {
      setDeleting(false);
    }
  };

  // useEffect(() => {
  //   getEntries(selectedDay);
  // }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Calendar</Text>
      <Calendar
      dayComponent={renderCalendarDay}
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
         <Text style={styles.entryDate}>{selectedDay ?? ''}</Text>
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
       .map((item: any, index) => (
     <View style={styles.entryDetails} key={index} >
       <Pressable style={styles.entryMenuButton} onPress={() => setActionEntry(actionEntry?._id === item._id ? null : item)}>
         <Ionicons name="ellipsis-horizontal" size={22} color="#7A6555" />
       </Pressable>
       {actionEntry?._id === item._id && (
         <View style={styles.actionMenu}>
           <Pressable style={styles.menuButton} onPress={() => { setActionEntry(null); setUpdateError(null); setEditEntry(item); }}>
             <Text style={styles.menuText}>Edit</Text>
           </Pressable>
           <Pressable style={styles.menuDeleteButton} onPress={() => { setActionEntry(null); setDeleteError(null); setDeleteEntry(item); }}>
             <Text style={styles.menuDeleteText}>Delete</Text>
           </Pressable>
         </View>
       )}
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

      <JournalEntryEditorModal
        visible={editEntry !== null}
        entry={editEntry}
        saving={saving}
        error={updateError}
        onClose={() => setEditEntry(null)}
        onSave={updateEntry}
      />
      <JournalEntryDeleteModal
        visible={deleteEntry !== null}
        deleting={deleting}
        error={deleteError}
        onCancel={() => setDeleteEntry(null)}
        onConfirm={removeEntry}
      />
    
   
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
calendarDay: {
  alignItems: 'center',
  justifyContent: 'flex-start',
  minWidth: 38,
  minHeight: 48,
  paddingTop: 2,
},
dayNumber: {
  width: 28,
  height: 28,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
},
todayCircle: {
  backgroundColor: '#C2936F',
},
dayNumberText: {
  color: '#3D2B1F',
  fontFamily: 'SourceSans3_400Regular',
  fontSize: 15,
},
todayNumberText: {
  color: '#FFF9F3',
  fontFamily: 'SourceSans3_600SemiBold',
},
disabledDayText: {
  color: '#D8C8BB',
},
daySticker: {
  alignItems: 'center',
  justifyContent: 'center',
  height: 17,
  marginTop: 1,
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
 position: 'relative',
 paddingRight: 30,
},
entryMenuButton: {
  position: 'absolute',
  top: -4,
  right: 0,
  padding: 4,
},
actionMenu: {
  position: 'absolute',
  top: 24,
  right: 0,
  zIndex: 2,
  padding: 4,
  borderRadius: 10,
  backgroundColor: '#FFF9F3',
  borderWidth: 1,
  borderColor: '#D4C0A8',
},
menuButton: {
  paddingHorizontal: 12,
  paddingVertical: 6,
},
menuDeleteButton: {
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderTopWidth: 1,
  borderTopColor: '#E6D8C9',
},
menuText: {
  color: '#5F3B21',
  fontFamily: Fonts.handBold,
},
menuDeleteText: {
  color: '#A65742',
  fontFamily: Fonts.handBold,
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
