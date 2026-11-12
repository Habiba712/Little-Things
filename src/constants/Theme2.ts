import { Platform } from 'react-native';

export const colors = {
  paper: '#FBEFE0',
  cream: '#F6E3CC',
  ink: '#4A2C22',
  inkSoft: '#7A5A48',
  caramel: '#BF9371',
  terracotta: '#C8643C',
  gold: '#E0A458',
  blush: '#F2C9B8',
};

// Swap these for a loaded font (e.g. @expo-google-fonts/caveat) if you want the exact handwritten look.
export const fonts = {
  script: Platform.select({ ios: 'Snell Roundhand', android: 'cursive', default: 'cursive' }),
  body: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
};