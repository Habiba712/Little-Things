import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Float, Reveal } from '../../constants/Cozy';
import { colors, fonts } from '../../constants/Theme2';

export default function ScreenFour({ active }: { active: boolean }) {
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finishOnboarding = async (token: string) => {
    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('onboarded', 'true');
    router.replace('/tabs');
  };

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill in both fields ✿');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm your password ✿');
      return;
    }

    if (password.length < 5) {
      setError('Your password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Your passwords do not match. Please try again ✿');
      return;
    }


    setError(null);
    setLoading(true);
    try {
      console.log('rew top')

      const res = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/user/register`, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      console.log('rew bottom')
      const data = await res.json();
      console.log('dd', data);
      if (!res.ok) {
        console.log('rew error')
        setError(data?.message ?? 'Something went wrong, try again');
      } else {
        console.log('rew oooooo')

        console.log(res);
        // use the token straight from the response (setState is async, so state would still be stale here)
        // await finishnboarding(data.token);
        router.replace('/auth/login');
      }
    } catch (e) {
      setError('Could not reach the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { width }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Reveal active={active}>
        <Float amplitude={6}>
          <Text style={styles.emoji}>🐈‍⬛</Text>
        </Float>
      </Reveal>

      <Reveal active={active} delay={150}>
        <Text style={styles.title}>One more thing</Text>
        <Text style={styles.subtitle}>Make your little corner ✿</Text>
      </Reveal>

      <Reveal active={active} delay={300} style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Usrename"
          placeholderTextColor={colors.caramel}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.caramel}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.caramel}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          onPress={() => setShowPassword(prev => !prev)}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          hitSlop={10}
        >
          <Text style={styles.showText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>

        <Text style={[styles.label, { marginTop: 16 }]}>Confrim Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          placeholderTextColor={colors.caramel}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Pressable
          onPress={() => setShowConfirmPassword(prev => !prev)}
          accessibilityRole="button"
          accessibilityLabel={
            showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'
          }
          hitSlop={10}
        >
          <Text style={styles.showText}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          onPress={handleRegister}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            loading && styles.buttonLoading,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Start my journal</Text>
          )}
        </Pressable>
         <Pressable onPress={() => router.push('/auth/login')} style={styles.switchRow} hitSlop={10}>
                    <Text style={styles.switchText}>
                      Already have an account? <Text style={styles.switchLink}>Login</Text>
                    </Text>
                  </Pressable>
      </Reveal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emoji: { fontSize: 64, textAlign: 'center', marginBottom: 6 },
  title: {
    fontFamily: fonts.script,
    fontSize: 38,
    color: colors.ink,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: 'center',
    marginTop: 4,
  },
  form: { width: '82%', marginTop: 28 },
  label: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.caramel,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  error: {
    color: colors.terracotta,
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.ink,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonLoading: { backgroundColor: '#8a7466' },
  buttonText: {
    color: colors.paper,
    fontFamily: fonts.body,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.caramel,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 8,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    color: colors.ink,
  },

  showText: {
    color: colors.caramel,
    fontWeight: '600',
    paddingLeft: 12,
  },
  switchRow: { marginTop: 20, alignItems: 'center' },

   switchText: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
  switchLink: { color: colors.terracotta, fontWeight: '600' },
});
