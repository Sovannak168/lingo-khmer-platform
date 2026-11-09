export type Language = 'en' | 'km';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_chinese: string;
  nav_english: string;
  nav_practice: string;
  nav_mock_exams: string;
  nav_progress: string;
  nav_vocabulary: string;
  nav_ai_tutor: string;
  nav_leaderboard: string;
  nav_profile: string;
  nav_teacher: string;
  nav_admin: string;
  nav_subscribe: string;

  // Common
  search: string;
  view_all: string;
  start_learning: string;
  continue_lesson: string;
  take_exam: string;
  level: string;
  completed: string;
  in_progress: string;
  daily_streak: string;
  hours_learned: string;
  words_mastered: string;
  xp_points: string;
  accuracy: string;
  submit: string;
  next: string;
  previous: string;
  finish: string;
  listen: string;
  record: string;
  pronounce: string;
  explain_khmer: string;
  dark_mode: string;
  light_mode: string;
  disclaimer_title: string;
  disclaimer_desc: string;

  // Hero / Home
  hero_title: string;
  hero_subtitle: string;
  hero_cta_chinese: string;
  hero_cta_english: string;
  hero_badge: string;
  explore_courses: string;
  trusted_by: string;

  // Chinese module
  hsk_levels: string;
  pinyin_guide: string;
  stroke_order: string;
  tone_practice: string;
  tones_desc: string;
  hanzi_characters: string;
  chinese_flashcards: string;

  // English module
  ielts_prep: string;
  toefl_prep: string;
  toeic_prep: string;
  cambridge_prep: string;
  ipa_guide: string;
  speaking_practice: string;
  writing_evaluation: string;

  // Exams
  exam_simulation: string;
  official_disclaimer: string;
  time_remaining: string;
  question_of: string;
  mark_for_review: string;
  exam_summary: string;
  score_report: string;
  estimated_band: string;

  // AI Tutor
  ai_tutor_title: string;
  ai_tutor_desc: string;
  ask_anything: string;
  ask_placeholder: string;
  grammar_check: string;
  essay_check: string;
  translate_tool: string;

  // Roles
  role_student: string;
  role_teacher: string;
  role_admin: string;
  switch_role: string;

  // Auth & Security
  auth_login: string;
  auth_register: string;
  auth_logout: string;
  auth_email: string;
  auth_password: string;
  auth_name: string;
  auth_role: string;
  auth_login_required: string;
  auth_login_desc: string;
  auth_access_denied: string;
  auth_access_denied_desc: string;
  auth_quick_demo: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav_home: "Home",
    nav_chinese: "Learn Chinese",
    nav_english: "Learn English",
    nav_practice: "Practice Tests",
    nav_mock_exams: "Mock Exams",
    nav_progress: "My Progress",
    nav_vocabulary: "Vocabulary",
    nav_ai_tutor: "AI Tutor",
    nav_leaderboard: "Leaderboard",
    nav_profile: "Profile",
    nav_teacher: "Teacher Portal",
    nav_admin: "Admin Console",
    nav_subscribe: "Upgrade to Pro",

    search: "Search lessons, vocabulary, tests...",
    view_all: "View All",
    start_learning: "Start Learning",
    continue_lesson: "Continue Lesson",
    take_exam: "Take Practice Exam",
    level: "Level",
    completed: "Completed",
    in_progress: "In Progress",
    daily_streak: "Day Streak",
    hours_learned: "Hours Learned",
    words_mastered: "Words Mastered",
    xp_points: "Total XP",
    accuracy: "Accuracy",
    submit: "Submit",
    next: "Next",
    previous: "Previous",
    finish: "Finish & See Results",
    listen: "Listen",
    record: "Record Voice",
    pronounce: "Pronounce",
    explain_khmer: "Explanation in Khmer",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
    disclaimer_title: "Educational & Preparation Notice",
    disclaimer_desc: "This platform provides mock preparation tests and estimated practice scores. It is not affiliated with or authorized to issue official certificates for HSK, IELTS, TOEFL, TOEIC, or Cambridge examinations.",

    hero_title: "Master Chinese & English with Real Confidence",
    hero_subtitle: "The premier bilingual learning and international exam preparation platform built for Cambodian students. Master HSK 1–6, IELTS, TOEFL & TOEIC with step-by-step Khmer explanations and intelligent AI tutoring.",
    hero_cta_chinese: "Start Chinese (HSK)",
    hero_cta_english: "Start English (IELTS)",
    hero_badge: "Bilingual Learning Platform for Cambodia 🇰🇭 🇨🇳 🇬🇧",
    explore_courses: "Explore Courses",
    trusted_by: "Designed to empower students across Cambodia",

    hsk_levels: "HSK Standard Courses (1–6)",
    pinyin_guide: "Pinyin & Pronunciation",
    stroke_order: "Chinese Character Stroke Order",
    tone_practice: "Tonal Accuracy Trainer",
    tones_desc: "Master Tone 1 (High Level), Tone 2 (Rising), Tone 3 (Dipping), Tone 4 (Falling) & Neutral tone.",
    hanzi_characters: "Hanzi Characters",
    chinese_flashcards: "Smart Flashcards (Spaced Repetition)",

    ielts_prep: "IELTS Academic & General",
    toefl_prep: "TOEFL iBT Complete",
    toeic_prep: "TOEIC Listening & Reading",
    cambridge_prep: "Cambridge English (B2/C1/C2)",
    ipa_guide: "International Phonetic Alphabet (IPA)",
    speaking_practice: "Interactive Speaking & Speech AI",
    writing_evaluation: "Essay Writing with AI Grading",

    exam_simulation: "Standardized Mock Examination Engine",
    official_disclaimer: "Official Exam Simulation — Practice Scores Only",
    time_remaining: "Time Remaining",
    question_of: "Question",
    mark_for_review: "Mark for Review",
    exam_summary: "Exam Review Summary",
    score_report: "Diagnostic Score Report",
    estimated_band: "Estimated Score / Band",

    ai_tutor_title: "AI Language Tutor & Assistant",
    ai_tutor_desc: "Ask grammar questions in Khmer, practice conversations in Chinese or English, and receive detailed essay corrections with explanations.",
    ask_anything: "Ask your AI tutor anything...",
    ask_placeholder: "e.g., 'How do I use 把 (bǎ) structure in Chinese?' or 'Check my IELTS task 2 introduction'",
    grammar_check: "Grammar Analysis",
    essay_check: "Essay Review",
    translate_tool: "Bidirectional Translation",

    role_student: "Student",
    role_teacher: "Teacher",
    role_admin: "Administrator",
    switch_role: "Switch Demo View",

    auth_login: "Sign In",
    auth_register: "Sign Up",
    auth_logout: "Sign Out",
    auth_email: "Email Address",
    auth_password: "Password",
    auth_name: "Full Name",
    auth_role: "Account Role",
    auth_login_required: "Account Authentication Required",
    auth_login_desc: "You must have an account and sign in to access courses, practice vocabulary, use the AI tutor, and take mock examinations.",
    auth_access_denied: "Access Denied (403 Forbidden)",
    auth_access_denied_desc: "You do not possess the required security authorization to view this faculty or administrator section.",
    auth_quick_demo: "1-Click Instant Demo Login",
  },
  km: {
    nav_home: "ទំព័រដើម",
    nav_chinese: "រៀនភាសាចិន",
    nav_english: "រៀនភាសាអង់គ្លេស",
    nav_practice: "លំហាត់អនុវត្ត",
    nav_mock_exams: "ការប្រឡងសាកល្បង",
    nav_progress: "វឌ្ឍនភាពខ្ញុំ",
    nav_vocabulary: "វាក្យសព្ទ",
    nav_ai_tutor: "គ្រូជំនួយ AI",
    nav_leaderboard: "តារាងពិន្ទុឆ្នើម",
    nav_profile: "គណនីខ្ញុំ",
    nav_teacher: "ផ្នែកគ្រូបង្រៀន",
    nav_admin: "ផ្ទាំងគ្រប់គ្រង Admin",
    nav_subscribe: "ដំឡើងទៅ Premium",

    search: "ស្វែងរកមេរៀន វាក្យសព្ទ ឬការប្រឡង...",
    view_all: "មើលទាំងអស់",
    start_learning: "ចាប់ផ្តើមរៀន",
    continue_lesson: "បន្តមេរៀន",
    take_exam: "ធ្វើតេស្តប្រឡង",
    level: "កម្រិត",
    completed: "បានបញ្ចប់",
    in_progress: "កំពុងរៀន",
    daily_streak: "ថ្ងៃជាប់គ្នា",
    hours_learned: "ម៉ោងរៀនសរុប",
    words_mastered: "ពាក្យចេះស្ទាត់",
    xp_points: "ពិន្ទុ XP",
    accuracy: "ភាពត្រឹមត្រូវ",
    submit: "បញ្ជូន",
    next: "បន្ទាប់",
    previous: "ថយក្រោយ",
    finish: "បញ្ចប់ និងមើលលទ្ធផល",
    listen: "ស្តាប់",
    record: "ថតសំឡេង",
    pronounce: "បញ្ចេញសំឡេង",
    explain_khmer: "ពន្យល់ជាភាសាខ្មែរ",
    dark_mode: "ទម្រង់ងងឹត (Dark)",
    light_mode: "ទម្រង់ភ្លឺ (Light)",
    disclaimer_title: "សេចក្តីជូនដំណឹងអំពីការអប់រំ និងការត្រៀមប្រឡង",
    disclaimer_desc: "វេទិកានេះផ្តល់នូវការប្រឡងសាកល្បង និងការប៉ាន់ស្មានពិន្ទុដើម្បីត្រៀមប្រឡង។ វេទិកានេះមិនមានសិទ្ធិចេញវិញ្ញាបនបត្រផ្លូវការសម្រាប់ HSK, IELTS, TOEFL, TOEIC ឬ Cambridge ឡើយ។",

    hero_title: "រៀនចិន និងអង់គ្លេសប្រកបដោយទំនុកចិត្តខ្ពស់",
    hero_subtitle: "វេទិការៀនភាសាទ្វេភាសានិងត្រៀមប្រឡងស្ដង់ដារអន្តរជាតិឈានមុខគេសម្រាប់សិស្ស-និស្សិតកម្ពុជា។ ត្រៀម HSK 1–6, IELTS, TOEFL & TOEIC ជាមួយការពន្យល់ជាភាសាខ្មែរលម្អិត និងគ្រូបង្រៀនឆ្លាតវៃ AI។",
    hero_cta_chinese: "ចាប់ផ្តើមភាសាចិន (HSK)",
    hero_cta_english: "ចាប់ផ្តើមអង់គ្លេស (IELTS)",
    hero_badge: "វេទិការៀនភាសាឆ្លាតវៃសម្រាប់កម្ពុជា 🇰🇭 🇨🇳 🇬🇧",
    explore_courses: "ស្វែងយល់វគ្គសិក្សា",
    trusted_by: "បង្កើតឡើងដើម្បីលើកកម្ពស់សមត្ថភាពសិស្សទូទាំងប្រទេសកម្ពុជា",

    hsk_levels: "វគ្គសិក្សាស្តង់ដារ HSK (1–6)",
    pinyin_guide: "ការបញ្ចេញសំឡេង ភីនអ៊ីន (Pinyin)",
    stroke_order: "រៀនលំដាប់គំនូសអក្សរចិន (Stroke Order)",
    tone_practice: "អនុវត្តសូរសំឡេងចិន (៤ សំឡេង)",
    tones_desc: "ហាត់សំឡេងទី ១ (រាបស្មើ), ទី ២ (ឡើង), ទី ៣ (ចុះឡើង), ទី ៤ (ចុះខ្លាំង) និងសំឡេងស្រាល។",
    hanzi_characters: "តួអក្សរចិន (汉字)",
    chinese_flashcards: "កាតចងចាំវាក្យសព្ទ (Spaced Repetition)",

    ielts_prep: "ត្រៀមប្រឡង IELTS Academic & General",
    toefl_prep: "ត្រៀមប្រឡង TOEFL iBT ពេញលេញ",
    toeic_prep: "ត្រៀមប្រឡង TOEIC ស្តាប់ និងអាន",
    cambridge_prep: "ប្រឡងខេមប្រ៊ីជ Cambridge (B2/C1/C2)",
    ipa_guide: "តារាងសូរស័ព្ទអន្តរជាតិ (IPA)",
    speaking_practice: "អនុវត្តការនិយាយជាមួយ AI សំឡេង",
    writing_evaluation: "សរសេរតែងសេចក្តី និងកែលម្អដោយ AI",

    exam_simulation: "ប្រព័ន្ធប្រឡងសាកល្បងស្តង់ដារអន្តរជាតិ",
    official_disclaimer: "ការប្រឡងសាកល្បងស្ដង់ដារ — សម្រាប់វាស់ស្ទង់សមត្ថភាពប៉ុណ្ណោះ",
    time_remaining: "ពេលវេលានៅសល់",
    question_of: "សំណួរទី",
    mark_for_review: "ចំណាំដើម្បីត្រួតពិនិត្យឡើងវិញ",
    exam_summary: "តារាងសង្ខេបចម្លើយ",
    score_report: "របាយការណ៍លទ្ធផលលម្អិត",
    estimated_band: "ពិន្ទុ/កម្រិតប៉ាន់ស្មាន",

    ai_tutor_title: "គ្រូបង្រៀនភាសា AI ឆ្លាតវៃ",
    ai_tutor_desc: "សួរវេយ្យាករណ៍ជាភាសាខ្មែរ ជជែកសន្ទនាជាភាសាចិន ឬអង់គ្លេស និងទទួលការកែលម្អសំណេរតែងសេចក្តីបានភ្លាមៗ។",
    ask_anything: "សួរសំណួរទៅកាន់គ្រូ AI របស់អ្នក...",
    ask_placeholder: "ឧទាហរណ៍៖ 'តើត្រូវប្រើទម្រង់ 把 (bǎ) ក្នុងភាសាចិនដូចម្តេច?' ឬ 'ជួយកែកថាខណ្ឌ IELTS នេះ'",
    grammar_check: "វិភាគវេយ្យាករណ៍",
    essay_check: "កែលម្អតែងសេចក្តី",
    translate_tool: "បកប្រែត្រឡប់ទ្វេទិស",

    role_student: "សិស្ស",
    role_teacher: "គ្រូបង្រៀន",
    role_admin: "អ្នកគ្រប់គ្រង (Admin)",
    switch_role: "ប្តូរទិដ្ឋភាពសាកល្បង",

    auth_login: "ចូលគណនី",
    auth_register: "ចុះឈ្មោះ",
    auth_logout: "ចាកចេញ",
    auth_email: "អាសយដ្ឋានអ៊ីមែល",
    auth_password: "ពាក្យសម្ងាត់",
    auth_name: "ឈ្មោះពេញ",
    auth_role: "តួនាទីគណនី",
    auth_login_required: "តម្រូវឱ្យមានគណនី និងចូលប្រើប្រាស់ជាមុនសិន",
    auth_login_desc: "ដើម្បីធានាសុវត្ថិភាពប្រព័ន្ធ និងកត់ត្រាវឌ្ឍនភាពសិក្សា អ្នកត្រូវតែមានគណនី និងចូលគណនី (Sign In) ជាមុនសិន ទើបអាចចូលរៀនមេរៀន ធ្វើតេស្ត និងប្រើប្រាស់ AI បាន។",
    auth_access_denied: "គ្មានសិទ្ធិចូលដំណើរការ (Access Denied)",
    auth_access_denied_desc: "អ្នកមិនមានសិទ្ធិអនុញ្ញាតដើម្បីចូលទៅកាន់ផ្នែកនេះឡើយ។ ទំព័រនេះសម្រាប់តែគ្រូបង្រៀន ឬ Administrator ប៉ុណ្ណោះ។",
    auth_quick_demo: "ចូលគណនីសាកល្បងរហ័ស (១-Click)",
  },
};
