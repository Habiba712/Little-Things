import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  useColorScheme,
} from 'react-native';
 
export default function LittleSplash() {
    
 
  return (
    <View style={styles.container}>

     
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/tabIcons/coffee.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* App name */}
      <Text style={styles.title}>
        Little Things
      </Text>

      <Text style={styles.subtitle}>
        Your second brain
      </Text>

     
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="small"
          color="#e2b38faa"
        />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: '#e2b38f',

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 9999,
  },

  logoContainer: {
    width: 82,
    height: 82,

    borderRadius: 22,

    backgroundColor: '#4c3b2eaa',

    borderWidth: 1,
    borderColor: '#d1874daa',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 16,
  },

  logo: {
    width: 58,
    height: 58,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',

    color: '#FFFFFF',

    marginTop: 2,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '400',

    color: '#FFFFFF',

    marginTop: 4,
  },

  loadingContainer: {
    position: 'absolute',

    bottom: 50,

    alignItems: 'center',
  },

  loadingText: {
    marginTop: 8,

    fontSize: 11,

    color: '#FFFFFF',
  },
});