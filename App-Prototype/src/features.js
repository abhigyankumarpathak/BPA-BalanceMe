// Design mock-ups of the ten extra features. Visual only: sample data, no real functionality.
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from './state';
import { Button, Card, Chip, ChipRow, IconBubble, Progress, Row, T, ToggleRow } from './ui';
import { WEEK, WEEK_MOODS } from './mockData';

function FeatureHeader({ title, subtitle }) {
  const t = useTheme();
  return (
    <View style={{ gap: 2 }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <T variant="h2" style={{ flex: 1 }}>{title}</T>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: t.accentSoft }}>
          <Text style={{ fontSize: 10, fontWeight: '800', letterSpacing: 0.8, color: t.accent }}>CONCEPT</Text>
        </View>
      </Row>
      {subtitle ? <T variant="muted">{subtitle}</T> : null}
    </View>
  );
}

function Bubble({ letter, color, size = 34 }) {
  const t = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color || t.accent,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: t.surface,
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '800', fontSize: size * 0.42 }}>{letter}</Text>
    </View>
  );
}

/* ---------- Screen Time Overview ---------- */

// 1. Intentional vs. Autopilot Time
export function IntentionalTime() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Intentional vs. autopilot" subtitle="How much of today was on purpose?" />
      <View style={{ flexDirection: 'row', height: 18, borderRadius: 9, overflow: 'hidden' }}>
        <View style={{ flex: 65, backgroundColor: t.accent }} />
        <View style={{ flex: 35, backgroundColor: t.chartMuted }} />
      </View>
      <Row>
        <View style={{ flex: 1, gap: 2 }}>
          <Row gap={6}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.accent }} />
            <T style={{ fontWeight: '700' }}>2h 05m intentional</T>
          </Row>
          <T variant="small">School, creating, talking with friends</T>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Row gap={6}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.chartMuted }} />
            <T style={{ fontWeight: '700' }}>1h 07m autopilot</T>
          </Row>
          <T variant="small">Scrolling without a plan</T>
        </View>
      </Row>
      <T variant="small">Tap any session to re-label it. You decide what counts.</T>
    </Card>
  );
}

// 2. When You Scroll (heatmap: days x 3-hour blocks)
const HEAT = [
  [0, 1, 0, 1, 1, 2, 3, 4],
  [0, 1, 1, 1, 2, 2, 3, 3],
  [0, 0, 1, 1, 1, 3, 4, 2],
  [1, 1, 0, 1, 2, 2, 4, 4],
  [0, 1, 1, 0, 2, 3, 3, 2],
  [0, 0, 1, 2, 3, 3, 4, 3],
  [0, 0, 1, 2, 2, 3, 3, 1],
];
const BLOCKS = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'];

export function ScrollHeatmap() {
  const t = useTheme();
  const opacity = [0.08, 0.25, 0.45, 0.7, 1];
  return (
    <Card>
      <FeatureHeader title="When you scroll" subtitle="Your busiest time this week: 9 PM to midnight." />
      <View style={{ gap: 4 }}>
        {HEAT.map((row, d) => (
          <Row key={d} gap={4}>
            <T variant="small" style={{ width: 34 }}>{WEEK[d].today ? 'Today' : WEEK[d].day}</T>
            {row.map((v, i) => (
              <View key={i} style={{ flex: 1, height: 18, borderRadius: 5, backgroundColor: t.accent, opacity: opacity[v] }} />
            ))}
          </Row>
        ))}
        <Row gap={4}>
          <View style={{ width: 34 }} />
          {BLOCKS.map((b) => (
            <T key={b} variant="small" style={{ flex: 1, textAlign: 'center', fontSize: 10 }}>{b}</T>
          ))}
        </Row>
      </View>
      <Row gap={6}>
        <T variant="small">Less</T>
        {opacity.map((o) => (
          <View key={o} style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: t.accent, opacity: o }} />
        ))}
        <T variant="small">More</T>
      </Row>
    </Card>
  );
}

/* ---------- Goal Setting ---------- */

