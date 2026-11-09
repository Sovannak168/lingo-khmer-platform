export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'sentence_ordering'
  | 'short_answer'
  | 'essay'
  | 'audio_choice'
  | 'speaking_record';

export interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  promptKm?: string;
  audioUrl?: string;
  imageUrl?: string;
  options?: { id: string; text: string; textKm?: string }[];
  correctAnswer?: string | string[]; // Option ID or expected text
  matchingPairs?: { left: string; right: string }[];
  orderItems?: string[];
  points: number;
  explanationKm: string;
  explanationEn: string;
}

export interface ExamSection {
  id: string;
  title: string;
  titleKm: string;
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  durationMinutes: number;
  instructions: string;
  instructionsKm: string;
  questions: ExamQuestion[];
}

export interface MockExam {
  id: string;
  title: string;
  titleKm: string;
  examType: 'HSK' | 'IELTS_AC' | 'IELTS_GT' | 'TOEFL_IBT' | 'TOEIC' | 'CAMBRIDGE';
  levelCode: string;
  language: 'zh' | 'en';
  totalDurationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  maxScore: number;
  sections: ExamSection[];
  scoringRubricKm: string;
  scoringRubricEn: string;
}

export const MOCK_EXAMS_DATABASE: MockExam[] = [
  {
    id: 'exam-ielts-ac-1',
    title: 'IELTS Academic Full Mock Exam (Practice Test 1)',
    titleKm: 'ការប្រឡងសាកល្បងពេញលេញ IELTS Academic (តេស្តទី ១)',
    examType: 'IELTS_AC',
    levelCode: 'Band 1.0 – 9.0',
    language: 'en',
    totalDurationMinutes: 165,
    totalQuestions: 40,
    passingScore: 6.5,
    maxScore: 9.0,
    scoringRubricKm: 'ការដាក់ពិន្ទុតាមស្តង់ដារ 9-Band Scale របស់ IELTS៖ Listening និង Reading កែស្វ័យប្រវត្តិតាមចំនួនចម្លើយត្រូវ។ Writing និង Speaking ផ្អែកលើ Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy។',
    scoringRubricEn: 'Scored using the official IELTS 9-band scale. Objective listening and reading are automatically calculated. Writing and speaking are evaluated across 4 core competencies.',
    sections: [
      {
        id: 'sec-ielts-listen',
        title: 'Section 1: Listening Comprehension',
        titleKm: 'ផ្នែកទី ១៖ ការស្តាប់យល់ (Listening)',
        type: 'listening',
        durationMinutes: 30,
        instructions: 'Listen to the audio recording carefully. Answer all questions as you listen. You will hear the recording once.',
        instructionsKm: 'សូមស្តាប់ការថតសំឡេងដោយយកចិត្តទុកដាក់។ ឆ្លើយសំណួរទាំងអស់ខណៈពេលកំពុងស្តាប់។',
        questions: [
          {
            id: 'q-ielts-l1',
            type: 'audio_choice',
            prompt: 'According to the university registrar, what is the prerequisite requirement for Advanced Statistics?',
            promptKm: 'យោងតាមមន្ត្រីចុះឈ្មោះ តើអ្វីជាលក្ខខណ្ឌតម្រូវជាមុនសម្រាប់មុខវិជ្ជា Advanced Statistics?',
            audioUrl: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
            options: [
              { id: 'opt-a', text: 'Grade B or higher in Introduction to Probability' },
              { id: 'opt-b', text: 'A minimum of 2 years practical programming' },
              { id: 'opt-c', text: 'Recommendation letter from the department head' },
              { id: 'opt-d', text: 'Completion of High School Calculus with Honors' }
            ],
            correctAnswer: 'opt-a',
            points: 1,
            explanationKm: 'មន្ត្រីបានបញ្ជាក់ច្បាស់ថា សិស្សត្រូវតែទទួលបាននិទ្ទេស B ឬខ្ពស់ជាងនេះក្នុងមុខវិជ្ជា Introduction to Probability។',
            explanationEn: 'The audio explicitly stated that students must secure at least a grade B in Intro to Probability.'
          },
          {
            id: 'q-ielts-l2',
            type: 'fill_blank',
            prompt: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER: The international student orientation begins at _____ on Monday.',
            promptKm: 'សរសេរមិនលើសពីពីរពាក្យ ឬលេខ៖ ការតម្រង់ទិសនិស្សិតអន្តរជាតិនឹងចាប់ផ្តើមនៅវេលាម៉ោង _____ នាថ្ងៃចន្ទ។',
            correctAnswer: '9:30 AM',
            points: 1,
            explanationKm: 'ចម្លើយត្រឹមត្រូវគឺ 9:30 AM ឬ 9.30 am ដូចបានបញ្ជាក់ក្នុងសំឡេង។',
            explanationEn: 'The recorded timetable states the orientation welcomes attendees at 9:30 AM.'
          }
        ]
      },
      {
        id: 'sec-ielts-read',
        title: 'Section 2: Academic Reading (Passage: Sustainable Agriculture in Southeast Asia)',
        titleKm: 'ផ្នែកទី ២៖ ការអានផ្នែកសិក្សាស្រាវជ្រាវ (Reading)',
        type: 'reading',
        durationMinutes: 60,
        instructions: 'Read the academic passage and answer the True/False/Not Given and multiple choice questions.',
        instructionsKm: 'សូមអានអត្ថបទស្រាវជ្រាវ និងឆ្លើយសំណួរ True/False/Not Given និងពហុជ្រើសរើស។',
        questions: [
          {
            id: 'q-ielts-r1',
            type: 'true_false',
            prompt: 'Statement: Traditional drip irrigation systems consume more groundwater than conventional flood irrigation methods.',
            promptKm: 'សេចក្តីថ្លែង៖ ប្រព័ន្ធស្រោចស្រពដំណក់ទឹកបែបប្រពៃណីប្រើប្រាស់ទឹកក្រោមដីច្រើនជាងវិធីស្រោចស្រពជន់លិចធម្មតា។',
            options: [
              { id: 'TRUE', text: 'TRUE' },
              { id: 'FALSE', text: 'FALSE' },
              { id: 'NOT GIVEN', text: 'NOT GIVEN' }
            ],
            correctAnswer: 'FALSE',
            points: 1,
            explanationKm: 'FALSE ពីព្រោះអត្ថបទបញ្ជាក់ថា drip irrigation កាត់បន្ថយការប្រើប្រាស់ទឹកបានរហូតដល់ 40% បើធៀបនឹង flood irrigation។',
            explanationEn: 'False: Paragraph 3 clarifies that drip irrigation conserves up to 40% more groundwater than flood methods.'
          },
          {
            id: 'q-ielts-r2',
            type: 'multiple_choice',
            prompt: 'What was the primary obstacle hindering smallholder farmers in Battambang from adopting solar-powered pumps?',
            promptKm: 'តើអ្វីជាឧបសគ្គចម្បងដែលរារាំងកសិករខ្នាតតូចនៅបាត់ដំបងពីការប្រើប្រាស់ម៉ាស៊ីនបូមទឹកដើរដោយពន្លឺព្រះអាទិត្យ?',
            options: [
              { id: 'r2-a', text: 'High initial capital expenditure and limited credit access' },
              { id: 'r2-b', text: 'Lack of sunlight during monsoon season' },
              { id: 'r2-c', text: 'Strict governmental import restrictions' },
              { id: 'r2-d', text: 'Resistance from local community elders' }
            ],
            correctAnswer: 'r2-a',
            points: 1,
            explanationKm: 'អត្ថបទបានរៀបរាប់យ៉ាងច្បាស់ថា ថ្លៃដើមដំបូងខ្ពស់ (High initial cost) និងកង្វះកម្ចីឥណទាន គឺជាឧបសគ្គចម្បង។',
            explanationEn: 'Section B confirms that high upfront capital combined with scarce rural micro-loans formed the primary barrier.'
          }
        ]
      },
      {
        id: 'sec-ielts-write',
        title: 'Section 3: Academic Writing (Task 1 & Task 2)',
        titleKm: 'ផ្នែកទី ៣៖ សំណេរសិក្សាស្រាវជ្រាវ (Writing Task 1 & 2)',
        type: 'writing',
        durationMinutes: 60,
        instructions: 'Write at least 150 words for Task 1 and at least 250 words for Task 2. Use academic tone and structured paragraphs.',
        instructionsKm: 'សរសេរយ៉ាងហោចណាស់ ១៥០ ពាក្យសម្រាប់ Task 1 និង ២៥០ ពាក្យសម្រាប់ Task 2 ដោយប្រើកថាខណ្ឌច្បាស់លាស់។',
        questions: [
          {
            id: 'q-ielts-w1',
            type: 'essay',
            prompt: 'IELTS Writing Task 2: Some people believe that rapid artificial intelligence development will benefit human education, while others argue that it will diminish students critical thinking skills. Discuss both views and give your own opinion. (Write at least 250 words).',
            promptKm: 'IELTS Writing Task 2៖ មនុស្សមួយចំនួនជឿថាការវិវត្តយ៉ាងលឿននៃ AI នឹងផ្តល់ផលប្រយោជន៍ដល់ការអប់រំ ចំណែកអ្នកខ្លះទៀតយល់ថាវានឹងកាត់បន្ថយការគិតស៊ីជម្រៅរបស់សិស្ស។ ចូរពិភាក្សាទស្សនៈទាំងពីរ និងបញ្ជាក់គំនិតផ្ទាល់ខ្លួនរបស់អ្នក។ (យ៉ាងហោចណាស់ ២៥០ ពាក្យ)',
            points: 9,
            explanationKm: 'អត្ថបទត្រូវតែមាន៖ Introduction (Paraphrase + Thesis statement), Body 1 (អត្ថប្រយោជន៍នៃ AI), Body 2 (ហានិភ័យលើ critical thinking), និង Conclusion (សង្ខេបនិងបញ្ជាក់ជំហរផ្ទាល់ខ្លួន)។',
            explanationEn: 'Must include 4 distinct paragraphs: Introduction with thesis, Body paragraph 1 analyzing advantages, Body paragraph 2 addressing cognitive concerns, and balanced conclusion.'
          }
        ]
      },
      {
        id: 'sec-ielts-speak',
        title: 'Section 4: Speaking Interview (Parts 1–3)',
        titleKm: 'ផ្នែកទី ៤៖ កិច្ចសម្ភាសន៍និយាយ (Speaking)',
        type: 'speaking',
        durationMinutes: 14,
        instructions: 'Record your oral answers clearly using your microphone. Maintain natural pacing and descriptive vocabulary.',
        instructionsKm: 'សូមថតសំឡេងចម្លើយរបស់អ្នកដោយប្រើមីក្រូហ្វូន។ និយាយដោយធម្មជាតិ និងប្រើប្រាស់ពាក្យសំបូរបែប។',
        questions: [
          {
            id: 'q-ielts-sp1',
            type: 'speaking_record',
            prompt: 'Speaking Part 2: Describe an international event or cultural festival that you recently learned about. You should say: what it is, where it takes place, why people celebrate it, and explain how you felt about it.',
            promptKm: 'Speaking Part 2៖ ចូររៀបរាប់អំពីព្រឹត្តិការណ៍អន្តរជាតិ ឬពិធីបុណ្យវប្បធម៌ដែលអ្នកបានស្គាល់កាលពីពេលថ្មីៗនេះ។ រៀបរាប់ពីអ្វី កន្លែងប្រារព្ធ មូលហេតុ និងអារម្មណ៍របស់អ្នក។',
            points: 9,
            explanationKm: 'ឆ្លើយឱ្យបានពេញលេញរយៈពេល ១-២ នាទី។ ប្រើប្រាស់ tenses សមស្រប (past & present), adjectives ពិពណ៌នា, និងភ្ជាប់គំនិតដោយ connectors។',
            explanationEn: 'Target 1.5 to 2 minutes response time with varied discourse markers and cohesive vocabulary.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam-hsk-1-mock',
    title: 'HSK Level 1 Official Simulation Exam',
    titleKm: 'ការប្រឡងសាកល្បងស្តង់ដារផ្លូវការ HSK កម្រិត ១',
    examType: 'HSK',
    levelCode: 'HSK 1',
    language: 'zh',
    totalDurationMinutes: 40,
    totalQuestions: 40,
    passingScore: 120,
    maxScore: 200,
    scoringRubricKm: 'HSK 1 មានពិន្ទុសរុប ២០០ ពិន្ទុ (ការស្តាប់ ១០០ ពិន្ទុ + ការអាន ១០០ ពិន្ទុ)។ ពិន្ទុជាប់គឺចាប់ពី ១២០ ពិន្ទុឡើងទៅ។',
    scoringRubricEn: 'Total score 200 (Listening 100 + Reading 100). Passing threshold is 120 points.',
    sections: [
      {
        id: 'sec-hsk1-listen',
        title: 'HSK 1 Listening (听力)',
        titleKm: 'HSK 1 ការស្តាប់យល់ (听力)',
        type: 'listening',
        durationMinutes: 20,
        instructions: 'Listen to each audio prompt and select whether the statement or picture matches.',
        instructionsKm: 'ស្តាប់សំឡេងហើយជ្រើសរើសចម្លើយដែលត្រូវគ្នា។',
        questions: [
          {
            id: 'q-hsk1-l1',
            type: 'audio_choice',
            prompt: '听录音判断对错：录音播放 "他在睡觉。" (Is the statement TRUE or FALSE?)',
            promptKm: 'ស្តាប់សំឡេង៖ "他在睡觉。" (Tā zài shuìjiào - គាត់កំពុងគេង) តើត្រូវឬខុស?',
            audioUrl: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
            options: [
              { id: 'hsk-true', text: '对 (Correct / True)' },
              { id: 'hsk-false', text: '错 (Incorrect / False)' }
            ],
            correctAnswer: 'hsk-true',
            points: 5,
            explanationKm: 'សំឡេងបញ្ជាក់ថា "他在睡觉" (គាត់កំពុងគេង) ដែលត្រូវគ្នានឹងសំណួរ។',
            explanationEn: 'The audio clearly states "他在睡觉" (He is sleeping).'
          },
          {
            id: 'q-hsk1-l2',
            type: 'multiple_choice',
            prompt: '选择正确的拼音 (Choose the correct Pinyin for: 苹果):',
            promptKm: 'ជ្រើសរើស ភីនអ៊ីន (Pinyin) ត្រឹមត្រូវសម្រាប់ពាក្យ៖ 苹果 (ផ្លែប៉ោម):',
            options: [
              { id: 'opt-pg1', text: 'píngguǒ (ផ្លែប៉ោម)' },
              { id: 'opt-pg2', text: 'bīngxiāng (ទូទឹកកក)' },
              { id: 'opt-pg3', text: 'pútáo (ទំពាំងបាយជូរ)' },
              { id: 'opt-pg4', text: 'fēijī (យន្តហោះ)' }
            ],
            correctAnswer: 'opt-pg1',
            points: 5,
            explanationKm: '苹果 អានថា píngguǒ មានន័យថា ផ្លែប៉ោម។',
            explanationEn: 'The correct Pinyin for 苹果 (apple) is píngguǒ.'
          }
        ]
      },
      {
        id: 'sec-hsk1-read',
        title: 'HSK 1 Reading (阅读)',
        titleKm: 'HSK 1 ការអានយល់ (阅读)',
        type: 'reading',
        durationMinutes: 20,
        instructions: 'Read the Chinese sentences and choose the corresponding answer.',
        instructionsKm: 'អានប្រយោគចិន និងជ្រើសរើសចម្លើយត្រឹមត្រូវ។',
        questions: [
          {
            id: 'q-hsk1-r1',
            type: 'multiple_choice',
            prompt: '看句子选词填空：我想买一个新电脑，______太贵了。',
            promptKm: 'ជ្រើសរើសពាក្យបំពេញប្រយោគ៖ 我想买一个新电脑，______太贵了。 (ខ្ញុំចង់ទិញកុំព្យូទ័រថ្មីមួយ ______ វាថ្លៃពេក។)',
            options: [
              { id: 'r1-dan', text: '但是 (dànshì - ប៉ុន្តែ)' },
              { id: 'r1-he', text: '和 (hé - និង)' },
              { id: 'r1-zai', text: '在 (zài - នៅ)' },
              { id: 'r1-de', text: '的 (de - របស់)' }
            ],
            correctAnswer: 'r1-dan',
            points: 5,
            explanationKm: 'ពាក្យ "但是" (dànshì) មានន័យថា "ប៉ុន្តែ" បង្ហាញពីទំនាក់ទំនងផ្ទុយគ្នាក្នុងប្រយោគ។',
            explanationEn: '"但是" (dànshì - but/however) expresses the contrastive relationship.'
          },
          {
            id: 'q-hsk1-r2',
            type: 'sentence_ordering',
            prompt: '连词成句 (Arrange into correct Chinese word order): [中国 / 他 / 去 / 想 / 学习]',
            promptKm: 'រៀបចំជាប្រយោគត្រឹមត្រូវ៖ [中国 / 他 / 去 / 想 / 学习]',
            orderItems: ['他', '想', '去', '中国', '学习'],
            correctAnswer: '他想去中国学习',
            points: 5,
            explanationKm: 'លំដាប់ប្រយោគភាសាចិន៖ Subject (他) + Optative Verb (想) + Verb 1 (去) + Place (中国) + Verb 2 (学习) = 他想去中国学习 (គាត់ចង់ទៅរៀននៅប្រទេសចិន)។',
            explanationEn: 'Standard Chinese serial verb construction: Subject + Modal (想) + Verb 1 + Location + Verb 2.'
          }
        ]
      }
    ]
  },
  {
    id: 'exam-toeic-mock',
    title: 'TOEIC Listening & Reading Simulation Test',
    titleKm: 'ការប្រឡងសាកល្បង TOEIC Listening & Reading',
    examType: 'TOEIC',
    levelCode: 'Score 10 – 990',
    language: 'en',
    totalDurationMinutes: 120,
    totalQuestions: 200,
    passingScore: 650,
    maxScore: 990,
    scoringRubricKm: 'TOEIC បែងចែកជា ២ ផ្នែក៖ Listening (៤៩៥ ពិន្ទុ) និង Reading (៤៩៥ ពិន្ទុ) សរុប ៩៩០ ពិន្ទុ។',
    scoringRubricEn: 'Two sections: Listening (495 pts) and Reading (495 pts), totaling 990 points.',
    sections: [
      {
        id: 'sec-toeic-read',
        title: 'Part 5: Incomplete Sentences (Grammar & Business Vocab)',
        titleKm: 'ផ្នែកទី ៥៖ បំពេញល្បះពាណិជ្ជកម្ម និងវេយ្យាករណ៍',
        type: 'reading',
        durationMinutes: 75,
        instructions: 'Choose the word that best completes each business English sentence.',
        instructionsKm: 'ជ្រើសរើសពាក្យដែលសមស្របបំផុតសម្រាប់បំពេញល្បះភាសាអង់គ្លេសពាណិជ្ជកម្ម។',
        questions: [
          {
            id: 'q-toeic-1',
            type: 'multiple_choice',
            prompt: 'The newly appointed logistics director requested that all quarterly audit reports be submitted ________ Friday noon.',
            promptKm: 'នាយកផ្នែកដឹកជញ្ជូនដែលទើបតែងតាំងថ្មីបានស្នើសុំឱ្យបញ្ជូនរបាយការណ៍សវនកម្មប្រចាំត្រីមាសទាំងអស់ឱ្យបាន ________ ត្រឹមថ្ងៃត្រង់សុក្រ។',
            options: [
              { id: 't1-a', text: 'prior to' },
              { id: 't1-b', text: 'ahead' },
              { id: 't1-c', text: 'previous' },
              { id: 't1-d', text: 'former' }
            ],
            correctAnswer: 't1-a',
            points: 5,
            explanationKm: '"prior to" គឺជា preposition មានន័យថា "មុនពេល" (before)។ "ahead" ត្រូវការ "of" (ahead of) ទើបត្រឹមត្រូវ។',
            explanationEn: '"prior to" is the correct preposition meaning before a specific deadline.'
          }
        ]
      }
    ]
  }
];

