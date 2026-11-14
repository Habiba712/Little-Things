import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { ImageSourcePropType, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/use-theme';
import { Fonts, Spacing } from '@/constants/theme';
import { useEffect, useState } from 'react';
import AddRecipe from '@/components/coffee/addRecipe';
import { Ionicons } from '@expo/vector-icons';
import RecipeDetails from '@/components/coffee/recipeDetails';
import * as SecureStore from 'expo-secure-store';



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
      <Text style={styles.recipeName}>{recipe?.name ?? 'Untitled recipe'}</Text>
      <View style={styles.ratingInput} >
        {
          [1, 2, 3, 4, 5].map((star) => (
            <View key={star}>
              {star <= Number(recipe?.rating ?? 0) ?
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
  const [showRecipeDetails, setShowRecipeDetails] = useState<MODAL_DATA>({ show: false, recipe: null });
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const onRefresh = async () => {
    setRefresh(true);
    try {
      await loadRecipes();
    } finally {
      setRefresh(false);
    }
  }
  const theme = useTheme();

  const loadRecipes = async () => {
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/recipes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Could not load recipes');
      const databaseRecipes = Array.isArray(data?.recipes) ? data.recipes : [];
      setRecipes(databaseRecipes.filter((recipe: any) => (
        recipe && typeof recipe === 'object' && recipe._id && recipe.name && recipe.category
      )));
    } catch (error) {
      console.error('Could not load recipes', error);
    }
  };

  const removeRecipe = async (id: string) => {
    try {
      const token = SecureStore.getItem('token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/recipes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message ?? 'Could not delete recipe');
      }
      await loadRecipes();
    } catch (error) {
      console.error('Could not delete recipe', error);
    }
  }
  useEffect(() => {
    for (let i = 0; i < CATEGORIES.length; i++) {

      console.log(CATEGORIES[i].name)

    }
    loadRecipes();

  }, [])



  return (
    <SafeAreaView style={styles.container} edges={['top']}     >
      {
        showModal ? <AddRecipe onBack={() => setShowModal(false)} /> :
          showRecipeDetails.show === true ? <RecipeDetails onBack={() => setShowRecipeDetails({ show: false, recipe: null })} recipe={showRecipeDetails.recipe} onDelete={() => removeRecipe(showRecipeDetails.recipe._id)} /> :

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
                  recipes
                    .filter((recipe: any) => recipe && (filter === "All" || recipe.category === filter))
                    .map((recipe: any) => (
                      <Pressable
                        key={recipe._id}
                        onPress={() => setShowRecipeDetails({ show: true, recipe })}
                      >
                        <RecipeCard recipe={recipe} />

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
    fontSize: 28,
    fontFamily: Fonts.handBold,
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
    fontSize: 14.5,
        fontFamily: Fonts.hand,

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
    fontSize: 14.5,
    fontFamily: Fonts.hand,
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
    fontSize: 18,
    fontFamily: Fonts.handBold,
    color: '#1d1c1a',
    display: 'flex',
  },
  ratingInput: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    left: -5,
  },
  starOutline: {
    marginLeft: 5,
  }
});
