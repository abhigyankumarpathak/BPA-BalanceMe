// In-memory app state. This is a prototype: nothing is saved, and everything resets on reload.
import { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_GOALS, INITIAL_JOURNAL, INITIAL_REMINDERS } from './mockData';

export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children, onExit, initialUser = null }) {
  const [user, setUser] = useState(initialUser);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [tone, setTone] = useState('Gentle');
  const [mood, setMood] = useState(null);
  const [journal, setJournal] = useState(INITIAL_JOURNAL);
  const [dailyLimit, setDailyLimit] = useState(210);
  const [focusAreas, setFocusAreas] = useState(['Social media', 'Sleep']);
  const [focus, setFocus] = useState({
    duration: 25,
    remaining: 25 * 60,
    running: false,
    sessions: 3,
    finished: false,
  });

  // Focus timer keeps running while you move between screens
  useEffect(() => {
    if (!focus.running) return undefined;
    const id = setInterval(() => {
      setFocus((f) =>
        f.remaining <= 1
          ? { ...f, remaining: 0, running: false, sessions: f.sessions + 1, finished: true }
          : { ...f, remaining: f.remaining - 1 }
      );
    }, 1000);
    return () => clearInterval(id);
  }, [focus.running]);

  const value = {
    user,
    setUser,
    goals,
    setGoals,
    reminders,
    setReminders,
    tone,
    setTone,
    mood,
    setMood,
    journal,
    setJournal,
    dailyLimit,
    setDailyLimit,
    focusAreas,
    setFocusAreas,
    focus,
    setFocus,
    exitOption: onExit,
    signOut: () => setUser(null),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
