
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, ImageURISource, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


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
  catName: string;
  catIcon: ImageSourcePropType;
  date: string;
  genericDate: string;
};
type selectedCatState = {
  id: number;
  name: string;
  icon: ImageSourcePropType;
};
type ImageSourcePropType = ImageURISource | ImageURISource[];
export default function AddScreen() {
  const now = new Date();
  const day = now.toLocaleString('en-US', { weekday: 'long' });
  const month = now.toLocaleString('en-US', { month: 'long' });
  const dayNumber = now.getDate();
const [error, setError] = useState<string | null>(null);

  const [selectedCat, setSelectedCat] = useState<selectedCatState>(CATEGORIES[0]);
  const [item, setItem] = useState<ItemState>({
    name: '',
    details: '',
    note: '',
    catName: selectedCat.name,
    catIcon: selectedCat.icon,
    date: now.toLocaleString('en-US', { weekday: 'long' }) + ', ' + now.toLocaleString('en-US', { month: 'long' }) + ' ' + dayNumber,
    genericDate: now.toISOString(),
    });
  const handleSave = async () => {
      if (!item.name.trim()) {
        setError('Please enter a name');
        return;
  }
    
    // await SecureStore.deleteItemAsync('journal-entry');

    const getArray = await SecureStore.getItemAsync('journal-entry');
    if(getArray){
      const journalItems = getArray ? JSON.parse(getArray) : [];
    journalItems.push(item);
    await SecureStore.setItemAsync('journal-entry', JSON.stringify(journalItems));
        }
        else{
          await SecureStore.setItemAsync('journal-entry', JSON.stringify([item]));
        }
    router.replace('/tabs');
  
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
      contentContainerStyle={styles.scrollContent}
      >
    <Text style={styles.sectionTitle}>Add somthing</Text>
      <Text style={styles.sectionSubtitle}>{day}, {month} {dayNumber}</Text>

      {/* Display the categories in a grid */}
      <View style={styles.safeArea}>
        {CATEGORIES.map((category) => (
          <Pressable key={category.id} style={[styles.catButton , selectedCat.id === category.id && { borderColor: '#413023', borderWidth: 2 }]} onPress={() => {setSelectedCat(category)

            setItem({
              ...item,
              catName: category.name,
              catIcon: category.icon,
              genericDate: now.toISOString(),
            })}
          }>
      
            <View >
              <Image source={category.icon} style={{ width: 35, height: 35 }} />

            </View>
                  <Text style={styles.catName}>{category.name}</Text>
          </Pressable>
        ))}
      </View>

      {/* Display the form */}
    <View style={styles.formContainer}>
<View style={styles.formHeader}>
   <Image source={selectedCat.icon} style={{ width: 20, height: 20 }} />
    <Text style={styles.formTitle}>
   
    {selectedCat.name} name</Text>

</View>
 
  <TextInput
    style={styles.input}
    placeholder="Name"
    value={item.name}
    onChangeText={(text) =>
      setItem({
        ...item,
        name: text,
      })
    }
    
  />
  {
    error && <Text style={styles.error}>{error}</Text>
  }

  <TextInput
    style={styles.input}
    placeholder="Details"
    value={item.details}
    onChangeText={(text) =>
      setItem({
        ...item,
        details: text,
      })
    }
  />

  <TextInput
  
    style={styles.textarea}
    placeholder="Write a little note..."
    multiline
    value={item.note}
    onChangeText={(text) =>
      setItem({
        ...item,
        note: text,
      })
    }
  />
  

  <Pressable style={styles.saveButton}
  onPress={() => handleSave()}
  >
    <Text style={styles.saveButtonText}>Save ✨</Text>
  </Pressable>

</View>
      </ScrollView>
  

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',

  },
   scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,

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
  error: {
    fontSize: 14,
    fontWeight: 400,
    color: '#a80b0b',
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
    position: 'relative',
    top: -10,
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
  },
  formContainer:{
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  formHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'center',
    gap: Spacing.one,
    fontSize: 14,
    fontWeight: 700,

  },
  formTitle:{
    fontSize: 14,
    fontWeight: 700,
    color: '#413023',
  },
  noteInput:{

  },
  input:{
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#7a77749f',
    borderRadius: 10,
  },
  // input:focus:{

  // },
  saveButton:{
    width: '100%',
    height: 50,
    backgroundColor: '#413023',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
    textarea: {
  width: '100%',
  minHeight: 120,
  borderWidth: 1,
  borderColor: '#c2936f',
  borderRadius: 15,
  paddingHorizontal: 15,
  paddingVertical: 12,

  textAlignVertical: 'top',
},
  
  saveButtonText:{
      fontSize: 17,
      fontWeight: 700,
      color: '#ffffff',
      textAlign: 'center',
      textTransform: 'uppercase',
  }
});
