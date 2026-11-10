// Required screen 3: Reminders and nudges
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { useApp, useTheme } from '../state';
import { Button, Card, Chip, ChipRow, Logo, Row, Screen, T, ToggleRow } from '../ui';
import { NUDGE_TONES } from '../mockData';
import { SectionFeatures } from '../features';

function NudgePreview({ message }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        padding: 14,
        borderRadius: 18,
        backgroundColor: t.dark ? t.surfaceAlt : '#ffffff',
        borderWidth: 1,
        borderColor: t.line,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <Logo size={36} />
      <View style={{ flex: 1 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T style={{ fontWeight: '700', fontSize: 14 }}>BalanceMe</T>
          <T variant="small">now</T>
        </Row>
        <T style={{ fontSize: 14 }}>{message}</T>
      </View>
    </View>
  );
}

export default function NudgesScreen() {
  const { reminders, setReminders, tone, setTone } = useApp();
  const [quietClass, setQuietClass] = useState(true);
  const [quietWeekend, setQuietWeekend] = useState(false);
  const [test, setTest] = useState(false);
  const drop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!test) return undefined;
    drop.setValue(0);
    Animated.spring(drop, { toValue: 1, useNativeDriver: true }).start();
    const id = setTimeout(() => setTest(false), 3500);
    return () => clearTimeout(id);
  }, [test]);

  const toggle = (id) => setReminders((rs) => rs.map((r) => (r.id === id ? { ...r, on: !r.on } : r)));
  const activeCount = reminders.filter((r) => r.on).length;

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <T variant="muted">Friendly check-ins, on your terms. Pick how they sound and when they show up.</T>

        <Card>
          <T variant="h2">Nudge tone</T>
          <ChipRow>
            {Object.keys(NUDGE_TONES).map((k) => (
              <Chip key={k} label={k} selected={k === tone} onPress={() => setTone(k)} />
            ))}
          </ChipRow>
          <T variant="label">Preview</T>
          <NudgePreview message={NUDGE_TONES[tone]} />
          <Button title="Send me a test nudge" icon="notifications-outline" variant="secondary" onPress={() => setTest(true)} />
        </Card>

        <SectionFeatures section="nudges" />

        <Card>
          <Row style={{ justifyContent: 'space-between' }}>
            <T variant="h2">Your reminders</T>
            <T variant="small">{activeCount} on</T>
          </Row>
          {reminders.map((r) => (
            <ToggleRow key={r.id} icon={r.icon} title={r.title} subtitle={r.detail} value={r.on} onValueChange={() => toggle(r.id)} />
          ))}
        </Card>

        <Card>
          <T variant="h2">Quiet hours</T>
          <ToggleRow icon="school-outline" title="Pause during class" subtitle="Weekdays, 8:00 AM to 3:00 PM" value={quietClass} onValueChange={setQuietClass} />
          <ToggleRow icon="cafe-outline" title="Pause on weekends" subtitle="Saturday and Sunday" value={quietWeekend} onValueChange={setQuietWeekend} />
        </Card>
      </Screen>

      {test && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            top: 12,
            opacity: drop,
            transform: [{ translateY: drop.interpolate({ inputRange: [0, 1], outputRange: [-40, 0] }) }],
          }}
        >
          <NudgePreview message={NUDGE_TONES[tone]} />
        </Animated.View>
      )}
    </View>
  );
}
