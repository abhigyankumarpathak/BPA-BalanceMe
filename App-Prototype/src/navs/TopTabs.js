// Option 3: tabs across the top; swipe left and right between screens
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../state';
import { Header, Icon, PadContext } from '../ui';
import { TABS } from '../screens';

export default function TopTabs({ onProfile }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const pager = useRef(null);

  const go = (i) => {
    setActive(i);
    pager.current?.scrollTo({ x: i * width, animated: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <View style={{ backgroundColor: t.surface }}>
        <Header title="BalanceMe" brand onProfile={onProfile} transparent />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole="tablist"
        style={{ flexGrow: 0, backgroundColor: t.surface, borderBottomWidth: 1, borderColor: t.line }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 10, gap: 8 }}
      >
        {TABS.map((tab, i) => {
          const on = i === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => go(i)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                minHeight: 40,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: on ? t.accent : t.surfaceAlt,
              }}
            >
              <Icon name={on ? tab.icon : `${tab.icon}-outline`} size={16} color={on ? t.onAccent : t.text} />
              <Text style={{ fontWeight: '700', fontSize: 14, color: on ? t.onAccent : t.text }}>{tab.title}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ flex: 1 }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        {width > 0 && (
          <ScrollView
            ref={pager}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / width))}
          >
            {TABS.map(({ key, Component }) => (
              <View key={key} style={{ width }}>
                <PadContext.Provider value={insets.bottom + 32}>
                  <Component />
                </PadContext.Provider>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
