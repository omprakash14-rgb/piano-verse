/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/src/components/layout/AppShell';
import { HomePage } from '@/src/pages/HomePage';
import { DashboardPage } from '@/src/pages/DashboardPage';
import { LearnOverviewPage } from '@/src/pages/LearnOverviewPage';
import { LearnHistoryPage } from '@/src/pages/LearnHistoryPage';
import { LearnKeyboardPage } from '@/src/pages/LearnKeyboardPage';
import { LearnPosturePage } from '@/src/pages/LearnPosturePage';
import { LearnTheoryPage } from '@/src/pages/LearnTheoryPage';
import { VirtualPianoPage } from '@/src/pages/VirtualPianoPage';
import { PracticeStudioPage } from '@/src/pages/PracticeStudioPage';
import { TutorialsPage } from '@/src/pages/TutorialsPage';
import { AssessmentsOverviewPage } from '@/src/pages/AssessmentsOverviewPage';
import { AssessmentLevelPage } from '@/src/pages/AssessmentLevelPage';
import { ProgressPage } from '@/src/pages/ProgressPage';
import { CertificatePage } from '@/src/pages/CertificatePage';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnOverviewPage />} />
          <Route path="/learn/history" element={<LearnHistoryPage />} />
          <Route path="/learn/keyboard" element={<LearnKeyboardPage />} />
          <Route path="/learn/posture" element={<LearnPosturePage />} />
          <Route path="/learn/theory" element={<LearnTheoryPage />} />
          <Route path="/piano" element={<VirtualPianoPage />} />
          <Route path="/practice" element={<PracticeStudioPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/assessments" element={<AssessmentsOverviewPage />} />
          <Route path="/assessments/level-1" element={<AssessmentLevelPage level={1} />} />
          <Route path="/assessments/level-2" element={<AssessmentLevelPage level={2} />} />
          <Route path="/assessments/level-3" element={<AssessmentLevelPage level={3} />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
