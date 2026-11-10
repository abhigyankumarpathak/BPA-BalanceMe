// Option 2: menu button opens a side drawer with grouped sections
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp, useTheme } from '../state';
import { Avatar, Header, HeaderButton, Icon, Logo, PadContext, T } from '../ui';
import { TABS } from '../screens';

const W = 290;
const GROUPS = [
  { label: 'Today', keys: ['overview', 'focus'] },
  { label: 'Habits', keys: ['goals', 'nudges'] },
  { label: 'Look back', keys: ['insights'] },
];

export default function Drawer({ onProfile }) {
  const t = useTheme();
  const { user } = useApp();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const { Component } = TABS[active];

  useEffect(() => {
    Animated.timing(anim, { toValue: open ? 1 : 0, duration: 220, useNativeDriver: true }).start();
  }, [open]);

  const go = (i) => {
    setActive(i);
    setOpen(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header
        title={TABS[active].title}
        left={<HeaderButton icon="menu" label="Open menu" onPress={() => setOpen(true)} />}
        onProfile={onProfile}
      />
      <PadContext.Provider value={insets.bottom + 32}>
        <Component />
      </PadContext.Provider>

      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', opacity: anim }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityLabel="Close menu" />
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: W,
          backgroundColor: t.surface,
          paddingTop: insets.top + 20,
          paddingHorizontal: 14,
          borderRightWidth: 1,
          borderColor: t.line,
          transform: [{ translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-W - 10, 0] }) }],
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 8, marginBottom: 8 }}>
          <Logo size={36} />
          <Text style={{ fontSize: 20, fontWeight: '800', color: t.text }}>BalanceMe</Text>
        </View>
        {GROUPS.map((g) => (
          <View key={g.label}>
            <T variant="label" style={{ paddingHorizontal: 10, marginTop: 18, marginBottom: 6 }}>{g.label}</T>
            {g.keys.map((k) => {
              const i = TABS.findIndex((x) => x.key === k);
              const tab = TABS[i];
              const on = i === active;
              return (
                <Pressable
                  key={k}
                  onPress={() => go(i)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, backgroundColor: on ? t.accentSoft : 'transparent' }}
                >
                  <Icon name={on ? tab.icon : `${tab.icon}-outline`} size={20} color={on ? t.accent : t.muted} />
                  <Text style={{ fontSize: 15, fontWeight: '600', color: on ? t.accent : t.text }}>{tab.title}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
        <Pressable
          onPress={() => {
            setOpen(false);
            onProfile();
          }}
          accessibilityRole="button"
          style={{ marginTop: 'auto', marginBottom: insets.bottom + 16, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, backgroundColor: t.surfaceAlt }}
        >
          <Avatar />
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>{user?.name}</T>
            <T variant="small">Profile and settings</T>
          </View>
          <Icon name="chevron-forward" size={18} color={t.muted} />
        </Pressable>
      </Animated.View>
    </View>
  );
}
