// Required screen 4: Focus mode
import { useState } from 'react';
import { View } from 'react-native';
import { useApp, useTheme } from '../state';
import { Button, Card, Chip, ChipRow, IconBubble, Progress, Row, Screen, T, ToggleRow } from '../ui';

const DURATIONS = [
  { label: '1 min (demo)', minutes: 1 },
  { label: '15 min', minutes: 15 },
  { label: '25 min', minutes: 25 },
  { label: '45 min', minutes: 45 },
];
const TASKS = ['Homework', 'Reading', 'Practice', 'Creating', 'Rest'];

export default function FocusScreen() {
  const t = useTheme();
  const { focus, setFocus } = useApp();
  const [task, setTask] = useState('Homework');
  const [music, setMusic] = useState(true);

  const total = focus.duration * 60;
  const started = focus.remaining < total;
  const mm = String(Math.floor(focus.remaining / 60)).padStart(2, '0');
  const ss = String(focus.remaining % 60).padStart(2, '0');
  const status = focus.running ? `Focusing on ${task.toLowerCase()}` : started ? 'Paused' : 'Ready when you are';

  const pick = (minutes) => setFocus((f) => ({ ...f, duration: minutes, remaining: minutes * 60, finished: false }));
  const startPause = () => setFocus((f) => ({ ...f, running: !f.running, finished: false }));
  const reset = () => setFocus((f) => ({ ...f, running: false, remaining: f.duration * 60 }));

  return (
    <Screen>
      <T variant="muted">Silence distractions and give your full attention to one thing at a time.</T>

      {focus.finished && (
        <Card tone="soft">
          <T variant="h2">Session complete! 🎉</T>
          <T>That's {focus.sessions} focus sessions this week. Take a breather before the next one.</T>
          <Button small title="Nice" variant="secondary" onPress={() => setFocus((f) => ({ ...f, finished: false, remaining: f.duration * 60 }))} />
        </Card>
      )}

      <Card style={{ alignItems: 'center', paddingVertical: 28 }}>
        <View
          accessibilityLabel={`Timer: ${mm} minutes ${ss} seconds remaining`}
          style={{
            width: 210,
            height: 210,
            borderRadius: 105,
            borderWidth: 12,
            borderColor: focus.running ? t.accent : t.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T style={{ fontSize: 48, lineHeight: 58, fontWeight: '800', letterSpacing: -1, fontVariant: ['tabular-nums'] }}>
            {mm}:{ss}
          </T>
          <T variant="small" style={{ textAlign: 'center', paddingHorizontal: 20, lineHeight: 16 }}>{status}</T>
        </View>
        <View style={{ alignSelf: 'stretch', marginTop: 8 }}>
          <Progress value={1 - focus.remaining / total} height={6} />
        </View>
        <Row style={{ alignSelf: 'stretch' }}>
          <Button
            style={{ flex: 1 }}
            title={focus.running ? 'Pause' : started ? 'Resume' : 'Start focus'}
            icon={focus.running ? 'pause' : 'play'}
            onPress={startPause}
          />
          <Button title="Reset" variant="secondary" icon="refresh" onPress={reset} disabled={!started} />
        </Row>
      </Card>

      <Card>
        <T variant="label">How long</T>
        <ChipRow>
          {DURATIONS.map((d) => (
            <Chip key={d.minutes} label={d.label} selected={focus.duration === d.minutes} disabled={focus.running} onPress={() => pick(d.minutes)} />
          ))}
        </ChipRow>
        <T variant="label">What are you focusing on?</T>
        <ChipRow>
          {TASKS.map((x) => (
            <Chip key={x} label={x} selected={x === task} onPress={() => setTask(x)} />
          ))}
        </ChipRow>
      </Card>

      <Card>
        <T variant="h2">While focus mode is on</T>
        {[
          ['notifications-off-outline', 'Notifications are silenced'],
          ['pause-circle-outline', 'Social and video apps are paused'],
          ['star-outline', 'Messages from favorites still come through'],
        ].map(([icon, label]) => (
          <Row key={label}>
            <IconBubble name={icon} tone="soft" />
            <T style={{ flex: 1 }}>{label}</T>
          </Row>
        ))}
        <ToggleRow icon="musical-notes-outline" title="Allow music apps" subtitle="Keep your study playlist going" value={music} onValueChange={setMusic} />
      </Card>

      <Row>
        <Card style={{ flex: 1 }}>
          <T variant="big" style={{ fontSize: 30 }}>{focus.sessions}</T>
          <T variant="small">Sessions this week</T>
        </Card>
        <Card style={{ flex: 1 }}>
          <T variant="big" style={{ fontSize: 30 }}>1h 40m</T>
          <T variant="small">Focused this week</T>
        </Card>
      </Row>
    </Screen>
  );
}
