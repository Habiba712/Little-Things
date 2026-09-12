
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';


const CATEGORIES = [
  {
    id: 0,
    name: 'Coffee',
    icon: require('@/assets/images/tabIcons/coffee-cup (1).png'),
  },
  {
    id: 1,
    name: 'Books',
    icon: require('@/assets/images/tabIcons/book.png'),
  },
  {
    id: 2,
    name: 'Songs',
    icon: require('@/assets/images/tabIcons/music.png'),
  },
  {
    id: 3,
    name: 'Tiny Treats',
    icon: require('@/assets/images/tabIcons/cookies.png'),
  },
  {
    id: 4,
    name: 'Moments',
    icon: require('@/assets/images/tabIcons/gallery.png'),
  }
  
]

type ItemState = {
  name: string;
  details: string;
  note: string;
};
export default function AddScreen() {
  const now = new Date();
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const month = now.toLocaleString('en-US', { month: 'long' });
  const dayNumber = now.getDate();

  const [item, setItem] = useState<ItemState>({
    name: '',
    details: '',
    note: '',
  });
  const [selectedCat, setSelectedCat] = useState<number>(0);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Add somthing</Text>
      <Text style={styles.sectionSubtitle}>{day}, {month} {dayNumber}</Text>

      {/* Display the categories in a grid */}
      <View style={styles.safeArea}>
        {CATEGORIES.map((category) => (
          <Pressable key={category.id} style={[styles.catButton , selectedCat === category.id && { borderColor: '#413023', borderWidth: 2 }]} onPress={() => setSelectedCat(category.id)}>
      
            <View >
              <Image source={category.icon} style={{ width: 35, height: 35 }} />

            </View>
                  <Text style={styles.catName}>{category.name}</Text>
          </Pressable>
        ))}
      </View>

      {/* Display the form */}
      <View >
        <Text style={styles.title}>{CATEGORIES[selectedCat].name} Name</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
    // width: '100%',
    paddingHorizontal: 10,

  },
  sectionTitle: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#413023',
    display: 'flex',  
    justifyContent: 'flex-start',
    textAlign: 'left',
    
  },
  sectionSubtitle:{
    fontSize: 14,
    fontWeight: 400
  },
  safeArea: {
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
    gap: Spacing.three,
    marginTop: 20,
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
  catButton: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: 25,
    borderWidth:1,
    borderColor: '#c2936f',
    backgroundColor: '#e2b38f',
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    fontSize: 11.5,
    fontWeight: 400
  }
});
