import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './nav-options/theme';
import { ExitPill } from './nav-options/shared';
import BottomTabs from './nav-options/BottomTabs';
import Drawer from './nav-options/Drawer';
import TopTabs from './nav-options/TopTabs';
import HomeGrid from './nav-options/HomeGrid';
import FloatingBar from './nav-options/FloatingBar';

const OPTIONS = [
  { name: 'Bottom Tabs', desc: 'Standard tab bar along the bottom, like most phone apps.', Screen: BottomTabs },
  { name: 'Side Drawer', desc: 'Hamburger button opens a menu that slides in from the left.', Screen: Drawer },
  { name: 'Top Tabs', desc: 'Tabs across the top; swipe left and right between sections.', Screen: TopTabs },
  { name: 'Home Grid', desc: 'Home screen of tiles; each opens its section with a back button.', Screen: HomeGrid },
  { name: 'Floating Bar', desc: 'Floating pill of icons; the selected one expands to show its name.', Screen: FloatingBar },
];

function Chooser({ onPick }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={[styles.chooser, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 32 }]}
    >
      <Text style={styles.title}>BalanceMe App</Text>
      <Text style={styles.subtitle}>Navigation options. Tap one to try it.</Text>
      {OPTIONS.map((o, i) => (
        <Pressable key={o.name} style={styles.card} onPress={() => onPick(i)}>
          <View style={styles.num}>
            <Text style={styles.numText}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{o.name}</Text>
            <Text style={styles.cardDesc}>{o.desc}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// On the web, ?option=3 opens that option directly (handy for sharing links)
function initialOption() {
  if (Platform.OS !== 'web') return null;
  const n = Number(new URLSearchParams(window.location.search).get('option'));
  return n >= 1 && n <= OPTIONS.length ? n - 1 : null;
}

export default function App() {
  const [picked, setPicked] = useState(initialOption);
  const option = picked !== null ? OPTIONS[picked] : null;

  return (
    <SafeAreaProvider>
      {/* In a desktop browser, show the app inside a phone-sized frame */}
      <View style={styles.outer}>
        <View style={styles.phone}>
          {option ? (
            <>
              <option.Screen key={picked} />
              <ExitPill onExit={() => setPicked(null)} number={picked + 1} name={option.name} />
            </>
          ) : (
            <Chooser onPick={setPicked} />
          )}
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: isWeb ? '#d9e2df' : colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.bg,
    ...(isWeb && {
      maxWidth: 420,
      maxHeight: 880,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: colors.line,
    }),
  },
  chooser: { paddingHorizontal: 20, gap: 12 },
  title: { fontSize: 30, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  num: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: { color: colors.accent, fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 2 },
  cardDesc: { fontSize: 13, color: colors.muted },
});
