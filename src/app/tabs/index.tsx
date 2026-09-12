import * as Device from 'expo-device';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

// import { AnimatedIcon } from '@/components/animated-icon';
// import { HintRow } from '@/components/hint-row';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';



export default function HomeScreen() {
  const [name, setName] = useState<string | null>(null);
  useEffect(()=>{
    async function getName(){
      const name = await SecureStore.getItemAsync('name');
      console.log('name', name);
      setName(name);
    }
    getName();
    
  },[])
  return (
 <View style={styles.container}>
   <Text style={styles.greeting}>Hey there, {name ? name : ''}</Text>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    paddingHorizontal: Spacing.four,
  },
  greeting: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#413023',
    display: 'flex',  
    justifyContent: 'flex-start',
    textAlign: 'left',
    
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
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
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
