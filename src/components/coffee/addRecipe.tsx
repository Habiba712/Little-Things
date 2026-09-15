

import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Pressable, TextInput} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';



export default function AddRecipe() {


    return (
        <SafeAreaView>
             <View style={styles.backButton}>
                <Ionicons name="arrow-back" size={25} color="#060606" />
                 <Text style={styles.backButtonText}>Cancel</Text>
                </View>
            <ScrollView contentContainerStyle={styles.container} >
                 
               
          
            <View style={styles.container}>
                <Text style={styles.title}>Add Recipe</Text>
                <TextInput style={styles.input} placeholder="Recipe Name" />
                <TextInput style={styles.input} placeholder="Recipe Description" />
                <TextInput style={styles.input} placeholder="Ingredients" />
                <TextInput style={styles.input} placeholder="Instructions" />
                <TextInput style={styles.input} placeholder="Image" />
            </View>
            </ScrollView>
          
        </SafeAreaView>
    )
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
    backButton:{
        position: 'absolute',
        top: 0,
        left: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,backButtonText:{
        fontSize: 15,
        fontWeight: 700,
    },
    title:{
        fontSize: 18,
        fontWeight: 800,
        color: '#141313',
        display: 'flex',  
        justifyContent: 'flex-start',
        textAlign: 'left',
        
    }
}
)