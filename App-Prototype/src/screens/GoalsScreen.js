// Required screen 2: Goal setting
import { useState } from 'react';
import { View } from 'react-native';
import { useApp, useTheme } from '../state';
import { Button, Card, Chip, ChipRow, Field, IconBubble, Progress, Row, Screen, T } from '../ui';
import { GOAL_TEMPLATES } from '../mockData';

const FREQUENCIES = ['Daily', 'Weekdays', 'Weekends'];

export default function GoalsScreen() {
  const t = useTheme();
  const { goals, setGoals } = useApp();
  const [template, setTemplate] = useState(0);
  const [text, setText] = useState('');
  const [freq, setFreq] = useState('Daily');
  const [added, setAdded] = useState('');

  const best = Math.max(0, ...goals.map((g) => g.streak));

  const toggleDone = (id) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id
          ? { ...g, doneToday: !g.doneToday, streak: g.streak + (g.doneToday ? -1 : 1) }
          : g
      )
    );

  const add = () => {
    const title = text.trim() || GOAL_TEMPLATES[template].example;
    setGoals((gs) => [
      ...gs,
      {
        id: `g${Date.now()}`,
        title,
        detail: `${freq} · just started`,
        icon: GOAL_TEMPLATES[template].icon,
        progress: 0,
        streak: 0,
        doneToday: false,
      },
    ]);
    setText('');
    setAdded(title);
  };

  return (
    <Screen>
      <T variant="muted">
        Goals you choose, at your own pace. Missed a day? No guilt, just pick back up tomorrow.
      </T>

      <Row>
        <Card tone="soft" style={{ flex: 1 }}>
          <T variant="big" style={{ fontSize: 30 }}>{goals.length}</T>
          <T variant="small">Active goals</T>
        </Card>
        <Card tone="soft" style={{ flex: 1 }}>
          <T variant="big" style={{ fontSize: 30 }}>{best} 🔥</T>
          <T variant="small">Best streak (days)</T>
        </Card>
      </Row>

      {goals.map((g) => (
        <Card key={g.id}>
          <Row>
            <IconBubble name={g.icon} tone="soft" />
            <View style={{ flex: 1 }}>
              <T style={{ fontWeight: '700' }}>{g.title}</T>
              <T variant="small">{g.detail}</T>
            </View>
          </Row>
          <Progress value={g.doneToday ? Math.max(g.progress, 1) : g.progress} />
          <Row style={{ justifyContent: 'space-between' }}>
            <T variant="small">{g.streak > 0 ? `🔥 ${g.streak}-day streak` : 'New goal, day one!'}</T>
            <Button
              small
              title={g.doneToday ? 'Done today' : 'Mark done'}
              icon={g.doneToday ? 'checkmark-circle' : 'ellipse-outline'}
              variant={g.doneToday ? 'primary' : 'secondary'}
              onPress={() => toggleDone(g.id)}
            />
          </Row>
        </Card>
      ))}

      <Card>
        <T variant="h2">Set a new goal</T>
        <T variant="label">Start from an idea</T>
        <ChipRow>
          {GOAL_TEMPLATES.map((g, i) => (
            <Chip key={g.label} label={g.label} icon={g.icon} selected={i === template} onPress={() => setTemplate(i)} />
          ))}
        </ChipRow>
        <Field
          label="Your goal"
          placeholder={GOAL_TEMPLATES[template].example}
          value={text}
          onChangeText={setText}
        />
        <T variant="label">How often</T>
        <ChipRow>
          {FREQUENCIES.map((f) => (
            <Chip key={f} label={f} selected={f === freq} onPress={() => setFreq(f)} />
          ))}
        </ChipRow>
        <Button title="Add goal" icon="add" onPress={add} />
        {added ? (
          <T variant="small" style={{ color: t.accent, fontWeight: '700' }}>
            Added "{added}". You've got this!
          </T>
        ) : null}
      </Card>
    </Screen>
  );
}
