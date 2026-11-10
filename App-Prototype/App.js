import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider, ThemeContext, useApp } from './src/state';
import { THEMES } from './src/themes';
import { DEMO_USER } from './src/mockData';
import { Disclaimer } from './src/ui';
import AuthFlow from './src/auth/AuthFlow';
import ProfileScreen from './src/screens/ProfileScreen';
import BottomTabs from './src/navs/BottomTabs';
import Drawer from './src/navs/Drawer';
import TopTabs from './src/navs/TopTabs';
import HomeGrid from './src/navs/HomeGrid';
import FloatingBar from './src/navs/FloatingBar';

// Five design options: each pairs a navigation style with a visual theme
const OPTIONS = [
  { nav: 'Bottom Tabs', theme: THEMES.calm, Nav: BottomTabs, desc: 'Familiar tab bar along the bottom, like most phone apps.' },
  { nav: 'Side Drawer', theme: THEMES.dusk, Nav: Drawer, desc: 'Menu button opens a drawer with screens grouped by purpose.' },
  { nav: 'Top Tabs', theme: THEMES.sunrise, Nav: TopTabs, desc: 'Pill tabs across the top; swipe between screens.' },
  { nav: 'Bento Home', theme: THEMES.bento, Nav: HomeGrid, desc: 'A home dashboard of bold tiles that open each screen.' },
  { nav: 'Floating Bar', theme: THEMES.neon, Nav: FloatingBar, desc: 'A glowing floating pill; the active icon shows its name.' },
];

const isWeb = Platform.OS === 'web';
const params = isWeb ? new URLSearchParams(window.location.search) : null;

// On the web, ?option=3 opens that option directly, and &demo=1 skips the login screen
function initialOption() {
  const n = Number(params?.get('option'));
  return n >= 1 && n <= OPTIONS.length ? n - 1 : null;
}

function MainApp({ Nav }) {
  const [profile, setProfile] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Nav onProfile={() => setProfile(true)} />
      {profile && (
        <View style={StyleSheet.absoluteFill}>
          <ProfileScreen onClose={() => setProfile(false)} />
        </View>
      )}
    </View>
  );
}

function Root({ Nav }) {
  const { user } = useApp();
  return user ? <MainApp Nav={Nav} /> : <AuthFlow />;
}

function Chooser({ onPick }) {
  const insets = useSafeAreaInsets();
  return (
    <ThemeContext.Provider value={THEMES.calm}>
      <ScrollView
        style={{ backgroundColor: '#f3f7f5' }}
        contentContainerStyle={[styles.chooser, { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 32 }]}
      >
        <Text style={styles.title}>BalanceMe App</Text>
        <Text style={styles.subtitle}>
          Five design options. Each has its own navigation and visual style, with the same five screens, sign-up and log-in.
        </Text>
        {OPTIONS.map((o, i) => (
          <Pressable key={o.nav} style={styles.card} onPress={() => onPick(i)} accessibilityRole="button">
            <View style={styles.swatches}>
              {[o.theme.bg, o.theme.accent, o.theme.highlight].map((c, j) => (
                <View key={j} style={[styles.swatch, { backgroundColor: c }]} />
              ))}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                {i + 1}. {o.nav} · {o.theme.name}
              </Text>
              <Text style={styles.cardDesc}>{o.desc}</Text>
              <Text style={styles.cardVibe}>{o.theme.vibe}</Text>
            </View>
          </Pressable>
        ))}
        <Disclaimer />
      </ScrollView>
    </ThemeContext.Provider>
  );
}

export default function App() {
  const [picked, setPicked] = useState(initialOption);
  const option = picked !== null ? OPTIONS[picked] : null;
  const step = (d) => setPicked((p) => (p + d + OPTIONS.length) % OPTIONS.length);

  return (
    <SafeAreaProvider>
      <View style={[styles.outer, option && isWeb && { backgroundColor: option.theme.dark ? '#05070d' : '#d9e2df' }]}>
        {isWeb && option && (
          <View style={styles.webBar}>
            <Pressable onPress={() => setPicked(null)} style={styles.webBtn}>
              <Text style={styles.webBtnText}>‹ All options</Text>
            </Pressable>
            <Pressable onPress={() => step(-1)} style={styles.webBtn} accessibilityLabel="Previous option">
              <Text style={styles.webBtnText}>←</Text>
            </Pressable>
            <Text style={styles.webLabel}>
              {picked + 1}/{OPTIONS.length}: {option.nav} · {option.theme.name}
            </Text>
            <Pressable onPress={() => step(1)} style={styles.webBtn} accessibilityLabel="Next option">
              <Text style={styles.webBtnText}>→</Text>
            </Pressable>
          </View>
        )}
        <View style={[styles.phone, option && { backgroundColor: option.theme.bg }]}>
          {option ? (
            <ThemeContext.Provider value={{ ...option.theme, slot: picked }}>
              <AppProvider
                key={picked}
                onExit={() => setPicked(null)}
                initialUser={params?.get('demo') ? DEMO_USER : null}
              >
                <Root Nav={option.Nav} />
              </AppProvider>
              <StatusBar style={option.theme.dark ? 'light' : 'dark'} />
            </ThemeContext.Provider>
          ) : (
            <>
              <Chooser onPick={setPicked} />
              <StatusBar style="dark" />
            </>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: isWeb ? '#d9e2df' : '#f3f7f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f3f7f5',
    ...(isWeb && { maxWidth: 420, maxHeight: 860, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }),
  },
  webBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 10,
    padding: 6,
    borderRadius: 999,
    backgroundColor: '#14302a',
  },
  webBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  webBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  webLabel: { color: '#fff', fontSize: 13, paddingHorizontal: 6 },
  chooser: { paddingHorizontal: 20, gap: 12 },
  title: { fontSize: 30, fontWeight: '800', color: '#14302a' },
  subtitle: { fontSize: 15, lineHeight: 21, color: '#526a64', marginBottom: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d9e4df',
  },
  swatches: { width: 44, gap: 4 },
  swatch: { height: 14, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#14302a', marginBottom: 2 },
  cardDesc: { fontSize: 13, lineHeight: 18, color: '#526a64' },
  cardVibe: { fontSize: 12, color: '#1b7f67', fontWeight: '600', marginTop: 4 },
});
