import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { ImageSourcePropType, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { useEffect, useState } from 'react';
import AddRecipe from '@/components/coffee/addRecipe';
import { Ionicons } from '@expo/vector-icons';
import RecipeDetails from '@/components/coffee/recipeDetails';



type MODAL_DATA = {
  show: boolean;
  recipe: any;
};
const CATEGORIES: any = [
  {
    id: 0,
    name: 'All',
  },
  {
    id: 1,
    name: 'Hot',
  },
  {
    id: 2,
    name: 'Iced',
  },
  {
    id: 3,
    name: 'Tea',
  },
  {
    id: 4,
    name: 'Favorite',
  },
  {
    id: 5,
    name: 'Experimental',
  },
  {
    id: 6,
    name: 'Never Again',
  }
];
type selectedCatState = {
  id: number;
  name: string;
  icon: ImageSourcePropType;
};



function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeName}>{recipe.name}</Text>
      <View style={styles.ratingInput} >
        {
          [1, 2, 3, 4, 5].map((star) => (
           <View>
              {star <= recipe.rating ?
                <Text>  <Ionicons name="star" size={18} color="#060606" />
                </Text>

                :
                <Text style={styles.starOutline}>
                  <Ionicons name="star-outline" size={18} color="#060606" />

                </Text>
              }
            </View>
          ))

        }

      </View>
    </View>
  )
}
export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedCat, setSelectedCat] = useState<selectedCatState>(CATEGORIES[0]);
  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [showRecipeDetails, setShowRecipeDetails] = useState<MODAL_DATA>({show: false, recipe: null});
  const [refresh, setRefresh] = useState(false);
const [filter, setFilter] = useState<string>("All");
  const onRefresh = async () => {
    setRefresh(true);
    getRecipes();
    setRefresh(false);
  }
  const theme = useTheme();

  const getRecipes = async () => {
    const getArray = await SecureStore.getItemAsync('recipes');
    if (getArray && getArray.length > 0) {
      setRecipes(getArray ? JSON.parse(getArray) : []);
    }
    console.log(getArray);
  }

  const deleteRecipe = async (id: number) => {
    const getArray = await SecureStore.getItemAsync('recipes');
    if (getArray && getArray.length > 0) {
      const recipes = getArray ? JSON.parse(getArray) : [];
      const newRecipes = recipes.filter((recipe: any) => recipe.id !== id);
      await SecureStore.setItemAsync('recipes', JSON.stringify(newRecipes));
      setRecipes(newRecipes);
    }
    getRecipes();
    console.log(getArray);
  }
  useEffect(() => {
    for (let i = 0; i < CATEGORIES.length; i++) {

      console.log(CATEGORIES[i].name)

    }
    getRecipes();

  }, [])



  return (
    <SafeAreaView style={styles.container} edges={['top']}     >
      {
        showModal ? <AddRecipe onBack={() => setShowModal(false)} /> :
        showRecipeDetails.show === true ? <RecipeDetails onBack={() => setShowRecipeDetails({show: false, recipe: null})} recipe={showRecipeDetails.recipe} onDelete={() => deleteRecipe(showRecipeDetails.recipe.id)} /> :

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
              />
            }
            contentContainerStyle={styles.scrollContent} >
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>Coffee Corner</Text>
              <Pressable style={styles.newButton} onPress={() => { setShowModal(true) }}>
                <Text style={styles.newButtonText}>+ New</Text>
              </Pressable>
            </View>

            {/* categories slide */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {CATEGORIES.map((category: any) => (
                <Pressable key={category.id} style={[styles.catButton, selectedCat.id === category.id && styles.selectedCat]} onPress={() => {
                  setSelectedCat(category)
                  setFilter(category.name)

                }
                }>

                  {/* <View >
                <Image source={category.icon} style={{ width: 35, height: 35 }} />

              </View> */}
                  <Text style={[styles.catName, selectedCat.id === category.id && styles.selectedCat]}>{category.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
            {/* my recipes */}
            <View style={styles.recipesContainer}>
              {
                recipes.filter
                ((recipe: any) => filter === "All" ? recipe : recipe.category === filter).map
                ((recipe) => (
                  <Pressable onPress={() => setShowRecipeDetails({show: true, recipe: recipe})}>
                  <RecipeCard key={recipe.id} recipe={recipe} />
                    
                  </Pressable>
                ))
              }
            </View>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#c2936f',
  },
  newButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    gap: Spacing.one,
  },

  newButtonText: {
    fontSize: 11.5,
    fontWeight: 700,
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  categoriesContainer: {
    // width: '100%',
    flexGrow: 1,
    display: 'flex',
    marginTop: 20,

  },
  catButton: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginRight: Spacing.two,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d1d0cf',
    backgroundColor: '#f7f6f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catName: {
    fontSize: 11.5,
    fontWeight: 700
  },
  selectedCat: {
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
  recipesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.two,
    marginTop: Spacing.five,
  },
  recipeCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2936f',
    justifyContent: 'center',
    backgroundColor: '#f8f5f5',
  },
  recipeName: {
    fontSize: 14,
    fontWeight: 900,
    color: '#1d1c1a',
    display: 'flex',
  },
  ratingInput:{
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    left: -5,
  },
  starOutline:{
    marginLeft: 5,
  }
});
