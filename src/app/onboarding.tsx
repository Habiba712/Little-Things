

import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import ScreenOne from '@/components/onboarding/screenOne';
import ScreenTwo from '@/components/onboarding/screenTwo';
import ScreenThree from '@/components/onboarding/screenThree';
import ScreenFour from '@/components/onboarding/screenFour';
import { useRef, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const {width} = Dimensions.get('window');

const SLIDES = [
    {
        key: 1,
        title: 'Little Things',
        subtitle: 'A journal for the small moments that make a day yours.',
        screen: ScreenOne,
       
    },
    {
        key: 2,
        title: 'Collect your days',
        subtitle: 'Every day gets its own page. Add anything — a coffee recipe, a book, a little moment. Nothing is too small.',
        screen: ScreenTwo,
    },
    {
        key: 3,
        title: 'Look back whenever',
        subtitle: 'Your journal and calendar keep every day. Flip back through old pages whenever you want to remember.',
        screen: ScreenThree,
    },
    {
        key: 4,
        title: 'One more thing',
        subtitle: 'Your Name',
        screen: ScreenFour,
    }
]
export default function OnboardingScreen() {
    const listRef = useRef<FlatList>(null);
    const [index, setIndex] = useState(0);

    const finishOnboarding = async () => {
        await SecureStore.setItemAsync('onboarded', 'true');
        router.replace('/tabs');
    };

    const next = () =>{

        if(index < SLIDES.length -1){
            listRef.current?.scrollToIndex({ index: index + 1, animated: true });
        }

        if(index === SLIDES.length -1){
            finishOnboarding();
        }
    
    }
  return (
    <View style={styles.container}>
        <FlatList
         ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={
            ({item}) =>{
             return(
                   <View style={styles.listScreen}>
                    <item.screen  />
                </View>
             )
            }
        }
        />
      {/* <Text>Hello, we will multiple screen on here soon !</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2b38f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listScreen:{
    width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemSubtitle:{
    fontSize: 14,
  }
});