// 3. Goal Buddy
export function GoalBuddy() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Goal buddy" subtitle="Team up with a friend and cheer each other on." />
      <View style={{ padding: 12, borderRadius: 14, backgroundColor: t.surfaceAlt, gap: 10 }}>
        <Row>
          <Row gap={0}>
            <Bubble letter="J" />
            <View style={{ marginLeft: -10 }}>
              <Bubble letter="M" color={t.dark ? '#7c6be0' : '#e07a5f'} />
            </View>
          </Row>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>You and Maya</T>
            <T variant="small">Phone-free dinner, every evening</T>
          </View>
        </Row>
        <Row>
          <View style={{ flex: 1 }}>
            <T variant="small">Your streak</T>
            <T style={{ fontWeight: '800', fontSize: 18 }}>🔥 4 days</T>
          </View>
          <View style={{ flex: 1 }}>
            <T variant="small">Maya's streak</T>
            <T style={{ fontWeight: '800', fontSize: 18 }}>🔥 6 days</T>
          </View>
        </Row>
        <T variant="small">Maya sent you a cheer: "Keep going! 💪"</T>
      </View>
      <ChipRow>
        {['👏 Cheer', '🔥 Hype', '💚 Proud of you'].map((c) => (
          <Chip key={c} label={c} />
        ))}
      </ChipRow>
      <Button small title="Invite a buddy" variant="secondary" icon="person-add-outline" />
    </Card>
  );
}

// 4. Grace Days
export function GraceDays() {
  const t = useTheme();
  const days = [
    { d: 'M', s: 'done' },
    { d: 'T', s: 'done' },
    { d: 'W', s: 'grace' },
    { d: 'T', s: 'done' },
    { d: 'F', s: 'done' },
    { d: 'S', s: 'done' },
    { d: 'S', s: 'today' },
  ];
  return (
    <Card>
      <FeatureHeader title="Grace days" subtitle="Life happens. Skip a day and keep your streak." />
      <Row style={{ justifyContent: 'space-between' }} gap={4}>
        {days.map((x, i) => (
          <View key={i} style={{ alignItems: 'center', gap: 4 }}>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: x.s === 'done' ? t.accent : x.s === 'grace' ? t.highlight : 'transparent',
                borderWidth: x.s === 'today' ? 2 : 0,
                borderColor: t.accent,
                borderStyle: 'dashed',
              }}
            >
              <Text style={{ fontSize: 16, color: t.onAccent, fontWeight: '800' }}>
                {x.s === 'done' ? '✓' : x.s === 'grace' ? '🌿' : ''}
              </Text>
            </View>
            <T variant="small">{x.d}</T>
          </View>
        ))}
      </Row>
      <Row style={{ justifyContent: 'space-between' }}>
        <T variant="small">🌿 = grace day used</T>
        <T variant="small" style={{ fontWeight: '700' }}>2 left this month</T>
      </Row>
      <Button small title="Use a grace day today" variant="secondary" icon="leaf-outline" />
    </Card>
  );
}

/* ---------- Reminders & Nudges ---------- */

// 5. Intention Check
export function IntentionCheck() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Intention check" subtitle="A quick pause when you open apps you choose." />
      <View style={{ padding: 16, borderRadius: 18, backgroundColor: t.dark ? '#000000' : t.text, gap: 12 }}>
        <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: 17, textAlign: 'center' }}>
          What brings you here?
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, textAlign: 'center' }}>
          Opening a social app · 3rd time this hour
        </Text>
        <View style={{ gap: 8 }}>
          {['😴 Just bored', '💬 Catching up with friends', '🔎 Looking something up', '🎨 Getting inspired'].map((o) => (
            <View key={o} style={{ padding: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)' }}>
              <Text style={{ color: '#ffffff', fontWeight: '600' }}>{o}</Text>
            </View>
          ))}
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, textAlign: 'center' }}>
          Your answer helps you spot patterns. It never blocks you.
        </Text>
      </View>
      <T variant="small">Turned on for: Social, Video</T>
    </Card>
  );
}

// 6. Swap Ideas
const SWAPS = [
  { emoji: '🧘', title: 'Stretch', time: '2 min' },
  { emoji: '🎧', title: 'One-song break', time: '3 min' },
  { emoji: '💬', title: 'Text a friend', time: '1 min' },
  { emoji: '🚶', title: 'Quick walk', time: '10 min' },
  { emoji: '💧', title: 'Grab water', time: '1 min' },
];

export function SwapIdeas() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Swap ideas" subtitle="Instead of scrolling, try something quick offline." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {SWAPS.map((s) => (
          <View key={s.title} style={{ width: 110, padding: 12, borderRadius: 16, backgroundColor: t.surfaceAlt, gap: 6 }}>
            <Text style={{ fontSize: 28 }}>{s.emoji}</Text>
            <T style={{ fontWeight: '700', fontSize: 14 }}>{s.title}</T>
            <T variant="small">{s.time}</T>
          </View>
        ))}
      </ScrollView>
      <T variant="small">Picked for you based on: evening, feeling okay.</T>
    </Card>
  );
}

