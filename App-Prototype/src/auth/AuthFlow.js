// Welcome, sign up, log in and onboarding. All mock: any valid-looking input is accepted.
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp, useTheme } from '../state';
import { Button, Card, Chip, ChipRow, Disclaimer, Field, Icon, IconBubble, Logo, MoodPicker, Row, Screen, T } from '../ui';
import { DEMO_USER, FOCUS_AREAS, fmt, MOOD_REPLIES } from '../mockData';

const isEmail = (e) => /^\S+@\S+\.\S+$/.test(e.trim());

// Sample legal text for the prototype
const TERMS = [
  'BalanceMe is a tool for building healthier digital habits. It is not medical or mental health advice.',
  'You must be 13 or older to create an account.',
  'Be kind. Do not use BalanceMe to harass or harm others.',
  'You can delete your account at any time.',
];
const PRIVACY = [
  'Your screen time, moods and reflections stay private unless you choose to share them.',
  'We never sell your personal data.',
  'Streak sharing with friends is off by default.',
  'You can download or delete your data at any time.',
];

function Shell({ children, onBack }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}
    >
      {onBack && (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 16, paddingBottom: 0 }}
        >
          <Icon name="chevron-back" size={20} color={t.accent} />
          <Text style={{ color: t.accent, fontWeight: '700', fontSize: 16 }}>Back</Text>
        </Pressable>
      )}
      <Screen style={{ paddingBottom: insets.bottom + 32, gap: 18 }}>{children}</Screen>
    </KeyboardAvoidingView>
  );
}

function Welcome({ go }) {
  const t = useTheme();
  const { exitOption } = useApp();
  return (
    <Shell>
      <Pressable onPress={exitOption} accessibilityRole="button" style={{ alignSelf: 'flex-start' }}>
        <T variant="small" style={{ fontWeight: '700' }}>‹ Design options</T>
      </Pressable>
      <View style={{ alignItems: 'center', gap: 12, marginTop: 12 }}>
        <Logo size={88} />
        <T variant="title" style={{ fontSize: 34 }}>BalanceMe</T>
        <T variant="h2" style={{ color: t.accent, textAlign: 'center' }}>Your screen, your balance.</T>
        <T variant="muted" style={{ textAlign: 'center' }}>
          Understand your screen time, set goals that fit your life, and feel better about the time you
          spend online. No shame, no strict limits.
        </T>
      </View>
      <Card>
        {[
          ['bar-chart-outline', 'See where your time really goes'],
          ['flag-outline', 'Set flexible goals that fit your life'],
          ['happy-outline', 'Check in with how you feel'],
          ['notifications-outline', 'Get kind nudges, not guilt trips'],
        ].map(([icon, label]) => (
          <Row key={label}>
            <IconBubble name={icon} tone="soft" />
            <T style={{ flex: 1, fontWeight: '600' }}>{label}</T>
          </Row>
        ))}
      </Card>
      <Button title="Create an account" onPress={() => go('signup')} />
      <Button title="I already have an account" variant="secondary" onPress={() => go('login')} />
      <Disclaimer />
    </Shell>
  );
}

function Login({ go }) {
  const t = useTheme();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [resetMsg, setResetMsg] = useState(false);

  const submit = () => {
    const e = {};
    if (!isEmail(email)) e.email = 'Enter a valid email address.';
    if (!password) e.password = 'Enter your password.';
    setErrors(e);
    if (!Object.keys(e).length) {
      const name = email.split('@')[0].replace(/[^a-z]/gi, '') || 'Friend';
      setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email: email.trim() });
    }
  };

  return (
    <Shell onBack={() => go('welcome')}>
      <View style={{ gap: 4 }}>
        <T variant="title">Welcome back</T>
        <T variant="muted">Log in to pick up where you left off.</T>
      </View>
      <Field label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" placeholder="you@example.com" />
      <Field label="Password" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry placeholder="Your password" />
      <Pressable onPress={() => setResetMsg(true)} accessibilityRole="button" style={{ alignSelf: 'flex-end' }}>
        <T style={{ color: t.accent, fontWeight: '700' }}>Forgot password?</T>
      </Pressable>
      {resetMsg && (
        <T variant="small">In the real app, we would email you a link to reset your password.</T>
      )}
      <Button title="Log in" onPress={submit} />
      <Button title="Use demo account" variant="secondary" icon="person-outline" onPress={() => setUser(DEMO_USER)} />
      <Pressable onPress={() => go('signup')} accessibilityRole="button" style={{ alignSelf: 'center' }}>
        <T variant="muted">
          New here? <Text style={{ color: t.accent, fontWeight: '700' }}>Create an account</Text>
        </T>
      </Pressable>
      <Disclaimer />
    </Shell>
  );
}

