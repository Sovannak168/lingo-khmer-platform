export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'student' | 'teacher' | 'admin';
          preferred_language: 'km' | 'en';
          target_language: 'zh' | 'en';
          current_level: string;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string; email: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          title_km: string;
          description: string | null;
          description_km: string | null;
          language: 'zh' | 'en';
          level: string;
          thumbnail_url: string | null;
          is_published: boolean;
          total_lessons: number;
          created_by: string | null;
          created_at: string;
        };
      };
      vocabulary: {
        Row: {
          id: string;
          language: 'zh' | 'en';
          word: string;
          pinyin: string | null;
          ipa: string | null;
          meaning_km: string;
          meaning_en: string;
          part_of_speech: string | null;
          level: string;
          audio_url: string | null;
          stroke_order_data: Json;
          example_sentences: Json;
          created_at: string;
        };
      };
      exams: {
        Row: {
          id: string;
          title: string;
          title_km: string;
          exam_type: 'HSK' | 'IELTS_AC' | 'IELTS_GT' | 'TOEFL_IBT' | 'TOEIC' | 'CAMBRIDGE';
          level_code: string;
          total_duration_minutes: number;
          passing_score: number;
          max_score: number;
          is_mock: boolean;
          is_premium: boolean;
          instructions_km: string | null;
          instructions_en: string | null;
          is_published: boolean;
          created_at: string;
        };
      };
    };
  };
}

