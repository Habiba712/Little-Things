import { Spacing } from '@/constants/theme';
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
            <Text style={styles.header}>Journal</Text>

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
                    <Text style={styles.entryName}>
                      {dateEntries[0].date}
                    </Text>
                    <View style={styles.iconContainer}>
                      {
                        dateEntries.map((item, index) => (
                          <>
                            {item.catName === 'Coffee' ? (
                              <CoffeeIcon width={20} height={20} />
                            ) : item.catName === 'Books' ? (
                              <BookIcon width={20} height={20} />
                            ) :
                              item.catName === 'Songs' ? (
                                <MusicIcon width={20} height={20} />
                              ) :
                                item.catName === 'Tiny Treats' ? (
                                  <CookiesIcon width={20} height={20} />
                                ) :
                                  item.catName === 'Moments' ? (
                                    <GalleryIcon width={20} height={20} />
                                  ) :
                                    item.catName === 'Favorites' ? (
                                      <FavoriteIcon width={20} height={20} />
                                    ) :

                                      null}


                          </>
                        ))
                      }
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#412023',
    textAlign: 'left',
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
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderWidth: 1,
    borderColor: '#c2936f',
    backgroundColor: '#e2b38f',
    borderRadius: 10,
  },

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacing.two,
  },

  entryName: {
    fontSize: 13,
    fontWeight: '800',
  },

  entryDetails: {
    fontSize: 13.5,
    fontWeight: '600',
    marginHorizontal: Spacing.one,
  },

  entryNote: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#5f3b21',
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

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