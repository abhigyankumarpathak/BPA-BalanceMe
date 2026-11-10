import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './theme';

// Placeholder screen content for a section
export function Placeholder({ section, bottomSpace = 32, showTitle = true }) {
  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.page, { paddingBottom: bottomSpace }]}
    >
      {showTitle && <Text style={styles.h1}>Section {section}</Text>}
      <Text style={styles.lead}>Placeholder content for section {section}.</Text>
      <Box style={styles.hero} label="Hero / banner" />
      <View style={styles.row}>
        <Box style={styles.card} label="Card" />
        <Box style={styles.card} label="Card" />
      </View>
      {[100, 90, 70, 100, 85].map((w, i) => (
        <View key={i} style={[styles.line, { width: `${w}%` }]} />
      ))}
      <Box style={styles.hero} label="Content block" />
    </ScrollView>
  );
}

export function Box({ style, label }) {
  return (
    <View style={[styles.box, style]}>
      <Text style={styles.boxLabel}>{label}</Text>
    </View>
  );
}

// Small square used as a stand-in for icons
export function IconStub({ active, size = 22 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 3,
        backgroundColor: active ? colors.accent : colors.placeholder,
      }}
    />
  );
}

// Floating pill (top-right) that returns to the options list
export function ExitPill({ onExit, number, name }) {
  const insets = useSafeAreaInsets();
  return (
    <Pressable onPress={onExit} style={[styles.exit, { top: insets.top + 10 }]}>
      <Text style={styles.exitText}>
        ‹ Options · {number}: {name}
      </Text>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  page: { padding: 20 },
  h1: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 4 },
  lead: { fontSize: 15, color: colors.muted, marginBottom: 20 },
  box: {
    backgroundColor: colors.placeholder,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLabel: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  hero: { height: 180, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  card: { flex: 1, height: 120 },
  line: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.placeholder,
    marginBottom: 10,
  },
  exit: {
    position: 'absolute',
    right: 12,
    zIndex: 100,
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  exitText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
