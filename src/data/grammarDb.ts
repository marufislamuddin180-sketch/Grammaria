import { GrammarQuestion } from '../types/game';

// 30 Unique Questions organized specifically by Region / Monster Encounter
export const REGION_GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  // Region 1: Typo Goblin (Focus: Spelling, Simple Past, Irregular Verbs, Articles, Auxiliary)
  0: [
    {
      id: 'r1_q1',
      monster_text: "Yesterday, the Goblin say that he want all our gold!",
      question: "Pilih perbaikan kalimat yang benar (Simple Past Tense):",
      options: [
        "Yesterday, the Goblin said that he wanted all our gold.",
        "Yesterday, the Goblin says that he wants all our gold.",
        "Yesterday, the Goblin had said that he wanting all our gold."
      ],
      correct: 0,
      explanation: "Keterangan waktu 'Yesterday' membutuhkan Simple Past Tense ('said' dan 'wanted'), bukan verb 1 ('say', 'want').",
      category: "Past Tense",
      regionIndex: 0
    },
    {
      id: 'r1_q2',
      monster_text: "She do not knows the secret incantation to break the curse.",
      question: "Pilih perbaikan Subject-Verb / Auxiliary yang benar:",
      options: [
        "She does not knows the secret incantation.",
        "She does not know the secret incantation.",
        "She do not know the secret incantation."
      ],
      correct: 1,
      explanation: "Untuk subjek tunggal orang ketiga ('She'), gunakan auxiliary 'does not' diikuti oleh Bare Infinitive/Verb 1 murni ('know', bukan 'knows').",
      category: "Auxiliary Verbs",
      regionIndex: 0
    },
    {
      id: 'r1_q3',
      monster_text: "The goblin thief stealed three enchanted diamonds from our satchel.",
      question: "Perbaiki bentuk kata kerja lampau tak beraturan (Irregular Verb):",
      options: [
        "The goblin thief stoled three enchanted diamonds from our satchel.",
        "The goblin thief stole three enchanted diamonds from our satchel.",
        "The goblin thief stolen three enchanted diamonds from our satchel."
      ],
      correct: 1,
      explanation: "Bentuk Simple Past (V2) dari 'steal' adalah 'stole', bukan 'stealed' atau 'stoled'.",
      category: "Irregular Verbs",
      regionIndex: 0
    },
    {
      id: 'r1_q4',
      monster_text: "Every morning, the castle guards patrols the courtyard.",
      question: "Perbaiki kesesuaian Subject-Verb Agreement:",
      options: [
        "Every morning, the castle guards patrol the courtyard.",
        "Every morning, the castle guards is patrolling the courtyard.",
        "Every morning, the castle guard patrol the courtyard."
      ],
      correct: 0,
      explanation: "Subjek jamak ('the castle guards') membutuhkan kata kerja jamak tanpa akhiran -s ('patrol').",
      category: "Subject-Verb Agreement",
      regionIndex: 0
    },
    {
      id: 'r1_q5',
      monster_text: "There is many small goblins hiding behind those mossy boulders.",
      question: "Perbaiki penggunaan 'There is / There are' untuk subjek jamak:",
      options: [
        "There are many small goblins hiding behind those mossy boulders.",
        "There were many small goblin hiding behind those mossy boulders.",
        "There is many small goblin hiding behind those mossy boulders."
      ],
      correct: 0,
      explanation: "Kata benda yang mengikuti adalah jamak ('many small goblins'), sehingga menggunakan 'There are', bukan 'There is'.",
      category: "Existential There",
      regionIndex: 0
    },
    {
      id: 'r1_q6',
      monster_text: "He gave an enchanted sword to a ancient warrior.",
      question: "Perbaiki penggunaan artikel 'a' dan 'an' yang tepat:",
      options: [
        "He gave a enchanted sword to a ancient warrior.",
        "He gave an enchanted sword to an ancient warrior.",
        "He gave a enchanted sword to an ancient warrior."
      ],
      correct: 1,
      explanation: "Gunakan artikel 'an' sebelum kata yang diawali bunyi vokal ('an enchanted', 'an ancient').",
      category: "Articles",
      regionIndex: 0
    }
  ],

  // Region 2: Tense-Twisting Troll (Focus: Present Continuous, Perfect Tenses, Timeline Sequence)
  1: [
    {
      id: 'r2_q1',
      monster_text: "Look! The dragon is fly over the burning village!",
      question: "Pilih perbaikan kalimat yang benar (Present Continuous):",
      options: [
        "Look! The dragon flies over the burning village!",
        "Look! The dragon is flying over the burning village!",
        "Look! The dragon is flied over the burning village!"
      ],
      correct: 1,
      explanation: "Kata seru 'Look!' menandakan aksi sedang berlangsung saat dibicarakan. Rumus: to be + V-ing ('is flying').",
      category: "Present Continuous",
      regionIndex: 1
    },
    {
      id: 'r2_q2',
      monster_text: "They has went into the dark cavern without torches.",
      question: "Pilih perbaikan Present Perfect Tense yang tepat:",
      options: [
        "They have went into the dark cavern without torches.",
        "They have gone into the dark cavern without torches.",
        "They has gone into the dark cavern without torches."
      ],
      correct: 1,
      explanation: "Present Perfect untuk subjek jamak 'They' menggunakan 'have' diikuti Past Participle (V3 'gone', bukan V2 'went').",
      category: "Present Perfect",
      regionIndex: 1
    },
    {
      id: 'r2_q3',
      monster_text: "By the time the royal cavalry arrived, the troll already destroyed the bridge.",
      question: "Pilih perbaikan Past Perfect untuk kejadian yang terjadi lebih awal di masa lalu:",
      options: [
        "By the time the royal cavalry arrived, the troll had already destroyed the bridge.",
        "By the time the royal cavalry had arrived, the troll already destroyed the bridge.",
        "By the time the royal cavalry arrived, the troll has already destroyed the bridge."
      ],
      correct: 0,
      explanation: "Kejadian yang sudah selesai sebelum kejadian masa lalu lainnya ('arrived') wajib menggunakan Past Perfect: had + V3 ('had already destroyed').",
      category: "Past Perfect",
      regionIndex: 1
    },
    {
      id: 'r2_q4',
      monster_text: "While the wizard prepared the potion, the troll suddenly attack.",
      question: "Perbaiki keselarasan Tense dalam kalimat lampau gabungan:",
      options: [
        "While the wizard was preparing the potion, the troll suddenly attacked.",
        "While the wizard prepares the potion, the troll suddenly attacked.",
        "While the wizard had prepared the potion, the troll suddenly attack."
      ],
      correct: 0,
      explanation: "Aksi panjang yang sedang berlangsung di masa lampau menggunakan Past Continuous ('was preparing'), disela oleh aksi pendek Simple Past ('attacked').",
      category: "Past Continuous Interruption",
      regionIndex: 1
    },
    {
      id: 'r2_q5',
      monster_text: "The troll is guarding this bridge since the third age.",
      question: "Perbaiki penggunaan Tense untuk durasi aksi dari masa lampau hingga kini:",
      options: [
        "The troll has been guarding this bridge since the third age.",
        "The troll guarded this bridge since the third age.",
        "The troll will be guarding this bridge since the third age."
      ],
      correct: 0,
      explanation: "Aksi yang dimulai di masa lampau dan masih berlanjut hingga sekarang dengan penanda 'since' menggunakan Present Perfect Continuous ('has been guarding').",
      category: "Present Perfect Continuous",
      regionIndex: 1
    },
    {
      id: 'r2_q6',
      monster_text: "Tomorrow morning, our party entered the sacred dungeon.",
      question: "Perbaiki keterangan waktu 'Tomorrow morning' dengan Tense yang tepat:",
      options: [
        "Tomorrow morning, our party will enter the sacred dungeon.",
        "Tomorrow morning, our party had entered the sacred dungeon.",
        "Tomorrow morning, our party was entering the sacred dungeon."
      ],
      correct: 0,
      explanation: "'Tomorrow morning' menunjuk ke masa depan, sehingga membutuhkan Simple Future Tense ('will enter').",
      category: "Future Tense",
      regionIndex: 1
    }
  ],

  // Region 3: Comma Splice Dragon (Focus: Comma Splices, Semicolons, Run-on Sentences, Conjunctive Adverbs)
  2: [
    {
      id: 'r3_q1',
      monster_text: "The potion was bitter, he drank it anyway to survive.",
      question: "Perbaiki kesalahan Comma Splice (dua klausa independen dipisah hanya koma):",
      options: [
        "The potion was bitter; he drank it anyway to survive.",
        "The potion was bitter he drank it anyway to survive.",
        "The potion was bitter, but drank it anyway to survive."
      ],
      correct: 0,
      explanation: "Comma splice diatasi dengan mengganti koma dengan titik koma (;) atau menambahkan coordinating conjunction lengkap (', but he drank...').",
      category: "Comma Splice",
      regionIndex: 2
    },
    {
      id: 'r3_q2',
      monster_text: "The dragon exhaled a torrent of fire, our wooden shields incinerated instantly.",
      question: "Perbaiki Comma Splice dengan konjungsi subordinatif yang tepat:",
      options: [
        "When the dragon exhaled a torrent of fire, our wooden shields incinerated instantly.",
        "The dragon exhaled a torrent of fire, and our wooden shields incinerated instantly.",
        "The dragon exhaled a torrent of fire our wooden shields incinerated instantly."
      ],
      correct: 0,
      explanation: "Mengubah salah satu klausa menjadi dependent clause dengan 'When' menciptakan kalimat kompleks yang benar secara gramatikal.",
      category: "Complex Sentences",
      regionIndex: 2
    },
    {
      id: 'r3_q3',
      monster_text: "We reached the dragon's lair, however the beast had flown away.",
      question: "Perbaiki penggunaan tanda baca pada konjungsi adverba 'however':",
      options: [
        "We reached the dragon's lair; however, the beast had flown away.",
        "We reached the dragon's lair, however, the beast had flown away.",
        "We reached the dragon's lair however; the beast had flown away."
      ],
      correct: 0,
      explanation: "'However' yang menghubungkan dua klausa independen harus didahului titik koma (;) dan diikuti koma (,).",
      category: "Conjunctive Adverbs",
      regionIndex: 2
    },
    {
      id: 'r3_q4',
      monster_text: "The dragon scales are impenetrable steel weapons cannot pierce them.",
      question: "Perbaiki Run-on Sentence (dua kalimat tanpa tanda hubung sama sekali):",
      options: [
        "The dragon scales are impenetrable; steel weapons cannot pierce them.",
        "The dragon scales are impenetrable steel, weapons cannot pierce them.",
        "The dragon scales are impenetrable, steel weapons cannot pierce them."
      ],
      correct: 0,
      explanation: "Run-on sentence dapat dipisahkan secara elegan dengan Semicolon (;) untuk menghubungkan dua ide yang berhubungan erat.",
      category: "Run-on Sentences",
      regionIndex: 2
    },
    {
      id: 'r3_q5',
      monster_text: "The dragon roared, the tremors shook the cavern walls.",
      question: "Perbaiki Comma Splice menggunakan coordinating conjunction (FANBOYS):",
      options: [
        "The dragon roared, and the tremors shook the cavern walls.",
        "The dragon roared but the tremors shook the cavern walls.",
        "The dragon roared, so tremors shook the cavern walls."
      ],
      correct: 0,
      explanation: "Dua klausa independen dapat dihubungkan dengan koma diikuti coordinating conjunction 'and' (, and).",
      category: "Coordinating Conjunctions",
      regionIndex: 2
    },
    {
      id: 'r3_q6',
      monster_text: "The beast was wounded, therefore it fought with ferocious desperation.",
      question: "Perbaiki tanda baca sebelum kata transisi 'therefore':",
      options: [
        "The beast was wounded; therefore, it fought with ferocious desperation.",
        "The beast was wounded, therefore, it fought with ferocious desperation.",
        "The beast was wounded therefore, it fought with ferocious desperation."
      ],
      correct: 0,
      explanation: "'Therefore' di antara dua klausa independen membutuhkan titik koma (;) sebelumnya dan koma (,) sesudahnya.",
      category: "Transition Signals",
      regionIndex: 2
    }
  ],

  // Region 4: Dangling Modifier Chimera (Focus: Dangling Modifiers, Misplaced Modifiers, Collective Nouns, Pronouns)
  3: [
    {
      id: 'r4_q1',
      monster_text: "Wandering through the misty forest, the haunted castle appeared.",
      question: "Perbaiki kesalahan Dangling Modifier berikut:",
      options: [
        "Wandering through the misty forest, the heroes saw the haunted castle appear.",
        "The haunted castle appeared, wandering through the misty forest.",
        "Wandering through the misty forest, appearing was the haunted castle."
      ],
      correct: 0,
      explanation: "Kastil tidak bisa 'wandering' (berkelana). Subjek yang melakukan aksi ('the heroes') harus diletakkan tepat setelah participle phrase pembuka.",
      category: "Dangling Modifiers",
      regionIndex: 3
    },
    {
      id: 'r4_q2',
      monster_text: "The army of dark wraiths are marching towards the castle gates.",
      question: "Perbaiki kesalahan Subject-Verb Agreement pada Collective Noun:",
      options: [
        "The army of dark wraiths were marching towards the castle gates.",
        "The army of dark wraiths is marching towards the castle gates.",
        "The armies of dark wraith is marching towards the castle gates."
      ],
      correct: 1,
      explanation: "Subjek utama adalah 'The army' (singular collective noun), bukan 'dark wraiths'. To be yang tepat adalah 'is', bukan 'are'.",
      category: "Collective Nouns",
      regionIndex: 3
    },
    {
      id: 'r4_q3',
      monster_text: "Between you and I, this dungeon hides a terrifying beast.",
      question: "Perbaiki kesalahan penggunaan Pronoun Case setelah preposisi:",
      options: [
        "Between you and me, this dungeon hides a terrifying beast.",
        "Between you and myself, this dungeon hides a terrifying beast.",
        "Between he and I, this dungeon hides a terrifying beast."
      ],
      correct: 0,
      explanation: "'Between' adalah preposisi (preposition). Kata ganti setelah preposisi wajib berupa Object Pronoun ('me', bukan 'I').",
      category: "Pronoun Cases",
      regionIndex: 3
    },
    {
      id: 'r4_q4',
      monster_text: "Neither the Paladin nor the Clerics was ready for the ambush.",
      question: "Pilih kesesuaian kata kerja korelasi 'Neither... nor...':",
      options: [
        "Neither the Paladin nor the Clerics were ready for the ambush.",
        "Neither the Paladin or the Clerics were ready for the ambush.",
        "Neither the Paladin nor the Clerics is ready for the ambush."
      ],
      correct: 0,
      explanation: "Dengan 'Neither... nor...', kata kerja menyesuaikan subjek terdekat. Di sini subjek terdekat adalah 'the Clerics' (jamak), sehingga menggunakan 'were'.",
      category: "Correlative Conjunctions",
      regionIndex: 3
    },
    {
      id: 'r4_q5',
      monster_text: "Having devoured the raw meat, the dungeon quieted down around the chimera.",
      question: "Perbaiki Dangling Participle agar subjek yang makan jelas:",
      options: [
        "Having devoured the raw meat, the chimera rested as the dungeon quieted down.",
        "Having devoured the raw meat, the dungeon was quieted by the chimera.",
        "The dungeon quieted down around the chimera having devoured the raw meat."
      ],
      correct: 0,
      explanation: "Yang melahap daging adalah chimera, bukan dungeon. Chimera harus menjadi subjek langsung setelah frase partisipial pembuka.",
      category: "Dangling Participles",
      regionIndex: 3
    },
    {
      id: 'r4_q6',
      monster_text: "To unlock the ancient runic chest, the golden key must be inserted.",
      question: "Perbaiki Dangling Infinitive Phrase agar subjek pelaku terlihat jelas:",
      options: [
        "To unlock the ancient runic chest, the rogue must insert the golden key.",
        "To unlock the ancient runic chest, inserting the golden key is required.",
        "The ancient runic chest must be unlocked by the golden key being inserted."
      ],
      correct: 0,
      explanation: "Kunci tidak bisa membuka peti dengan sendirinya. Pelaku aksi ('the rogue') harus ditempatkan sebagai subjek klausa utama.",
      category: "Dangling Infinitives",
      regionIndex: 3
    }
  ],

  // Region 5: The Great Chaos Overlord (Focus: Passive Voice, Conditionals Type 3, Subjunctive, Inversion)
  4: [
    {
      id: 'r5_q1',
      monster_text: "The ancient spell was spoke by the elder runesmith.",
      question: "Perbaiki bentuk Passive Voice kata kerja tak beraturan:",
      options: [
        "The ancient spell was spoken by the elder runesmith.",
        "The ancient spell was speaked by the elder runesmith.",
        "The ancient spell were spoken by the elder runesmith."
      ],
      correct: 0,
      explanation: "Rumus Passive Voice: To Be + Past Participle (V3). Bentuk V3 dari 'speak' adalah 'spoken' (speak - spoke - spoken).",
      category: "Passive Voice",
      regionIndex: 4
    },
    {
      id: 'r5_q2',
      monster_text: "If the wizard studied harder, he would have defeated the dragon yesterday.",
      question: "Perbaiki kesalahan Third Conditional untuk penyesalan masa lalu:",
      options: [
        "If the wizard had studied harder, he would defeat the dragon yesterday.",
        "If the wizard had studied harder, he would have defeated the dragon yesterday.",
        "If the wizard has studied harder, he would have defeated the dragon yesterday."
      ],
      correct: 1,
      explanation: "Peristiwa masa lampau yang tidak terwujud ('yesterday') menggunakan Third Conditional: If + Past Perfect (had studied), would have + V3 (would have defeated).",
      category: "Third Conditional",
      regionIndex: 4
    },
    {
      id: 'r5_q3',
      monster_text: "The Archmage demanded that every apprentice is present at dawn.",
      question: "Perbaiki Subjunctive Mood dalam klausa tuntutan (demand that...):",
      options: [
        "The Archmage demanded that every apprentice be present at dawn.",
        "The Archmage demanded that every apprentice was present at dawn.",
        "The Archmage demanded that every apprentice will be present at dawn."
      ],
      correct: 0,
      explanation: "Kata kerja yang menyatakan tuntutan/perintah (demand, insist) diikuti klausa 'that' membutuhkan Subjunctive Mood dengan Bare Infinitive ('be', bukan 'is' atau 'was').",
      category: "Subjunctive Mood",
      regionIndex: 4
    },
    {
      id: 'r5_q4',
      monster_text: "Not only the demon king destroyed the crystal, but he also enslaved the realm.",
      question: "Perbaiki Inversi Negatif pembuka (Negative Inversion):",
      options: [
        "Not only did the demon king destroy the crystal, but he also enslaved the realm.",
        "Not only the demon king had destroyed the crystal, but also enslaved the realm.",
        "Not only was the demon king destroyed the crystal, but he also enslaved the realm."
      ],
      correct: 0,
      explanation: "Ketika kalimat diawali frase negatif 'Not only', susunan kata dibalik dengan meletakkan auxiliary sebelum subjek ('did the demon king destroy').",
      category: "Negative Inversion",
      regionIndex: 4
    },
    {
      id: 'r5_q5',
      monster_text: "Scarcely the demon raised his staff when thunder struck the alter.",
      question: "Perbaiki Inversi 'Scarcely... when...' untuk urutan kejadian dramatis:",
      options: [
        "Scarcely had the demon raised his staff when thunder struck the altar.",
        "Scarcely the demon had raised his staff when thunder struck the altar.",
        "Scarcely did the demon raised his staff when thunder struck the altar."
      ],
      correct: 0,
      explanation: "'Scarcely' di awal kalimat mewajibkan inversi Past Perfect: Scarcely + had + Subjek + V3 + when...",
      category: "Time Inversion",
      regionIndex: 4
    },
    {
      id: 'r5_q6',
      monster_text: "If I was the master of time, I would restore Grammaria with a single word.",
      question: "Perbaiki Subjunctive 'were' dalam pengandaian hipotetis (Second Conditional):",
      options: [
        "If I were the master of time, I would restore Grammaria with a single word.",
        "If I am the master of time, I would restore Grammaria with a single word.",
        "If I had been the master of time, I will restore Grammaria with a single word."
      ],
      correct: 0,
      explanation: "Dalam pengandaian bertolak belakang dengan fakta saat ini (Second Conditional), gunakan 'were' untuk semua subjek orang (termasuk 'I' dan 'he/she/it').",
      category: "Hypothetical Subjunctive",
      regionIndex: 4
    }
  ]
};

// Flattened database grouped by Tier for Grimoire and backward compatibility
export const GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  1: [...REGION_GRAMMAR_DB[0], ...REGION_GRAMMAR_DB[1]],
  2: [...REGION_GRAMMAR_DB[2], ...REGION_GRAMMAR_DB[3]],
  3: [...REGION_GRAMMAR_DB[4]]
};
