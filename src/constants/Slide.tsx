import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Float, Reveal } from './Cozy';
import { colors, fonts } from './Theme2';

type Props = {
  active: boolean;
  hero: string;
  orbit: [string, string, string];
  title: string;
  subtitle: string;
};

export default function Slide({ active, hero, orbit, title, subtitle }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.screen, { width }]}>
      <Reveal active={active}>
        <View style={styles.card}>
          <Float amplitude={10}>
            <Text style={styles.hero}>{hero}</Text>
          </Float>

          <Float delay={300} amplitude={6} style={[styles.orbit, { top: -14, left: -14 }]}>
            <Text style={styles.orbitText}>{orbit[0]}</Text>
          </Float>
          <Float delay={700} amplitude={7} style={[styles.orbit, { top: 10, right: -18 }]}>
            <Text style={styles.orbitText}>{orbit[1]}</Text>
          </Float>
          <Float delay={1100} amplitude={5} style={[styles.orbit, { bottom: -12, left: 18 }]}>
            <Text style={styles.orbitText}>{orbit[2]}</Text>
          </Float>
        </View>
      </Reveal>

      <Reveal active={active} delay={180}>
        <Text style={styles.title}>{title}</Text>
      </Reveal>

      <Reveal active={active} delay={340}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 90,
  },
  card: {
    width: 190,
    height: 190,
    borderRadius: 28,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.caramel,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-3deg' }],
    marginBottom: 40,
    shadowColor: colors.ink,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  hero: { fontSize: 88 },
  orbit: { position: 'absolute' },
  orbitText: { fontSize: 30 },
  title: {
    fontFamily: fonts.script,
    fontSize: 38,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
    color: colors.inkSoft,
    textAlign: 'center',
  },
});