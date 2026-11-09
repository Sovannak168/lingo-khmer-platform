export interface ChineseVocab {
  id: string;
  hanzi: string;
  pinyin: string;
  tone: 1 | 2 | 3 | 4 | 5;
  meaningEn: string;
  meaningKm: string;
  partOfSpeech: string;
  level: 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
  examples: {
    zh: string;
    pinyin: string;
    en: string;
    km: string;
  }[];
  strokeCount: number;
  radicals?: string;
  strokes?: string[]; // SVG stroke paths or sequence
}

export interface ChineseGrammar {
  id: string;
  level: string;
  title: string;
  titleKm: string;
  formula: string;
  explanationKm: string;
  explanationEn: string;
  examples: {
    zh: string;
    pinyin: string;
    en: string;
    km: string;
    breakdown?: string;
  }[];
}

export const HSK_LEVELS = [
  { level: 'HSK 1', words: 150, hours: '30-40', descEn: 'Beginner basics, simple phrases and daily greetings', descKm: 'កម្រិតដំបូង ឃ្លាសាមញ្ញ និងការគួរសមប្រចាំថ្ងៃ' },
  { level: 'HSK 2', words: 300, hours: '60-80', descEn: 'Elementary communication on routine topics', descKm: 'កម្រិតបឋម ទំនាក់ទំនងលើប្រធានបទសាមញ្ញប្រចាំថ្ងៃ' },
  { level: 'HSK 3', words: 600, hours: '100-120', descEn: 'Intermediate practical communication in work and study', descKm: 'កម្រិតមធ្យម ទំនាក់ទំនងសម្រាប់ការងារ និងការសិក្សា' },
  { level: 'HSK 4', words: 1200, hours: '180-200', descEn: 'Fluently discuss diverse topics with native speakers', descKm: 'កម្រិតខ្ពស់ល្មម ជជែកពិភាក្សាលើប្រធានបទជាច្រើនយ៉ាងរលូន' },
  { level: 'HSK 5', words: 2500, hours: '300+', descEn: 'Read Chinese newspapers, appreciate films, give speeches', descKm: 'កម្រិតកម្រិតខ្ពស់ អានកាសែត ទស្សនាភាពយន្ត និងថ្លែងសុន្ទរកថា' },
  { level: 'HSK 6', words: 5000, hours: '450+', descEn: 'Mastery of Chinese, effortless comprehension and expression', descKm: 'កម្រិតស្ទាត់ជំនាញ យល់និងបញ្ចេញមតិបានយ៉ាងប៉ិនប្រសប់' },
];

