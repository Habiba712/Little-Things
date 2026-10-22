
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

export default function ScreenOne() {
  return (
    <View style={styles.listScreen}>
      <Text style={styles.itemTitle}>Look back whenever</Text>
      <Text style={styles.itemSubtitle}>
      Your journal and calendar keep every day. Flip back through old pages whenever you want to remember.
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