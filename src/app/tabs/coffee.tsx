import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { ImageSourcePropType, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// import { ExternalLink } from '@/components/external-link';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Collapsible } from '@/components/ui/collapsible';
// import { WebBadge } from '@/components/web-badge';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { useEffect, useState } from 'react';
import AddRecipe from '@/components/coffee/addRecipe';



const CATEGORIES = [
    {
      id: 0,
      name: 'Hot',
      icon: require('@/assets/images/hot.png'),
    },
    {
      id: 1,
      name: 'Cold',
      icon: require('@/assets/images/iced.png'),
    },
    {
      id: 2,
      name: 'Tea',
      icon: require('@/assets/images/tea.png'),
    },
    {
      id: 3,
      name: 'Favorite',
      icon: require('@/assets/images/favorite.png'),
    },
    {
      id: 4,
      name: 'Experimental',
      icon: require('@/assets/images/bad-coffee.png'),
    },
    {
      id: 5,
      name: 'Never Again',
      icon: require('@/assets/images/dead-plant.png'),  
    }
    
  ];
  type selectedCatState = {
    id: number;
    name: string;
    icon: ImageSourcePropType;
  };
export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedCat, setSelectedCat] = useState<selectedCatState>(CATEGORIES[0]);
const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const theme = useTheme();

 useEffect(() => {
  for (let i = 0; i < CATEGORIES.length; i++) {
   
      console.log(CATEGORIES[i].name)
   
  }
 }, [])

  

  return (
    <SafeAreaView style={styles.container} edges={['top']}     >
      {
        showModal ? <AddRecipe /> :

         <ScrollView contentContainerStyle={styles.scrollContent} >
        <View style={styles.header}>
        <Text style={styles.sectionTitle}>Coffee Corner</Text>
<Pressable style={styles.newButton} onPress={() => {setShowModal(true)}}>
  <Text style={styles.newButtonText}>+ New</Text>
</Pressable>
        </View>

        {/* categories slide */}
      <ScrollView
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categoriesContainer}
> 
          {CATEGORIES.map((category) => (
            <Pressable key={category.id} style={[styles.catButton , selectedCat.id === category.id && styles.selectedCat]} onPress={() => {setSelectedCat(category)

            }
            }>
      
              {/* <View >
                <Image source={category.icon} style={{ width: 35, height: 35 }} />

              </View> */}
                <Text style={[styles.catName, selectedCat.id === category.id && styles.selectedCat]}>{category.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* form */}
      </ScrollView>
      }
     
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#c2936f',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,

  },
   sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#413023',
    display: 'flex',  
    justifyContent: 'flex-start',
    textAlign: 'left',
    
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#c2936f',
  },
  newButton:{
    backgroundColor: '#000000',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
  },
 
    newButtonText:{
      fontSize: 11.5,
      fontWeight: 700,
      color: '#ffffff',
      textAlign: 'center',
      textTransform: 'uppercase',
  },
categoriesContainer:{
  // width: '100%',
  flexGrow: 1,
   display: 'flex',
    marginTop: 20,
   
},
catButton:{
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginRight: Spacing.two,
    borderRadius: 25,
    borderWidth:1,
    borderColor: '#d1d0cf',
    backgroundColor: '#f7f6f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
},
catName:{
    fontSize: 11.5,
    fontWeight: 700
},
selectedCat:{
  backgroundColor: '#191918',
  color: '#ffffff',
},

  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
