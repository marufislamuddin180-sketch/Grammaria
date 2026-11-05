import { GrammarQuestion } from '../types/game';

// Stage 1: Parts of Speech (5 Sectors / Wilayah)
// Sektor 1: Nouns & Pronouns
// Sektor 2: Verbs (Action, Stative, Transitive, Modals)
// Sektor 3: Adjectives & Adverbs (Comparatives, Modifiers, Positions)
// Sektor 4: Prepositions & Articles (In/On/At, Direction, Definite/Indefinite)
// Sektor 5: Conjunctions, Interjections & Full Part-of-Speech Sentence Mastery
export const STAGE_1_GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  // Sektor 1: Nouns & Pronouns
  0: [
    {
      id: 'stg1_sec1_q1',
      monster_text: "Three childs are searching for the lost enchanted scroll.",
      question: "Perbaiki bentuk jamak tak beraturan (Irregular Plural Noun) dari 'child':",
      options: [
        "Three children are searching for the lost enchanted scroll.",
        "Three childs are searching for the lost enchanted scroll.",
        "Three childrens are searching for the lost enchanted scroll."
      ],
      correct: 0,
      explanation: "Kata benda 'child' memiliki bentuk jamak tidak beraturan (irregular plural) yaitu 'children', bukan 'childs' atau 'childrens'.",
      category: "Nouns (Irregular Plurals)",
      regionIndex: 0
    },
    {
      id: 'stg1_sec1_q2',
      monster_text: "The archmage gave the quest reward directly to he and I.",
      question: "Pilih Object Pronoun yang tepat setelah preposisi 'to':",
      options: [
        "The archmage gave the quest reward directly to him and me.",
        "The archmage gave the quest reward directly to he and I.",
        "The archmage gave the quest reward directly to him and I."
      ],
      correct: 0,
      explanation: "Setelah preposisi (prepositional phrase 'to ...'), gunakan Object Pronouns ('him' dan 'me'), bukan Subject Pronouns ('he' dan 'I').",
      category: "Pronouns (Subject vs Object)",
      regionIndex: 0
    },
    {
      id: 'stg1_sec1_q3',
      monster_text: "The dragon licked it's fiery wounds behind the obsidian crystal.",
      question: "Perbaiki penggunaan Possessive Adjective 'its' (kepemilikan) vs kontraksi 'it's' (it is):",
      options: [
        "The dragon licked its fiery wounds behind the obsidian crystal.",
        "The dragon licked it's fiery wounds behind the obsidian crystal.",
        "The dragon licked its' fiery wounds behind the obsidian crystal."
      ],
      correct: 0,
      explanation: "'Its' (tanpa apostrof) adalah kata sifat kepemilikan (Possessive Adjective). Sedangkan 'it's' (dengan apostrof) adalah singkatan dari 'it is' atau 'it has'.",
      category: "Pronouns (Possessive vs Contraction)",
      regionIndex: 0
    },
    {
      id: 'stg1_sec1_q4',
      monster_text: "We need many informations before entering the cursed catacombs.",
      question: "Perbaiki Uncountable Noun 'information' (benda tak dapat dihitung):",
      options: [
        "We need much information before entering the cursed catacombs.",
        "We need many informations before entering the cursed catacombs.",
        "We need many information before entering the cursed catacombs."
      ],
      correct: 0,
      explanation: "'Information' adalah Uncountable Noun (tidak dapat dihitung). Tidak boleh berakhiran -s dan menggunakan penentu kuantitas 'much' atau 'a lot of', bukan 'many'.",
      category: "Nouns (Countable vs Uncountable)",
      regionIndex: 0
    },
    {
      id: 'stg1_sec1_q5',
      monster_text: "The paladin cured hisself using the sacred potion.",
      question: "Perbaiki bentuk Reflexive Pronoun untuk subjek 'the paladin' (he):",
      options: [
        "The paladin cured himself using the sacred potion.",
        "The paladin cured hisself using the sacred potion.",
        "The paladin cured themself using the sacred potion."
      ],
      correct: 0,
      explanation: "Reflexive Pronoun untuk orang ketiga tunggal maskulin adalah 'himself', kata 'hisself' tidak baku dalam tata bahasa standar.",
      category: "Pronouns (Reflexive Pronouns)",
      regionIndex: 0
    },
    {
      id: 'stg1_sec1_q6',
      monster_text: "This spell book is my, but that wooden shield is your.",
      question: "Gunakan Possessive Pronouns mandiri (pengganti frasa benda) yang benar:",
      options: [
        "This spell book is mine, but that wooden shield is yours.",
        "This spell book is my, but that wooden shield is your.",
        "This spell book is mine, but that wooden shield is your."
      ],
      correct: 0,
      explanation: "'Mine' dan 'yours' adalah Possessive Pronouns yang berdiri sendiri tanpa diikuti kata benda, berbeda dengan Possessive Adjectives ('my book', 'your shield').",
      category: "Pronouns (Possessive Pronouns)",
      regionIndex: 0
    }
  ],

  // Sektor 2: Verbs (Action, Stative, Transitive, Modals)
  1: [
    {
      id: 'stg1_sec2_q1',
      monster_text: "Right now, I am knowing the exact weakness of the stone golem.",
      question: "Perbaiki penggunaan Stative Verb 'know' yang tidak lazim dalam bentuk Continuous (-ing):",
      options: [
        "Right now, I know the exact weakness of the stone golem.",
        "Right now, I am knowing the exact weakness of the stone golem.",
        "Right now, I was knowing the exact weakness of the stone golem."
      ],
      correct: 0,
      explanation: "Stative verbs (kata kerja status/pikiran seperti 'know', 'believe', 'understand', 'love') tidak lazim digunakan dalam bentuk continuous (-ing), melainkan Simple Tense.",
      category: "Verbs (Action vs Stative Verbs)",
      regionIndex: 1
    },
    {
      id: 'stg1_sec2_q2',
      monster_text: "The priestess must raises her staff to channel the aura.",
      question: "Perbaiki Verb setelah Modal Auxiliary 'must' (wajib Bare Infinitive / V1 murni):",
      options: [
        "The priestess must raise her staff to channel the aura.",
        "The priestess must raises her staff to channel the aura.",
        "The priestess must to raise her staff to channel the aura."
      ],
      correct: 0,
      explanation: "Setelah modal auxiliary (can, could, must, should, will), kata kerja wajib kembali ke bentuk Verb 1 murni (Bare Infinitive) tanpa akhiran -s atau 'to'.",
      category: "Verbs (Modal Auxiliaries)",
      regionIndex: 1
    },
    {
      id: 'stg1_sec2_q3',
      monster_text: "The wounded warrior layed on the grassy ground all afternoon.",
      question: "Pilih bentuk lampau (Past Tense) yang tepat untuk intransitive verb 'lie' (berbaring):",
      options: [
        "The wounded warrior lay on the grassy ground all afternoon.",
        "The wounded warrior laid on the grassy ground all afternoon.",
        "The wounded warrior layed on the grassy ground all afternoon."
      ],
      correct: 0,
      explanation: "Kata kerja intransitif 'lie' (berbaring) memiliki bentuk lampau V2 'lay'. Sedangkan 'laid' adalah V2 dari kata kerja transitif 'lay' (menaruh/meletakkan sesuatu).",
      category: "Verbs (Transitive vs Intransitive / Lie vs Lay)",
      regionIndex: 1
    },
    {
      id: 'stg1_sec2_q4',
      monster_text: "The hero decided exploring the dark cavern without a torch.",
      question: "Pilih bentuk Verb Pattern yang tepat setelah kata kerja 'decide' (Infinitive dengan 'to'):",
      options: [
        "The hero decided to explore the dark cavern without a torch.",
        "The hero decided exploring the dark cavern without a torch.",
        "The hero decided explore the dark cavern without a torch."
      ],
      correct: 0,
      explanation: "Kata kerja 'decide' selalu diikuti oleh To-Infinitive ('decide to explore'), bukan gerund (-ing).",
      category: "Verbs (Gerund vs To-Infinitive)",
      regionIndex: 1
    },
    {
      id: 'stg1_sec2_q5',
      monster_text: "The rogue enjoys to pick the locks of ancient treasure chests.",
      question: "Pilih pola yang tepat setelah kata kerja 'enjoy' (wajib Gerund V-ing):",
      options: [
        "The rogue enjoys picking the locks of ancient treasure chests.",
        "The rogue enjoys to pick the locks of ancient treasure chests.",
        "The rogue enjoys pick the locks of ancient treasure chests."
      ],
      correct: 0,
      explanation: "Kata kerja 'enjoy' berpasangan dengan Gerund (V-ing), sehingga bentuk yang benar adalah 'enjoys picking'.",
      category: "Verbs (Verbs Followed by Gerund)",
      regionIndex: 1
    },
    {
      id: 'stg1_sec2_q6',
      monster_text: "He should had warned the village before the dragon woke up.",
      question: "Perbaiki Perfect Modal untuk menyatakan penyesalan di masa lalu:",
      options: [
        "He should have warned the village before the dragon woke up.",
        "He should had warned the village before the dragon woke up.",
        "He should has warned the village before the dragon woke up."
      ],
      correct: 0,
      explanation: "Rumus modal lampau (Modal + have + V3): setelah modal 'should', selalu gunakan 'have' (Bare Infinitive), tidak pernah 'had' atau 'has'.",
      category: "Verbs (Past Modal Forms)",
      regionIndex: 1
    }
  ],

  // Sektor 3: Adjectives & Adverbs
  2: [
    {
      id: 'stg1_sec3_q1',
      monster_text: "The knight charged swift into the battlefield against the horde.",
      question: "Gunakan Adverb of Manner untuk menerangkan kata kerja tindakan 'charged':",
      options: [
        "The knight charged swiftly into the battlefield against the horde.",
        "The knight charged swift into the battlefield against the horde.",
        "The knight charged swiftness into the battlefield against the horde."
      ],
      correct: 0,
      explanation: "Untuk menerangkan bagaimana tindakan/kata kerja 'charged' dilakukan, gunakan Adverb of Manner berakhiran -ly ('swiftly'), bukan adjective ('swift').",
      category: "Adjectives vs Adverbs",
      regionIndex: 2
    },
    {
      id: 'stg1_sec3_q2',
      monster_text: "The rogue moves more quiet than the armored sentinel.",
      question: "Perbaiki bentuk komparatif (Comparative Adverb) yang menerangkan kata kerja 'moves':",
      options: [
        "The rogue moves more quietly than the armored sentinel.",
        "The rogue moves quieter than the armored sentinel.",
        "The rogue moves more quiet than the armored sentinel."
      ],
      correct: 0,
      explanation: "Karena menerangkan kata kerja 'moves', bentuk adverb adalah 'quietly', dan komparatifnya adalah 'more quietly than'.",
      category: "Adverbs (Comparative Adverbs)",
      regionIndex: 2
    },
    {
      id: 'stg1_sec3_q3',
      monster_text: "The young apprentice felt very boring during the long arcane lecture.",
      question: "Pilih Participle Adjective (-ed vs -ing) yang menerangkan perasaan subjek orang:",
      options: [
        "The young apprentice felt very bored during the long arcane lecture.",
        "The young apprentice felt very boring during the long arcane lecture.",
        "The young apprentice felt very boredom during the long arcane lecture."
      ],
      correct: 0,
      explanation: "Akhiran -ed ('bored') menerangkan perasaan yang dialami oleh seseorang. Sedangkan -ing ('boring') menerangkan sifat benda/hal penyebab kebosanan.",
      category: "Adjectives (-ed vs -ing Participles)",
      regionIndex: 2
    },
    {
      id: 'stg1_sec3_q4',
      monster_text: "She found a wooden ancient beautiful relic inside the shrine.",
      question: "Urutkan kata sifat sesuai Royal Order of Adjectives (Opinion -> Age -> Material):",
      options: [
        "She found a beautiful ancient wooden relic inside the shrine.",
        "She found a wooden ancient beautiful relic inside the shrine.",
        "She found an ancient wooden beautiful relic inside the shrine."
      ],
      correct: 0,
      explanation: "Urutan standar kata sifat bahasa Inggris: Opinion (beautiful) -> Age (ancient) -> Material (wooden) + Noun (relic).",
      category: "Adjectives (Order of Adjectives)",
      regionIndex: 2
    },
    {
      id: 'stg1_sec3_q5',
      monster_text: "The warrior fought good in yesterday's arena tournament.",
      question: "Perbaiki penggunaan Adverb 'well' vs Adjective 'good':",
      options: [
        "The warrior fought well in yesterday's arena tournament.",
        "The warrior fought good in yesterday's arena tournament.",
        "The warrior fought goodly in yesterday's arena tournament."
      ],
      correct: 0,
      explanation: "'Good' adalah kata sifat (adjective), sedangkan kata keterangan (adverb) untuk menerangkan kata kerja 'fought' adalah 'well'.",
      category: "Adjectives vs Adverbs (Good vs Well)",
      regionIndex: 2
    },
    {
      id: 'stg1_sec3_q6',
      monster_text: "Of the two swords, the mithril blade is the sharpest.",
      question: "Pilih tingkat perbandingan untuk dua objek (Comparative vs Superlative):",
      options: [
        "Of the two swords, the mithril blade is the sharper.",
        "Of the two swords, the mithril blade is the sharpest.",
        "Of the two swords, the mithril blade is more sharp."
      ],
      correct: 0,
      explanation: "Bila membandingkan tepat dua benda ('of the two swords'), gunakan bentuk komparatif 'the sharper', bukan superlatif 'the sharpest' (yang dipakai untuk 3 benda atau lebih).",
      category: "Adjectives (Comparative of Two)",
      regionIndex: 2
    }
  ],

  // Sektor 4: Prepositions & Articles
  3: [
    {
      id: 'stg1_sec4_q1',
      monster_text: "The dragon raid will commence in midnight on next Friday.",
      question: "Perbaiki Preposition of Time untuk penunjuk jam/titik waktu spesifik 'midnight':",
      options: [
        "The dragon raid will commence at midnight next Friday.",
        "The dragon raid will commence in midnight next Friday.",
        "The dragon raid will commence on midnight next Friday."
      ],
      correct: 0,
      explanation: "Waktu spesifik (jam, midnight, noon, dawn) menggunakan preposisi 'at' ('at midnight'). Keterangan waktu dengan kata 'next/last' tidak memerlukan preposisi tambahan.",
      category: "Prepositions of Time (At / On / In)",
      regionIndex: 3
    },
    {
      id: 'stg1_sec4_q2',
      monster_text: "The archer jumped in the river to escape the scorching flames.",
      question: "Pilih Preposition of Movement yang menunjukkan perpindahan gerak ke dalam:",
      options: [
        "The archer jumped into the river to escape the scorching flames.",
        "The archer jumped in the river to escape the scorching flames.",
        "The archer jumped inside to the river to escape the scorching flames."
      ],
      correct: 0,
      explanation: "'Into' menunjukkan pergerakan atau perpindahan posisi dari luar masuk ke dalam (direction of movement). 'In' hanya menunjukkan posisi diam di dalam.",
      category: "Prepositions of Movement (In vs Into)",
      regionIndex: 3
    },
    {
      id: 'stg1_sec4_q3',
      monster_text: "The grand reward was divided between the five brave guild members.",
      question: "Pilih preposisi pembagian untuk lebih dari dua orang (Between vs Among):",
      options: [
        "The grand reward was divided among the five brave guild members.",
        "The grand reward was divided between the five brave guild members.",
        "The grand reward was divided amidst to the five brave guild members."
      ],
      correct: 0,
      explanation: "'Between' umumnya digunakan untuk dua entitas terpisah, sedangkan 'among' digunakan untuk tiga orang/entitas atau lebih dalam satu kelompok.",
      category: "Prepositions (Between vs Among)",
      regionIndex: 3
    },
    {
      id: 'stg1_sec4_q4',
      monster_text: "He is an honest knight studying at an European academy.",
      question: "Perbaiki penggunaan Indefinite Article berdasarkan bunyi vokal/konsonan awal:",
      options: [
        "He is an honest knight studying at a European academy.",
        "He is a honest knight studying at an European academy.",
        "He is a honest knight studying at a European academy."
      ],
      correct: 0,
      explanation: "Gunakan 'an' jika kata diawali bunyi vokal ('an honest' -> silent h berbunyi /ɒ/), dan gunakan 'a' jika diawali bunyi konsonan ('a European' -> berbunyi konsonan /j/).",
      category: "Articles (A vs An based on sound)",
      regionIndex: 3
    },
    {
      id: 'stg1_sec4_q5',
      monster_text: "The veteran knight is very proud for his royal coat of arms.",
      question: "Pilih Dependent Preposition yang tepat untuk kata sifat 'proud':",
      options: [
        "The veteran knight is very proud of his royal coat of arms.",
        "The veteran knight is very proud for his royal coat of arms.",
        "The veteran knight is very proud about his royal coat of arms."
      ],
      correct: 0,
      explanation: "Pasangan preposisi tetap (dependent preposition) untuk 'proud' adalah 'proud of', bukan 'proud for'.",
      category: "Dependent Prepositions (Adjective + Preposition)",
      regionIndex: 3
    },
    {
      id: 'stg1_sec4_q6',
      monster_text: "The expedition traveled by the foot across the rugged mountains.",
      question: "Perbaiki ungkapan idiomatis moda perjalanan tanpa artikel:",
      options: [
        "The expedition traveled on foot across the rugged mountains.",
        "The expedition traveled by foot across the rugged mountains.",
        "The expedition traveled by the foot across the rugged mountains."
      ],
      correct: 0,
      explanation: "Ungkapan bahasa Inggris yang tepat untuk berjalan kaki adalah 'on foot', bukan 'by foot' atau 'by the foot'.",
      category: "Prepositional Idioms",
      regionIndex: 3
    }
  ],

  // Sektor 5: Conjunctions, Interjections & Full Part-of-Speech Mastery
  4: [
    {
      id: 'stg1_sec5_q1',
      monster_text: "Identify the part of speech of the capitalized word: 'The FAST runner ran across the field.'",
      question: "Tentukan kelas kata (Part of Speech) dari kata 'FAST' pada kalimat tersebut:",
      options: [
        "Adjective (menerangkan kata benda 'runner')",
        "Adverb (menerangkan kata kerja 'ran')",
        "Noun (kata benda subjek)"
      ],
      correct: 0,
      explanation: "Pada frasa 'the fast runner', kata 'fast' berada tepat sebelum kata benda 'runner' dan menerangkannya, sehingga berfungsi sebagai Adjective (kata sifat).",
      category: "Part of Speech Identification",
      regionIndex: 4
    },
    {
      id: 'stg1_sec5_q2',
      monster_text: "Identify the part of speech of the capitalized word: 'The runner ran FAST across the field.'",
      question: "Tentukan kelas kata (Part of Speech) dari kata 'FAST' pada kalimat ini:",
      options: [
        "Adverb (menerangkan bagaimana kata kerja 'ran' dilakukan)",
        "Adjective (kata sifat)",
        "Preposition (kata depan)"
      ],
      correct: 0,
      explanation: "Pada kalimat ini, 'fast' menerangkan kata kerja 'ran' (menjelaskan cara berlari), sehingga berfungsi sebagai Adverb of Manner.",
      category: "Part of Speech Identification (Adverb)",
      regionIndex: 4
    },
    {
      id: 'stg1_sec5_q3',
      monster_text: "Identify the part of speech: 'Alas! The crystal fortress has fallen to the darkness.'",
      question: "Tentukan kelas kata dari 'Alas!':",
      options: [
        "Interjection (kata seru yang mengekspresikan duka/emosi mendalam)",
        "Conjunction (kata penghubung)",
        "Adverb (kata keterangan waktu)"
      ],
      correct: 0,
      explanation: "'Alas' adalah Interjection (kata seru) kuno/literer yang digunakan untuk mengekspresikan kesedihan, duka, atau penyesalan.",
      category: "Interjections",
      regionIndex: 4
    },
    {
      id: 'stg1_sec5_q4',
      monster_text: "The sentinel stood inside the gate, BUT his gaze wandered outside.",
      question: "Tentukan jenis kata dan fungsi dari kata sambung 'BUT' di kalimat di atas:",
      options: [
        "Coordinating Conjunction (menghubungkan dua klausa independen kontras)",
        "Subordinating Conjunction (membuat anak kalimat)",
        "Preposition (menunjukkan posisi ruang)"
      ],
      correct: 0,
      explanation: "'But' adalah Coordinating Conjunction (bagian dari FANBOYS) yang menghubungkan dua klausa independen yang setara dan memiliki hubungan kontras.",
      category: "Conjunctions (Coordinating)",
      regionIndex: 4
    },
    {
      id: 'stg1_sec5_q5',
      monster_text: "Identify the role of 'DOWN' in: 'Tears rolled DOWN her cheeks.'",
      question: "Tentukan kelas kata dari 'DOWN' dalam kalimat tersebut:",
      options: [
        "Preposition (diikuti objek kata benda 'her cheeks')",
        "Adverb (kata keterangan)",
        "Adjective (kata sifat)"
      ],
      correct: 0,
      explanation: "Kata 'down' diikuti langsung oleh objek kata benda ('her cheeks') membentuk prepositional phrase penunjuk arah, sehingga berperan sebagai Preposition.",
      category: "Prepositions vs Adverbs",
      regionIndex: 4
    },
    {
      id: 'stg1_sec5_q6',
      monster_text: "Neither the paladin OR the archer spotted the disguised assassin.",
      question: "Perbaiki pasangan Correlative Conjunction untuk 'Neither':",
      options: [
        "Neither the paladin nor the archer spotted the disguised assassin.",
        "Neither the paladin or the archer spotted the disguised assassin.",
        "Neither the paladin and the archer spotted the disguised assassin."
      ],
      correct: 0,
      explanation: "Pasangan tetap Correlative Conjunction adalah 'Neither ... nor' dan 'Either ... or'. 'Neither' tidak boleh dipasangkan dengan 'or'.",
      category: "Correlative Conjunctions",
      regionIndex: 4
    }
  ]
};
