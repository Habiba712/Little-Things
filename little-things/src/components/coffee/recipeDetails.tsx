import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Fonts, Spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CoffeeIcon from '@/assets/images/hot.svg';
import IcedIcon from '@/assets/images/iced.svg';
import TeaIcon from '@/assets/images/tea.svg';
import FavoriteIcon from '@/assets/images/favorite.svg';
import ExperimentalIcon from '@/assets/images/bad-coffee.svg';
import NeverAgainIcon from '@/assets/images/dead-plant.svg';

type RecipeDetailsProps = {
  onBack: () => void;
  onDelete: () => boolean | void | Promise<boolean | void>;
  recipe: any;
};

const renderRecipeIcon = (category: string) => {
  if (category === 'Experimental') return <ExperimentalIcon width={50} height={50} />;
  if (category === 'Favorite') return <FavoriteIcon width={50} height={50} />;
  if (category === 'Hot') return <CoffeeIcon width={50} height={50} />;
  if (category === 'Iced') return <IcedIcon width={50} height={50} />;
  if (category === 'Tea') return <TeaIcon width={50} height={50} />;
  return <NeverAgainIcon width={50} height={50} />;
};

export default function RecipeDetails({ onBack, recipe, onDelete }: RecipeDetailsProps) {
  if (!recipe) return null;

  const ingredients = typeof recipe.ingredients === 'string'
    ? recipe.ingredients.split(',').map((ingredient: string) => ingredient.trim()).filter(Boolean)
    : [];
  const rating = Number(recipe.rating ?? 0);

  const handleDelete = async () => {
    const deleted = await onDelete();
    if (deleted !== false) onBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={25} color="#060606" />
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.sticker}>{renderRecipeIcon(recipe.category)}</View>
            <View style={styles.headerText}>
              <Text style={styles.category}>{recipe.category}</Text>
              <Text style={styles.header}>{recipe.name}</Text>
            </View>
          </View>

          <Text style={styles.collection}>A little recipe from your coffee corner</Text>
          <View style={styles.ratingInput} accessibilityLabel={`Rating ${rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= rating ? 'star' : 'star-outline'}
                size={15}
                color="#bd8036"
              />
            ))}
          </View>

          <Text style={styles.title}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {ingredients.length > 0 ? ingredients.map((ingredient: string, index: number) => (
              <Text key={`${ingredient}-${index}`} style={styles.ingredientITem}>• {ingredient}</Text>
            )) : (
              <Text style={styles.notesItem}>No ingredients</Text>
            )}
          </View>

          <Text style={styles.title}>Notes</Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notesItem}>{recipe.notes || 'No notes'}</Text>
          </View>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Recipe</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#D4C0A8',
    borderRadius: 15,
    backgroundColor: '#fff0d8',
  },
  sticker: {
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 31,
    backgroundColor: '#f5ecd7',
  },
  headerText: {
    flex: 1,
  },
  category: {
    color: '#7A6555',
    fontFamily: Fonts.handMed,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.handBold,
    color: '#2C1A10',
  },
  collection: {
    color: '#7A6555',
    fontFamily: Fonts.hand,
    fontSize: 15,
    marginBottom: Spacing.one,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#c2936f',
    paddingTop: 8,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  ratingInput: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    left: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.handBold,
    marginTop: Spacing.three,
    color: '#141313',
  },
  ingredientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.one,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a1a09e',
    backgroundColor: '#fff0d8',
    marginTop: Spacing.two,
  },
  ingredientITem: {
    fontSize: 18,
    fontFamily: Fonts.hand,
    color: '#2C1A10',
    borderColor: '#a1a09e54',
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: Spacing.four,
    borderRadius: 10,
    paddingVertical: Spacing.two,
  },
  notesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.one,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a1a09e',
    backgroundColor: '#fff0d8',
    fontStyle: 'italic',
  },
  notesItem: {
    fontSize: 18,
    fontFamily: Fonts.hand,
    fontStyle: 'italic',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    color: '#5F3B21',
  },
  deleteButton: {
    marginTop: 15,
    backgroundColor: '#f0ecec',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cb2a05',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    flexWrap: 'nowrap',
    width: '40%',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#cb2a05',
    textTransform: 'uppercase',
  },
});