/* ---------- Focus Mode ---------- */

// 7. Focus Garden
const GARDEN = ['🌷', '🌻', '🌵', '🌳', '🌼', '🌿', '🍀', '🌸', '🌲', '🌱', '🌺', '🪴'];

export function FocusGarden() {
  const t = useTheme();
  const stages = ['🌱', '🌿', '🪴', '🌳'];
  return (
    <Card>
      <FeatureHeader title="Focus garden" subtitle="Your plant grows while you focus. Stop early and it just waits for you." />
      <Row style={{ justifyContent: 'space-between', paddingHorizontal: 8 }}>
        {stages.map((s, i) => (
          <View key={s} style={{ alignItems: 'center', gap: 4, opacity: i <= 1 ? 1 : 0.35 }}>
            <Text style={{ fontSize: i === 1 ? 44 : 30 }}>{s}</Text>
            <T variant="small">{['Start', 'Now', '75%', 'Done'][i]}</T>
          </View>
        ))}
      </Row>
      <T variant="label">Your garden · 12 plants</T>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {GARDEN.map((p, i) => (
          <View key={i} style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: t.surfaceAlt, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>{p}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

// 8. Study Rooms
const ROOMS = [
  { name: 'AP Bio cram 📚', people: ['A', 'K', 'S', 'R'], left: '18 min left' },
  { name: 'Quiet reading 📖', people: ['L', 'D'], left: '32 min left' },
  { name: 'Essay grind ✍️', people: ['T', 'J', 'N'], left: 'Starting soon' },
];

export function StudyRooms() {
  const t = useTheme();
  const colors = [t.accent, t.chartMuted, t.dark ? '#7c6be0' : '#e07a5f', t.highlight];
  return (
    <Card>
      <FeatureHeader title="Study rooms" subtitle="Focus together. Everyone's timer runs at the same time." />
      {ROOMS.map((r) => (
        <Row key={r.name} style={{ padding: 12, borderRadius: 14, backgroundColor: t.surfaceAlt }}>
          <View style={{ flex: 1, gap: 6 }}>
            <T style={{ fontWeight: '700' }}>{r.name}</T>
            <Row gap={8}>
              <Row gap={0}>
                {r.people.map((p, i) => (
                  <View key={p} style={{ marginLeft: i ? -8 : 0 }}>
                    <Bubble letter={p} size={26} color={colors[i % colors.length]} />
                  </View>
                ))}
              </Row>
              <T variant="small">{r.people.length} focusing · {r.left}</T>
            </Row>
          </View>
          <Button small title="Join" />
        </Row>
      ))}
      <Button small title="Create a room" variant="secondary" icon="add" />
    </Card>
  );
}

/* ---------- Reflection & Insights ---------- */

// 9. Weekly Recap
const RECAP = [
  { top: 'Your week in BalanceMe', big: '25h 18m', sub: 'of screen time, 2 hours less than last week' },
  { top: 'Your most intentional day', big: 'Friday', sub: 'Mostly school and talking with friends' },
  { top: 'You grew', big: '4 plants 🌱', sub: 'in your focus garden this week' },
];

export function WeeklyRecap() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Weekly recap" subtitle="A story-style summary you can share to Instagram or TikTok." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {RECAP.map((r, i) => (
          <View
            key={r.top}
            style={{
              width: 160,
              height: 270,
              borderRadius: 20,
              padding: 14,
              justifyContent: 'space-between',
              backgroundColor: i === 1 ? t.highlight : t.accent,
            }}
          >
            <Row gap={4}>
              {RECAP.map((_, j) => (
                <View key={j} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i === 1 ? '#1b1938' : t.onAccent, opacity: j <= i ? 0.9 : 0.3 }} />
              ))}
            </Row>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: i === 1 ? '#1b1938' : t.onAccent }}>{r.top}</Text>
              <Text style={{ fontSize: 28, fontWeight: '900', color: i === 1 ? '#1b1938' : t.onAccent }}>{r.big}</Text>
              <Text style={{ fontSize: 13, color: i === 1 ? '#1b1938' : t.onAccent }}>{r.sub}</Text>
            </View>
            <Text style={{ fontSize: 11, fontWeight: '800', color: i === 1 ? '#1b1938' : t.onAccent }}>BalanceMe</Text>
          </View>
        ))}
      </ScrollView>
      <Button small title="Share to story" icon="share-social-outline" />
    </Card>
  );
}

