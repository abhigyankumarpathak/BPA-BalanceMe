// Option 3: scrollable tabs along the top; swipe left/right between sections
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, SECTIONS } from './theme';
import { Placeholder } from './shared';

export default function TopTabs() {
  const [active, setActive] = useState(1);
  const [width, setWidth] = useState(0);
  const pager = useRef(null);
  const insets = useSafeAreaInsets();

  const go = (id) => {
    setActive(id);
    pager.current?.scrollTo({ x: (id - 1) * width, animated: true });
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.brand}>BalanceMe</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabStrip}
        contentContainerStyle={styles.tabStripInner}
      >
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <Pressable key={s.id} onPress={() => go(s.id)} style={[styles.tab, on && styles.tabOn]}>
              <Text style={[styles.tabText, on && styles.tabTextOn]}>{s.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.flex} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 && (
          <ScrollView
            ref={pager}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setActive(Math.round(e.nativeEvent.contentOffset.x / width) + 1)
            }
          >
            {SECTIONS.map((s) => (
              <View key={s.id} style={{ width }}>
                <Placeholder section={s.id} bottomSpace={insets.bottom + 32} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { height: 52, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: colors.surface },
  brand: { fontSize: 20, fontWeight: '700', color: colors.accent },
  tabStrip: {
    flexGrow: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  tabStripInner: { paddingHorizontal: 12 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderColor: 'transparent',
  },
  tabOn: { borderColor: colors.accent },
  tabText: { fontSize: 14, color: colors.muted, fontWeight: '600' },
  tabTextOn: { color: colors.accent },
});
