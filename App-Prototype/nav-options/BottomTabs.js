// Option 1: classic bottom tab bar
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SECTIONS } from './theme';
import { IconStub, Placeholder } from './shared';

export default function BottomTabs() {
  const [active, setActive] = useState(1);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Section {active}</Text>
      </View>

      <Placeholder section={active} showTitle={false} />

      <View style={[styles.tabBar, { paddingBottom: insets.bottom + 6 }]}>
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <Pressable key={s.id} style={styles.tab} onPress={() => setActive(s.id)}>
              <IconStub active={on} />
              <Text style={[styles.tabLabel, on && styles.tabLabelOn]}>{s.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderColor: colors.line,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', gap: 4 },
  tabLabel: { fontSize: 10, color: colors.muted, fontWeight: '500' },
  tabLabelOn: { color: colors.accent },
});