// 10. Mood and Screen Time Chart (scatter plot)
export function MoodScreenChart() {
  const t = useTheme();
  const H = 170;
  const moods = [...WEEK_MOODS, 4];
  const minM = 150;
  const maxM = 280;
  return (
    <Card>
      <FeatureHeader title="Mood and screen time" subtitle="Each dot is a day. Lower screen time lined up with better moods." />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ justifyContent: 'space-between', height: H, paddingVertical: 2 }}>
          {['😄', '🙂', '😐', '😕', '😞'].map((e) => (
            <Text key={e} style={{ fontSize: 14 }}>{e}</Text>
          ))}
        </View>
        <View style={{ flex: 1, height: H, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: t.line }}>
          {/* Trend line */}
          <View
            style={{
              position: 'absolute',
              left: '5%',
              right: '5%',
              top: H * 0.5,
              borderTopWidth: 2,
              borderStyle: 'dashed',
              borderColor: t.highlight,
              transform: [{ rotate: '24deg' }],
            }}
          />
          {WEEK.map((d, i) => {
            const x = ((d.minutes - minM) / (maxM - minM)) * 100;
            const y = ((5 - moods[i]) / 4) * (H - 16);
            return (
              <View
                key={d.day}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: y,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: d.today ? t.highlight : t.accent,
                  borderWidth: 2,
                  borderColor: t.surface,
                }}
              />
            );
          })}
        </View>
      </View>
      <Row style={{ justifyContent: 'space-between', paddingLeft: 26 }}>
        <T variant="small">2h 30m</T>
        <T variant="small">Screen time</T>
        <T variant="small">4h 40m</T>
      </Row>
    </Card>
  );
}

/* ======================================================================
   Additional concepts (3 more per section)
   ====================================================================== */

/* ---------- Screen Time Overview ---------- */

// 3. Pickup Triggers
const TRIGGERS = [
  { icon: 'notifications-outline', label: 'A notification', count: 24 },
  { icon: 'repeat-outline', label: 'Habit, no reason', count: 19 },
  { icon: 'chatbubble-outline', label: 'A message', count: 11 },
  { icon: 'cafe-outline', label: 'Boredom', count: 4 },
];

export function PickupTriggers() {
  const max = Math.max(...TRIGGERS.map((x) => x.count));
  return (
    <Card>
      <FeatureHeader title="Pickup triggers" subtitle="What made you grab your phone today (58 pickups)." />
      {TRIGGERS.map((x) => (
        <Row key={x.label}>
          <IconBubble name={x.icon} />
          <View style={{ flex: 1, gap: 6 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T style={{ fontWeight: '600' }}>{x.label}</T>
              <T variant="muted">{x.count}</T>
            </Row>
            <Progress value={x.count / max} height={6} />
          </View>
        </Row>
      ))}
      <T variant="small">Tip: most pickups started with a notification. Bundling them could help.</T>
    </Card>
  );
}

// 4. Balance Score
export function BalanceScore() {
  const t = useTheme();
  const parts = [
    ['Screen time', 0.8],
    ['Sleep', 0.7],
    ['Mood', 0.85],
    ['Focus', 0.75],
  ];
  return (
    <Card>
      <FeatureHeader title="Balance score" subtitle="One friendly number for your whole day. Not a grade." />
      <Row gap={18}>
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 10,
            borderColor: t.accent,
            borderRightColor: t.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ rotate: '-30deg' }],
          }}
        >
          <View style={{ transform: [{ rotate: '30deg' }], alignItems: 'center' }}>
            <T style={{ fontSize: 34, fontWeight: '900' }}>78</T>
            <T variant="small">Balanced</T>
          </View>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          {parts.map(([k, v]) => (
            <View key={k} style={{ gap: 4 }}>
              <T variant="small" style={{ fontWeight: '700' }}>{k}</T>
              <Progress value={v} height={6} />
            </View>
          ))}
        </View>
      </Row>
      <T variant="small">Up 6 points from yesterday, mostly from a better mood check-in.</T>
    </Card>
  );
}

