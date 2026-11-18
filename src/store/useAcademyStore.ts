import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AchievementBadge, AssessmentAttempt, ThemeMode } from '@/src/types/academy';

export const ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'first-note',
    title: 'First Note Played',
    description: 'Struck your very first piano key inside PianoVerse.',
    criteria: 'Play any note on the virtual piano or interactive keyboard.',
    xpBonus: 25,
  },
  {
    id: 'keyboard-explorer',
    title: 'Keyboard Explorer',
    description: 'Successfully identified notes in the Keyboard Identification Lab.',
    criteria: 'Complete Module 2 or identify 3 target keys accurately.',
    xpBonus: 50,
  },
  {
    id: 'rhythm-beginner',
    title: 'Rhythm Beginner',
    description: 'Practised steady pulse and tempo with the Conservatory Metronome.',
    criteria: 'Complete Lesson 4.3 or log tempo practice.',
    xpBonus: 50,
  },
  {
    id: 'scale-master',
    title: 'Scale Master',
    description: 'Played a complete Major scale accurately on the virtual piano.',
    criteria: 'Complete a scale drill in Scale Practice or Chapter 3.',
    xpBonus: 75,
  },
  {
    id: 'first-song',
    title: 'First Song Completed',
    description: 'Played through a complete melody from beginning to end.',
    criteria: 'Finish a melody in Melody Practice or Chapter 6.',
    xpBonus: 100,
  },
  {
    id: 'piano-graduate',
    title: 'Piano Graduate',
    description: 'Passed all three progressive PianoVerse assessments.',
    criteria: 'Pass Level 1, Level 2, and Level 3 assessments.',
    xpBonus: 200,
  },
];

export const TOTAL_CURRICULUM_ITEMS = 23; // 17 Fundamentals lessons + 6 Tutorial chapters

export const PASSING_THRESHOLDS: Record<1 | 2 | 3, number> = {
  1: 70,
  2: 75,
  3: 80,
};

interface ToastMessage {
  id: string;
  title: string;
  subtitle: string;
  xp?: number;
}

interface DailyPracticeEntry {
  date: string;
  label: string;
  minutes: number;
  xp: number;
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildInitialDailyLog(): DailyPracticeEntry[] {
  const days: DailyPracticeEntry[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      minutes: 0,
      xp: 0,
    });
  }
  return days;
}

interface AcademyState {
  theme: ThemeMode;
  studentName: string;
  completedLessons: string[];
  xp: number;
  streakDays: number;
  lastActiveDate: string | null;
  practiceMinutes: number;
  notesPlayedCount: number;
  dailyPracticeLog: DailyPracticeEntry[];
  unlockedBadges: string[];
  assessmentHistory: AssessmentAttempt[];
  activeToast: ToastMessage | null;

  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setStudentName: (name: string) => void;
  registerNotePlayed: () => void;
  addPracticeMinutes: (minutes: number, xpEarned?: number) => void;
  completeLesson: (lessonId: string, xpReward?: number) => void;
  unlockBadge: (badgeId: string) => void;
  recordAssessmentAttempt: (attempt: AssessmentAttempt) => void;
  dismissToast: () => void;
  resetProgress: () => void;

  isLevelUnlocked: (level: 1 | 2 | 3) => boolean;
  hasPassedLevel: (level: 1 | 2 | 3) => boolean;
  getBestScoreForLevel: (level: 1 | 2 | 3) => number | null;
  getCourseCompletionPercent: () => number;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      studentName: 'Student Pianist',
      completedLessons: [],
      xp: 0,
      streakDays: 1,
      lastActiveDate: null,
      practiceMinutes: 0,
      notesPlayedCount: 0,
      dailyPracticeLog: buildInitialDailyLog(),
      unlockedBadges: [],
      assessmentHistory: [],
      activeToast: null,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setStudentName: (name) => set({ studentName: name }),

