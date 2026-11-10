import OverviewScreen from './OverviewScreen';
import GoalsScreen from './GoalsScreen';
import NudgesScreen from './NudgesScreen';
import FocusScreen from './FocusScreen';
import InsightsScreen from './InsightsScreen';

// The five required screens, in the order every navigation style shows them
export const TABS = [
  { key: 'overview', short: 'Today', title: 'Screen Time', icon: 'time', Component: OverviewScreen },
  { key: 'goals', short: 'Goals', title: 'Goals', icon: 'flag', Component: GoalsScreen },
  { key: 'nudges', short: 'Nudges', title: 'Reminders & Nudges', icon: 'notifications', Component: NudgesScreen },
  { key: 'focus', short: 'Focus', title: 'Focus Mode', icon: 'timer', Component: FocusScreen },
  { key: 'insights', short: 'Reflect', title: 'Reflection & Insights', icon: 'sparkles', Component: InsightsScreen },
];