// 5. Offline Wins
export function OfflineWins() {
  const t = useTheme();
  // Day timeline from 7 AM to 11 PM; offline stretches highlighted
  const segments = [
    [0, 8, 'on'], [8, 18, 'off'], [18, 40, 'on'], [40, 62, 'off'], [62, 85, 'on'], [85, 92, 'off'], [92, 100, 'on'],
  ];
  return (
    <Card>
      <FeatureHeader title="Offline wins" subtitle="Celebrate the time you spent away from your screen." />
      <View style={{ padding: 14, borderRadius: 14, backgroundColor: t.accentSoft, gap: 4 }}>
        <T variant="small" style={{ fontWeight: '700', color: t.accent }}>LONGEST STRETCH TODAY</T>
        <T style={{ fontSize: 26, fontWeight: '900' }}>2h 40m 🎉</T>
        <T variant="small">1:00 PM to 3:40 PM</T>
      </View>
      <View style={{ height: 16, borderRadius: 8, overflow: 'hidden', flexDirection: 'row' }}>
        {segments.map(([a, b, s], i) => (
          <View key={i} style={{ flex: b - a, backgroundColor: s === 'off' ? t.accent : t.surfaceAlt }} />
        ))}
      </View>
      <Row style={{ justifyContent: 'space-between' }}>
        <T variant="small">7 AM</T>
        <T variant="small">3 PM</T>
        <T variant="small">11 PM</T>
      </Row>
      <ChipRow>
        {['🍽️ Phone-free lunch', '🏀 Practice', '📚 Library hour'].map((c) => (
          <Chip key={c} label={c} />
        ))}
      </ChipRow>
    </Card>
  );
}

/* ---------- Goal Setting ---------- */

// 3. Step-Up Goals
export function StepUpGoals() {
  const t = useTheme();
  const steps = [
    { label: 'Week 1', goal: 'Under 4h a day', s: 'done' },
    { label: 'Week 2', goal: 'Under 3h 45m a day', s: 'done' },
    { label: 'Week 3', goal: 'Under 3h 30m a day', s: 'now' },
    { label: 'Week 4', goal: 'Under 3h 15m a day', s: 'next' },
  ];
  return (
    <Card>
      <FeatureHeader title="Step-up goals" subtitle="Start small. Your goal grows a little each week." />
      {steps.map((x, i) => (
        <Row key={x.label} style={{ alignItems: 'stretch' }}>
          <View style={{ alignItems: 'center', width: 30 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: x.s === 'next' ? t.surfaceAlt : t.accent,
                borderWidth: x.s === 'now' ? 3 : 0,
                borderColor: t.highlight,
              }}
            >
              <Text style={{ color: x.s === 'next' ? t.muted : t.onAccent, fontWeight: '800', fontSize: 13 }}>
                {x.s === 'done' ? '✓' : i + 1}
              </Text>
            </View>
            {i < steps.length - 1 && <View style={{ flex: 1, width: 2, minHeight: 14, backgroundColor: t.line }} />}
          </View>
          <View style={{ flex: 1, paddingBottom: 8 }}>
            <T style={{ fontWeight: '700', opacity: x.s === 'next' ? 0.6 : 1 }}>{x.goal}</T>
            <T variant="small">{x.label}{x.s === 'now' ? ' · this week, 4 of 7 days so far' : x.s === 'done' ? ' · completed' : ' · up next'}</T>
          </View>
        </Row>
      ))}
    </Card>
  );
}

// 4. Milestone Rewards
const REWARDS = [
  { emoji: '🌅', label: 'Sunset theme', got: true },
  { emoji: '🦊', label: 'Fox sticker', got: true },
  { emoji: '🎧', label: 'Lo-fi pack', got: true },
  { emoji: '🌌', label: 'Galaxy theme', got: false, need: '3 more days' },
  { emoji: '🐢', label: 'Turtle sticker', got: false, need: '5 sessions' },
  { emoji: '🏆', label: '30-day badge', got: false, need: '26 more days' },
];

export function MilestoneRewards() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Milestone rewards" subtitle="Hit milestones to unlock themes and stickers." />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {REWARDS.map((r) => (
          <View
            key={r.label}
            style={{
              width: '31%',
              flexGrow: 1,
              padding: 10,
              borderRadius: 14,
              alignItems: 'center',
              gap: 4,
              backgroundColor: r.got ? t.accentSoft : t.surfaceAlt,
              opacity: r.got ? 1 : 0.7,
            }}
          >
            <Text style={{ fontSize: 28 }}>{r.got ? r.emoji : '🔒'}</Text>
            <T variant="small" style={{ fontWeight: '700', textAlign: 'center', color: t.text }}>{r.label}</T>
            <T variant="small" style={{ fontSize: 10, textAlign: 'center' }}>{r.got ? 'Unlocked' : r.need}</T>
          </View>
        ))}
      </View>
    </Card>
  );
}