export const HSK_VOCABULARY: ChineseVocab[] = [
  {
    id: 'zh-1',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    tone: 3,
    meaningEn: 'Hello, Hi',
    meaningKm: 'សួស្តី / ជំរាបសួរ',
    partOfSpeech: 'Greeting',
    level: 'HSK 1',
    strokeCount: 13,
    radicals: '亻, 女',
    examples: [
      { zh: '你好！很高兴认识你。', pinyin: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.', en: 'Hello! Nice to meet you.', km: 'សួស្តី! រីករាយណាស់ដែលបានស្គាល់អ្នក។' },
      { zh: '王老师，您好！', pinyin: 'Wáng lǎoshī, nín hǎo!', en: 'Teacher Wang, hello (polite)!', km: 'លោកគ្រូវ៉ាង ជម្រាបសួរលោកគ្រូ!' }
    ]
  },
  {
    id: 'zh-2',
    hanzi: '谢谢',
    pinyin: 'xièxie',
    tone: 4,
    meaningEn: 'Thank you, Thanks',
    meaningKm: 'អរគុណ',
    partOfSpeech: 'Verb',
    level: 'HSK 1',
    strokeCount: 12,
    radicals: '讠',
    examples: [
      { zh: '非常谢谢你的帮助！', pinyin: 'Fēicháng xièxie nǐ de bāngzhù!', en: 'Thank you very much for your help!', km: 'អរគុណខ្លាំងណាស់សម្រាប់ជំនួយរបស់អ្នក!' },
      { zh: '不用谢，这是我应该做的。', pinyin: 'Bú yòng xiè, zhè shì wǒ yīnggāi zuò de.', en: "You're welcome, it's my pleasure.", km: 'មិនបាច់អរគុណទេ នេះជាអ្វីដែលខ្ញុំគួរតែធ្វើ។' }
    ]
  },
  {
    id: 'zh-3',
    hanzi: '水',
    pinyin: 'shuǐ',
    tone: 3,
    meaningEn: 'Water',
    meaningKm: 'ទឹក',
    partOfSpeech: 'Noun',
    level: 'HSK 1',
    strokeCount: 4,
    radicals: '水',
    examples: [
      { zh: '我想喝一杯水。', pinyin: 'Wǒ xiǎng hē yì bēi shuǐ.', en: 'I want to drink a cup of water.', km: 'ខ្ញុំចង់ញ៉ាំទឹកមួយកែវ។' }
    ]
  },
  {
    id: 'zh-4',
    hanzi: '学习',
    pinyin: 'xuéxí',
    tone: 2,
    meaningEn: 'To study, to learn',
    meaningKm: 'រៀន, សិក្សា',
    partOfSpeech: 'Verb / Noun',
    level: 'HSK 1',
    strokeCount: 11,
    radicals: '子, ⺄',
    examples: [
      { zh: '我们在学校学习汉语。', pinyin: 'Wǒmen zài xuéxiào xuéxí hànyǔ.', en: 'We study Chinese at school.', km: 'ពួកយើងរៀនភាសាចិននៅសាលារៀន។' }
    ]
  },
  {
    id: 'zh-5',
    hanzi: '朋友',
    pinyin: 'péngyou',
    tone: 2,
    meaningEn: 'Friend',
    meaningKm: 'មិត្តភក្តិ',
    partOfSpeech: 'Noun',
    level: 'HSK 1',
    strokeCount: 8,
    radicals: '月',
    examples: [
      { zh: '他是我的好朋友。', pinyin: 'Tā shì wǒ de hǎo péngyou.', en: 'He is my good friend.', km: 'គាត់គឺជាមិត្តភក្តិដ៏ល្អរបស់ខ្ញុំ។' }
    ]
  },
  {
    id: 'zh-6',
    hanzi: '医生',
    pinyin: 'yīshēng',
    tone: 1,
    meaningEn: 'Doctor',
    meaningKm: 'វេជ្ជបណ្ឌិត, គ្រូពេទ្យ',
    partOfSpeech: 'Noun',
    level: 'HSK 1',
    strokeCount: 12,
    radicals: '匚, 生',
    examples: [
      { zh: '他在医院当医生。', pinyin: 'Tā zài yīyuàn dāng yīshēng.', en: 'He works as a doctor in a hospital.', km: 'គាត់ធ្វើជាវេជ្ជបណ្ឌិតនៅក្នុងមន្ទីរពេទ្យ។' }
    ]
  },
  {
    id: 'zh-7',
    hanzi: '时间',
    pinyin: 'shíjiān',
    tone: 2,
    meaningEn: 'Time',
    meaningKm: 'ពេលវេលា',
    partOfSpeech: 'Noun',
    level: 'HSK 2',
    strokeCount: 14,
    radicals: '日, 门',
    examples: [
      { zh: '你明天有时间吗？', pinyin: 'Nǐ míngtiān yǒu shíjiān ma?', en: 'Do you have time tomorrow?', km: 'តើថ្ងៃស្អែកអ្នកមានពេលទេ?' }
    ]
  },
  {
    id: 'zh-8',
    hanzi: '准备',
    pinyin: 'zhǔnbèi',
    tone: 3,
    meaningEn: 'To prepare, ready',
    meaningKm: 'រៀបចំ, ត្រៀមលក្ខណៈ',
    partOfSpeech: 'Verb',
    level: 'HSK 2',
    strokeCount: 20,
    radicals: '冫, 夂',
    examples: [
      { zh: '我正在准备HSK考试。', pinyin: 'Wǒ zhèngzài zhǔnbèi HSK kǎoshì.', en: 'I am preparing for the HSK exam.', km: 'ខ្ញុំកំពុងត្រៀមខ្លួនសម្រាប់ការប្រឡង HSK។' }
    ]
  },
  {
    id: 'zh-9',
    hanzi: '环境',
    pinyin: 'huánjìng',
    tone: 2,
    meaningEn: 'Environment, surroundings',
    meaningKm: 'បរិស្ថាន, បរិយាកាសជុំវិញ',
    partOfSpeech: 'Noun',
    level: 'HSK 3',
    strokeCount: 19,
    radicals: '王, 土',
    examples: [
      { zh: '保护环境人人有责。', pinyin: 'Bǎohù huánjìng rén rén yǒu zé.', en: 'Protecting the environment is everyone’s responsibility.', km: 'ការការពារបរិស្ថានគឺជាកាតព្វកិច្ចរបស់មនុស្សគ្រប់រូប។' }
    ]
  },
  {
    id: 'zh-10',
    hanzi: '坚持',
    pinyin: 'jiānchí',
    tone: 1,
    meaningEn: 'To persist, to persevere',
    meaningKm: 'តស៊ូ, ប្រកាន់ខ្ជាប់, ព្យាយាមមិនបោះបង់',
    partOfSpeech: 'Verb',
    level: 'HSK 4',
    strokeCount: 18,
    radicals: '土, 扌',
    examples: [
      { zh: '只要坚持努力，就一定能成功。', pinyin: 'Zhǐyào jiānchí nǔlì, jiù yídìng néng chénggōng.', en: 'As long as you persist, you will surely succeed.', km: 'ឲ្យតែតស៊ូព្យាយាម អ្នកពិតជានឹងទទួលបានជោគជ័យ។' }
    ]
  }
];

export const HSK_GRAMMAR: ChineseGrammar[] = [
  {
    id: 'gr-1',
    level: 'HSK 1',
    title: 'The "是" (shì) Sentence Structure',
    titleKm: 'ទម្រង់ប្រយោគ "是" (shì - គឺ/ជា)',
    formula: 'Subject + 是 (shì) + Noun / Noun Phrase',
    explanationKm: 'ពាក្យ "是" (shì) មានន័យស្មើនឹង "គឺ/ជា" នៅក្នុងភាសាខ្មែរ ប្រើសម្រាប់បញ្ជាក់អត្តសញ្ញាណ មុខរបរ ឬសញ្ជាតិ។ ទម្រង់បដិសេធប្រើ "不是" (bú shì)។',
    explanationEn: 'The verb "是" (shì) connects a subject to a nominal predicate, functioning like "to be" (am, is, are) in English. Negation is formed with "不是" (bú shì).',
    examples: [
      { zh: '我是柬埔寨人。', pinyin: 'Wǒ shì jiǎnpǔzhàirén.', en: 'I am Cambodian.', km: 'ខ្ញុំជាជនជាតិកម្ពុជា។' },
      { zh: '他不是我的老师。', pinyin: 'Tā bú shì wǒ de lǎoshī.', en: 'He is not my teacher.', km: 'គាត់មិនមែនជាគ្រូបង្រៀនរបស់ខ្ញុំទេ។' }
    ]
  },
  {
    id: 'gr-2',
    level: 'HSK 2',
    title: 'Comparison Structure with "比" (bǐ)',
    titleKm: 'ទម្រង់ប្រៀបធៀបដោយប្រើ "比" (bǐ - ជាង)',
    formula: 'A + 比 (bǐ) + B + Adjective',
    explanationKm: 'ប្រើប្រាស់ "比" ដើម្បីប្រៀបធៀបរវាងកម្មវត្ថុ ឬមនុស្សពីរនាក់។ ក្នុងភាសាខ្មែរមានន័យថា "A ... ជាង B"។ កុំប្រើ "很" នៅខាងមុខគុណនាមពេលប្រើ 比។',
    explanationEn: 'Used to compare two entities where A has more of a quality than B. Avoid using "很" before the adjective in a 比 comparative sentence.',
    examples: [
      { zh: '今天比昨天冷。', pinyin: 'Jīntiān bǐ zuótiān lěng.', en: 'Today is colder than yesterday.', km: 'ថ្ងៃនេះត្រជាក់ជាងម្សិលមិញ។' },
      { zh: '哥哥比我高一点儿。', pinyin: 'Gēge bǐ wǒ gāo yìdiǎnr.', en: 'Older brother is slightly taller than me.', km: 'បងប្រុសខ្ពស់ជាងខ្ញុំបន្តិច។' }
    ]
  },
  {
    id: 'gr-3',
    level: 'HSK 3',
    title: 'The Disposal Construction with "把" (bǎ)',
    titleKm: 'ទម្រង់ប្រយោគពិសេស "把" (bǎ)',
    formula: 'Subject + 把 (bǎ) + Object + Verb + Result/Direction/Other element',
    explanationKm: 'ទម្រង់ "把" ប្រើនៅពេលដែលប្រធាននៃប្រយោគធ្វើសកម្មភាពមួយប៉ះពាល់លើកម្មវត្ថុ ហើយធ្វើឱ្យកម្មវត្ថុនោះផ្លាស់ប្តូរទីតាំង ឬលទ្ធផល។ មិនអាចប្រើកិរិយាសព្ទទទេដោយគ្មានធាតុបន្ថែម (ដូចជា 了, 在, 进...) នោះឡើយ។',
    explanationEn: 'The 把-structure highlights what happened to the object as a result of the verb action. The verb must always take a complement, suffix, or resultative particle.',
    examples: [
      { zh: '请把门关上。', pinyin: 'Qǐng bǎ mén guān shàng.', en: 'Please close the door.', km: 'សូមបិទទ្វារ។' },
      { zh: '我已经把作业做完了。', pinyin: 'Wǒ yǐjīng bǎ zuòyè zuò wán le.', en: 'I have already finished my homework.', km: 'ខ្ញុំបានធ្វើកិច្ចការផ្ទះរួចរាល់ហើយ។' }
    ]
  }
];

export const CHINESE_TONES = [
  { tone: 1, name: 'First Tone (一声)', mark: 'ā', pitch: '55 (High Level)', descKm: 'សំឡេងទី ១៖ កម្ពស់សំឡេងខ្ពស់ស្មើ ៥-៥ (ដូចជាសំឡេងច្រៀង)', example: 'mā (妈 - ម្តាយ)' },
  { tone: 2, name: 'Second Tone (二声)', mark: 'á', pitch: '35 (Rising)', descKm: 'សំឡេងទី ២៖ សំឡេងឡើងពីកណ្តាលទៅខ្ពស់ ៣-៥ (ដូចពេលសួរ "ហ្អា៎?")', example: 'má (麻 - ដើមធ្មៃ)' },
  { tone: 3, name: 'Third Tone (三声)', mark: 'ǎ', pitch: '214 (Dipping)', descKm: 'សំឡេងទី ៣៖ សំឡេងទម្លាក់ចុះក្រោម រួចងើបឡើងវិញ ២-១-៤ (សំឡេងស្រដៀងបន្តក់ក្នុងខ្មែរ)', example: 'mǎ (马 - សេះ)' },
  { tone: 4, name: 'Fourth Tone (四声)', mark: 'à', pitch: '51 (Falling)', descKm: 'សំឡេងទី ៤៖ សំឡេងធ្លាក់ចុះខ្លាំងនិងលឿនពីខ្ពស់មកទាប ៥-១ (ដូចបញ្ជាដាច់ណាត់)', example: 'mà (骂 - ជេរ)' },
  { tone: 5, name: 'Neutral Tone (轻声)', mark: 'a', pitch: '-- (Light/Short)', descKm: 'សំឡេងស្រាល៖ បញ្ចេញសំឡេងស្រាលខ្លី គ្មានសញ្ញាសម្គាល់', example: 'ma (吗 - ទេ/ឬ?)' }
];

