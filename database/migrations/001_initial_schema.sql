-- ============================================================================
-- LINGO KHMER: PROFESSIONAL CHINESE & ENGLISH LEARNING & EXAM PLATFORM
-- INITIAL DATABASE MIGRATION (PostgreSQL / Supabase Schema)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert standard roles
INSERT INTO public.roles (role_name, description) VALUES
('student', 'Standard language student learner'),
('teacher', 'Instructor capable of authoring courses, quizzes and grading'),
('admin', 'Super administrator with full system management permissions')
ON CONFLICT (role_name) DO NOTHING;

-- 2. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY, -- References auth.users(id)
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'student' REFERENCES public.roles(role_name),
    preferred_language VARCHAR(10) DEFAULT 'km', -- 'km' (Khmer) or 'en' (English)
    target_language VARCHAR(10) DEFAULT 'zh', -- 'zh' (Chinese) or 'en' (English)
    current_level VARCHAR(50) DEFAULT 'HSK 1', -- e.g. 'HSK 1', 'HSK 3', 'IELTS 5.5'
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_km VARCHAR(255) NOT NULL,
    description TEXT,
    description_km TEXT,
    language VARCHAR(10) NOT NULL CHECK (language IN ('zh', 'en')),
    level VARCHAR(50) NOT NULL, -- 'HSK 1' to 'HSK 6' or 'A1' to 'C2'
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT true,
    total_lessons INT DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL DEFAULT 1,
    lesson_number INT NOT NULL DEFAULT 1,
    title VARCHAR(255) NOT NULL,
    title_km VARCHAR(255) NOT NULL,
    description TEXT,
    description_km TEXT,
    order_index INT NOT NULL DEFAULT 1,
    is_free BOOLEAN DEFAULT true,
    xp_reward INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LESSON SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.lesson_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('vocabulary', 'grammar', 'listening', 'reading', 'writing', 'speaking')),
    title VARCHAR(255) NOT NULL,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    order_index INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VOCABULARY TABLE
CREATE TABLE IF NOT EXISTS public.vocabulary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language VARCHAR(10) NOT NULL CHECK (language IN ('zh', 'en')),
    word VARCHAR(100) NOT NULL,
    pinyin VARCHAR(100), -- For Chinese
    ipa VARCHAR(100), -- For English
    meaning_km TEXT NOT NULL,
    meaning_en TEXT NOT NULL,
    part_of_speech VARCHAR(50),
    level VARCHAR(50) NOT NULL, -- 'HSK 1', 'HSK 2', 'A1', 'B2', etc.
    audio_url TEXT,
    stroke_order_data JSONB DEFAULT '[]'::jsonb,
    example_sentences JSONB DEFAULT '[]'::jsonb, -- Array of {target, pinyin, en, km}
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GRAMMAR TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.grammar_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language VARCHAR(10) NOT NULL CHECK (language IN ('zh', 'en')),
    level VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_km VARCHAR(255) NOT NULL,
    explanation_km TEXT NOT NULL,
    explanation_en TEXT NOT NULL,
    structure_formula TEXT,
    examples_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. FLASHCARDS TABLE (Spaced Repetition / Leitner System)
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    vocabulary_id UUID REFERENCES public.vocabulary(id) ON DELETE CASCADE,
    repetition_box INT DEFAULT 1 CHECK (repetition_box BETWEEN 1 AND 5),
    ease_factor NUMERIC(4,2) DEFAULT 2.50,
    interval_days INT DEFAULT 1,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    last_reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EXAMS TABLE
CREATE TABLE IF NOT EXISTS public.exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_km VARCHAR(255) NOT NULL,
    exam_type VARCHAR(50) NOT NULL CHECK (exam_type IN ('HSK', 'IELTS_AC', 'IELTS_GT', 'TOEFL_IBT', 'TOEIC', 'CAMBRIDGE')),
    level_code VARCHAR(50) NOT NULL, -- 'HSK 1', 'Band 6.5', etc.
    total_duration_minutes INT NOT NULL DEFAULT 60,
    passing_score NUMERIC(5,2) DEFAULT 60.00,
    max_score NUMERIC(5,2) DEFAULT 100.00,
    is_mock BOOLEAN DEFAULT true,
    is_premium BOOLEAN DEFAULT false,
    instructions_km TEXT,
    instructions_en TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EXAM SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.exam_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('listening', 'reading', 'writing', 'speaking')),
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL,
    instructions TEXT,
    order_index INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
    section_id UUID REFERENCES public.exam_sections(id) ON DELETE SET NULL,
    question_type VARCHAR(50) NOT NULL CHECK (question_type IN (
        'multiple_choice', 'true_false', 'fill_blank', 'matching', 
        'sentence_ordering', 'short_answer', 'essay', 'audio_choice', 'speaking_record'
    )),
    prompt TEXT NOT NULL,
    prompt_km TEXT,
    media_audio_url TEXT,
    media_image_url TEXT,
    media_transcript TEXT,
    points NUMERIC(5,2) DEFAULT 1.00,
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    explanation_km TEXT,
    explanation_en TEXT,
    order_index INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. QUESTION OPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    option_key VARCHAR(10) NOT NULL, -- 'A', 'B', 'C', 'D'
    content TEXT NOT NULL,
    content_km TEXT,
    is_correct BOOLEAN DEFAULT false,
    explanation TEXT
);

-- 13. EXAM ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'graded')),
    score_overall NUMERIC(5,2),
    scaled_band_score VARCHAR(50), -- e.g. "IELTS Band 7.0" or "HSK 240/300"
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    time_spent_seconds INT DEFAULT 0
);

