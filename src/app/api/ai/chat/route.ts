import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, language = "km", mode = "general" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is configured in .env, call Gemini API
    if (apiKey && apiKey !== "your-gemini-api-key-here" && apiKey.length > 10) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert AI Language Tutor for Cambodian students learning Chinese (HSK 1-6) and English (IELTS, TOEFL, TOEIC).
Always provide helpful, friendly explanations. When explaining grammar or vocabulary, provide clear explanations in Khmer (ភាសាខ្មែរ), along with Chinese Pinyin and tones or English IPA phonetics.
Provide actionable corrections with examples.
Mode: ${mode}.
User message: ${message}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "I am ready to help you with your language studies!";
        return NextResponse.json({ reply: replyText });
      }
    }

    // Intelligent educational fallback for Cambodian students when running locally or offline
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("把") || lower.includes("ba sentence") || lower.includes("bǎ")) {
      reply = `📚 **ការពន្យល់អំពីទម្រង់ប្រយោគ "把" (bǎ) ក្នុងភាសាចិន៖**

**១. រូបមន្តទូទៅ (Structure Formula):**
\`ប្រធាន (Subject) + 把 (bǎ) + កម្មវត្ថុ (Object) + កិរិយាសព្ទ (Verb) + ធាតុបន្ថែម (Result/Direction)\`

**២. អត្ថន័យ និងរបៀបប្រើប្រាស់៖**
• ប្រើនៅពេលដែលប្រធានធ្វើសកម្មភាពមួយទៅលើកម្មវត្ថុ ហើយធ្វើឱ្យកម្មវត្ថុនោះ**ផ្លាស់ប្តូរទីតាំង ឬលទ្ធផល**។
• **ចំណាំសំខាន់៖** កិរិយាសព្ទខាងក្រោយមិនអាចនៅទទេបានឡើយ ត្រូវតែមានពាក្យបន្ថែម (ដូចជា 了, 进, 在, 完...)។

**៣. ឧទាហរណ៍ជាក់ស្តែង (Practical Examples):**
1. **请把门关上。** (Qǐng bǎ mén guān shàng.)
   -> *សូមបិទទ្វារ។* (The door state changed to closed).
2. **我已经把作业做完了。** (Wǒ yǐjīng bǎ zuòyè zuò wán le.)
   -> *ខ្ញុំបានធ្វើកិច្ចការផ្ទះរួចរាល់ហើយ។* (The homework is completed).

តើអ្នកចង់សាកល្បងបង្កើតប្រយោគដោយប្រើ "把" មួយដើម្បីឱ្យខ្ញុំជួយកែលម្អទេ? 😊`;
    } else if (lower.includes("ielts") || lower.includes("task 2") || lower.includes("writing")) {
      reply = `✍️ **IELTS Academic Writing Task 2 Strategy for Cambodian Students:**

To achieve **Band 7.0+**, your essay must demonstrate a 4-paragraph structure:

**1. Introduction (2 sentences, ~45 words):**
• *Sentence 1 (Paraphrase):* Rephrase the prompt using academic synonyms.
• *Sentence 2 (Thesis statement):* State your direct stance clearly.

**2. Body Paragraph 1 (Main Idea 1, ~90 words):**
• Topic sentence introducing your primary argument.
• Explanation of root causes.
• Concrete real-world example.

**3. Body Paragraph 2 (Counterargument or Main Idea 2, ~90 words):**
• Introduce opposing view or complementary angle.
• Rebut or explain the deeper significance.

**4. Conclusion (1-2 sentences, ~35 words):**
• Restate your thesis without introducing new arguments.

**Sample High-scoring Linkers:**
*Furthermore, Consequently, Notwithstanding the fact that, It is widely acknowledged that.*

Would you like to paste a paragraph of your essay here so I can provide line-by-line grammar corrections and lexical suggestions?`;
    } else if (lower.includes("pinyin") || lower.includes("tone") || lower.includes("សំឡេង")) {
      reply = `🎵 **ការបញ្ចេញសូរសំឡេងចិនទាំង ៤ (Mandarin Tonal Guide in Khmer):**

ភាសាចិនមាន ៤ សំឡេងសំខាន់ និងសំឡេងស្រាលមួយ៖
1. **សំឡេងទី ១ (一声):** កម្ពស់ 5-5 (រាបស្មើខ្ពស់ ដូចសំឡេងច្រៀង) -> ឧទាហរណ៍៖ **mā (妈 - ម្តាយ)**
2. **សំឡេងទី ២ (二声):** កម្ពស់ 3-5 (សំឡេងឡើង ដូចពេលសួរ "ហ្អា៎?") -> ឧទាហរណ៍៖ **má (麻 - ដើមធ្មៃ)**
3. **សំឡេងទី ៣ (三声):** កម្ពស់ 2-1-4 (ទម្លាក់ចុះក្រោមរួចងើបឡើង) -> ឧទាហរណ៍៖ **mǎ (马 - សេះ)**
4. **សំឡេងទី ៤ (四声):** កម្ពស់ 5-1 (ធ្លាក់ចុះខ្លាំងនិងលឿន) -> ឧទាហរណ៍៖ **mà (骂 - ជេរ)**
5. **សំឡេងស្រាល (轻声):** បញ្ចេញស្រាលខ្លី -> **ma (吗 - ទេ/ឬ?)**

អ្នកអាចចូលទៅកាន់ទំព័រ **"Tone Practice Widget"** ដើម្បីស្តាប់សំឡេងដើម និងថតសំឡេងខ្លួនឯងផ្ទៀងផ្ទាត់បានភ្លាមៗ!`;
    } else {
      reply = `ជំរាបសួរ! ខ្ញុំគឺជា **គ្រូជំនួយភាសា AI (LingoKhmer AI Tutor)** របស់អ្នក។ 🤖✨

ខ្ញុំអាចជួយអ្នកលើចំណុចដូចជា៖
1. **ពន្យល់វេយ្យាករណ៍ចិន និងអង់គ្លេសជាភាសាខ្មែរយ៉ាងក្បោះក្បាយ**
2. **បកប្រែពាក្យ និងប្រយោគត្រឡប់ទ្វេទិស (ចិន ខ្មែរ អង់គ្លេស)**
3. **កែលម្អកំហុសវេយ្យាករណ៍ និងពន្យល់ពីមូលហេតុខុស**
4. **កែការសរសេរតែងសេចក្តី IELTS Task 1 & 2**
5. **ហ្វឹកហាត់ការសន្ទនាប្រចាំថ្ងៃ**

សូមសួរសំណួររបស់អ្នកមកកាន់ខ្ញុំឥឡូវនេះ!`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate AI response. Please try again." },
      { status: 500 }
    );
  }
}