// 5. Why It Matters
export function WhyItMatters() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Why it matters" subtitle="Connect each goal to a reason that's yours." />
      <View style={{ padding: 14, borderRadius: 14, backgroundColor: t.surfaceAlt, gap: 6, borderLeftWidth: 4, borderLeftColor: t.accent }}>
        <T variant="small" style={{ fontWeight: '700' }}>Screens off by 10:30 PM</T>
        <T style={{ fontSize: 17, fontStyle: 'italic' }}>"So I'm not exhausted at morning practice."</T>
        <T variant="small">Shown to you when you get a wind-down nudge.</T>
      </View>
      <T variant="label">Common reasons</T>
      <ChipRow>
        {['😴 Better sleep', '📈 Grades', '👯 Friends IRL', '🧠 Mental health', '🎨 More time to create'].map((c, i) => (
          <Chip key={c} label={c} selected={i === 0} />
        ))}
      </ChipRow>
    </Card>
  );
}

/* ---------- Reminders & Nudges ---------- */

// 3. Wind-Down Mode
export function WindDown() {
  const steps = ['#fff6e5', '#ffe0b2', '#f6b98a', '#a86b5c', '#4a3540', '#1e1a24'];
  return (
    <Card>
      <FeatureHeader title="Wind-down mode" subtitle="Your screen slowly gets warmer and dimmer before bed." />
      <View style={{ flexDirection: 'row', height: 54, borderRadius: 14, overflow: 'hidden' }}>
        {steps.map((c) => (
          <View key={c} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </View>
      <Row style={{ justifyContent: 'space-between' }}>
        <T variant="small">9:30 PM · starts</T>
        <T variant="small">10:30 PM · fully dimmed</T>
      </Row>
      <ToggleRow icon="moon-outline" title="Fade to grayscale" subtitle="Makes scrolling less tempting" value onValueChange={() => {}} />
      <ToggleRow icon="musical-notes-outline" title="Play a sleep sound" subtitle="Soft rain, 20 minutes" value={false} onValueChange={() => {}} />
    </Card>
  );
}

// 4. Smart Timing
export function SmartTiming() {
  const t = useTheme();
  const times = [
    ['Morning', 0.3],
    ['School', 0.1],
    ['After school', 0.9],
    ['Evening', 0.6],
    ['Late night', 0.45],
  ];
  return (
    <Card>
      <FeatureHeader title="Smart timing" subtitle="Nudges learn when they actually help you." />
      <View style={{ padding: 12, borderRadius: 14, backgroundColor: t.surfaceAlt, gap: 8 }}>
        <T style={{ fontWeight: '600' }}>Was that last nudge helpful?</T>
        <Row gap={8}>
          <Chip label="👍 Yes" selected />
          <Chip label="⏰ Not now" />
          <Chip label="🙅 Not helpful" />
        </Row>
      </View>
      <T variant="label">Where nudges help most</T>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 90, gap: 8 }}>
        {times.map(([k, v]) => (
          <View key={k} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: 90 }}>
            <View style={{ width: '100%', height: v * 70, borderRadius: 6, backgroundColor: v > 0.8 ? t.accent : t.chartMuted }} />
            <T variant="small" style={{ fontSize: 10, marginTop: 4, textAlign: 'center' }}>{k}</T>
          </View>
        ))}
      </View>
      <T variant="small">Best time for you: after school, 3 to 5 PM.</T>
    </Card>
  );
}

// 5. Friend Notes
const NOTES = [
  { from: 'Maya', letter: 'M', text: 'Proud of you for the phone-free dinner streak 💚', time: '2h ago' },
  { from: 'Leo', letter: 'L', text: "Study room at 7? I'll bring the snacks 📚", time: 'Yesterday' },
];

