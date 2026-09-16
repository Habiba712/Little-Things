import * as SecureStore from "expo-secure-store";
import LittleSplash from '@/components/littleSplash';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useFonts } from 'expo-font'
import { Caveat_400Regular, Caveat_600SemiBold, Caveat_700Bold } from '@expo-google-fonts/caveat'
import { Lora_400Regular, Lora_600SemiBold, Lora_400Regular_Italic } from '@expo-google-fonts/lora'
import { SourceSans3_400Regular, SourceSans3_500Medium, SourceSans3_600SemiBold } from '@expo-google-fonts/source-sans-3'



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
     const [loaded] = useFonts({
    Caveat_400Regular,
    Caveat_600SemiBold,
    Caveat_700Bold,
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_400Regular_Italic,
    SourceSans3_400Regular,
    SourceSans3_500Medium,
    SourceSans3_600SemiBold,
  })

    const [showSplash, setShowSplash] = useState(true);
   useEffect(() => {
  if (!loaded) return;

  async function prepare() {
    const onboarded = await SecureStore.getItemAsync('onboarded');
    const name = await SecureStore.getItemAsync('name');

    console.log(onboarded);
    console.log(name);

    if (!onboarded) {
      router.replace('/onboarding');
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    await SplashScreen.hideAsync();
    setShowSplash(false);
  }

  prepare();
}, [loaded]);
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