// Option 4: bento-style home screen; each tile opens its screen with a back button
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp, useTheme } from '../state';
import { Header, HeaderButton, Icon, MoodPicker, PadContext, Progress, Screen, T } from '../ui';
import { TABS } from '../screens';
import { fmt, TODAY } from '../mockData';

const TILE_TEXT = {
  overview: () => `${fmt(TODAY.minutes)} today`,
  goals: (s) => `${s.goals.filter((g) => g.doneToday).length} of ${s.goals.length} done today`,
  nudges: (s) => `${s.reminders.filter((r) => r.on).length} reminders on`,
  focus: (s) => (s.focus.running ? 'Session running' : `${s.focus.sessions} sessions this week`),
  insights: () => 'New weekly patterns',
};

function Tile({ tab, onPress, big, color, fg }) {
  const t = useTheme();
  const state = useApp();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${tab.title}`}
      style={({ pressed }) => ({
        flexBasis: big ? '100%' : '47%',
        flexGrow: 1,
        minHeight: big ? 130 : 150,
        padding: 16,
        borderRadius: t.radius,
        backgroundColor: color,
        justifyContent: 'space-between',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.55)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={tab.icon} size={22} color={t.text} />
        </View>
        <Icon name="arrow-forward" size={20} color={fg} />
      </View>
      <View>
        <Text style={{ fontSize: big ? 22 : 17, fontWeight: '800', color: fg }}>{tab.title}</Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: fg, opacity: 0.85 }}>{TILE_TEXT[tab.key](state)}</Text>
      </View>
    </Pressable>
  );
}

export default function HomeGrid({ onProfile }) {
  const t = useTheme();
  const { user, mood, setMood, dailyLimit } = useApp();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(null);
  const [width, setWidth] = useState(400);
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open !== null) {
      slide.setValue(0);
      Animated.timing(slide, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    }
  }, [open]);

  const back = () =>
    Animated.timing(slide, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setOpen(null));

  // Tile colors: accent, highlight and soft tones for a bento look
  const colors = [
    [t.accent, t.onAccent],
    [t.highlight, '#1b1938'],
    [t.accentSoft, t.text],
    [t.surfaceAlt, t.text],
    [t.highlight, '#1b1938'],
  ];
  const Detail = open !== null ? TABS[open].Component : null;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <Header title="BalanceMe" brand onProfile={onProfile} transparent />
      <PadContext.Provider value={insets.bottom + 32}>
        <Screen style={{ paddingTop: 4 }}>
          <T variant="title">Hey {user?.name} ✨</T>
          <View style={{ padding: 16, gap: 10, borderRadius: t.radius, backgroundColor: t.surface, borderWidth: 1, borderColor: t.line }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T variant="label">Today so far</T>
              <T variant="small">Goal {fmt(dailyLimit)}</T>
            </View>
            <T variant="big">{fmt(TODAY.minutes)}</T>
            <Progress value={TODAY.minutes / dailyLimit} />
            <T variant="small" style={{ marginTop: 4 }}>Quick mood check:</T>
            <MoodPicker value={mood} onChange={setMood} />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {TABS.map((tab, i) => (
              <Tile key={tab.key} tab={tab} big={i === 0} color={colors[i][0]} fg={colors[i][1]} onPress={() => setOpen(i)} />
            ))}
          </View>
        </Screen>
      </PadContext.Provider>

      {Detail && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: t.bg,
            paddingTop: insets.top,
            transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }],
          }}
        >
          <Header title={TABS[open].title} left={<HeaderButton icon="chevron-back" label="Back to home" onPress={back} />} onProfile={onProfile} />
          <PadContext.Provider value={insets.bottom + 32}>
            <Detail />
          </PadContext.Provider>
        </Animated.View>
      )}
    </View>
  );
}