export function FriendNotes() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Friend notes" subtitle="Encouragement from friends, delivered as nudges." />
      {NOTES.map((n, i) => (
        <Row key={n.from} style={{ padding: 12, borderRadius: 14, backgroundColor: t.surfaceAlt, alignItems: 'flex-start' }}>
          <Bubble letter={n.letter} color={i ? t.chartMuted : t.accent} />
          <View style={{ flex: 1 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T style={{ fontWeight: '700' }}>{n.from}</T>
              <T variant="small">{n.time}</T>
            </Row>
            <T>{n.text}</T>
          </View>
        </Row>
      ))}
      <Button small title="Write a note to a friend" variant="secondary" icon="create-outline" />
    </Card>
  );
}

/* ---------- Focus Mode ---------- */

// 3. Soundscapes
const SOUNDS = [
  { emoji: '🌧️', label: 'Rain' },
  { emoji: '🎹', label: 'Lo-fi' },
  { emoji: '🌲', label: 'Forest' },
  { emoji: '🌊', label: 'Waves' },
  { emoji: '☕', label: 'Café' },
  { emoji: '🔥', label: 'Campfire' },
];

export function Soundscapes() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Soundscapes" subtitle="Background sounds that help you lock in." />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {SOUNDS.map((s, i) => (
          <View
            key={s.label}
            style={{
              width: '31%',
              flexGrow: 1,
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: 'center',
              gap: 4,
              backgroundColor: i === 0 ? t.accent : t.surfaceAlt,
            }}
          >
            <Text style={{ fontSize: 26 }}>{s.emoji}</Text>
            <Text style={{ fontWeight: '700', fontSize: 13, color: i === 0 ? t.onAccent : t.text }}>{s.label}</Text>
          </View>
        ))}
      </View>
      <Row style={{ padding: 12, borderRadius: 14, backgroundColor: t.accentSoft }}>
        <IconBubble name="pause" tone="accent" />
        <View style={{ flex: 1, gap: 6 }}>
          <T style={{ fontWeight: '700' }}>Now playing: Rain</T>
          <Progress value={0.6} height={5} />
        </View>
      </Row>
    </Card>
  );
}

// 4. Break Coach
export function BreakCoach() {
  const t = useTheme();
  const ideas = [
    ['👀', 'Eye rest', 'Look 20 feet away for 20 seconds'],
    ['🙆', 'Stretch', 'Reach up, roll your shoulders'],
    ['💧', 'Water', 'Grab a drink before round two'],
  ];
  return (
    <Card>
      <FeatureHeader title="Break coach" subtitle="Guided breaks between focus sessions." />
      <Row style={{ padding: 14, borderRadius: 14, backgroundColor: t.surfaceAlt }}>
        <View style={{ flex: 1 }}>
          <T variant="small">Next break in</T>
          <T style={{ fontSize: 26, fontWeight: '900' }}>12:00</T>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <T variant="small">Break length</T>
          <T style={{ fontWeight: '800' }}>5 min</T>
        </View>
      </Row>
      {ideas.map(([e, title, sub]) => (
        <Row key={title}>
          <Text style={{ fontSize: 24, width: 36, textAlign: 'center' }}>{e}</Text>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>{title}</T>
            <T variant="small">{sub}</T>
          </View>
        </Row>
      ))}
    </Card>
  );
}

// 5. Auto-Reply Status
export function AutoReply() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Auto-reply status" subtitle="Let people know you're focusing, without opening your phone." />
      <View style={{ gap: 8 }}>
        <View style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: 10, borderRadius: 16, borderBottomLeftRadius: 4, backgroundColor: t.surfaceAlt }}>
          <T>u coming to the group call?</T>
        </View>
        <View style={{ alignSelf: 'flex-end', maxWidth: '85%', padding: 10, borderRadius: 16, borderBottomRightRadius: 4, backgroundColor: t.accent }}>
          <Text style={{ color: t.onAccent, fontSize: 15 }}>Focusing right now 📚 Back at 4:30!</Text>
          <Text style={{ color: t.onAccent, fontSize: 10, opacity: 0.8, marginTop: 2 }}>Sent automatically by BalanceMe</Text>
        </View>
      </View>
      <ToggleRow icon="people-outline" title="Friends" subtitle="Get the auto-reply" value onValueChange={() => {}} />
      <ToggleRow icon="home-outline" title="Family" subtitle="Always comes through" value={false} onValueChange={() => {}} />
    </Card>
  );
}

/* ---------- Reflection & Insights ---------- */

// 3. Mood Calendar
const MONTH = [3, 4, 4, 2, 3, 5, 5, 4, 3, 3, 2, 4, 4, 5, 3, 4, 2, 3, 4, 5, 5, 4, 3, 4, 2, 3, 4, 5, 4, 0];
const MOOD_EMOJI = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };

