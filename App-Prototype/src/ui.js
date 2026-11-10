// Shared, theme-aware building blocks used by every screen and every design option.
import { createContext, useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp, useTheme } from './state';
import { MOODS } from './mockData';

// Extra space each navigation style needs at the bottom of scrolling screens
export const PadContext = createContext(32);

export function Screen({ children, style }) {
  const t = useTheme();
  const pad = useContext(PadContext);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentContainerStyle={[{ padding: 20, paddingBottom: pad, gap: 16 }, style]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

export function T({ variant = 'body', style, children, ...rest }) {
  const t = useTheme();
  const v = {
    big: { fontSize: 40, fontWeight: '800', color: t.text, letterSpacing: -1 },
    title: { fontSize: 28, fontWeight: '800', color: t.text, letterSpacing: -0.5 },
    h2: { fontSize: 18, fontWeight: '700', color: t.text },
    body: { fontSize: 15, color: t.text, lineHeight: 21 },
    muted: { fontSize: 14, color: t.muted, lineHeight: 20 },
    small: { fontSize: 12, color: t.muted },
    label: { fontSize: 12, fontWeight: '700', color: t.muted, textTransform: 'uppercase', letterSpacing: 1 },
  }[variant];
  return (
    <Text style={[v, style]} {...rest}>
      {children}
    </Text>
  );
}

export function Icon({ name, size = 22, color, style }) {
  const t = useTheme();
  return <Ionicons name={name} size={size} color={color || t.text} style={style} />;
}

export function Card({ children, style, onPress, tone = 'surface', accessibilityLabel }) {
  const t = useTheme();
  const bg = { surface: t.surface, soft: t.accentSoft, alt: t.surfaceAlt, accent: t.accent }[tone];
  const base = {
    backgroundColor: bg,
    borderRadius: t.radius,
    padding: 16,
    gap: 10,
    borderWidth: tone === 'surface' ? 1 : 0,
    borderColor: t.line,
  };
  if (!onPress) return <View style={[base, style]}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [base, style, pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] }]}
    >
      {children}
    </Pressable>
  );
}

export function Row({ children, style, gap = 12 }) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>;
}