function SignUp({ go, onDone }) {
  const t = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [doc, setDoc] = useState(null);
  const [errors, setErrors] = useState({});

  const submit = () => {
    const e = {};
    if (!name.trim()) e.name = 'Tell us what to call you.';
    if (!isEmail(email)) e.email = 'Enter a valid email address.';
    if (password.length < 8) e.password = 'Use at least 8 characters.';
    if (confirm !== password) e.confirm = "Passwords don't match.";
    if (!agree) e.agree = 'Please agree to continue.';
    setErrors(e);
    if (!Object.keys(e).length) onDone({ name: name.trim(), email: email.trim() });
  };

  return (
    <Shell onBack={() => go('welcome')}>
      <View style={{ gap: 4 }}>
        <T variant="title">Create your account</T>
        <T variant="muted">It takes less than a minute.</T>
      </View>
      <Field label="First name" value={name} onChangeText={setName} error={errors.name} placeholder="Jordan" autoComplete="given-name" />
      <Field label="Email" value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com" />
      <Field label="Password" value={password} onChangeText={setPassword} error={errors.password} secureTextEntry placeholder="At least 8 characters" />
      <Field label="Confirm password" value={confirm} onChangeText={setConfirm} error={errors.confirm} secureTextEntry placeholder="Type it again" />
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 48 }}>
        <Pressable
          onPress={() => setAgree(!agree)}
          accessibilityRole="checkbox"
          accessibilityLabel="I agree to the Terms of Use and Privacy Policy"
          accessibilityState={{ checked: agree }}
          hitSlop={12}
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: errors.agree && !agree ? '#d93a3a' : t.accent,
            backgroundColor: agree ? t.accent : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {agree && <Text style={{ color: t.onAccent, fontSize: 17, fontWeight: '900', lineHeight: 20 }}>✓</Text>}
        </Pressable>
        <Text style={{ flex: 1, fontSize: 15, lineHeight: 21, color: t.text }} onPress={() => setAgree(!agree)}>
          I agree to the{' '}
          <Text style={{ color: t.accent, fontWeight: '700', textDecorationLine: 'underline' }} onPress={(e) => { e?.stopPropagation?.(); setDoc('terms'); }}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={{ color: t.accent, fontWeight: '700', textDecorationLine: 'underline' }} onPress={(e) => { e?.stopPropagation?.(); setDoc('privacy'); }}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
      {doc && (
        <Card tone="alt">
          <T variant="h2">{doc === 'terms' ? 'Terms of Use' : 'Privacy Policy'} (sample)</T>
          {(doc === 'terms' ? TERMS : PRIVACY).map((line) => (
            <T key={line} variant="muted">• {line}</T>
          ))}
          <Button
            small
            title={agree ? 'Close' : 'I agree'}
            icon={agree ? undefined : 'checkmark'}
            onPress={() => {
              setAgree(true);
              setDoc(null);
            }}
          />
        </Card>
      )}
      {errors.agree && <T variant="small" style={{ color: t.dark ? '#ff9b9b' : '#b42318' }}>{errors.agree}</T>}
      <Button title="Create account" onPress={submit} />
      <Pressable onPress={() => go('login')} accessibilityRole="button" style={{ alignSelf: 'center' }}>
        <T variant="muted">
          Already have an account? <Text style={{ color: t.accent, fontWeight: '700' }}>Log in</Text>
        </T>
      </Pressable>
      <Disclaimer />
    </Shell>
  );
}

const LIMITS = [120, 180, 210, 240, 300];

function Onboarding({ pending, go }) {
  const t = useTheme();
  const { setUser, focusAreas, setFocusAreas, dailyLimit, setDailyLimit, mood, setMood } = useApp();
  const [step, setStep] = useState(0);

  const toggleArea = (a) =>
    setFocusAreas((as) => (as.includes(a) ? as.filter((x) => x !== a) : [...as, a]));

  const steps = [
    {
      title: `Nice to meet you, ${pending.name}!`,
      sub: 'What would you like to work on? Pick as many as you like.',
      body: (
        <ChipRow>
          {FOCUS_AREAS.map((a) => (
            <Chip key={a} label={a} selected={focusAreas.includes(a)} onPress={() => toggleArea(a)} />
          ))}
        </ChipRow>
      ),
    },
    {
      title: 'Pick a daily screen time goal',
      sub: "This is a starting point, not a rule. You can change it anytime.",
      body: (
        <ChipRow>
          {LIMITS.map((m) => (
            <Chip key={m} label={fmt(m)} selected={m === dailyLimit} onPress={() => setDailyLimit(m)} />
          ))}
        </ChipRow>
      ),
    },
    {
      title: 'How are you feeling right now?',
      sub: 'Quick mood check-ins help you see how screen time affects you.',
      body: (
        <View style={{ gap: 12 }}>
          <MoodPicker value={mood} onChange={setMood} />
          {mood && <T>{MOOD_REPLIES[mood]}</T>}
        </View>
      ),
    },
  ];
  const s = steps[step];
  const last = step === steps.length - 1;

  return (
    <Shell onBack={() => (step ? setStep(step - 1) : go('signup'))}>
      <Row gap={6}>
        {steps.map((_, i) => (
          <View key={i} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: i <= step ? t.accent : t.surfaceAlt }} />
        ))}
      </Row>
      <T variant="label">Step {step + 1} of {steps.length}</T>
      <View style={{ gap: 6 }}>
        <T variant="title">{s.title}</T>
        <T variant="muted">{s.sub}</T>
      </View>
      <Card>{s.body}</Card>
      <Button
        title={last ? 'Start using BalanceMe' : 'Next'}
        icon={last ? 'leaf' : 'arrow-forward'}
        onPress={() => (last ? setUser(pending) : setStep(step + 1))}
      />
    </Shell>
  );
}

export default function AuthFlow() {
  const [screen, setScreen] = useState('welcome');
  const [pending, setPending] = useState(null);

  if (screen === 'login') return <Login go={setScreen} />;
  if (screen === 'signup')
    return (
      <SignUp
        go={setScreen}
        onDone={(u) => {
          setPending(u);
          setScreen('onboarding');
        }}
      />
    );
  if (screen === 'onboarding' && pending) return <Onboarding pending={pending} go={setScreen} />;
  return <Welcome go={setScreen} />;
}
