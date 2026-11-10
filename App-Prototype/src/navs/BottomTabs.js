// Option 1: classic bottom tab bar
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../state';
import { Header, Icon, PadContext } from '../ui';
import { TABS } from '../screens';

export default function BottomTabs({ onProfile }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(0);
  const { Component } = TABS[active];

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header title={TABS[active].title} onProfile={onProfile} />
      <PadContext.Provider value={32}>
        <Component />
      </PadContext.Provider>
      <View
        accessibilityRole="tablist"
        style={{
          flexDirection: 'row',
          backgroundColor: t.surface,
          borderTopWidth: 1,
          borderColor: t.line,
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
        }}
      >
        {TABS.map((tab, i) => {
          const on = i === active;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActive(i)}
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              accessibilityLabel={tab.title}
              style={{ flex: 1, alignItems: 'center', gap: 3, minHeight: 44 }}
            >
              <View style={{ paddingHorizontal: 16, paddingVertical: 4, borderRadius: 999, backgroundColor: on ? t.accentSoft : 'transparent' }}>
                <Icon name={on ? tab.icon : `${tab.icon}-outline`} size={22} color={on ? t.accent : t.muted} />
              </View>
              <Text style={{ fontSize: 11, fontWeight: on ? '800' : '600', color: on ? t.accent : t.muted }}>{tab.short}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
