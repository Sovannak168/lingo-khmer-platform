# LingoKhmer: Professional Chinese & English Learning and Examination Platform

An enterprise-grade bilingual language-learning and standardized examination preparation platform designed specifically for students in Cambodia preparing for internationally recognized language certifications (**HSK 1–6**, **IELTS Academic & General**, **TOEFL iBT**, **TOEIC**, and **Cambridge English**).

---

## 🌟 Key Features

### 1. Bilingual Language Learning (Chinese & English)
- **Chinese (HSK 1–6)**:
  - Hanzi characters, Pinyin pronunciation, Khmer meanings, and English definitions.
  - Interactive stroke order viewer with digital calligraphy grid (`田字格` / `米字格`).
  - Mandarin 4-tones and neutral tone trainer with visual pitch-contour curves and microphone voice comparison.
  - Grammar patterns explained in Khmer (e.g. `是...的`, `把` structure, `比` comparisons).
  - Spaced repetition flashcards (Leitner 5-box system).
- **English (A1–C2, IELTS, TOEFL, TOEIC, Cambridge)**:
  - Vocabulary with International Phonetic Alphabet (IPA) transcriptions and Khmer translations.
  - Grammar rules and common pitfalls explained in Khmer.
  - Listening lab with native British and American audios and post-submission transcripts.
  - Speaking practice with Web Speech API real-time speech recognition and AI pronunciation evaluation.
  - Essay writing evaluator providing diagnostic feedback across IELTS Band criteria.

### 2. Standardized Examination Engine
- Full-length realistic mock exams:
  - **HSK 1–6 Mock Tests** (Listening + Reading).
  - **IELTS Academic Full Mock** (Listening, Reading, Writing Task 1 & 2, Speaking Interview).
  - **TOEIC Practice Test** (Listening & Reading).
- Real-time countdown timer with automated submission safeguards.
- Auto-saving answer sheets with local recovery.
- Question navigation sheet with answered, unanswered, and flagged-for-review statuses.
- Automatic scoring for objective questions and diagnostic Band / scaled score estimation.
- Detailed question-by-question review with explanations in Khmer and English.
- Prominent educational disclaimer separating practice mock tests from official certifications.

### 3. AI Language Tutor
- 24/7 AI language assistant providing step-by-step explanations in Khmer.
- Bidirectional translation (Chinese ⇄ Khmer ⇄ English).
- Actionable essay grading explaining grammatical errors with corrected models.

### 4. Student, Teacher & Admin Dashboards
- **Student Dashboard**: Streak counter, total learning hours, vocabulary velocity, Recharts skill competency radar, and AI-identified weak skills requiring revision.
- **Teacher Dashboard**: Submission queue for grading student essays and listening to audio recordings, assigning rubrics, and authoring new quizzes.
- **Admin Dashboard**: System metrics, user & role management, exam rubrics, and revenue statistics.

### 5. Cambodian Payment Architecture (ABA PayWay & KHQR)
- Free vs Premium tier access control.
- ABA PayWay checkout integration with HMAC-SHA512 transaction signature generation.
- KHQR (Bakong network) simulated QR code generation with dual USD ($) and KHR (៛) support (1 USD = 4,100 KHR).

### 6. Course Completion Certificates
- Platform-issued printable course completion certificates clearly distinguished from official testing agency certificates.

---

## 🚀 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **Icons**: Lucide Icons
- **Data Visualizations**: Recharts
- **Audio & Speech**: Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`) + MediaRecorder
- **Database & Auth**: PostgreSQL / Supabase with Row Level Security (RLS)
- **Payments**: ABA PayWay (Cambodia) & KHQR

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and configure your API keys:
```bash
cp .env.example .env.local
```

Example configuration (`.env.local`):
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# AI Service (Google Gemini API)
GEMINI_API_KEY=your-gemini-api-key-here

# Payment Gateway: ABA PayWay (Cambodia)
ABA_PAYWAY_MERCHANT_ID=ec438921_sandbox
ABA_PAYWAY_API_KEY=your-payway-api-key-here
ABA_PAYWAY_API_URL=https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Migration
Run the SQL migration script located at:
`database/migrations/001_initial_schema.sql`
inside your Supabase SQL Editor to initialize all 23 relational tables, indexes, and RLS security policies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## ⚖️ Legal & Educational Disclaimer
This platform provides simulated mock examinations and estimated practice scores for educational purposes. It is not affiliated with, approved by, or authorized to issue official certificates for HSK (Chinese Testing International / Hanban), IELTS (British Council / IDP / Cambridge Assessment English), TOEFL / TOEIC (ETS), or Cambridge English examinations.

