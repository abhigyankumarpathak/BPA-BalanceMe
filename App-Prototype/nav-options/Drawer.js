// Option 2: hamburger button opens a side drawer
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SECTIONS } from './theme';
import { IconStub, Placeholder } from './shared';

const DRAWER_W = 280;
const GROUPS = [
  { label: 'Group A', items: SECTIONS.slice(0, 3) },
  { label: 'Group B', items: SECTIONS.slice(3) },
];

export default function Drawer() {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(anim, { toValue: open ? 1 : 0, duration: 220, useNativeDriver: true }).start();
  }, [open]);

  const go = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => setOpen(true)} hitSlop={10}>
          <Text style={styles.burger}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Section {active}</Text>
      </View>

      <Placeholder section={active} showTitle={false} bottomSpace={insets.bottom + 32} />

      {/* Scrim */}
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[StyleSheet.absoluteFill, styles.scrim, { opacity: anim }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View
        style={[
          styles.drawer,
          {
            paddingTop: insets.top + 24,
            transform: [
              { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-DRAWER_W, 0] }) },
            ],
          },
        ]}
      >
        <Text style={styles.brand}>BalanceMe</Text>
        {GROUPS.map((g) => (
          <View key={g.label}>
            <Text style={styles.group}>{g.label}</Text>
            {g.items.map((s) => {
              const on = s.id === active;
              return (
                <Pressable key={s.id} onPress={() => go(s.id)} style={[styles.item, on && styles.itemOn]}>
                  <IconStub active={on} size={20} />
                  <Text style={[styles.itemText, on && styles.itemTextOn]}>{s.label}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
        <View style={[styles.footer, { marginBottom: insets.bottom + 16 }]}>
          <Text style={styles.footerText}>Footer slot (profile, settings)</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  burger: { fontSize: 22, color: colors.text },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  scrim: { backgroundColor: 'rgba(0,0,0,0.3)' },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_W,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  brand: { fontSize: 20, fontWeight: '700', color: colors.accent, paddingHorizontal: 12, marginBottom: 12 },
  group: {
    fontSize: 11,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 6,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10 },
  itemOn: { backgroundColor: colors.accentSoft },
  itemText: { fontSize: 15, color: colors.muted, fontWeight: '500' },
  itemTextOn: { color: colors.accent },
  footer: { marginTop: 'auto', padding: 16, borderRadius: 12, backgroundColor: colors.bg },
  footerText: { color: colors.muted, fontSize: 13 },
});
