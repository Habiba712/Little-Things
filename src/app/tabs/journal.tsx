import { Fonts, Spacing } from '@/constants/theme';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import JournalEntryDetails from '@/components/journal/journalEntryDetails';
import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';

export default function JournalScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);
const [selectedDateEntries, setSelectedDateEntries] = useState<any[]>([]);
const getMonthName = (date: string) => {
  const month = date.split('-')[1];
  if (month === '01') {
    return 'January';
  } else if (month === '02') {  
    return 'Feb';
    } else if (month === '03') {
      return 'Mar';
      } else if (month === '04') {
        return 'Apr';
        } else if (month === '05') {
          return 'May';
          } else if (month === '06') {
            return 'Jun';
            } else if (month === '07') {
              return 'Jul';
              } else if (month === '08') {
                return 'Aug';
                } else if (month === '09') {
                  return 'Sep';
                  } else if (month === '10') {
                    return 'Oct';
                    } else if (month === '11') {
                      return 'Nov';
                      } else if (month === '12') {
                        return 'Dec';
                        } else {
                          return 'Unknown';
                        }
}
const getDayNumber = (date: string) => {
  const day = date.split('-')[2];
  return day;
}

const getDayName = (date: string) => {
  const day = new Date(date).toLocaleString('en-US', { weekday: 'long' });
  return day;
}

  const getEntries = async () => {
    const getArray = await SecureStore.getItemAsync('journal-entry');

    if (getArray) {
      const journalItems = JSON.parse(getArray);

      console.log('ttt', journalItems);

      setEntries(journalItems);
    }

    setRefreshing(false);
  };

  const groupedByDate: Record<string, any[]> = entries.reduce((groups, item) => {
    const date = item.genericDate.split('T')[0];

    if (!groups[date]) {
      groups[date] = [item];
    } else {
      groups[date].push(item);
    }

    return groups;
  }, {});

  useEffect(() => {
    setShowDetails(false);
    getEntries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getEntries();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
        {showDetails ? (
          <JournalEntryDetails
            items={selectedDateEntries}
            onBack={() => setShowDetails(false)}
          />
        ) : (
          <>
            <Text style={styles.header}>My Journal</Text>
            <Text style={styles.subHeader}>All your little days  </Text>

            {Object.entries(groupedByDate).map(
              ([date, dateEntries]: [string, any[]]) => (
                <View style={styles.entriesContainer} key={date}>
                  <Pressable
                     onPress={() => {
    setSelectedDateEntries(dateEntries);
    setShowDetails(true);
  }}
                    style={styles.entryContainer}
                  >
                    <View style={styles.entryName}>
                      <Text style={styles.entry}>{getMonthName(date)}</Text>
                      
                     <Text style={styles.entry}>{getDayNumber(date)}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <Text style={styles.entryDay}>{getDayName(date)}</Text>
                      <View style={styles.icons}>
                        {
                        dateEntries.map((item, index) => (
                          <>
                            {item.catName === 'Coffee' ? (
                              <Text style={styles.iconBox}><CoffeeIcon width={20} height={20} />
                                </Text>
                           
                            ) : item.catName === 'Books' ? (
                              
                              <Text style={styles.iconBox}>
                              <BookIcon width={20} height={20}  />
                              </Text>
                            ) :
                              item.catName === 'Songs' ? (
                                <Text style={styles.iconBox}>
                                <MusicIcon width={20} height={20} />

                                </Text>
                              ) :
                                item.catName === 'Tiny Treats' ? (
                                  <Text style={styles.iconBox}>
                                  <CookiesIcon width={20} height={20}  />

                                  </Text>
                                ) :

                                  item.catName === 'Moments' ? (
                                    <Text style={styles.iconBox}>
                                    <GalleryIcon width={20} height={20}  />

                                    </Text>
                                  ) :
                                    item.catName === 'Favorites' ? (
                                      <Text style={styles.iconBox}>
                                      <FavoriteIcon width={20} height={20} />

                                      </Text>
                                    ) :

                                      null}


                          </>
                        ))
                      }
                      </View>
                      
                      <Text style={styles.entryDetails}>
                        {dateEntries.length}{' '}
                        {dateEntries.length === 1 ? 'entry' : 'entries'}
                      </Text>
                    </View>


                  </Pressable>
                </View>
              )
            )}
          </>
        )}
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
    fontSize: 27,
    color: '#412023',
    fontFamily: Fonts.handBold,
    textAlign: 'left',
  },
subHeader:{
    fontFamily: Fonts.handMed,
    fontSize: 18,
    color: '#7A6555',
},
  scrollContent: {
    paddingHorizontal: 18,
    flexGrow: 1,
  },

  entriesContainer: {
    paddingVertical: Spacing.two,
    gap: Spacing.three,
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

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacing.two,
  },

  entryName: {
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 15,
   backgroundColor: '#705123',
  paddingHorizontal: Spacing.three,
    height: 50,
    paddingVertical: Spacing.three,
  },
entry:{
    color: '#FDF7EE',
    fontFamily: Fonts.handBold,
    fontSize: 17,
    
    

},
icons:{
  display: 'flex',
  flexDirection: 'row',
  
},
iconBox:{

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
 paddingHorizontal: Spacing.one,
  paddingVertical: Spacing.one,
  borderRadius: 25,
  backgroundColor: '#ede3d4',
  marginRight: Spacing.one,
   
},
entryDay:{
  fontFamily: Fonts.handBold,
  fontSize: 18,
  color: '#705123'
},
  entryDetails: {
    fontSize: 15,
    marginHorizontal: Spacing.one,
    fontFamily: Fonts.hand,
    color: '#7A6555',
  },

  entryNote: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#5f3b21',
  },

  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: Spacing.one,
    marginLeft: 10,

  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  closeIcon: {
    color: '#8f8080e1',
  },

});