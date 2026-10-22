
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

export default function ScreenOne() {
  return (
    <View style={styles.listScreen}>
      <Text style={styles.itemTitle}>Collect your days</Text>
      <Text style={styles.itemSubtitle}>
       Every day gets its own page. Add anything — a coffee recipe, a book, a little moment. Nothing is too small.
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