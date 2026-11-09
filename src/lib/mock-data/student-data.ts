export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  city: string;
  targetLanguage: 'zh' | 'en';
  currentLevelZh: string;
  currentLevelEn: string;
  streakDays: number;
  totalHours: number;
  vocabLearned: number;
  completedLessons: number;
  totalXp: number;
  weakSkills: {
    skill: string;
    skillKm: string;
    language: 'zh' | 'en';
    category: 'Listening' | 'Reading' | 'Writing' | 'Speaking' | 'Grammar' | 'Tones';
    accuracy: number;
    recommendedLessonId: string;
  }[];
  recentExams: {
    id: string;
    title: string;
    titleKm: string;
    date: string;
    score: string;
    percent: number;
    bandEstimated: string;
    status: 'passed' | 'review_needed';
  }[];
  weeklyActivity: {
    day: string;
    dayKm: string;
    hours: number;
    vocabCount: number;
  }[];
  skillRadar: {
    subject: string;
    subjectKm: string;
    score: number;
    fullMark: number;
  }[];
}

export const CURRENT_STUDENT: StudentProfile = {
  id: 'usr-cambodia-01',
  name: 'Vannak Roth (វណ្ណៈ)',
  email: 'vannak.roth@edu.kh',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  city: 'Phnom Penh',
  targetLanguage: 'zh',
  currentLevelZh: 'HSK 2 (Targeting HSK 3)',
  currentLevelEn: 'IELTS Band 6.0 (Targeting 7.0)',
  streakDays: 14,
  totalHours: 48.5,
  vocabLearned: 435,
  completedLessons: 42,
  totalXp: 3820,
  weakSkills: [
    {
      skill: 'Chinese 3rd Tone Sandhi & Dipping',
      skillKm: 'សូរសំឡេងចិនទី ៣ (ចុះឡើង) និងច្បាប់ប្រែប្រួលសំឡេង',
      language: 'zh',
      category: 'Tones',
      accuracy: 62,
      recommendedLessonId: 'zh-tone-3'
    },
    {
      skill: 'The "把" (bǎ) Disposal Grammar',
      skillKm: 'វេយ្យាករណ៍ទម្រង់ប្រយោគ "把" (bǎ)',
      language: 'zh',
      category: 'Grammar',
      accuracy: 58,
      recommendedLessonId: 'gr-3'
    },
    {
      skill: 'IELTS Academic Task 1: Overview Formulation',
      skillKm: 'ការសរសេរសេចក្តីសង្ខេប (Overview) ក្នុង IELTS Task 1',
      language: 'en',
      category: 'Writing',
      accuracy: 65,
      recommendedLessonId: 'en-writing-task1'
    },
    {
      skill: 'Conditional Sentences Type 3 (Past Speculation)',
      skillKm: 'ល្បះលក្ខខណ្ឌ Type 3 ក្នុងភាសាអង់គ្លេស',
      language: 'en',
      category: 'Grammar',
      accuracy: 68,
      recommendedLessonId: 'egr-1'
    }
  ],
  recentExams: [
    {
      id: 'res-1',
      title: 'HSK 1 Official Mock Test A',
      titleKm: 'តេស្តសាកល្បងផ្លូវការ HSK កម្រិត ១ (កម្រង A)',
      date: '2026-11-04',
      score: '185 / 200',
      percent: 92.5,
      bandEstimated: 'HSK 1 Passed (Excellent)',
      status: 'passed'
    },
    {
      id: 'res-2',
      title: 'IELTS Academic Reading & Listening Diagnostic',
      titleKm: 'តេស្តវិនិច្ឆ័យ IELTS Reading & Listening',
      date: '2026-10-28',
      score: 'Band 6.0',
      percent: 68.0,
      bandEstimated: 'CEFR B2 (Competent User)',
      status: 'review_needed'
    },
    {
      id: 'res-3',
      title: 'HSK 2 Practice Sprint (Vocabulary & Listening)',
      titleKm: 'លំហាត់អនុវត្តរហ័ស HSK 2',
      date: '2026-10-19',
      score: '240 / 300',
      percent: 80.0,
      bandEstimated: 'HSK 2 Ready',
      status: 'passed'
    }
  ],
  weeklyActivity: [
    { day: 'Mon', dayKm: 'ចន្ទ', hours: 1.5, vocabCount: 18 },
    { day: 'Tue', dayKm: 'អង្គារ', hours: 2.1, vocabCount: 25 },
    { day: 'Wed', dayKm: 'ពុធ', hours: 0.8, vocabCount: 12 },
    { day: 'Thu', dayKm: 'ព្រហ', hours: 2.4, vocabCount: 30 },
    { day: 'Fri', dayKm: 'សុក្រ', hours: 1.8, vocabCount: 22 },
    { day: 'Sat', dayKm: 'សៅរ៍', hours: 3.2, vocabCount: 45 },
    { day: 'Sun', dayKm: 'អាទិត្យ', hours: 2.8, vocabCount: 38 },
  ],
  skillRadar: [
    { subject: 'Listening', subjectKm: 'ការស្តាប់', score: 85, fullMark: 100 },
    { subject: 'Reading', subjectKm: 'ការអាន', score: 78, fullMark: 100 },
    { subject: 'Writing', subjectKm: 'ការសរសេរ', score: 64, fullMark: 100 },
    { subject: 'Speaking', subjectKm: 'ការនិយាយ', score: 70, fullMark: 100 },
    { subject: 'Grammar', subjectKm: 'វេយ្យាករណ៍', score: 74, fullMark: 100 },
    { subject: 'Vocabulary', subjectKm: 'វាក្យសព្ទ', score: 88, fullMark: 100 },
  ]
};

export const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Sopheak Chea', nameKm: 'ជា សុភក្ត្រ', city: 'Siem Reap', xp: 9840, streak: 45, badge: 'Grand Master', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
  { rank: 2, name: 'Chanthou Seng', nameKm: 'សេង ច័ន្ទធូ', city: 'Phnom Penh', xp: 8720, streak: 38, badge: 'IELTS Champion', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { rank: 3, name: 'Vannak Roth (You)', nameKm: 'រ័ត្ន វណ្ណៈ (អ្នក)', city: 'Phnom Penh', xp: 3820, streak: 14, badge: 'Rising Scholar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { rank: 4, name: 'Bopha Pich', nameKm: 'ពេជ្រ បុប្ផា', city: 'Battambang', xp: 3410, streak: 12, badge: 'HSK Ace', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
  { rank: 5, name: 'Piseth Meng', nameKm: 'ម៉េង ពិសិដ្ឋ', city: 'Kampong Cham', xp: 3190, streak: 9, badge: 'Vocabulary Pro', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
];

