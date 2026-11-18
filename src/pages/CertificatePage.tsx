import { Link } from 'react-router-dom';
import { Award, Lock, Printer, ArrowRight } from 'lucide-react';
import { useAcademyStore } from '@/src/store/useAcademyStore';

export function CertificatePage() {
  const {
    studentName,
    setStudentName,
    hasPassedLevel,
    getBestScoreForLevel,
    assessmentHistory,
  } = useAcademyStore();

  const level3Passed = hasPassedLevel(3);
  const level3Best = getBestScoreForLevel(3);
  const passingAttempt = assessmentHistory.find((a) => a.level === 3 && a.passed);
  const issuedDate = passingAttempt
    ? new Date(passingAttempt.timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  if (!level3Passed) {
    return (
      <div className="mx-auto max-w-[780px] px-5 py-16 md:px-8">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[var(--accent-gold)]">
            <Lock className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Graduation Milestone Locked
          </p>
          <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)]">
            Complete Level 3 Assessment to Earn Your Certificate
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Your official PianoVerse Completion Certificate unlocks automatically once you pass Level 1 (70%), Level 2 (75%), and Level 3 Final Practical Assessment (80%).
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <Link
              to="/assessments"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)]"
            >
              Go to Assessments
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tutorials"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)]"
            >
              Review Tutorials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1040px] px-5 py-10 md:px-8 space-y-8">
      {/* Controls (Hidden on print) */}
      <div className="no-print flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Conservatory Credential
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-[var(--text-primary)]">
            Course Completion Certificate
          </h1>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs text-[var(--text-secondary)]">
            <span className="block mb-1">Recipient Name on Certificate</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your Full Name"
              className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </label>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Archival Conservatory Certificate */}
      <div className="print-certificate rounded-xl border-2 border-[#B8860B] bg-[#FAF7F2] p-8 sm:p-14 text-[#181614] shadow-2xl">
        <div className="border border-[#D4AF37]/60 p-6 sm:p-12 text-center space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#B8860B] text-[#A67B2E]">
            <Award className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#A67B2E] uppercase">
              PianoVerse Interactive Piano Academy
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-[#181614]">
              Certificate of Completion
            </h2>
          </div>

          <p className="text-sm text-[#58524A]">This certifies that</p>

          <p className="font-display text-4xl sm:text-5xl italic font-semibold text-[#181614] border-b border-[#D4AF37]/60 pb-3 mx-auto max-w-lg">
            {studentName || 'Student Pianist'}
          </p>

          <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#58524A]">
            has successfully completed the Beginner Piano Curriculum—covering Instrument Mechanics & History, Keyboard Structure, Playing Posture & Technique, Music Theory, Structured Tutorials, and all Three Progressive Assessments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#E2D9C8] text-xs">
            <div>
              <p className="text-[#58524A]">Final Practical Score</p>
              <p className="mt-1 font-mono-tabular text-base font-bold text-[#181614]">
                {level3Best ?? 80}% (Level 3 Passed)
              </p>
            </div>
            <div>
              <p className="text-[#58524A]">Date Conferred</p>
              <p className="mt-1 font-semibold text-[#181614]">{issuedDate}</p>
            </div>
            <div>
              <p className="text-[#58524A]">Faculty Signatory</p>
              <p className="mt-1 font-display text-lg italic font-semibold text-[#181614]">
                Prof. Elena Vance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
