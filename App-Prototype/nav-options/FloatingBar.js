// Option 5: floating pill bar; icons only, the active tab expands to show its label
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SECTIONS } from './theme';
import { Placeholder } from './shared';

export default function FloatingBar() {
  const [active, setActive] = useState(1);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <Placeholder section={active} bottomSpace={insets.bottom + 120} />

      <View style={[styles.barWrap, { bottom: insets.bottom + 16 }]} pointerEvents="box-none">
        <View style={styles.bar}>
          {SECTIONS.map((s) => {
            const on = s.id === active;
            return (
              <Pressable key={s.id} onPress={() => setActive(s.id)} style={[styles.item, on && styles.itemOn]}>
                <View style={[styles.dot, on && styles.dotOn]} />
                {on && <Text style={styles.label}>{s.label}</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  barWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    gap: 4,
    padding: 6,
    borderRadius: 999,
    backgroundColor: colors.text,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  itemOn: { backgroundColor: colors.accent },
  dot: { width: 18, height: 18, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.35)' },
  dotOn: { backgroundColor: '#fff' },
  label: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
