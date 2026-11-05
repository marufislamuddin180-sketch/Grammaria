export interface CodexTopic {
  title: string;
  formula: string;
  negativeFormula?: string;
  usage: string;
  timeSignals?: string[];
  tips?: string;
  examplePattern?: string;
}

export interface SectorCodex {
  sectorTitle: string;
  monsterName: string;
  theme: string;
  description: string;
  accentColor: string;
  topics: CodexTopic[];
}

export const CODEX_DATA: Record<number, SectorCodex> = {
  // Sektor 1: 4 Present Tenses
  0: {
    sectorTitle: "Sektor 1: The 4 Present Tenses",
    monsterName: "Present Tense Goblin",
    theme: "Present Tense Formulations",
    description: "Pedoman kaidah dan formula 4 Present Tenses untuk menghadapi Present Tense Goblin.",
    accentColor: "emerald",
    topics: [
      {
        title: "1. Simple Present Tense",
        formula: "(+) S + Verb 1 (-s / -es untuk He, She, It)",
        negativeFormula: "(-) S + do/does not + Verb 1 (Bare Infinitive)",
        usage: "Menyatakan fakta umum, kebenaran mutlak, atau rutinitas sehari-hari.",
        timeSignals: ["Every day/week/dawn", "Always", "Usually", "Often", "Never"],
        tips: "Untuk subjek tunggal orang ketiga (He, She, It), kata kerja wajib berakhiran -s/-es. Pada bentuk negatif/tanya setelah 'does', kata kerja kembali ke Verb 1 murni tanpa -s.",
        examplePattern: "Pattern: Subject + V1(s/es) + Object"
      },
      {
        title: "2. Present Continuous Tense",
        formula: "(+) S + is / am / are + Verb-ing",
        negativeFormula: "(-) S + is / am / are + not + Verb-ing",
        usage: "Menyatakan aksi yang sedang berlangsung tepat saat ini ketika dibicarakan.",
        timeSignals: ["Look!", "Listen!", "Right now", "At the moment", "Currently"],
        tips: "Subjek 'He/She/It' menggunakan 'is', 'I' menggunakan 'am', dan 'You/They/We' menggunakan 'are'.",
        examplePattern: "Pattern: Subject + to be (is/am/are) + V-ing"
      },
      {
        title: "3. Present Perfect Tense",
        formula: "(+) S + have / has + Verb 3 (Past Participle)",
        negativeFormula: "(-) S + have / has + not + Verb 3",
        usage: "Menyatakan aksi yang telah selesai di masa lampau namun akibat/relevansinya masih terasa sekarang.",
        timeSignals: ["Already", "Yet", "Just", "Ever", "Never", "Since...", "For..."],
        tips: "'has' digunakan untuk He/She/It; 'have' digunakan untuk I/You/They/We. Kata kerja wajib bentuk V3 (Past Participle), bukan V2.",
        examplePattern: "Pattern: Subject + have/has + V3"
      },
      {
        title: "4. Present Perfect Continuous Tense",
        formula: "(+) S + have / has + been + Verb-ing",
        negativeFormula: "(-) S + have / has + not + been + Verb-ing",
        usage: "Menekankan durasi aksi yang dimulai di masa lampau dan terus berlangsung sampai sekarang.",
        timeSignals: ["For (durasi: for two hours)", "Since (titik awal: since dawn)", "All morning"],
        tips: "Wajib menyertakan 'been' di antara have/has dan Verb-ing: have/has + been + V-ing.",
        examplePattern: "Pattern: Subject + have/has + been + V-ing"
      }
    ]
  },

  // Sektor 2: 4 Past Tenses
  1: {
    sectorTitle: "Sektor 2: The 4 Past Tenses",
    monsterName: "Past Tense Troll",
    theme: "Past Tense Formulations",
    description: "Pedoman kaidah dan formula 4 Past Tenses untuk mengalahkan Past Tense Troll.",
    accentColor: "cyan",
    topics: [
      {
        title: "5. Simple Past Tense",
        formula: "(+) S + Verb 2 (Past Simple)",
        negativeFormula: "(-) S + did not + Verb 1 (Bare Infinitive)",
        usage: "Menyatakan kejadian yang dimulai dan selesai seluruhnya di masa lampau.",
        timeSignals: ["Yesterday", "Last night/week/year", "... ago", "In 1990"],
        tips: "Waspadai kata kerja tak beraturan (Irregular Verbs: steal -> stole; find -> found). Pada kalimat negatif 'did not', kata kerja harus kembali ke Verb 1.",
        examplePattern: "Pattern: Subject + V2"
      },
      {
        title: "6. Past Continuous Tense",
        formula: "(+) S + was / were + Verb-ing",
        negativeFormula: "(-) S + was / were + not + Verb-ing",
        usage: "Menyatakan kegiatan yang sedang terjadi pada titik waktu tertentu di masa lampau atau disela kejadian lain.",
        timeSignals: ["While...", "When...", "At this time yesterday", "At 8 PM last night"],
        tips: "'was' untuk I, He, She, It; 'were' untuk You, They, We. Sering dipadukan: aksi panjang (Past Continuous) disela aksi pendek (Simple Past).",
        examplePattern: "Pattern: Subject + was/were + V-ing"
      },
      {
        title: "7. Past Perfect Tense",
        formula: "(+) S + had + Verb 3 (Past Participle)",
        negativeFormula: "(-) S + had not + Verb 3",
        usage: "Menyatakan kejadian yang sudah selesai terjadi sebelum peristiwa masa lampau lainnya terjadi ('Past of the Past').",
        timeSignals: ["By the time...", "Before...", "After...", "Already"],
        tips: "Gunakan 'had' untuk semua subjek + V3. Kejadian yang lebih awal = Past Perfect; kejadian yang menyusul = Simple Past.",
        examplePattern: "Pattern: Subject + had + V3"
      },
      {
        title: "8. Past Perfect Continuous Tense",
        formula: "(+) S + had + been + Verb-ing",
        negativeFormula: "(-) S + had not + been + Verb-ing",
        usage: "Menyatakan aksi yang telah berlangsung selama durasi tertentu di masa lampau sebelum peristiwa lampau lain terjadi.",
        timeSignals: ["For (durasi) before...", "By the time...", "Since..."],
        tips: "Fokus pada kelangsungan durasi aksi di masa lampau: S + had + been + V-ing.",
        examplePattern: "Pattern: Subject + had + been + V-ing"
      }
    ]
  },

  // Sektor 3: 4 Future Tenses
  2: {
    sectorTitle: "Sektor 3: The 4 Future Tenses",
    monsterName: "Future Chrono Dragon",
    theme: "Future Tense Formulations",
    description: "Pedoman kaidah dan formula 4 Future Tenses untuk menaklukkan Future Chrono Dragon.",
    accentColor: "rose",
    topics: [
      {
        title: "9. Simple Future Tense",
        formula: "(+) S + will + Verb 1 murni   ATAU   S + is/am/are + going to + Verb 1",
        negativeFormula: "(-) S + will not (won't) + Verb 1   /   is/am/are not going to + Verb 1",
        usage: "'will' untuk prediksi umum, janji, atau keputusan spontan. 'be going to' untuk rencana yang sudah diniatkan atau ada bukti kuat saat ini.",
        timeSignals: ["Tomorrow", "Next week/month", "Soon", "In the future", "Look at those...!"],
        tips: "Setelah 'will', kata kerja selalu Verb 1 polos tanpa -s/-es/-ed. Jangan menggabungkan will + is/am/are + V1.",
        examplePattern: "Pattern: Subject + will + V1"
      },
      {
        title: "10. Future Continuous Tense",
        formula: "(+) S + will + be + Verb-ing",
        negativeFormula: "(-) S + will not + be + Verb-ing",
        usage: "Menyatakan aksi yang sedang dalam proses berlangsung pada waktu tertentu di masa depan.",
        timeSignals: ["At this exact time tomorrow", "At 9 AM next Monday", "When you arrive tomorrow"],
        tips: "Wajib menyertakan 'be' sebelum Verb-ing: will + be + V-ing.",
        examplePattern: "Pattern: Subject + will + be + V-ing"
      },
      {
        title: "11. Future Perfect Tense",
        formula: "(+) S + will + have + Verb 3 (Past Participle)",
        negativeFormula: "(-) S + will not + have + Verb 3",
        usage: "Menyatakan aksi yang diperkirakan akan sudah tuntas sebelum tenggat waktu spesifik di masa depan.",
        timeSignals: ["By tomorrow", "By sunset", "By the end of this year", "By the time S + V1..."],
        tips: "Selalu gunakan 'have' (tidak pernah 'has' setelah will) diikuti Verb 3: will + have + V3.",
        examplePattern: "Pattern: Subject + will + have + V3"
      },
      {
        title: "12. Future Perfect Continuous Tense",
        formula: "(+) S + will + have + been + Verb-ing",
        negativeFormula: "(-) S + will not + have + been + Verb-ing",
        usage: "Menyatakan perkiraan durasi lamanya suatu aksi yang akan telah berlangsung sampai titik waktu tertentu di masa depan.",
        timeSignals: ["By next month... for two years", "By 2030... for a decade"],
        tips: "Rumus lengkap berurutan: will + have + been + V-ing. 'have' selalu bentuk dasar.",
        examplePattern: "Pattern: Subject + will + have + been + V-ing"
      }
    ]
  },

  // Sektor 4: 4 Past Future Tenses
  3: {
    sectorTitle: "Sektor 4: The 4 Past Future Tenses",
    monsterName: "Past-Future Chimera",
    theme: "Past Future & Conditional Formulations",
    description: "Pedoman kaidah dan formula 4 Past Future Tenses untuk mengalahkan Past-Future Chimera.",
    accentColor: "purple",
    topics: [
      {
        title: "13. Simple Past Future Tense",
        formula: "(+) S + would + Verb 1 murni",
        negativeFormula: "(-) S + would not (wouldn't) + Verb 1",
        usage: "Menyatakan rencana/niat masa depan dari sudut pandang masa lampau (Reported Speech) atau hasil pengandaian Second Conditional.",
        timeSignals: ["The day before", "He promised that...", "If + Simple Past..."],
        tips: "Bila klausa utama bermakna lampau ('said', 'promised'), 'will' bergeser menjadi 'would'. Pada Second Conditional: If + V2, S + would + V1.",
        examplePattern: "Pattern: Subject + would + V1"
      },
      {
        title: "14. Past Future Continuous Tense",
        formula: "(+) S + would + be + Verb-ing",
        negativeFormula: "(-) S + would not + be + Verb-ing",
        usage: "Menyatakan aksi yang dibayangkan atau direncanakan sedang berlangsung di masa lampau.",
        timeSignals: ["At noon that day", "He thought that he would be..."],
        tips: "Format baku: would + be + V-ing.",
        examplePattern: "Pattern: Subject + would + be + V-ing"
      },
      {
        title: "15. Past Future Perfect Tense",
        formula: "(+) S + would + have + Verb 3 (Past Participle)",
        negativeFormula: "(-) S + would not + have + Verb 3",
        usage: "Menyatakan peristiwa yang seharusnya sudah tuntas di masa lampau namun tidak terwujud (Third Conditional).",
        timeSignals: ["If + Past Perfect (had + V3)...", "By that evening yesterday"],
        tips: "Third Conditional: If + had + V3, S + would have + V3. Menunjukkan penyesalan masa lampau.",
        examplePattern: "Pattern: Subject + would + have + V3"
      },
      {
        title: "16. Past Future Perfect Continuous Tense",
        formula: "(+) S + would + have + been + Verb-ing",
        negativeFormula: "(-) S + would not + have + been + Verb-ing",
        usage: "Menyatakan durasi hipotesis yang seharusnya telah berlangsung sampai momen tertentu di masa lampau.",
        timeSignals: ["For (durasi) by that time yesterday", "If reinforcements hadn't arrived..."],
        tips: "Rumus baku: would + have (bukan had) + been + V-ing.",
        examplePattern: "Pattern: Subject + would + have + been + V-ing"
      }
    ]
  },

  // Sektor 5: Conjunctions (Final Boss)
  4: {
    sectorTitle: "Sektor 5: Master of All Conjunctions (Final Boss)",
    monsterName: "The Great Conjunction Overlord",
    theme: "Conjunction Rules & Linkage Syntaxes",
    description: "Pedoman kaidah dan formula kata hubung kalimat (Conjunctions) untuk menumbangkan The Great Conjunction Overlord.",
    accentColor: "amber",
    topics: [
      {
        title: "1. Coordinating Conjunctions (FANBOYS)",
        formula: "Independent Clause + , (koma) + [FANBOYS] + Independent Clause",
        usage: "Menghubungkan dua klausa independen yang setara. Akronim: For, And, Nor, But, Or, Yet, So.",
        tips: "Kaidah 'Yet' untuk kontras mengejutkan/paradoks. Kaidah 'Nor' mewajibkan inversi (auxiliary sebelum subjek: ', nor could he...'). Wajib didahului tanda koma (,) sebelum konjungsi FANBOYS bila menghubungkan dua kalimat lengkap.",
        examplePattern: "Clause 1, yet / so / but Clause 2"
      },
      {
        title: "2. Subordinating Conjunctions: Concession & Contrast",
        formula: "Although / Even though + S + V (Klausa Lengkap)   VS   Despite / In spite of + Noun / Noun Phrase",
        usage: "Menghubungkan klausa dependen yang menyatakan pertentangan/konsesi.",
        tips: "JANGAN gunakan 'Despite' sebelum kalimat berpredikat (S + V). Gunakan 'Although' atau 'Even though'. Sebaliknya, 'Despite' hanya diikuti kata benda/frase kata benda.",
        examplePattern: "Although + S + V, Main Clause"
      },
      {
        title: "3. Subordinating Conjunctions: Condition (Unless)",
        formula: "Unless + S + V (Bentuk Afirmatif/Positif) = If + S + do/does not + V",
        usage: "Menyatakan syarat bermakna 'Kecuali jika' atau 'Jika tidak'.",
        tips: "'Unless' sudah bermakna negatif di dalamnya, sehingga klausa di dalam 'unless' TIDAK boleh memakai 'not' lagi (hindari double negative).",
        examplePattern: "Main Clause + unless + S + V (tanpa not)"
      },
      {
        title: "4. Correlative Conjunctions & Parallelism",
        formula: "Neither ... nor ...   |   Either ... or ...   |   Not only ... but also ...",
        usage: "Konjungsi berpasangan baku yang mewajibkan kesetaraan struktur tata bahasa (Parallelism).",
        tips: "Pasangan tidak boleh tertukar: 'Neither' wajib berpasangan dengan 'nor' (bukan 'or'). Unsur setelah kedua kata hubung harus sejajar: bila setelah 'not only' ada to-infinitive, maka setelah 'but also' wajib to-infinitive.",
        examplePattern: "not only [to + V1] but also [to + V1]"
      },
      {
        title: "5. Conjunctive Adverbs (Transition Words)",
        formula: "Independent Clause ; (titik koma) + [However / Therefore / Furthermore / Consequently] + , (koma) + Independent Clause",
        usage: "Kata keterangan transisi yang menghubungkan dua klausa mandiri yang terpisah secara gramatikal.",
        tips: "Aturan tanda baca mutlak: WAJIB didahului Semicolon (;) dan diikuti Koma (,). Menghubungkannya hanya dengan koma menghasilkan kesalahan fatal Comma Splice.",
        examplePattern: "Clause 1; however, Clause 2"
      },
      {
        title: "6. Subordinating Conjunctions: Cause & Effect",
        formula: "Because / Since + S + V (Klausa Lengkap)   VS   Because of / Owing to + Noun Phrase",
        usage: "Menyatakan hubungan sebab-akibat.",
        tips: "Gunakan 'because' atau 'since' jika ada subjek dan kata kerja lengkap setelahnya. Gunakan 'because of' jika setelahnya hanya frasa kata benda tanpa predikat.",
        examplePattern: "Main Clause + because + S + V"
      }
    ]
  }
};

import { STAGE_1_CODEX_DATA } from './codexDataStage1';
import { STAGE_3_CODEX_DATA } from './codexDataStage3';

export { STAGE_1_CODEX_DATA } from './codexDataStage1';
export { STAGE_3_CODEX_DATA } from './codexDataStage3';
export const STAGE_2_CODEX_DATA = CODEX_DATA;

export const CAMPAIGN_CODEX_DATA: Record<number, Record<number, SectorCodex>> = {
  1: STAGE_1_CODEX_DATA,
  2: CODEX_DATA,
  3: STAGE_3_CODEX_DATA
};

