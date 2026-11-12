import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from './Theme2';

/* ---------- twinkling sparkles (background) ---------- */

type Spark = { top: `${number}%`; left: `${number}%`; size: number; delay: number; glyph: string };

const SPARKS: Spark[] = [
  { top: '6%', left: '10%', size: 16, delay: 0, glyph: '✦' },
  { top: '12%', left: '78%', size: 22, delay: 500, glyph: '✧' },
  { top: '30%', left: '88%', size: 12, delay: 900, glyph: '✦' },
  { top: '38%', left: '6%', size: 14, delay: 300, glyph: '✧' },
  { top: '62%', left: '82%', size: 18, delay: 1200, glyph: '✦' },
  { top: '70%', left: '12%', size: 20, delay: 700, glyph: '✧' },
  { top: '84%', left: '60%', size: 12, delay: 1500, glyph: '✦' },
];

function SparkItem({ top, left, size, delay, glyph }: Spark) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [v, delay]);

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        top,
        left,
        fontSize: size,
        color: colors.gold,
        opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.9] }),
        transform: [
          { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.2] }) },
          { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) },
        ],
      }}
    >
      {glyph}
    </Animated.Text>
  );
}

export function Sparkles() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {SPARKS.map((s, i) => (
        <SparkItem key={i} {...s} />
      ))}
    </View>
  );
}

/* ---------- gentle floating / bobbing ---------- */

export function Float({
  children,
  delay = 0,
  amplitude = 8,
  duration = 2200,
  style,
}: {
  children: ReactNode;
  delay?: number;
  amplitude?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [v, delay, duration]);

  return (
    <Animated.View
      style={[
        style,
        { transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] }) }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* ---------- fade + rise in when a slide becomes active ---------- */

export function Reveal({
  children,
  active,
  delay = 0,
  style,
}: {
  children: ReactNode;
  active: boolean;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(v, {
        toValue: 1,
        duration: 650,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      v.setValue(0);
    }
  }, [active, delay, v]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: v,
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}