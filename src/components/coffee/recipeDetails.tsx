

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Pressable, TextInput } from 'react-native';
import { Spacing } from '@/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';


export default function RecipeDetails({
    onBack,
    recipe,
    onDelete,

}: {
    onBack: () => void;
    onDelete: () => void;
    recipe: any;
}) {
    console.log(recipe);
    return (
        <SafeAreaView
            style={styles.container}
        >
            <Pressable style={styles.backButton} onPress={() => onBack()}>
                <Ionicons name="arrow-back" size={25} color="#060606" />
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <View>
                <View style={styles.headerContainer}>
                    {
                        recipe.category === "Experimental" ?
                        <Image source={require('@/assets/images/bad-coffee.svg')} style={{ width: 50, height: 50 }} />
                        : recipe.category === "Favorite" ?
                        <Image source={require('@/assets/images/favorite.svg')} style={{ width: 50, height: 50 }} />
                        :
                        recipe.category === "Hot" ?
                        <Image source={require('@/assets/images/hot.svg')} style={{ width: 50, height: 50 }} />
                        :
                        recipe.category === "Iced" ?
                        <Image source={require('@/assets/images/iced.svg')} style={{ width: 50, height: 50 }} />
                        :
                        recipe.category === "Tea" ?
                        <Image source={require('@/assets/images/tea.svg')} style={{ width: 50, height: 50 }} />
                        :
                        recipe.category === "Never Again" ?
                        <Image source={require('@/assets/images/dead-plant.svg')} style={{ width: 50, height: 50 }} />
                        :
                        <Image source={require('@/assets/images/dead-plant.svg')} style={{ width: 50, height: 50 }} />
                    }
                     <Text style={styles.header}>

                    {recipe.name}</Text>
                </View>
               
                <Text>Collection:  {recipe.category}</Text>
                <View style={styles.ratingInput} >
                    {
                        
                        [1, 2, 3, 4, 5].map((star) => (
                            <View>
                                {star <= recipe.rating ?
                                    <Text>  <Ionicons name="star" size={15} color="#060606" />
                                    </Text>

                                    :
                                    <Text>
                                        <Ionicons name="star-outline" size={15} color="#060606" />

                                    </Text>
                                }
                            </View>
                        ))
                    }
                </View>
                <Text style={styles.title}>Ingredients</Text>
                <View style={styles.ingredientsContainer}>
                    {
                    recipe.ingredients ?
                    recipe.ingredients.split(',').map((ingredient: any) => (
                        <Text style={styles.ingredientITem}>• {ingredient}</Text>


                    ))
                    :
                    <Text style={styles.notesItem}>No ingredients</Text>
                }

                </View>
                <Text style={styles.title}>
                    Notes
                </Text>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesItem}>
                        {recipe.notes ? recipe.notes : "No notes"}
                    </Text>
                </View>
                <Pressable style={styles.deleteButton}
                onPress={() => {onDelete()
                    onBack()
                }}
                >
                    <Text style={styles.deleteButtonText}>Delete Recipe</Text>
                </Pressable>

            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: Spacing.one,
        marginBottom: Spacing.two,
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: '#c2936f',
        paddingHorizontal: 18,

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
    }
    , backButtonText: {
        fontSize: 15,
        fontWeight: 700,
    },
    ratingInput: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        left: -5,
    },

    starOutline: {
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
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
        backgroundColor: '#f0eeee',
        marginTop: Spacing.two,
    },
    ingredientITem: {
        fontSize: 15,
        fontWeight: 700,
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
        backgroundColor: '#f0eeee',
        fontStyle: 'italic',
    },
    notesItem: {
        fontSize: 15,
        fontWeight: '500',
        fontStyle: 'italic',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
        color: '#0d0d0d',

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
      width: '40%'   
    },
    deleteButtonText: {
      fontSize: 14,
      fontWeight: 700,
      color: '#cb2a05',
      textTransform: 'uppercase',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
    }
});