export interface SubscriptionPlan {
  id: string;
  name: string;
  nameKm: string;
  priceUsd: number;
  priceKhr: number;
  billingPeriod: 'monthly' | 'yearly' | 'free';
  popular?: boolean;
  features: {
    en: string;
    km: string;
    included: boolean;
  }[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    name: 'Free Learner',
    nameKm: 'កញ្ចប់ឥតគិតថ្លៃ (Free)',
    priceUsd: 0,
    priceKhr: 0,
    billingPeriod: 'free',
    features: [
      { en: '3 daily interactive lessons', km: 'រៀន ៣ មេរៀនក្នុងមួយថ្ងៃ', included: true },
      { en: 'Basic HSK 1 and Beginner English vocabulary', km: 'វាក្យសព្ទមូលដ្ឋាន HSK 1 និងអង់គ្លេសបឋម', included: true },
      { en: '1 Practice Test per week', km: 'លំហាត់អនុវត្ត ១ ក្នុងមួយសប្តាហ៍', included: true },
      { en: 'Basic learning progress tracker', km: 'តាមដានការសិក្សាកម្រិតមូលដ្ឋាន', included: true },
      { en: 'Full HSK 1–6 Course Access', km: 'ចូលរៀនវគ្គ HSK 1–6 ទាំងអស់', included: false },
      { en: 'Full IELTS / TOEFL Mock Exams with Band Estimator', km: 'ប្រឡងសាកល្បង IELTS / TOEFL ពេញលេញ', included: false },
      { en: 'Unlimited AI Tutor & Essay Corrections', km: 'គ្រូ AI គ្មានដែនកំណត់ និងកែតែងសេចក្តី', included: false },
      { en: 'Downloadable study guides & flashcard export', km: 'ទាញយកឯកសារមេរៀន និងកាតវាក្យសព្ទ', included: false },
    ]
  },
  {
    id: 'plan-premium-monthly',
    name: 'Premium Monthly',
    nameKm: 'កញ្ចប់ Premium ប្រចាំខែ',
    priceUsd: 9.99,
    priceKhr: 41000,
    billingPeriod: 'monthly',
    popular: true,
    features: [
      { en: 'Unlimited access to all Chinese HSK 1–6 & English courses', km: 'រៀនមិនកំណត់គ្រប់វគ្គសិក្សាចិន HSK 1-6 និងអង់គ្លេស', included: true },
      { en: 'Unlimited full-length IELTS, HSK & TOEFL mock exams', km: 'ប្រឡងសាកល្បងពេញម៉ោង IELTS, HSK, TOEFL គ្មានដែនកំណត់', included: true },
      { en: 'AI Tutor 24/7 with Khmer explanations & voice evaluation', km: 'គ្រូ AI 24/7 ពន្យល់ជាភាសាខ្មែរ និងវាស់ស្ទង់ការបញ្ចេញសំឡេង', included: true },
      { en: 'Unlimited AI Writing & Speaking grading reports', km: 'កែលម្អការសរសេរ និងការនិយាយដោយ AI គ្មានដែនកំណត់', included: true },
      { en: 'Spaced repetition flashcards with stroke order learning', km: 'កាតចងចាំវៃឆ្លាត និងលំដាប់គំនូសអក្សរចិន', included: true },
      { en: 'Direct teacher feedback and Q&A support', km: 'ទទួលការផ្តល់មតិយោបល់ផ្ទាល់ពីលោកគ្រូ-អ្នកគ្រូ', included: true },
    ]
  },
  {
    id: 'plan-premium-yearly',
    name: 'Premium Annual (Best Value - Save 35%)',
    nameKm: 'កញ្ចប់ Premium ប្រចាំឆ្នាំ (ចំណេញ ៣៥%)',
    priceUsd: 79.99,
    priceKhr: 328000,
    billingPeriod: 'yearly',
    features: [
      { en: 'All features in Premium Monthly included', km: 'រួមបញ្ចូលអត្ថប្រយោជន៍ទាំងអស់នៃ Premium ប្រចាំខែ', included: true },
      { en: 'Official practice exam predictive score guarantee', km: 'របាយការណ៍វិភាគពិន្ទុត្រៀមប្រឡងស្ដង់ដារកម្រិតខ្ពស់', included: true },
      { en: 'Offline downloadable audio packs & character worksheets', km: 'ទាញយកសន្លឹកកិច្ចការគូសអក្សរចិន និងឯកសារស្តាប់ក្រៅបណ្តាញ', included: true },
      { en: 'VIP Community and monthly live masterclasses', km: 'ចូលរួមសិក្ខាសាលាផ្ទាល់រៀងរាល់ខែជាមួយគ្រូជំនាញ', included: true },
      { en: 'Certificate of Course Completion', km: 'វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សារបស់វេទិកា', included: true },
    ]
  }
];

export const ABA_PAYWAY_SAMPLE_CONFIG = {
  merchantName: 'LingoKhmer Academy Co., Ltd.',
  merchantId: 'ec438921_khmer_lingo',
  currencyDefault: 'USD',
  supportedCurrencies: ['USD', 'KHR'],
  exchangeRateUsdToKhr: 4100,
  sandboxCheckoutUrl: 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase',
};

