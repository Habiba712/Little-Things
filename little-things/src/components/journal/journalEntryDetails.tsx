

import {View, Text, StyleSheet, Image, Pressable, TextInput, ImageURISource, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';
import { Fonts } from '@/constants/theme';

import CoffeeIcon from '@/assets/images/hot.svg';
import MusicIcon from '@/assets/images/music.svg';
import CookiesIcon from '@/assets/images/cookies.svg';
import GalleryIcon from '@/assets/images/gallery.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import BookIcon from '@/assets/images/book.svg';

export default function JournalEntryDetails(
    {
        items,
        onBack
    }:
    {
        items: any[],
        onBack(): void
    }
) {
  console.log('ites', items)
  const now = new Date();
  const currentDate = now.toLocaleString('en-US', { weekday: 'long' }) + ', ' + now.toLocaleString('en-US', { month: 'long' }) + ' ' + now.getDate();
  return(
    <SafeAreaView>
        <Pressable onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#171616"
            />
            <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
         <View style={styles.entriesContainer}>
            <Text style={styles.header}>
                {items[0].date}
            </Text>
                 {items.map((item, index) => (
              <View key={index} style={styles.entryContainer}>
                <Pressable style={styles.closeButton} onPress={() => console.log('close')}>
                 <Ionicons name="close" size={24} color="#090909"
                  style={styles.closeIcon} 
                  />
        
                </Pressable>
                 
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
null}
 <View>
                      <Text style={styles.entryName}>{item.name}</Text>
                <Text style={styles.entryDetails}>{item.details}</Text>
                <Text   style={styles.entryNote}>{item.note}</Text>
                    </View>

                  </View>
                 
        
              </View>
            ))}
            </View>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
    width: '100%',
    fontFamily: Fonts.handMed,
    fontSize: 18,
    color: '#7A6555',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',

  },
  backButton:{
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText:{
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.handBold,
    
    
  },
   entriesContainer: {
     paddingVertical: Spacing.two,
      gap: Spacing.three,
  
  
    },
  entryContainer: {
     gap: Spacing.one,
    minHeight: 80,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderWidth:1,
    borderColor: '#D4C0A8',
    backgroundColor: '#FDF7EE',
    borderRadius: 15,
    
    
    },
    entryName: {
      fontSize: 18,
    color: "#2C1A10",
    fontFamily: Fonts.handBold
    },
    entryDetails:{
      fontSize: 11.5,
      fontWeight: 400
    },
    entryNote:{
      fontSize: 11.5,
      fontWeight: 400,
      color: '#5f3b21',
      fontFamily: Fonts.hand,
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
