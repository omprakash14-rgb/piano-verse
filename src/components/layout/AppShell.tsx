import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Award, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { cn } from '@/src/lib/utils';

const PRIMARY_NAV = [
  { label: 'Fundamentals', to: '/learn' },
  { label: 'Tutorials', to: '/tutorials' },
  { label: 'Virtual Piano', to: '/piano' },
  { label: 'Practice', to: '/practice' },
  { label: 'Assessments', to: '/assessments' },
];

const MOBILE_ALL_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Student Dashboard', to: '/dashboard' },
  { label: 'Piano Fundamentals', to: '/learn' },
  { label: 'History of Piano', to: '/learn/history' },
  { label: 'Keyboard Structure', to: '/learn/keyboard' },
  { label: 'Posture & Technique', to: '/learn/posture' },
  { label: 'Music Theory', to: '/learn/theory' },
  { label: 'Piano Tutorials', to: '/tutorials' },
  { label: 'Virtual Piano (88 Keys)', to: '/piano' },
  { label: 'Practice Studio', to: '/practice' },
  { label: 'Assessments (Levels 1–3)', to: '/assessments' },
  { label: 'My Progress', to: '/progress' },
  { label: 'Certificate', to: '/certificate' },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme, activeToast, dismissToast, getCourseCompletionPercent } = useAcademyStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const completion = getCourseCompletionPercent();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(dismissToast, 4600);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Three-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-5 py-3.5 md:px-8">
          {/* Zone 1: Single clean wordmark */}
          <Link
            to="/"
            className="font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            PianoVerse
          </Link>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap shrink-0 py-1 transition-colors border-b-2',
                    isActive
                      ? 'border-[var(--accent-gold)] text-[var(--text-primary)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Theme toggle + Primary Progress CTA + Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to warm ivory light theme' : 'Switch to dark concert hall theme'}
              title={theme === 'dark' ? 'Warm Ivory Theme' : 'Concert Hall Dark Theme'}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors whitespace-nowrap shrink-0"
            >
              <span>My Progress</span>
              <span className="font-mono-tabular text-xs opacity-85">{completion}%</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] lg:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-4 lg:hidden max-h-[75vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {MOBILE_ALL_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Achievement / Lesson Completion Toast */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="no-print fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-[var(--accent-gold)] bg-[var(--bg-surface)] p-4 shadow-xl"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]">
              <Award className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{activeToast.title}</p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{activeToast.subtitle}</p>
              {activeToast.xp && (
                <p className="mt-1 font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                  +{activeToast.xp} XP
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Dismiss notification"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiet Conservatory Footer */}
      <footer className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-10 px-5 md:px-8">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              PianoVerse
            </Link>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              Discover. Learn. Play. Master. Structured interactive piano education built for absolute beginners.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)]">Curriculum</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/learn" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Course Overview</Link></li>
              <li><Link to="/learn/history" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Piano History</Link></li>
              <li><Link to="/learn/keyboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Keyboard Basics</Link></li>
              <li><Link to="/learn/posture" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Posture & Hands</Link></li>
              <li><Link to="/learn/theory" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Music Theory</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)]">Studio & Classroom</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/tutorials" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Structured Tutorials</Link></li>
              <li><Link to="/piano" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">88-Key Virtual Piano</Link></li>
              <li><Link to="/practice" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Practice Studio</Link></li>
              <li><Link to="/assessments" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Three-Level Assessments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[var(--text-secondary)]">Student Record</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Student Dashboard</Link></li>
              <li><Link to="/progress" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Learning Progress</Link></li>
              <li><Link to="/certificate" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Course Certificate</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1320px] border-t border-[var(--border-hairline)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
          <span>PianoVerse Interactive Piano Academy · Teach → Explain → Demonstrate → Interact → Practise → Assess</span>
          <span>Local progress saved automatically in browser storage</span>
        </div>
      </footer>
    </div>
  );
}
