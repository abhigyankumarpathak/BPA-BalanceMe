// Required screen 5: Reflection and insights
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useApp, useTheme } from '../state';
import { Button, Card, Chip, ChipRow, Field, IconBubble, MoodPicker, Row, Screen, T } from '../ui';
import { MOODS, REFLECTION_PROMPTS, WEEK, WEEK_MOODS } from '../mockData';

const emojiFor = (v) => MOODS.find((m) => m.value === v)?.emoji;

const INSIGHTS = [
  ['trending-down-outline', 'On days under 3.5 hours of screen time, your mood was "Good" or better.'],
  ['moon-outline', 'Late-night scrolling showed up on 3 nights. Your wind-down reminder can help.'],
  ['timer-outline', 'You did 2 more focus sessions than last week. Keep it up!'],
];

const BADGES = [
  { label: 'Early riser', emoji: '🌅', earned: true },
  { label: '4-day streak', emoji: '🔥', earned: true },
  { label: 'Focus five', emoji: '🎧', earned: false },
  { label: 'Offline weekend', emoji: '🏕️', earned: false },
];

export default function InsightsScreen() {
  const t = useTheme();
  const { mood, setMood, journal, setJournal } = useApp();
  const [prompt, setPrompt] = useState(0);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const moods = [...WEEK_MOODS, mood];

  const save = () => {
    if (!text.trim()) return;
    setJournal((j) => [{ id: `j${Date.now()}`, date: 'Today', mood, text: text.trim() }, ...j]);
    setText('');
    setSaved(true);
  };

  return (
    <Screen>
      <T variant="muted">Look back on your week and notice what helps you feel your best.</T>

      <Card>
        <T variant="h2">Your week in moods</T>
        <Row gap={4} style={{ justifyContent: 'space-between' }}>
          {WEEK.map((d, i) => (
            <View key={d.day} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: d.today ? t.accentSoft : t.surfaceAlt,
                }}
              >
                <Text style={{ fontSize: 22, color: t.muted }}>{emojiFor(moods[i]) || '?'}</Text>
              </View>
              <T variant="small" style={{ fontWeight: d.today ? '800' : '500' }}>{d.today ? 'Today' : d.day}</T>
            </View>
          ))}
        </Row>
        {!mood && (
          <>
            <T variant="small">Tap how you feel to fill in today:</T>
            <MoodPicker value={mood} onChange={setMood} />
          </>
        )}
      </Card>

      <Card>
        <T variant="h2">Patterns we noticed</T>
        {INSIGHTS.map(([icon, text]) => (
          <Row key={text} style={{ alignItems: 'flex-start' }}>
            <IconBubble name={icon} tone="soft" />
            <T style={{ flex: 1 }}>{text}</T>
          </Row>
        ))}
      </Card>

      <Card tone="soft">
        <T variant="label">Reflect</T>
        <T variant="h2">{REFLECTION_PROMPTS[prompt]}</T>
        <Field
          multiline
          placeholder="Write a few words. Only you can see this."
          value={text}
          onChangeText={(v) => {
            setText(v);
            setSaved(false);
          }}
        />
        <Row>
          <Button style={{ flex: 1 }} title="Save reflection" icon="checkmark" onPress={save} disabled={!text.trim()} />
          <Button
            title="New prompt"
            variant="secondary"
            icon="shuffle"
            onPress={() => setPrompt((p) => (p + 1) % REFLECTION_PROMPTS.length)}
          />
        </Row>
        {saved && <T variant="small" style={{ color: t.accent, fontWeight: '700' }}>Saved to your journal.</T>}
      </Card>

      <Card>
        <T variant="h2">Journal</T>
        {journal.map((j) => (
          <View key={j.id} style={{ gap: 4, paddingVertical: 6, borderTopWidth: 1, borderColor: t.line }}>
            <T variant="small" style={{ fontWeight: '700' }}>
              {j.date} {emojiFor(j.mood) || ''}
            </T>
            <T>{j.text}</T>
          </View>
        ))}
      </Card>

      <Card>
        <T variant="h2">Badges</T>
        <ChipRow>
          {BADGES.map((b) => (
            <Chip key={b.label} label={`${b.emoji} ${b.label}${b.earned ? '' : ' (locked)'}`} selected={b.earned} />
          ))}
        </ChipRow>
      </Card>
    </Screen>
  );
}
