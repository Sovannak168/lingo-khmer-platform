export interface EnglishVocab {
  id: string;
  word: string;
  ipa: string;
  meaningKm: string;
  meaningEn: string;
  partOfSpeech: string;
  level: 'Beginner (A1-A2)' | 'Intermediate (B1-B2)' | 'Advanced (C1-C2)';
  examFocus: ('IELTS' | 'TOEFL' | 'TOEIC' | 'Cambridge')[];
  examples: {
    en: string;
    km: string;
  }[];
  synonyms?: string[];
  collocations?: string[];
}

export interface EnglishGrammar {
  id: string;
  level: string;
  title: string;
  titleKm: string;
  explanationKm: string;
  explanationEn: string;
  ruleFormula: string;
  commonMistakesKm: string;
  examples: {
    en: string;
    km: string;
    isCorrect?: boolean;
    note?: string;
  }[];
}

export const ENGLISH_LEVELS = [
  { level: 'Beginner (A1–A2)', hours: '80-100', cefr: 'A1-A2', descKm: 'មូលដ្ឋានគ្រឹះ វេយ្យាករណ៍សាមញ្ញ និងការសន្ទនាប្រចាំថ្ងៃ', descEn: 'Fundamental vocabulary, basic grammar tenses and everyday conversations' },
  { level: 'Intermediate (B1–B2)', hours: '150-200', cefr: 'B1-B2', descKm: 'ត្រៀម IELTS Band 5.0–6.5 / TOEIC 600-750 / TOEFL 60-80', descEn: 'Complex grammar, academic reading, structured writing and fluent speaking' },
  { level: 'Advanced (C1–C2)', hours: '250+', cefr: 'C1-C2', descKm: 'ត្រៀម IELTS Band 7.0–8.5+ / TOEFL 100+ / ស្ទាត់ជំនាញវិជ្ជាជីវៈ', descEn: 'Nuanced idioms, professional discourse, critical reasoning, and academic mastery' },
];

export const ENGLISH_VOCABULARY: EnglishVocab[] = [
  {
    id: 'en-1',
    word: 'ubiquitous',
    ipa: '/juːˈbɪk.wɪ.təs/',
    meaningKm: 'ដែលមាននៅគ្រប់ទីកន្លែង, សម្បូរបែបខ្លាំង',
    meaningEn: 'Present, appearing, or found everywhere',
    partOfSpeech: 'Adjective',
    level: 'Advanced (C1-C2)',
    examFocus: ['IELTS', 'TOEFL', 'Cambridge'],
    examples: [
      { en: 'Smartphones have become ubiquitous in modern Cambodian society.', km: 'ទូរស័ព្ទឆ្លាតវៃបានក្លាយជាឧបករណ៍ដែលមាននៅគ្រប់ទីកន្លែងក្នុងសង្គមកម្ពុជាសម័យទំនើប។' },
      { en: 'Plastic waste is an ubiquitous environmental threat worldwide.', km: 'កាកសំណល់ប្លាស្ទិកគឺជាការគំរាមកំហែងបរិស្ថានដែលមាននៅគ្រប់ទីកន្លែងទូទាំងពិភពលោក។' }
    ],
    synonyms: ['omnipresent', 'pervasive', 'universal'],
    collocations: ['ubiquitous influence', 'ubiquitous presence']
  },
  {
    id: 'en-2',
    word: 'substantial',
    ipa: '/səbˈstæn.ʃəl/',
    meaningKm: 'ច្រើនសន្ធឹកសន្ធាប់, សំខាន់, មានទំហំធំ',
    meaningEn: 'Of considerable importance, size, or worth',
    partOfSpeech: 'Adjective',
    level: 'Intermediate (B1-B2)',
    examFocus: ['IELTS', 'TOEIC', 'TOEFL'],
    examples: [
      { en: 'There was a substantial increase in tourist arrivals in Siem Reap.', km: 'មានការកើនឡើងយ៉ាងច្រើនសន្ធឹកសន្ធាប់នៃចំនួនភ្ញៀវទេសចរមកកាន់ខេត្តសៀមរាប។' },
      { en: 'The government made substantial investments in clean water infrastructure.', km: 'រាជរដ្ឋាភិបាលបានវិនិយោគយ៉ាងច្រើនលើហេដ្ឋារចនាសម្ព័ន្ធទឹកស្អាត។' }
    ],
    synonyms: ['significant', 'considerable', 'extensive'],
    collocations: ['substantial amount', 'substantial progress']
  },
  {
    id: 'en-3',
    word: 'fluctuate',
    ipa: '/ˈflʌk.tʃu.eɪt/',
    meaningKm: 'ឡើងចុះមិនទៀងទាត់, ប្រែប្រួល',
    meaningEn: 'To rise and fall irregularly in number or amount',
    partOfSpeech: 'Verb',
    level: 'Intermediate (B1-B2)',
    examFocus: ['IELTS', 'TOEIC'],
    examples: [
      { en: 'The price of fuel fluctuated wildly throughout the previous fiscal year.', km: 'តម្លៃប្រេងឥន្ធនៈបានឡើងចុះយ៉ាងខ្លាំងពេញមួយឆ្នាំសារពើពន្ធកន្លងទៅ។' }
    ],
    synonyms: ['oscillate', 'vary', 'shift'],
    collocations: ['fluctuate wildly', 'prices fluctuate']
  },
  {
    id: 'en-4',
    word: 'mitigate',
    ipa: '/ˈmɪt.ɪ.ɡeɪt/',
    meaningKm: 'កាត់បន្ថយភាពធ្ងន់ធ្ងរ, បន្ធូរបន្ថយ',
    meaningEn: 'To make something less severe, serious, or painful',
    partOfSpeech: 'Verb',
    level: 'Advanced (C1-C2)',
    examFocus: ['IELTS', 'TOEFL'],
    examples: [
      { en: 'Reforestation efforts are vital to mitigate the impacts of climate change.', km: 'ការដាំព្រៃឈើឡើងវិញមានសារៈសំខាន់ខ្លាំងដើម្បីកាត់បន្ថយផលប៉ះពាល់នៃការប្រែប្រួលអាកាសធាតុ។' }
    ],
    synonyms: ['alleviate', 'lessen', 'diminish'],
    collocations: ['mitigate risks', 'mitigate effects']
  },
  {
    id: 'en-5',
    word: 'collaborate',
    ipa: '/kəˈlæb.ə.reɪt/',
    meaningKm: 'សហការ, ធ្វើការរួមគ្នា',
    meaningEn: 'Work jointly on an activity or project',
    partOfSpeech: 'Verb',
    level: 'Beginner (A1-A2)',
    examFocus: ['TOEIC', 'Cambridge', 'IELTS'],
    examples: [
      { en: 'Our department will collaborate with international researchers next month.', km: 'នាយកដ្ឋានរបស់យើងនឹងសហការជាមួយអ្នកស្រាវជ្រាវអន្តរជាតិនានានៅខែក្រោយ។' }
    ],
    synonyms: ['cooperate', 'team up', 'partner'],
    collocations: ['collaborate closely', 'collaborate with']
  }
];