export function MoodCalendar() {
  const t = useTheme();
  return (
    <Card>
      <FeatureHeader title="Mood calendar" subtitle="November at a glance. Tap a day to see your notes." />
      <Row gap={4}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <T key={i} variant="small" style={{ flex: 1, textAlign: 'center', fontWeight: '700' }}>{d}</T>
        ))}
      </Row>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <View style={{ width: `${(5 / 7) * 100}%` }} />
        {MONTH.map((m, i) => (
          <View key={i} style={{ width: `${100 / 7}%`, padding: 2 }}>
            <View
              style={{
                aspectRatio: 1,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: m >= 4 ? t.accentSoft : t.surfaceAlt,
                borderWidth: i === 9 ? 2 : 0,
                borderColor: t.accent,
              }}
            >
              <Text style={{ fontSize: 16 }}>{MOOD_EMOJI[m] || ''}</Text>
              {!m && <T variant="small" style={{ fontSize: 10 }}>{i + 1}</T>}
            </View>
          </View>
        ))}
      </View>
      <T variant="small">You felt good or great on 16 days this month.</T>
    </Card>
  );
}

// 4. Offline Moments
const MOMENTS = [
  { emoji: '🏔️', color: '#7fb7a4', text: 'Hiking with friends', date: 'Sat' },
  { emoji: '🍳', color: '#f2b880', text: 'Cooked dinner with Mom', date: 'Thu' },
  { emoji: '🎸', color: '#a99be6', text: 'Learned a new song', date: 'Tue' },
];

export function OfflineMoments() {
  return (
    <Card>
      <FeatureHeader title="Offline moments" subtitle="Save the real-life highlights from your week." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {MOMENTS.map((m) => (
          <View key={m.text} style={{ width: 140, gap: 6 }}>
            <View style={{ height: 120, borderRadius: 16, backgroundColor: m.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 44 }}>{m.emoji}</Text>
            </View>
            <T style={{ fontWeight: '700', fontSize: 14 }}>{m.text}</T>
            <T variant="small">{m.date}</T>
          </View>
        ))}
      </ScrollView>
      <Button small title="Add a moment" variant="secondary" icon="camera-outline" />
    </Card>
  );
}

// 5. Personal Tips
const TIPS = [
  ['moon-outline', 'Try charging your phone outside your room. Your best mood days came after nights with less late scrolling.'],
  ['notifications-off-outline', 'Mute group chats during homework. They caused 9 of your pickups yesterday.'],
  ['walk-outline', 'Your mood is higher on days with an offline stretch over 2 hours. Plan one for tomorrow?'],
];

export function PersonalTips() {
  return (
    <Card>
      <FeatureHeader title="Personal tips" subtitle="Ideas based on your own patterns. Keep what works." />
      {TIPS.map(([icon, text]) => (
        <View key={text} style={{ gap: 8 }}>
          <Row style={{ alignItems: 'flex-start' }}>
            <IconBubble name={icon} tone="soft" />
            <T style={{ flex: 1 }}>{text}</T>
          </Row>
          <Row gap={8} style={{ paddingLeft: 48 }}>
            <Chip label="Try it" selected />
            <Chip label="Not for me" />
          </Row>
        </View>
      ))}
    </Card>
  );
}

/* ---------- Which features each design option shows ---------- */

const SECTION_FEATURES = {
  overview: [IntentionalTime, ScrollHeatmap, PickupTriggers, BalanceScore, OfflineWins],
  goals: [GoalBuddy, GraceDays, StepUpGoals, MilestoneRewards, WhyItMatters],
  nudges: [IntentionCheck, SwapIdeas, WindDown, SmartTiming, FriendNotes],
  focus: [FocusGarden, StudyRooms, Soundscapes, BreakCoach, AutoReply],
  insights: [WeeklyRecap, MoodScreenChart, MoodCalendar, OfflineMoments, PersonalTips],
};

// Option N shows features N and N+1 of each section (wrapping around), so each feature appears in two options
export function SectionFeatures({ section }) {
  const t = useTheme();
  const slot = t.slot || 0;
  const list = SECTION_FEATURES[section];
  const A = list[slot % list.length];
  const B = list[(slot + 1) % list.length];
  return (
    <>
      <A />
      <B />
    </>
  );
}
