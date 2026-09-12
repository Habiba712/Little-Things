import * as SecureStore from "expo-secure-store";
import LittleSplash from '@/components/littleSplash';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';




SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);
    useEffect(()=>{
        async function prepare(){
            await SplashScreen.hideAsync();
       
            await new Promise(resolve => setTimeout(resolve, 3000));
            const onboarded = await SecureStore.getItemAsync('onboarded');
            console.log(onboarded);
            const name = await SecureStore.getItemAsync('name');
            console.log(name);

            if(!onboarded){
                router.replace('/onboarding');
            }

            await SplashScreen.hideAsync();
            setShowSplash(false);
        }
        prepare();

    },[])
console.log(showSplash)
    return(
        <>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabs" />
        </Stack>
{showSplash && <LittleSplash />}
        </>
    )
}