// Required screen 1: Screen time overview
import { View } from 'react-native';
import { useApp, useTheme } from '../state';
import { Card, IconBubble, MoodPicker, Progress, Row, Screen, T } from '../ui';
import { CATEGORIES, fmt, MOOD_REPLIES, TODAY, WEEK } from '../mockData';
import { SectionFeatures } from '../features';

function WeekChart() {
  const t = useTheme();
  const { dailyLimit } = useApp();
  const H = 140;
  const max = Math.max(...WEEK.map((d) => d.minutes), dailyLimit) * 1.1;
  return (
    <View accessibilityLabel={`Bar chart of daily screen time this week. Your goal is ${fmt(dailyLimit)} a day.`}>
      <View style={{ height: H, flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        {/* Goal line */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: (dailyLimit / max) * H,
            borderTopWidth: 2,
            borderStyle: 'dashed',
            borderColor: t.highlight,
          }}
        />
        {WEEK.map((d) => {
          const over = d.minutes > dailyLimit;
          return (
            <View key={d.day} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: H }}>
              <View
                style={{
                  width: '100%',
                  maxWidth: 30,
                  height: (d.minutes / max) * H,
                  borderRadius: 8,
                  backgroundColor: d.today ? t.accent : over ? t.chartMuted : t.surfaceAlt,
                  borderWidth: d.today ? 0 : 1,
                  borderColor: t.line,
                }}
              />
            </View>
          );
        })}
      </View>
      <Row gap={8} style={{ marginTop: 6 }}>
        {WEEK.map((d) => (
          <T
            key={d.day}
            variant="small"
            style={{ flex: 1, textAlign: 'center', fontWeight: d.today ? '800' : '500', color: d.today ? t.text : t.muted }}
          >
            {d.today ? 'Today' : d.day}
          </T>
        ))}
      </Row>
      <Row gap={6} style={{ marginTop: 8 }}>
        <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: t.highlight }} />
        <T variant="small">Your daily goal: {fmt(dailyLimit)}</T>
      </Row>
    </View>
  );
}

export default function OverviewScreen() {
  const t = useTheme();
  const { user, mood, setMood, dailyLimit } = useApp();
  const left = dailyLimit - TODAY.minutes;
  const avg = WEEK.reduce((s, d) => s + d.minutes, 0) / WEEK.length;
  const maxCat = Math.max(...CATEGORIES.map((c) => c.minutes));

  return (
    <Screen>
      <View>
        <T variant="muted">Sunday check-in</T>
        <T variant="title">Hi {user?.name || 'there'} 👋</T>
      </View>

      <Card>
        <T variant="label">Screen time today</T>
        <T variant="big">{fmt(TODAY.minutes)}</T>
        <Progress value={TODAY.minutes / dailyLimit} color={left < 0 ? t.chartMuted : t.accent} />
        <T variant="muted">
          {left >= 0
            ? `${fmt(left)} left before your ${fmt(dailyLimit)} goal. You're doing great.`
            : `${fmt(-left)} over your ${fmt(dailyLimit)} goal. No stress, tomorrow is a fresh start.`}
        </T>
        <Row style={{ marginTop: 6 }}>
          {[
            ['Pickups', TODAY.pickups],
            ['First pickup', TODAY.firstPickup],
            ['Notifications', TODAY.notifications],
          ].map(([k, v]) => (
            <View key={k} style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: t.surfaceAlt }}>
              <T style={{ fontWeight: '800', fontSize: 17 }}>{v}</T>
              <T variant="small">{k}</T>
            </View>
          ))}
        </Row>
      </Card>

      <Card>
        <T variant="h2">This week</T>
        <T variant="muted">You averaged {fmt(avg)} a day, 12% less than last week.</T>
        <WeekChart />
      </Card>

      <Card>
        <T variant="h2">Where your time went</T>
        {CATEGORIES.map((c) => (
          <Row key={c.name}>
            <IconBubble name={c.icon} />
            <View style={{ flex: 1, gap: 6 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <T style={{ fontWeight: '600' }}>{c.name}</T>
                <T variant="muted">{fmt(c.minutes)}</T>
              </Row>
              <Progress value={c.minutes / maxCat} height={6} />
            </View>
          </Row>
        ))}
      </Card>

      <SectionFeatures section="overview" />

      <Card tone="soft">
        <T variant="h2">How are you feeling right now?</T>
        <MoodPicker value={mood} onChange={setMood} />
        {mood && <T variant="body">{MOOD_REPLIES[mood]}</T>}
      </Card>

      <Card>
        <Row>
          <IconBubble name="sparkles-outline" tone="soft" />
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>Small win</T>
            <T variant="muted">You picked up your phone 9 fewer times than yesterday. That adds up.</T>
          </View>
        </Row>
      </Card>
    </Screen>
  );
}
