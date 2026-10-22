
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

export default function ScreenOne() {
  return (
    <View style={styles.listScreen}>
      <Text style={styles.itemTitle}>Little Things</Text>
      <Text style={styles.itemSubtitle}>
        A journal for the small moments that make a day yours.

Coffee you made. Books you read. Songs you heard. Tiny treats. Beautiful light.
        </Text>
    </View>
  );
}

const styles = StyleSheet.create(
    {
listScreen:{
    width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemSubtitle:{
    fontSize: 18,
  }
  });