-- 14. STUDENT ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.student_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    submitted_text TEXT,
    selected_option_id UUID REFERENCES public.question_options(id),
    audio_recording_url TEXT,
    is_correct BOOLEAN,
    score_awarded NUMERIC(5,2) DEFAULT 0.00,
    auto_graded BOOLEAN DEFAULT true,
    teacher_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. EXAM RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE,
    listening_score NUMERIC(5,2) DEFAULT 0.00,
    reading_score NUMERIC(5,2) DEFAULT 0.00,
    writing_score NUMERIC(5,2) DEFAULT 0.00,
    speaking_score NUMERIC(5,2) DEFAULT 0.00,
    overall_score NUMERIC(5,2) DEFAULT 0.00,
    estimated_band_or_level VARCHAR(50),
    feedback_summary_km TEXT,
    certified_practice_date TIMESTAMPTZ DEFAULT NOW()
);

-- 16. WRITING SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    prompt_title VARCHAR(255) NOT NULL,
    prompt_text TEXT NOT NULL,
    prompt_type VARCHAR(50) NOT NULL, -- 'ielts_task1', 'ielts_task2', 'hsk_writing'
    student_essay TEXT NOT NULL,
    word_count INT DEFAULT 0,
    ai_score NUMERIC(4,2),
    ai_feedback_json JSONB DEFAULT '{}'::jsonb,
    teacher_score NUMERIC(4,2),
    teacher_feedback TEXT,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'ai_reviewed', 'teacher_graded')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. SPEAKING SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.speaking_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    prompt_question TEXT NOT NULL,
    student_audio_url TEXT,
    transcript TEXT,
    ai_pronunciation_score NUMERIC(4,2),
    ai_fluency_score NUMERIC(4,2),
    ai_feedback_json JSONB DEFAULT '{}'::jsonb,
    teacher_feedback TEXT,
    status VARCHAR(50) DEFAULT 'submitted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. LEARNING PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    score NUMERIC(5,2) DEFAULT 100.00,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, lesson_id)
);

-- 19. STUDY STREAKS TABLE
CREATE TABLE IF NOT EXISTS public.study_streaks (
    user_id UUID PRIMARY KEY,
    current_streak INT DEFAULT 1,
    longest_streak INT DEFAULT 1,
    last_activity_date DATE DEFAULT CURRENT_DATE,
    total_minutes_learned INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. ACHIEVEMENTS & USER ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    title_km VARCHAR(150) NOT NULL,
    description TEXT,
    description_km TEXT,
    badge_icon VARCHAR(50) NOT NULL,
    xp_value INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, achievement_id)
);

-- 21. SUBSCRIPTIONS TABLE (Includes ABA PayWay transaction mapping)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    plan_type VARCHAR(50) NOT NULL CHECK (plan_type IN ('free', 'premium_monthly', 'premium_yearly')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending')),
    payment_provider VARCHAR(50) DEFAULT 'aba_payway', -- 'aba_payway', 'khqr', 'manual'
    amount_usd NUMERIC(10,2) DEFAULT 0.00,
    transaction_ref VARCHAR(150),
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR MAXIMUM QUERY EFFICIENCY
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_vocabulary_lang_level ON public.vocabulary(language, level);
CREATE INDEX IF NOT EXISTS idx_vocabulary_word ON public.vocabulary(word);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_next_rev ON public.flashcards(user_id, next_review_at);
CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON public.questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_exam ON public.exam_attempts(user_id, exam_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user ON public.learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_student_answers_attempt ON public.student_answers(attempt_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view all public profiles, but only edit their own
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Exam Attempts: Students can only access their own attempts
CREATE POLICY "Users can view own exam attempts" 
ON public.exam_attempts FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
));

CREATE POLICY "Users can insert own exam attempts" 
ON public.exam_attempts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exam attempts" 
ON public.exam_attempts FOR UPDATE 
USING (auth.uid() = user_id);

-- Student Answers: Private to student and reviewing teachers
CREATE POLICY "Users can view own answers" 
ON public.student_answers FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
));

CREATE POLICY "Users can insert own answers" 
ON public.student_answers FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Writing & Speaking Submissions: Student & Teachers only
CREATE POLICY "Users can view own submissions" 
ON public.writing_submissions FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
));

-- ============================================================================
-- SEED INITIAL ACHIEVEMENTS
-- ============================================================================
INSERT INTO public.achievements (code, title, title_km, description, description_km, badge_icon, xp_value) VALUES
('first_step', 'First Step', 'ជំហានដំបូង', 'Completed your very first lesson', 'បានបញ្ចប់មេរៀនដំបូងបង្អស់របស់អ្នក', 'Target', 50),
('streak_7', '7-Day Warrior', 'អ្នកតស៊ូ ៧ ថ្ងៃ', 'Maintained a 7-day study streak', 'រក្សាការសិក្សាជាប់គ្នាបាន ៧ ថ្ងៃ', 'Flame', 150),
('hsk_master', 'Hanzi Explorer', 'អ្នករុករកអក្សរចិន', 'Learned 50 Chinese characters', 'បានរៀនចេះតួអក្សរចិនចំនួន ៥០ ពាក្យ', 'BookOpen', 200),
('ielts_challenger', 'IELTS Fighter', 'អ្នកត្រៀម IELTS', 'Completed full IELTS Reading practice mock', 'បានបញ្ចប់ការប្រឡងសាកល្បង IELTS Reading ពេញលេញ', 'Award', 300)
ON CONFLICT (code) DO NOTHING;

