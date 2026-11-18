import { TutorialChapter } from '@/src/types/academy';

export const TUTORIAL_CHAPTERS: TutorialChapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 1,
    title: 'Getting Familiar with the Keyboard & Middle C',
    subtitle: 'Find your bearings across the 88 keys, locate Middle C, and play your first steady notes.',
    durationMinutes: 8,
    xpReward: 60,
    teacherPersona: 'Professor Elena Vance · Conservatory Foundations',
    objectives: [
      'Orient yourself at the center of the keyboard using 2-black-key clusters.',
      'Locate and play C4 (Middle C), D4, and E4 with relaxed tone.',
      'Hear the pitch direction moving left (lower) vs. right (higher).',
    ],
    teacherExplanation: [
      'Welcome to your very first practical piano lesson. Before worrying about reading complex music, sit centered in front of the keyboard and look for the twin-black-key group closest to the middle.',
      'The white key directly to the left of that twin pair is Middle C (C4). Rest your right thumb (finger 1) softly on C4, finger 2 on D4, and finger 3 on E4.',
      'Press each key down gently to the bottom of its travel—letting the weight of your relaxed hand sink in rather than poking stiffly.',
    ],
    visualDemoLabel: 'Listen: Middle C (C4) → D4 → E4 → D4 → C4',
    visualDemoNotes: [60, 62, 64, 62, 60],
    interactiveExercise: {
      title: 'Step-by-Step Key Discovery',
      instruction: 'Play C4, then D4, then E4, and return to C4 on the piano below.',
      targetNotes: [60, 62, 64, 60],
      mode: 'sequence',
    },
    guidedPractice: {
      title: 'Guided Warmup: Center Keyboard Echo',
      steps: [
        'Click "Listen to Demo" to hear the gentle three-note phrase.',
        'Place fingers 1–2–3 over C4–D4–E4 (or press keys A, S, D on your computer keyboard).',
        'Play each note cleanly, releasing one key as the next goes down.',
      ],
    },
    independentPractice: {
      title: 'Solo Exploration',
      prompt: 'Find every C across the 88-key piano from deep bass C2 up to bright C6, listening to how the tone changes while the note identity stays C.',
      checklist: [
        'Located C3, C4 (Middle C), and C5 by spotting pairs of 2 black keys.',
        'Played C–D–E smoothly three times with relaxed shoulders.',
      ],
    },
    summary:
      'Middle C anchors your hand at the heart of the piano; stepping rightward climbs through D and E with clean, unhurried tone.',
    knowledgeCheck: [
      {
        id: 'ch1-q1',
        prompt: 'Which finger of your right hand rests on Middle C in our starting position?',
        options: ['Finger 1 (Thumb)', 'Finger 2 (Index)', 'Finger 3 (Middle)', 'Finger 5 (Pinky)'],
        correctIndex: 0,
        explanation: 'Right-hand finger 1 (thumb) anchors on Middle C (C4) for the C five-finger position.',
      },
    ],
  },
  {
    id: 'ch-2',
    chapterNumber: 2,
    title: 'Five-Finger Position: Right & Left Hand Exercises',
    subtitle: 'Coordinate fingers 1–5 in both hands over C–D–E–F–G.',
    durationMinutes: 10,
    xpReward: 70,
    teacherPersona: 'Professor Elena Vance · Technique Studio',
    objectives: [
      'Align all five right-hand fingers (1–5) on C4–G4.',
      'Understand mirror fingering for the left hand (5–1) on C3–G3.',
      'Build finger independence across rising and falling five-note patterns.',
    ],
    teacherExplanation: [
      'Once C4 feels like home, let all five fingers of your right hand drape naturally over five adjacent white keys: C4 (1), D4 (2), E4 (3), F4 (4), and G4 (5).',
      'Now look at your left hand one octave lower on C3–G3. Because your hands mirror each other, your left pinky (finger 5) starts on C3 while your left thumb (finger 1) lands on G3!',
      'Notice that fingers 4 and 5 are naturally weaker. Play slowly and evenly so every note sounds equally warm and clear.',
    ],
    visualDemoLabel: 'Listen: Five-Finger Ascent & Descent (C4–G4–C4)',
    visualDemoNotes: [60, 62, 64, 65, 67, 65, 64, 62, 60],
    interactiveExercise: {
      title: 'Five-Finger Ladder Drill',
      instruction: 'Play the five-finger climb C4 → D4 → E4 → F4 → G4 in order.',
      targetNotes: [60, 62, 64, 65, 67],
      mode: 'sequence',
    },
    guidedPractice: {
      title: 'Guided Practice: Five-Finger Warmup Etude',
      steps: [
        'Play C4–D4–E4–F4–G4 slowly, naming each finger number (1–2–3–4–5) aloud.',
        'Reverse back down G4–F4–E4–D4–C4 (5–4–3–2–1).',
        'Try the left hand one octave lower on C3–D3–E3–F3–G3 using fingers 5–4–3–2–1.',
      ],
      melodyId: 'five-finger-etude',
    },
    independentPractice: {
      title: 'Finger Control Check',
      prompt: 'Keep non-playing fingers resting lightly on their keys while lifting only one finger at a time.',
      checklist: [
        'Right hand played 1–2–3–4–5–4–3–2–1 without stiff pinky lift.',
        'Left hand played C3–G3 cleanly with finger 5 curved on C3.',
      ],
    },
    summary:
      'Five-finger position establishes hand shape and equal finger control before you ever need to move your hand along the keyboard.',
    knowledgeCheck: [
      {
        id: 'ch2-q1',
        prompt: 'In the left-hand C3–G3 five-finger position, which finger plays C3?',
        options: ['Finger 1 (Thumb)', 'Finger 3 (Middle)', 'Finger 5 (Little Finger)', 'Finger 2 (Index)'],
        correctIndex: 2,
        explanation: 'Your left hand mirrors your right hand: pinky (5) sits on the lowest note C3 and thumb (1) sits on G3.',
      },
    ],
  },
  {
    id: 'ch-3',
    chapterNumber: 3,
    title: 'Playing the C Major Scale with Metronome',
    subtitle: 'Master the smooth thumb-under crossover and steady tempo control.',
    durationMinutes: 10,
    xpReward: 75,
    teacherPersona: 'Maestro Julian Thorne · Theory & Technique',
    objectives: [
      'Execute the C Major thumb tuck (finger 1 passing cleanly under finger 3 onto F4).',
      'Play a full 1-octave C Major scale smoothly ascending.',
      'Maintain an even pulse at 68–76 BPM.',
    ],
    teacherExplanation: [
      'A scale has eight notes (C to C), yet you only have five fingers. The secret pianists use is the thumb tuck.',
      'Play C4 (1), D4 (2), E4 (3). While finger 3 holds E4 briefly, glide your relaxed thumb smoothly underneath your palm so it lands on F4 (1).',
      'Your remaining fingers immediately align over G4 (2), A4 (3), B4 (4), and C5 (5) without any sudden elbow jerk!',
    ],
    visualDemoLabel: 'Listen: Full 1-Octave C Major Scale (C4 → C5)',
    visualDemoNotes: [60, 62, 64, 65, 67, 69, 71, 72],
    interactiveExercise: {
      title: 'C Major Scale Check',
      instruction: 'Play all 8 ascending notes of the C Major scale from C4 up to C5.',
      targetNotes: [60, 62, 64, 65, 67, 69, 71, 72],
      mode: 'sequence',
    },
    guidedPractice: {
      title: 'Slow Metronome Scale Walk',
      steps: [
        'Practice just the crossover: E4 (3) → F4 (thumb 1) → G4 (2) five times slowly.',
        'Connect the full ascending scale C4–D4–E4–F4–G4–A4–B4–C5 evenly.',
        'Aim for identical loudness on F4 so the thumb never thumps heavier than finger 3.',
      ],
    },
    independentPractice: {
      title: 'Scale Smoothness Drill',
      prompt: 'Open the Practice Studio Metronome at 70 BPM and play one scale note per click.',
      checklist: [
        'Thumb tucked quietly underneath finger 3 without twisting the elbow.',
        'Reached C5 cleanly on finger 5 in steady rhythm.',
      ],
    },
    summary:
      'The 1–2–3–1–2–3–4–5 fingering unlocks smooth one-octave scales across the keyboard without breaking melodic flow.',
    knowledgeCheck: [
      {
        id: 'ch3-q1',
        prompt: 'In the ascending right-hand C Major scale, onto which note does your thumb tuck after finger 3 plays E4?',
        options: ['G4', 'F4', 'A4', 'C5'],
        correctIndex: 1,
        explanation: 'Right-hand fingering is 1(C)–2(D)–3(E)–1(F)–2(G)–3(A)–4(B)–5(C).',
      },
    ],
  },
  {
    id: 'ch-4',
    chapterNumber: 4,
    title: 'Basic Chords & Smooth Progressions',
    subtitle: 'Play C Major, F Major, G Major, and A Minor triads and connect them cleanly.',
    durationMinutes: 10,
    xpReward: 80,
    teacherPersona: 'Maestro Julian Thorne · Harmony Lab',
    objectives: [
      'Strike three notes simultaneously as a balanced C Major triad (C–E–G).',
      'Transition between C Major, A Minor, F Major, and G Major chords.',
    ],
    teacherExplanation: [
      'Up to now we played single notes one at a time. Chords let your hand shape harmony all at once—like painting rich color behind a melody.',
      'Form the C Major triad with fingers 1 (C4), 3 (E4), and 5 (G4). Lower your wrist gently so all three keys land at the exact same instant.',
      'To move from C Major (C–E–G) to A Minor (A–C–E), notice two notes (C and E) stay the same! Minimal movement makes chord transitions effortless.',
    ],
    visualDemoLabel: 'Listen: C Major Triad (C4 + E4 + G4)',
    visualDemoNotes: [60, 64, 67],
    interactiveExercise: {
      title: 'Play the C Major Triad',
      instruction: 'Press C4, E4, and G4 (individually or together) to lock in the C Major chord shape.',
      targetNotes: [60, 64, 67],
      mode: 'chord',
    },
    guidedPractice: {
      title: 'Four-Chord Progression Practice',
      steps: [
        'Play C Major (C–E–G) and hold for 4 slow beats.',
        'Shift smoothly to A Minor (A–C–E) for 4 beats.',
        'Move to F Major (F–A–C) for 4 beats, then G Major (G–B–D) for 4 beats, resolving back to C.',
      ],
    },
    independentPractice: {
      title: 'Left-Hand Accompaniment',
      prompt: 'Try playing the single bass root note in your left hand (C3, A2, F2, G2) while tapping the triad in your right hand.',
      checklist: [
        'All three notes of C Major sounded together cleanly without rolling.',
        'Practiced C → Am → F → G progression steadily.',
      ],
    },
    summary:
      'Knowing just C, F, G, and Am triads gives you the harmonic foundation for hundreds of classical and contemporary songs.',
    knowledgeCheck: [
      {
        id: 'ch4-q1',
        prompt: 'Which two notes do C Major (C–E–G) and A Minor (A–C–E) share in common?',
        options: ['C and G', 'E and G', 'C and E', 'A and C'],
        correctIndex: 2,
        explanation: 'Both triads contain C and E, making transitions between C Major and A Minor smooth and natural.',
      },
    ],
  },
  {
    id: 'ch-5',
    chapterNumber: 5,
    title: 'Simple Melodies & Two-Hand Coordination',
    subtitle: 'Read basic staff patterns and pair right-hand melody with steady left-hand bass notes.',
    durationMinutes: 12,
    xpReward: 85,
    teacherPersona: 'Professor Elena Vance · Repertoire Coach',
    objectives: [
      'Follow stepping vs. skipping notes in a musical phrase.',
      'Combine a right-hand melody with simple left-hand bass anchors (C3 and G3).',
    ],
    teacherExplanation: [
      'Coordinating both hands feels tricky at first because your brain tries to treat each finger independently. The secret is practicing each hand separately first, then uniting them slowly at half tempo.',
      'In Beethoven’s Ode to Joy motif, your right hand simply steps smoothly around E–F–G–D–C while your left hand taps a calm bass C3 on beat 1 of each measure.',
    ],
    visualDemoLabel: 'Listen: Ode to Joy Opening Phrase',
    visualDemoNotes: [64, 64, 65, 67, 67, 65, 64, 62, 60],
    interactiveExercise: {
      title: 'Ode to Joy Opening Phrase',
      instruction: 'Follow the highlighted keys: E4 → E4 → F4 → G4 → G4 → F4 → E4 → D4 → C4.',
      targetNotes: [64, 64, 65, 67, 67, 65, 64, 62, 60],
      mode: 'sequence',
    },
    guidedPractice: {
      title: 'Guided Hands-Together Preparation',
      steps: [
        'Play the first 8 notes of Ode to Joy with the right hand alone.',
        'Tap C3 on beat 1 and G2 on beat 5 with your left hand.',
        'Combine both hands slowly—prioritizing steady timing over speed.',
      ],
      melodyId: 'ode-to-joy',
    },
    independentPractice: {
      title: 'Dynamic Listening',
      prompt: 'Make the right-hand melody sing slightly brighter than the supportive left-hand bass.',
      checklist: [
        'Played the E–E–F–G–G–F–E–D–C contour smoothly.',
        'Kept wrists relaxed during repeated E4 and G4 notes.',
      ],
    },
    summary:
      'Hands-together playing succeeds when each hand is secure individually and united at a patient, steady tempo.',
    knowledgeCheck: [
      {
        id: 'ch5-q1',
        prompt: 'What is the most reliable way to learn a two-hand piano passage?',
        options: [
          'Play both hands as fast as possible immediately',
          'Practice each hand separately first, then combine slowly',
          'Look only at your left hand',
          'Hold the sustain pedal down permanently',
        ],
        correctIndex: 1,
        explanation: 'Isolating each hand builds muscle memory before uniting both hands slowly.',
      },
    ],
  },
  {
    id: 'ch-6',
    chapterNumber: 6,
    title: 'Your First Complete Song Performance',
    subtitle: 'Bring together posture, phrasing, rhythm, and timing on a complete beginner piece.',
    durationMinutes: 14,
    xpReward: 100,
    teacherPersona: 'Professor Elena Vance & Maestro Julian Thorne',
    objectives: [
      'Perform a complete beginner melody from opening note to final cadence.',
      'Balance phrase shaping, accurate rhythm, and confident performance preparation.',
    ],
    teacherExplanation: [
      'Congratulations on reaching Chapter 6! Playing a full piece is not about perfection—it is about communicating a musical story from start to finish without stopping for small slips.',
      'Before playing, take two seconds to check your bench height, let your shoulders drop, imagine the steady tempo in your head, and place your hands calmly over C4–A4.',
      'Shape the ending phrase gently softer as you resolve home onto C4.',
    ],
    visualDemoLabel: 'Listen: Twinkle Twinkle Opening & Answer Phrase',
    visualDemoNotes: [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60],
    interactiveExercise: {
      title: 'Complete Song Readiness Run',
      instruction: 'Play the opening & answer phrase: C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4.',
      targetNotes: [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60],
      mode: 'sequence',
    },
    guidedPractice: {
      title: 'Full Song Practice in Studio',
      steps: [
        'Hear the full piece once with the melody guide.',
        'Play along steadily without rushing the longer 2-beat G4 and final C4 notes.',
        'Repeat once more focusing on curved fingers and calm breathing.',
      ],
      melodyId: 'twinkle-twinkle',
    },
    independentPractice: {
      title: 'Recital Mindset Checklist',
      prompt: 'Perform the complete melody end-to-end in Melody Practice mode, then step into Level 1 Assessment!',
      checklist: [
        'Started with a deliberate two-second mental count-in.',
        'Held final C4 for its full two beats before lifting softly.',
      ],
    },
    summary:
      'You have progressed from zero musical background to performing complete melodies with sound technique, theory awareness, and musical phrasing. You are ready for the Level Assessments!',
    knowledgeCheck: [
      {
        id: 'ch6-q1',
        prompt: 'What should you do right before starting a complete piece performance?',
        options: [
          'Press the first key immediately before sitting down',
          'Check posture, relax shoulders, and feel the steady tempo for two seconds',
          'Tense your fingers so they never bend',
          'Skip counting beats on long notes',
        ],
        correctIndex: 1,
        explanation: 'A calm count-in and relaxed posture align rhythm and tone before the opening note sounds.',
      },
    ],
  },
];