      registerNotePlayed: () => {
        const state = get();
        const today = getTodayKey();
        const isFirst = state.notesPlayedCount === 0 && !state.unlockedBadges.includes('first-note');

        let nextStreak = state.streakDays;
        if (state.lastActiveDate && state.lastActiveDate !== today) {
          const prev = new Date(state.lastActiveDate);
          const cur = new Date(today);
          const diffDays = Math.round((cur.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
          nextStreak = diffDays === 1 ? state.streakDays + 1 : 1;
        } else if (!state.lastActiveDate) {
          nextStreak = 1;
        }

        set({
          notesPlayedCount: state.notesPlayedCount + 1,
          lastActiveDate: today,
          streakDays: nextStreak,
        });

        if (isFirst) {
          get().unlockBadge('first-note');
        }
      },

      addPracticeMinutes: (minutes, xpEarned = 10) => {
        const today = getTodayKey();
        set((state) => {
          const existingLog = state.dailyPracticeLog.length ? [...state.dailyPracticeLog] : buildInitialDailyLog();
          const idx = existingLog.findIndex((entry) => entry.date === today);
          if (idx >= 0) {
            existingLog[idx] = {
              ...existingLog[idx],
              minutes: existingLog[idx].minutes + minutes,
              xp: existingLog[idx].xp + xpEarned,
            };
          } else {
            existingLog.push({
              date: today,
              label: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
              minutes,
              xp: xpEarned,
            });
            if (existingLog.length > 7) existingLog.shift();
          }

          return {
            practiceMinutes: state.practiceMinutes + minutes,
            xp: state.xp + xpEarned,
            lastActiveDate: today,
            dailyPracticeLog: existingLog,
          };
        });
      },

      completeLesson: (lessonId, xpReward = 40) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const today = getTodayKey();
        const nextCompleted = [...state.completedLessons, lessonId];
        const existingLog = state.dailyPracticeLog.length ? [...state.dailyPracticeLog] : buildInitialDailyLog();
        const idx = existingLog.findIndex((entry) => entry.date === today);
        if (idx >= 0) {
          existingLog[idx] = {
            ...existingLog[idx],
            minutes: existingLog[idx].minutes + 5,
            xp: existingLog[idx].xp + xpReward,
          };
        }

        set({
          completedLessons: nextCompleted,
          xp: state.xp + xpReward,
          practiceMinutes: state.practiceMinutes + 5,
          lastActiveDate: today,
          dailyPracticeLog: existingLog,
          activeToast: {
            id: `${lessonId}-${Date.now()}`,
            title: 'Lesson Completed',
            subtitle: `Saved progress for ${lessonId.toUpperCase()}`,
            xp: xpReward,
          },
        });

        if (lessonId === '4.3') {
          get().unlockBadge('rhythm-beginner');
        }
        if (lessonId === 'ch-6') {
          get().unlockBadge('first-song');
        }
      },

      unlockBadge: (badgeId) => {
        const state = get();
        if (state.unlockedBadges.includes(badgeId)) return;
        const badge = ACHIEVEMENTS.find((b) => b.id === badgeId);
        if (!badge) return;

        set({
          unlockedBadges: [...state.unlockedBadges, badgeId],
          xp: state.xp + badge.xpBonus,
          activeToast: {
            id: `badge-${badgeId}-${Date.now()}`,
            title: `Achievement Unlocked: ${badge.title}`,
            subtitle: badge.description,
            xp: badge.xpBonus,
          },
        });
      },

      recordAssessmentAttempt: (attempt) => {
        set((state) => ({
          assessmentHistory: [attempt, ...state.assessmentHistory],
          xp: state.xp + (attempt.passed ? 120 : 25),
          lastActiveDate: getTodayKey(),
        }));

        if (attempt.passed && attempt.level === 3) {
          get().unlockBadge('piano-graduate');
        }
      },

      dismissToast: () => set({ activeToast: null }),

      resetProgress: () =>
        set({
          completedLessons: [],
          xp: 0,
          streakDays: 1,
          lastActiveDate: null,
          practiceMinutes: 0,
          notesPlayedCount: 0,
          dailyPracticeLog: buildInitialDailyLog(),
          unlockedBadges: [],
          assessmentHistory: [],
          activeToast: null,
        }),

      isLevelUnlocked: (level) => {
        if (level === 1) return true;
        const history = get().assessmentHistory;
        if (level === 2) return history.some((a) => a.level === 1 && a.passed);
        if (level === 3) return history.some((a) => a.level === 2 && a.passed);
        return false;
      },

      hasPassedLevel: (level) => {
        return get().assessmentHistory.some((a) => a.level === level && a.passed);
      },

      getBestScoreForLevel: (level) => {
        const matching = get().assessmentHistory.filter((a) => a.level === level);
        if (!matching.length) return null;
        return Math.max(...matching.map((m) => m.scorePercent));
      },

      getCourseCompletionPercent: () => {
        const lessonsDone = get().completedLessons.length;
        const passedLevels = ([1, 2, 3] as const).filter((lvl) =>
          get().assessmentHistory.some((a) => a.level === lvl && a.passed)
        ).length;
        const total = TOTAL_CURRICULUM_ITEMS + 3;
        return Math.min(100, Math.round(((lessonsDone + passedLevels) / total) * 100));
      },
    }),
    {
      name: 'pianoverse_academy_v1',
      partialize: (state) => ({
        theme: state.theme,
        studentName: state.studentName,
        completedLessons: state.completedLessons,
        xp: state.xp,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        practiceMinutes: state.practiceMinutes,
        notesPlayedCount: state.notesPlayedCount,
        dailyPracticeLog: state.dailyPracticeLog,
        unlockedBadges: state.unlockedBadges,
        assessmentHistory: state.assessmentHistory,
      }),
    }
  )
);
