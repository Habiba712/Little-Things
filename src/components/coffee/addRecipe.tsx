

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, Pressable, TextInput } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

type RECIPE_DATA = {
    id: number;
    name: string;
    category: string;
    ingredients: string;
    notes: string;
    rating: number;
}

export default function AddRecipe({
    onBack
}:{
    onBack: () => void;
}) {

    const [rating, setRating] = useState<number>(1);
    const [data, setData] = useState<RECIPE_DATA>({
        id: 0,
        name: '',
        category: '',
        ingredients: '',
        notes: '',
        rating: 1,
    })

    const handleSave = async() => {
        console.log(data);
        const getArray = await SecureStore.getItemAsync('recipes');
        if(getArray){
            const recipes = getArray ? JSON.parse(getArray) : [];
            recipes.push({...data, id: Math.random()});
            await SecureStore.setItemAsync('recipes', JSON.stringify(recipes));
        }
        else{
            await SecureStore.setItemAsync('recipes', JSON.stringify([data]));
        }
        onBack();
    }

    return (
        <SafeAreaView>
            <Pressable style={styles.backButton} onPress={() => onBack()}>
                <Ionicons name="arrow-back" size={25} color="#060606" />
                <Text style={styles.backButtonText}>Cancel</Text>
            </Pressable>
            <ScrollView contentContainerStyle={styles.container} >



                <View style={styles.container}>
                    <Text style={styles.title}>Add Recipe</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}> Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Recipe Name"
                            value={data.name}
                            onChangeText={(text) => setData({ ...data, name: text })}

                        />
                    </View>

                    <View style={styles.inputContainer}>
                            <Text style={styles.label}>Category</Text>

                        <View style={styles.pickerContainer}>
                             <Picker
                            style={styles.picker}
                            selectedValue={data.category}
                            onValueChange={(value: string) =>
                                setData({ ...data, category: value })
                            }
                        >
                            <Picker.Item label="Select a category" value="Hot" />
                            <Picker.Item label="Hot" value="Hot" />
                            <Picker.Item label="Iced" value="Iced" />
                            <Picker.Item label="Tea" value="Tea" />
                            <Picker.Item label="Favorite" value="Favorite" />
                            <Picker.Item label="Experimental" value="Experimental" />
                            <Picker.Item label="Never Again" value="Never Again" />
                        </Picker>
                        </View>
                       

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Ingredients (comma separated)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Milk, coffee, caramel..."
                            onChangeText={(text) => setData({ ...data, ingredients: text})}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput style={styles.input} placeholder="Instructions"
                            onChangeText={(text) => setData({ ...data, notes: text })}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Rating</Text>
                        <View style={styles.ratingInput}>
                            {
                                [1, 2, 3, 4, 5].map((star) => (
                                    <Pressable key={star} style={styles.ratingInput} onPress={() => {
                                        setRating(star)
                                        setData({ ...data, rating: star })

                                    }}

                                    >
                                        {star <= rating ?
                                            <Text >  <Ionicons name="star" size={25} color="#060606" />
                                            </Text>

                                            :
                                            <Text style={styles.starOutline}>
                                                <Ionicons name="star-outline" size={25} color="#060606" />

                                            </Text>
                                        }
                                    </Pressable>
                                ))

                            }

                        </View>

                    </View>
                    <Pressable style={styles.saveButton} onPress={() => handleSave()}>
                        <Text style={styles.saveButtonText}>
                            Save
                        </Text>
                    </Pressable>


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
    title: {
        fontSize: 18,
        fontWeight: 800,
        color: '#141313',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'left',

    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#7a77749f',
        borderRadius: 10,
    },
    pickerContainer: {
  height: 50,
  borderWidth: 1,
  borderColor: '#7a77749f',
  borderRadius: 10,
  justifyContent: 'center',
  overflow: 'hidden',
},

picker: {
  width: '100%',
  height: 50,
},
    ratingInput: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        fontSize: 14,
        fontWeight: 700,
        color: '#413023',
        marginBottom: 5,
    },
    saveButton: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#413023',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    saveButtonText: {
        fontSize: 17,
        fontWeight: 700,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    
         starOutline:{
    marginLeft: 5,
  }
    
}
)