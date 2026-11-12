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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Float, Reveal, Sparkles } from '../../constants/Cozy';
import { colors, fonts } from '../../constants/Theme2';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in both fields ✿');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_ADDRESS_IP}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? 'Wrong name or password');
      } else {
        await SecureStore.setItemAsync('token', data.token);
        await SecureStore.setItemAsync('onboarded', JSON.stringify(true));
        router.replace('/tabs');
      }
    } catch (e) {
      setError('Could not reach the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Sparkles />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Reveal active>
          <View style={styles.card}>
            <Float amplitude={8}>
              <Text style={styles.hero}>☕</Text>
            </Float>
            <Float delay={400} amplitude={6} style={[styles.orbit, { top: -12, left: -12 }]}>
              <Text style={styles.orbitText}>🌙</Text>
            </Float>
            <Float delay={900} amplitude={7} style={[styles.orbit, { bottom: -10, right: -12 }]}>
              <Text style={styles.orbitText}>🐈‍⬛</Text>
            </Float>
          </View>
        </Reveal>

        <Reveal active delay={150}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Your little things missed you ✿</Text>
        </Reveal>

        <Reveal active delay={300} style={styles.form}>
          <Text style={styles.label}>Your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={colors.caramel}
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="Password"
              placeholderTextColor={colors.caramel}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
              returnKeyType="go"
            />
            <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
              <Text style={styles.eye}>{showPassword ? '🙈' : '👁️'}</Text>
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={handleLogin}
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
              <Text style={styles.buttonText}>Open my journal</Text>
            )}
          </Pressable>

          <Pressable onPress={() => router.push('/onboarding')} style={styles.switchRow} hitSlop={10}>
            <Text style={styles.switchText}>
              New here? <Text style={styles.switchLink}>Create your journal</Text>
            </Text>
          </Pressable>
        </Reveal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: 150,
    height: 150,
    borderRadius: 26,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.caramel,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-3deg' }],
    marginBottom: 28,
    shadowColor: colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  hero: { fontSize: 70 },
  orbit: { position: 'absolute' },
  orbitText: { fontSize: 28 },
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
  form: { width: '82%', marginTop: 26 },
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.caramel,
    borderRadius: 14,
    paddingRight: 14,
  },
  eye: { fontSize: 18 },
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
  switchRow: { marginTop: 20, alignItems: 'center' },
  switchText: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
  switchLink: { color: colors.terracotta, fontWeight: '600' },
});
