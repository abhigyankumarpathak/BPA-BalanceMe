// Option 5: floating glowing pill; the active icon expands to show its name
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../state';
import { Header, Icon, PadContext } from '../ui';
import { TABS } from '../screens';

export default function FloatingBar({ onProfile }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(0);
  const { Component } = TABS[active];

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header title={TABS[active].title} onProfile={onProfile} transparent />
      <PadContext.Provider value={insets.bottom + 120}>
        <Component />
      </PadContext.Provider>

      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 18, alignItems: 'center' }}>
        <View
          accessibilityRole="tablist"
          style={{
            flexDirection: 'row',
            gap: 4,
            padding: 6,
            borderRadius: 999,
            backgroundColor: t.surfaceAlt,
            borderWidth: 1,
            borderColor: t.line,
            shadowColor: t.accent,
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 0 },
            elevation: 12,
          }}
        >
          {TABS.map((tab, i) => {
            const on = i === active;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActive(i)}
                accessibilityRole="tab"
                accessibilityLabel={tab.title}
                accessibilityState={{ selected: on }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  height: 46,
                  minWidth: 46,
                  justifyContent: 'center',
                  paddingHorizontal: on ? 16 : 10,
                  borderRadius: 999,
                  backgroundColor: on ? t.accent : 'transparent',
                }}
              >
                <Icon name={on ? tab.icon : `${tab.icon}-outline`} size={20} color={on ? t.onAccent : t.muted} />
                {on && <Text style={{ color: t.onAccent, fontWeight: '800', fontSize: 13 }}>{tab.short}</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
