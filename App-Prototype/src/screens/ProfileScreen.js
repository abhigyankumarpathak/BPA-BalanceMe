// Profile and settings (opened from the avatar in the header)
import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp, useTheme } from '../state';
import { Avatar, Button, Card, Chip, ChipRow, Disclaimer, Header, HeaderButton, Screen, T, ToggleRow } from '../ui';
import { FOCUS_AREAS, fmt } from '../mockData';

const LIMITS = [120, 180, 210, 240, 300];

export default function ProfileScreen({ onClose }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { user, dailyLimit, setDailyLimit, focusAreas, setFocusAreas, signOut, exitOption } = useApp();
  const [summary, setSummary] = useState(true);
  const [share, setShare] = useState(false);
  const [motion, setMotion] = useState(false);

  const toggleArea = (a) =>
    setFocusAreas((as) => (as.includes(a) ? as.filter((x) => x !== a) : [...as, a]));

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <Header title="Profile" left={<HeaderButton icon="chevron-back" label="Back" onPress={onClose} />} />
      <Screen style={{ paddingBottom: insets.bottom + 32 }}>
        <View style={{ alignItems: 'center', gap: 6 }}>
          <Avatar size={80} />
          <T variant="title">{user?.name}</T>
          <T variant="muted">{user?.email}</T>
        </View>

        <Card>
          <T variant="h2">Daily screen time goal</T>
          <T variant="muted">Flexible, not a rule. Change it whenever you need to.</T>
          <ChipRow>
            {LIMITS.map((m) => (
              <Chip key={m} label={fmt(m)} selected={m === dailyLimit} onPress={() => setDailyLimit(m)} />
            ))}
          </ChipRow>
        </Card>

        <Card>
          <T variant="h2">What you're working on</T>
          <ChipRow>
            {FOCUS_AREAS.map((a) => (
              <Chip key={a} label={a} selected={focusAreas.includes(a)} onPress={() => toggleArea(a)} />
            ))}
          </ChipRow>
        </Card>

        <Card>
          <T variant="h2">Settings</T>
          <ToggleRow icon="mail-outline" title="Weekly summary" subtitle="A recap every Sunday" value={summary} onValueChange={setSummary} />
          <ToggleRow icon="people-outline" title="Share streaks with friends" subtitle="Off by default for privacy" value={share} onValueChange={setShare} />
          <ToggleRow icon="accessibility-outline" title="Reduce motion" subtitle="Fewer animations" value={motion} onValueChange={setMotion} />
        </Card>

        <Disclaimer />
        <Button title="Sign out" variant="secondary" icon="log-out-outline" onPress={signOut} />
        <Button title="Back to design options" variant="ghost" icon="apps-outline" onPress={exitOption} />
      </Screen>
    </View>
  );
}
