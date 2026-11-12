import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList,ScrollView, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles } from '../constants/Cozy';
import { colors, fonts } from '../constants/Theme2';
import ScreenOne from '../components/onboarding/screenOne';
import ScreenTwo from '../components/onboarding/screenTwo';
import ScreenThree from '../components/onboarding/screenThree';
import ScreenFour from '../components/onboarding/screenFour';


const SCREENS = [ScreenOne, ScreenTwo, ScreenThree, ScreenFour];

function Dot({ active }: { active: boolean }) {
  const w = useRef(new Animated.Value(active ? 24 : 8)).current;

  useEffect(() => {
    Animated.spring(w, { toValue: active ? 24 : 8, useNativeDriver: false, friction: 7 }).start();
  }, [active, w]);

  return (
    <Animated.View
      style={[styles.dot, { width: w, backgroundColor: active ? colors.terracotta : colors.caramel }]}
    />
  );
}

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const last = SCREENS.length - 1;

  const goTo = (i: number) => {
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Sparkles />
       

      <FlatList
        ref={listRef}
        data={SCREENS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(_, i) => String(i)}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        renderItem={({ item: Screen, index: i }) => <Screen active={i === index} />}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
      />
 {/* <ScrollView contentContainerStyle={styles.container} > */}

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SCREENS.map((_, i) => (
            <Dot key={i} active={i === index} />
          ))}
        </View>

        {index < last ? (
          <View style={styles.actions}>
            <Pressable onPress={() => goTo(last)} hitSlop={10}>
              <Text style={styles.skip}>Skip</Text>
            </Pressable>
            <Pressable onPress={() => goTo(index + 1)} style={styles.next}>
              <Text style={styles.nextText}>Next ✦</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
        {/* </ScrollView> */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1,

    backgroundColor: colors.cream,
  },
 
  footer: {
    position: 'absolute',
    bottom:80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 18 },
  dot: { height: 8, borderRadius: 4 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '82%',
  },
  skip: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft },
  next: {
    backgroundColor: colors.ink,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  nextText: { color: colors.paper, fontFamily: fonts.body, fontSize: 16 },
});