export function Button({ title, onPress, variant = 'primary', icon, disabled, style, small }) {
  const t = useTheme();
  const v = {
    primary: { bg: t.accent, fg: t.onAccent, border: t.accent },
    secondary: { bg: 'transparent', fg: t.accent, border: t.accent },
    ghost: { bg: 'transparent', fg: t.muted, border: 'transparent' },
  }[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        {
          minHeight: small ? 40 : 50,
          paddingHorizontal: small ? 14 : 20,
          borderRadius: 999,
          backgroundColor: v.bg,
          borderWidth: 1.5,
          borderColor: v.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {icon && <Icon name={icon} size={small ? 16 : 18} color={v.fg} />}
      <Text style={{ color: v.fg, fontWeight: '700', fontSize: small ? 14 : 16 }}>{title}</Text>
    </Pressable>
  );
}

export function Field({ label, error, style, multiline, ...props }) {
  const t = useTheme();
  return (
    <View style={[{ gap: 6 }, style]}>
      {label && <T variant="small" style={{ fontWeight: '700', color: t.text }}>{label}</T>}
      <TextInput
        placeholderTextColor={t.muted}
        accessibilityLabel={label}
        multiline={multiline}
        style={{
          minHeight: multiline ? 96 : 50,
          borderRadius: 12,
          borderWidth: 1.5,
          borderColor: error ? '#d93a3a' : t.line,
          backgroundColor: t.surface,
          color: t.text,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 0,
          fontSize: 16,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        {...props}
      />
      {error ? <Text style={{ color: t.dark ? '#ff9b9b' : '#b42318', fontSize: 13 }}>{error}</Text> : null}
    </View>
  );
}

export function Chip({ label, selected, onPress, icon, disabled }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected, disabled: !!disabled }}
      style={{
        minHeight: 40,
        paddingHorizontal: 14,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: selected ? t.accent : t.surfaceAlt,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon && <Icon name={icon} size={16} color={selected ? t.onAccent : t.text} />}
      <Text style={{ color: selected ? t.onAccent : t.text, fontWeight: '600', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

export function ChipRow({ children }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{children}</View>;
}

export function ToggleRow({ title, subtitle, value, onValueChange, icon }) {
  const t = useTheme();
  return (
    <Row style={{ minHeight: 48 }}>
      {icon && (
        <View style={[styles.iconBubble, { backgroundColor: t.surfaceAlt }]}>
          <Icon name={icon} size={18} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '600' }}>{title}</T>
        {subtitle ? <T variant="small">{subtitle}</T> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        accessibilityLabel={title}
        trackColor={{ true: t.accent, false: t.line }}
        thumbColor="#ffffff"
        activeThumbColor="#ffffff"
      />
    </Row>
  );
}

export function Progress({ value, color, height = 10 }) {
  const t = useTheme();
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={{ height, borderRadius: height, backgroundColor: t.surfaceAlt, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', borderRadius: height, backgroundColor: color || t.accent }} />
    </View>
  );
}

export function IconBubble({ name, size = 18, tone = 'alt' }) {
  const t = useTheme();
  const bg = tone === 'accent' ? t.accent : tone === 'soft' ? t.accentSoft : t.surfaceAlt;
  const fg = tone === 'accent' ? t.onAccent : tone === 'soft' ? t.accent : t.text;
  return (
    <View style={[styles.iconBubble, { backgroundColor: bg }]}>
      <Icon name={name} size={size} color={fg} />
    </View>
  );
}

export function MoodPicker({ value, onChange }) {
  const t = useTheme();
  return (
    <Row style={{ justifyContent: 'space-between' }} gap={6}>
      {MOODS.map((m) => {
        const on = m.value === value;
        return (
          <Pressable
            key={m.value}
            onPress={() => onChange(m.value)}
            accessibilityRole="button"
            accessibilityLabel={`Mood: ${m.label}`}
            accessibilityState={{ selected: on }}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
              borderRadius: 14,
              backgroundColor: on ? t.accent : 'transparent',
            }}
          >
            <Text style={{ fontSize: 28 }}>{m.emoji}</Text>
            <Text style={{ fontSize: 11, fontWeight: '600', color: on ? t.onAccent : t.muted }}>{m.label}</Text>
          </Pressable>
        );
      })}
    </Row>
  );
}

export function Disclaimer() {
  const t = useTheme();
  return (
    <View
      accessibilityRole="text"
      style={{
        flexDirection: 'row',
        gap: 10,
        padding: 12,
        borderRadius: 12,
        backgroundColor: t.surfaceAlt,
        borderWidth: 1,
        borderColor: t.line,
        borderStyle: 'dashed',
      }}
    >
      <Icon name="information-circle-outline" size={18} color={t.muted} />
      <Text style={{ flex: 1, fontSize: 12, lineHeight: 17, color: t.muted }}>
        <Text style={{ fontWeight: '700' }}>Prototype only. </Text>
        This is a design mock-up. No real accounts are created, no data is collected, and nothing you
        enter is saved. All numbers shown are sample data.
      </Text>
    </View>
  );
}

export function Avatar({ size = 36, onPress }) {
  const t = useTheme();
  const { user } = useApp();
  const initial = (user?.name || '?').trim().charAt(0).toUpperCase();
  const body = (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: t.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: t.onAccent, fontWeight: '800', fontSize: size * 0.42 }}>{initial}</Text>
    </View>
  );
  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Open profile" hitSlop={8}>
      {body}
    </Pressable>
  );
}

// Header bar shared by most navigation styles
export function Header({ title, left, onProfile, brand, transparent }) {
  const t = useTheme();
  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        backgroundColor: transparent ? 'transparent' : t.surface,
        borderBottomWidth: transparent ? 0 : 1,
        borderColor: t.line,
      }}
    >
      {left}
      <Text
        accessibilityRole="header"
        numberOfLines={1}
        style={{ flex: 1, fontSize: brand ? 21 : 18, fontWeight: '800', color: brand ? t.accent : t.text }}
      >
        {title}
      </Text>
      {onProfile && <Avatar onPress={onProfile} />}
    </View>
  );
}

export function HeaderButton({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={10}
      style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon name={icon} size={24} />
    </Pressable>
  );
}

export function Logo({ size = 72 }) {
  const t = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        backgroundColor: t.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="leaf" size={size * 0.5} color={t.onAccent} />
      <View
        style={{
          position: 'absolute',
          right: size * 0.14,
          top: size * 0.14,
          width: size * 0.16,
          height: size * 0.16,
          borderRadius: size,
          backgroundColor: t.highlight,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBubble: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
