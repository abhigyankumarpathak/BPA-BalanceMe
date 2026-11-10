// Sample data for the prototype. Nothing here comes from a real device or account.

export const DEMO_USER = { name: 'Jordan', email: 'jordan@example.com' };

export const WEEK = [
  { day: 'Mon', minutes: 262 },
  { day: 'Tue', minutes: 231 },
  { day: 'Wed', minutes: 198 },
  { day: 'Thu', minutes: 244 },
  { day: 'Fri', minutes: 176 },
  { day: 'Sat', minutes: 215 },
  { day: 'Sun', minutes: 192, today: true },
];

export const TODAY = { minutes: 192, pickups: 58, firstPickup: '7:14 AM', notifications: 143 };

export const CATEGORIES = [
  { name: 'Social', minutes: 84, icon: 'people-outline' },
  { name: 'Video', minutes: 47, icon: 'play-circle-outline' },
  { name: 'Messaging', minutes: 33, icon: 'chatbubble-ellipses-outline' },
  { name: 'School & study', minutes: 28, icon: 'school-outline' },
];

export const INITIAL_GOALS = [
  {
    id: 'g1',
    title: 'Keep social apps under 1.5 hours',
    detail: 'Daily · 84 of 90 minutes used today',
    icon: 'people-outline',
    progress: 0.93,
    streak: 4,
    doneToday: false,
  },
  {
    id: 'g2',
    title: 'No phone for 30 minutes after waking up',
    detail: 'Daily · 5 of 7 days this week',
    icon: 'sunny-outline',
    progress: 0.71,
    streak: 2,
    doneToday: true,
  },
  {
    id: 'g3',
    title: 'Phone-free dinner',
    detail: 'Every evening · 4 of 7 days this week',
    icon: 'restaurant-outline',
    progress: 0.57,
    streak: 1,
    doneToday: false,
  },
];

export const GOAL_TEMPLATES = [
  { label: 'Limit a category', icon: 'hourglass-outline', example: 'Keep video apps under 1 hour' },
  { label: 'Phone-free time', icon: 'leaf-outline', example: 'No phone during homework' },
  { label: 'Better sleep', icon: 'moon-outline', example: 'Screens off by 10:30 PM' },
  { label: 'Custom', icon: 'create-outline', example: 'Write your own goal' },
];

export const INITIAL_REMINDERS = [
  { id: 'r1', title: 'Wind-down time', detail: 'Every night at 10:00 PM', icon: 'moon-outline', on: true },
  { id: 'r2', title: 'Scroll check', detail: 'After 20 minutes of nonstop scrolling', icon: 'hourglass-outline', on: true },
  { id: 'r3', title: 'Mood check-in', detail: 'Every evening at 7:00 PM', icon: 'happy-outline', on: true },
  { id: 'r4', title: 'Stretch break', detail: 'Every hour of screen time', icon: 'body-outline', on: false },
  { id: 'r5', title: 'Weekly reflection', detail: 'Sundays at 6:00 PM', icon: 'journal-outline', on: false },
];

export const NUDGE_TONES = {
  Gentle: "Hey, you've been scrolling for a while. Want to take a quick breather? 🌿",
  Balanced: '20 minutes of scrolling so far. A 5-minute break could help you reset.',
  Direct: "You've hit 20 minutes. Time to put the phone down for a bit.",
};

export const MOODS = [
  { value: 1, emoji: '😞', label: 'Rough' },
  { value: 2, emoji: '😕', label: 'Meh' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
];

export const MOOD_REPLIES = {
  1: "Thanks for being honest. Rough days happen. Maybe try a short walk or text a friend you trust.",
  2: 'Noted. A small break from the screen might help you reset.',
  3: "Okay is okay. Let's keep the day steady.",
  4: "Nice! Let's keep that good energy going.",
  5: "Love that! Whatever you're doing today, it's working.",
};

// Mood for Mon to Sat; Sunday (today) comes from the user's check-in
export const WEEK_MOODS = [3, 2, 4, 3, 4, 5];

export const INITIAL_JOURNAL = [
  {
    id: 'j1',
    date: 'Saturday',
    mood: 5,
    text: 'Went hiking with friends and barely checked my phone. Felt really present.',
  },
  {
    id: 'j2',
    date: 'Thursday',
    mood: 3,
    text: "Stayed up scrolling too late. I'm going to try the wind-down reminder.",
  },
];

export const REFLECTION_PROMPTS = [
  'What made today feel balanced?',
  'When did your phone actually help you today?',
  'What would you do with one extra hour offline?',
  'How did you feel after your longest scroll today?',
];

export const FOCUS_AREAS = ['Social media', 'Sleep', 'Focus for school', 'Mood', 'Gaming', 'Video'];

export function fmt(minutes) {
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}
