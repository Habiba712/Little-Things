
import { View, Text , StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Calendar</Text>
      <Calendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#c2936f',
    paddingHorizontal: 10,

    paddingTop: 8,
  },
  header:{
     fontFamily: 'Caveat_700Bold',
    fontSize: 32,
    color: '#3D2B1F',
  }
});
