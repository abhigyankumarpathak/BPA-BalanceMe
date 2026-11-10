// Option 4: home dashboard of tiles; tapping a tile opens that section with a back button
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SECTIONS } from './theme';
import { Box, IconStub, Placeholder } from './shared';

export default function HomeGrid() {
  const [open, setOpen] = useState(null); // null = home screen
  const [width, setWidth] = useState(400);
  const slide = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (open !== null) {
      slide.setValue(0);
      Animated.timing(slide, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    }
  }, [open]);

  const back = () =>
    Animated.timing(slide, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
      setOpen(null)
    );

  return (
    <View
      style={[styles.screen, { paddingTop: insets.top }]}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {/* Home screen */}
      <View style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.brand}>BalanceMe</Text>
        </View>
        <View style={styles.home}>
          <Box style={styles.summary} label="Summary / today" />
          <View style={styles.grid}>
            {SECTIONS.map((s) => (
              <Pressable key={s.id} style={styles.tile} onPress={() => setOpen(s.id)}>
                <IconStub active size={32} />
                <Text style={styles.tileText}>{s.label}</Text>
                <Text style={styles.chev}>›</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Pushed detail screen */}
      {open !== null && (
        <Animated.View
          style={[
            styles.detail,
            {
              paddingTop: insets.top,
              transform: [
                { translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) },
              ],
            },
          ]}
        >
          <View style={styles.detailHeader}>
            <Pressable onPress={back} hitSlop={10}>
              <Text style={styles.back}>‹ Back</Text>
            </Pressable>
            <Text style={styles.detailTitle}>Section {open}</Text>
            <View style={{ width: 60 }} />
          </View>
          <Placeholder section={open} showTitle={false} bottomSpace={insets.bottom + 32} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { height: 52, justifyContent: 'center', paddingHorizontal: 20 },
  brand: { fontSize: 22, fontWeight: '700', color: colors.accent },
  home: { padding: 20, paddingTop: 4 },
  summary: { height: 140, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47%',
    flexGrow: 1,
    height: 110,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: 'space-between',
  },
  tileText: { fontSize: 15, fontWeight: '600', color: colors.text },
  chev: { position: 'absolute', right: 14, top: 12, fontSize: 22, color: colors.muted },
  detail: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.bg },
  detailHeader: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  back: { width: 60, fontSize: 16, color: colors.accent, fontWeight: '600' },
  detailTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
});