export const ENGLISH_GRAMMAR: EnglishGrammar[] = [
  {
    id: 'egr-1',
    level: 'Intermediate (B1-B2)',
    title: 'Conditional Sentences (Type 2 & Type 3 for IELTS)',
    titleKm: 'ល្បះលក្ខខណ្ឌ (Conditionals Type 2 & 3)',
    explanationKm: 'Conditionals ត្រូវបានប្រើញឹកញាប់ក្នុង IELTS Speaking & Writing ដើម្បីបង្ហាញពីការប៉ាន់ស្មាន ឬស្ថានភាពសម្មតិកម្ម។ Type 2 ប្រើសម្រាប់ស្ថានភាពសម្មតិកម្មនៅបច្ចុប្បន្ន (មិនពិត)។ Type 3 ប្រើសម្រាប់សោកស្តាយនូវរឿងកន្លងហួសក្នុងអតីតកាល។',
    explanationEn: 'Conditionals are essential for scoring Band 7+ in Grammatical Range and Accuracy. Type 2 describes hypothetical present/future states. Type 3 speculates about past alternatives.',
    ruleFormula: 'Type 2: If + Past Simple, would + V(base) | Type 3: If + Past Perfect, would have + V3',
    commonMistakesKm: 'កំហុសទូទៅ៖ សិស្សខ្មែរច្រើនតែប្រើ "will" ជំនួស "would" នៅក្នុងល្បះដែលជាការសន្មត់មិនពិត។',
    examples: [
      { en: 'If governments invested more in renewable energy, emissions would drop drastically.', km: 'ប្រសិនបើរដ្ឋាភិបាលនានាវិនិយោគបន្ថែមលើថាមពលកកើតឡើងវិញ ការបញ្ចេញឧស្ម័ននឹងធ្លាក់ចុះយ៉ាងគំហុក។' },
      { en: 'If the team had prepared more thoroughly, they would have won the regional contest.', km: 'ប្រសិនបើក្រុមបានត្រៀមលក្ខណៈឱ្យបានហ្មត់ចត់ជាងនេះ ពួកគេច្បាស់ជាបានឈ្នះការប្រកួតក្នុងតំបន់នោះ។' }
    ]
  },
  {
    id: 'egr-2',
    level: 'Intermediate (B1-B2)',
    title: 'Passive Voice in Academic & Report Writing',
    titleKm: 'ល្បះកម្ម (Passive Voice) ក្នុងការសរសេររបាយការណ៍ IELTS Task 1',
    explanationKm: 'Passive Voice (កម្មកិរិយា) ត្រូវបានប្រើប្រាស់នៅពេលដែលយើងចង់សង្កត់ធ្ងន់លើកម្មវត្ថុ ឬលទ្ធផលនៃសកម្មភាព ជាជាងអ្នកធ្វើសកម្មភាព។ មានសារៈសំខាន់ខ្លាំងសម្រាប់ការពិពណ៌នាដំណាក់កាលផលិតកម្ម (Process diagrams) ក្នុង IELTS Task 1។',
    explanationEn: 'Used when the focus is on the action or the recipient rather than the agent. Mandatory for academic reports, lab processes, and IELTS Academic Task 1 process tasks.',
    ruleFormula: 'Subject + Be (conjugated) + Past Participle (V3) (+ by Agent)',
    commonMistakesKm: 'កំហុសទូទៅ៖ ភ្លេចបន្ថែមទម្រង់ Verb "to be" ឬប្រើខុស tense (កាល)។',
    examples: [
      { en: 'The raw materials are harvested, sorted, and then transported to the processing plant.', km: 'វត្ថុធាតុដើមត្រូវបានប្រមូលផល តម្រៀប និងបញ្ជូនទៅកាន់រោងចក្រកែច្នៃ។' },
      { en: 'Over twenty thousand surveys were distributed to households across Phnom Penh.', km: 'កម្រងសំណួរជាងពីរម៉ឺនត្រូវបានចែកចាយទៅកាន់ខ្នងផ្ទះទូទាំងរាជធានីភ្នំពេញ។' }
    ]
  }
];

export const LISTENING_PRACTICE_SAMPLE = {
  id: 'listen-1',
  title: 'IELTS Listening Section 1: University Accommodation Inquiry',
  titleKm: 'IELTS Listening ផ្នែកទី ១៖ ការសាកសួរព័ត៌មានកន្លែងស្នាក់នៅសាកលវិទ្យាល័យ',
  audioUrl: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
  transcript: `Officer: Good morning, Student Accommodation Office. How can I help you today?
Student: Hello, my name is Sokha Chan from Cambodia. I have just been accepted for the Master's in Data Science, and I'd like to ask about on-campus dormitories.
Officer: Congratulations Sokha! We have two main halls for postgraduate students: Greenfield Court and Westside Pavilion. Greenfield Court has private en-suite bathrooms and costs 140 pounds per week, including all utilities and high-speed Wi-Fi.
Student: That sounds ideal. Does Westside Pavilion have shared facilities?
Officer: Yes, in Westside, four students share a kitchen and bathroom, but the weekly rent is only 95 pounds.
Student: I see. And what is the application deadline?
Officer: For international arrivals in September, you must finalize your online reservation before June 15th.`,
  questions: [
    {
      id: 'lq-1',
      question: 'What is the student inquiring about?',
      questionKm: 'តើសិស្សកំពុងសាកសួរអំពីអ្វី?',
      options: ['Course registration', 'On-campus accommodation', 'Library membership', 'Scholarship stipend'],
      correctIndex: 1,
      explanation: 'The student explicitly states: "I\'d like to ask about on-campus dormitories."'
    },
    {
      id: 'lq-2',
      question: 'What is the weekly rent for Greenfield Court?',
      questionKm: 'តើថ្លៃជួលប្រចាំសប្តាហ៍នៅ Greenfield Court មានតម្លៃប៉ុន្មាន?',
      options: ['£95 per week', '£120 per week', '£140 per week', '£160 per week'],
      correctIndex: 2,
      explanation: 'The officer confirms Greenfield Court costs £140 per week including utilities.'
    },
    {
      id: 'lq-3',
      question: 'What is the deadline for international reservations?',
      questionKm: 'តើថ្ងៃផុតកំណត់នៃការកក់សម្រាប់សិស្សអន្តរជាតិគឺថ្ងៃណា?',
      options: ['June 15th', 'July 1st', 'August 30th', 'September 1st'],
      correctIndex: 0,
      explanation: 'The officer confirms you must finalize before June 15th.'
    }
  ]
};

