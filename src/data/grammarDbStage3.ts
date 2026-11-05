import { GrammarQuestion } from '../types/game';

// Stage 3: Clauses Mastery (5 Sectors / Wilayah)
// Sektor 1: Noun Clauses (That-clauses, Embedded Questions, Subjunctive)
// Sektor 2: Relative / Adjective Clauses (Who/Whom/Whose, Restrictive vs Non-restrictive)
// Sektor 3: Adverbial Clauses of Time & Condition (Time Sequences, Conditionals)
// Sektor 4: Adverbial Clauses of Cause, Purpose & Contrast (Although vs Despite, So that)
// Sektor 5: Advanced & Reduced Clauses, Inversion & Syntactic Cohesion
export const STAGE_3_GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  // Sektor 1: Noun Clauses
  0: [
    {
      id: 'stg3_sec1_q1',
      monster_text: "The scout wonders where does the ancient dragon dwell.",
      question: "Perbaiki susunan kata Embedded Question pada Noun Clause (wajib Subject + Verb, bukan susunan tanya):",
      options: [
        "The scout wonders where the ancient dragon dwells.",
        "The scout wonders where does the ancient dragon dwell.",
        "The scout wonders where does the ancient dragon dwells."
      ],
      correct: 0,
      explanation: "Noun clause yang berasal dari kalimat tanya (embedded question) harus menggunakan susunan kalimat afirmatif biasa: Conjunction (where) + Subject (the ancient dragon) + Verb (dwells), bukan pembalikan kata bantu 'does'.",
      category: "Noun Clause (Embedded Questions)",
      regionIndex: 0
    },
    {
      id: 'stg3_sec1_q2',
      monster_text: "What did the high priest proclaim surprised the whole council.",
      question: "Pilih Noun Clause yang tepat berfungsi sebagai Subjek kalimat:",
      options: [
        "What the high priest proclaimed surprised the whole council.",
        "What did the high priest proclaim surprised the whole council.",
        "That what the high priest proclaimed surprised the whole council."
      ],
      correct: 0,
      explanation: "Sebagai subjek kalimat, Noun Clause menggunakan struktur afirmatif 'What + S + V' ('What the high priest proclaimed'), tanpa kata bantu tanya 'did'.",
      category: "Noun Clause as Subject",
      regionIndex: 0
    },
    {
      id: 'stg3_sec1_q3',
      monster_text: "The council debated about if they should send reinforcements.",
      question: "Perbaiki penggunaan 'Whether' vs 'If' setelah preposisi:",
      options: [
        "The council debated about whether they should send reinforcements.",
        "The council debated about if they should send reinforcements.",
        "The council debated whether or if they should send reinforcements."
      ],
      correct: 0,
      explanation: "Setelah kata depan/preposisi ('about'), wajib menggunakan 'whether', bukan 'if'. Kata 'if' tidak boleh diletakkan langsung setelah preposisi.",
      category: "Noun Clause (Whether vs If)",
      regionIndex: 0
    },
    {
      id: 'stg3_sec1_q4',
      monster_text: "The king demanded that the knight leaves the capital at once.",
      question: "Perbaiki Subjunctive Mood pada Noun Clause setelah kata kerja 'demand':",
      options: [
        "The king demanded that the knight leave the capital at once.",
        "The king demanded that the knight leaves the capital at once.",
        "The king demanded that the knight left the capital at once."
      ],
      correct: 0,
      explanation: "Kata kerja yang menyatakan desakan/perintah (demand, insist, recommend, require) diikuti Noun Clause dengan Subjunctive Verb (Bare Infinitive / V1 murni tanpa -s) yaitu 'leave'.",
      category: "Noun Clause (Subjunctive Mood)",
      regionIndex: 0
    },
    {
      id: 'stg3_sec1_q5',
      monster_text: "Reward whomever strikes the decisive blow against the beast.",
      question: "Pilih pronoun yang tepat sebagai Subjek di dalam Noun Clause ('strikes the blow'):",
      options: [
        "Reward whoever strikes the decisive blow against the beast.",
        "Reward whomever strikes the decisive blow against the beast.",
        "Reward whichever strikes the decisive blow against the beast."
      ],
      correct: 0,
      explanation: "Meskipun seluruh klausa adalah objek dari 'reward', kata di dalam klausa itu sendiri berfungsi sebagai subjek bagi kata kerja 'strikes', sehingga harus menggunakan bentuk subjek 'whoever'.",
      category: "Noun Clause (Whoever vs Whomever)",
      regionIndex: 0
    },
    {
      id: 'stg3_sec1_q6',
      monster_text: "She did not realize that how dangerous the dungeon was.",
      question: "Perbaiki penumpukan konjungsi berlebih pada Noun Clause:",
      options: [
        "She did not realize how dangerous the dungeon was.",
        "She did not realize that how dangerous the dungeon was.",
        "She did not realize that the dungeon how dangerous was."
      ],
      correct: 0,
      explanation: "Jangan menumpuk kata sambung 'that' bersamaan dengan kata tanya 'how'. Gunakan langsung 'how dangerous the dungeon was'.",
      category: "Noun Clause (Conjunction Syntax)",
      regionIndex: 0
    }
  ],

  // Sektor 2: Relative / Adjective Clauses
  1: [
    {
      id: 'stg3_sec2_q1',
      monster_text: "The wizard which taught us the incantation has vanished.",
      question: "Pilih Relative Pronoun yang tepat untuk merujuk pada manusia ('The wizard'):",
      options: [
        "The wizard who taught us the incantation has vanished.",
        "The wizard which taught us the incantation has vanished.",
        "The wizard whom taught us the incantation has vanished."
      ],
      correct: 0,
      explanation: "Untuk merujuk pada subjek manusia (the wizard) yang melakukan tindakan (taught), gunakan relative pronoun 'who'. 'Which' hanya untuk benda/hewan, sedangkan 'whom' untuk objek.",
      category: "Relative Clause (Who vs Which)",
      regionIndex: 1
    },
    {
      id: 'stg3_sec2_q2',
      monster_text: "The warrior who we met at the tavern offered his blade.",
      question: "Pilih Relative Pronoun objektif formal (sebagai objek dari klausa 'we met'):",
      options: [
        "The warrior whom we met at the tavern offered his blade.",
        "The warrior whose we met at the tavern offered his blade.",
        "The warrior which we met at the tavern offered his blade."
      ],
      correct: 0,
      explanation: "Dalam bahasa Inggris baku formal, jika relative pronoun berfungsi sebagai objek dari kata kerja klausa ('we met [him]'), gunakan 'whom'.",
      category: "Relative Clause (Who vs Whom)",
      regionIndex: 1
    },
    {
      id: 'stg3_sec2_q3',
      monster_text: "We assisted a paladin who's holy shield was completely destroyed.",
      question: "Perbaiki penggunaan Possessive Relative Pronoun 'whose' (kepemilikan) vs kontraksi 'who's' (who is):",
      options: [
        "We assisted a paladin whose holy shield was completely destroyed.",
        "We assisted a paladin who's holy shield was completely destroyed.",
        "We assisted a paladin that's holy shield was completely destroyed."
      ],
      correct: 0,
      explanation: "'Whose' adalah relative pronoun untuk menyatakan kepemilikan ('whose shield' = tameng miliknya). 'Who's' adalah singkatan dari 'who is' atau 'who has'.",
      category: "Relative Clause (Whose vs Who's)",
      regionIndex: 1
    },
    {
      id: 'stg3_sec2_q4',
      monster_text: "Excalibur, that was forged in astral starlight, cuts through dark magic.",
      question: "Perbaiki penggunaan tanda baca & relative pronoun pada Non-Restrictive Clause:",
      options: [
        "Excalibur, which was forged in astral starlight, cuts through dark magic.",
        "Excalibur, that was forged in astral starlight, cuts through dark magic.",
        "Excalibur that was forged in astral starlight, cuts through dark magic."
      ],
      correct: 0,
      explanation: "Pada Non-Restrictive Clause (informasi tambahan di antara tanda koma), kata ganti 'that' tidak boleh digunakan; wajib menggunakan 'which'.",
      category: "Relative Clause (Which vs That in Non-restrictive)",
      regionIndex: 1
    },
    {
      id: 'stg3_sec2_q5',
      monster_text: "The sacred crypt in that the relics are buried remains sealed.",
      question: "Perbaiki kombinasi Preposisi + Relative Pronoun ('that' tidak boleh didahului preposisi):",
      options: [
        "The sacred crypt in which the relics are buried remains sealed.",
        "The sacred crypt in that the relics are buried remains sealed.",
        "The sacred crypt where in the relics are buried remains sealed."
      ],
      correct: 0,
      explanation: "Relative pronoun 'that' tidak boleh didahului oleh preposisi. Gunakan 'in which' atau ubah menjadi relative adverb 'where'.",
      category: "Relative Clause (Preposition + Which)",
      regionIndex: 1
    },
    {
      id: 'stg3_sec2_q6',
      monster_text: "This is the dark moment when the blood moon will rise.",
      question: "Pilih klausa relatif penunjuk waktu (Relative Clause of Time):",
      options: [
        "This is the dark moment when the blood moon rises.",
        "This is the dark moment which the blood moon rises.",
        "This is the dark moment where the blood moon rises."
      ],
      correct: 0,
      explanation: "Untuk merujuk kata benda waktu ('moment', 'time', 'day'), gunakan relative adverb 'when'.",
      category: "Relative Clause of Time (When)",
      regionIndex: 1
    }
  ],

  // Sektor 3: Adverbial Clauses of Time & Condition
  2: [
    {
      id: 'stg3_sec3_q1',
      monster_text: "As soon as the war horn will sound, the knights will advance.",
      question: "Perbaiki Adverbial Clause of Time (jangan gunakan 'will' di dalam anak kalimat waktu):",
      options: [
        "As soon as the war horn sounds, the knights will advance.",
        "As soon as the war horn will sound, the knights will advance.",
        "As soon as the war horn sounded, the knights will advance."
      ],
      correct: 0,
      explanation: "Dalam Adverbial Clause of Time (diawali as soon as, when, before, after, until), gunakan Simple Present Tense untuk masa depan, bukan modal 'will'.",
      category: "Adverbial Clause of Time (Present for Future)",
      regionIndex: 2
    },
    {
      id: 'stg3_sec3_q2',
      monster_text: "If the mage had cast the spell earlier, we would win the skirmish.",
      question: "Perbaiki Conditional Type 3 (Pengandaian Lampau: If + Had + V3, Would Have + V3):",
      options: [
        "If the mage had cast the spell earlier, we would have won the skirmish.",
        "If the mage had cast the spell earlier, we would win the skirmish.",
        "If the mage has cast the spell earlier, we would have won the skirmish."
      ],
      correct: 0,
      explanation: "Rumus Conditional Type 3 (peristiwa lampau yang tidak terjadi): If + Past Perfect (had cast), klausa utama wajib 'would have + V3' ('would have won').",
      category: "Conditional Clause (Type 3)",
      regionIndex: 2
    },
    {
      id: 'stg3_sec3_q3',
      monster_text: "If the hero was immortal, he would challenge the demon king alone.",
      question: "Perbaiki Subjunctive 'were' pada Conditional Type 2 (Pengandaian Masa Kini):",
      options: [
        "If the hero were immortal, he would challenge the demon king alone.",
        "If the hero was immortal, he would challenge the demon king alone.",
        "If the hero is immortal, he would challenge the demon king alone."
      ],
      correct: 0,
      explanation: "Dalam bahasa Inggris baku formal Conditional Type 2 (pengandaian tidak nyata di masa sekarang), to be untuk semua subjek adalah 'were', bukan 'was'.",
      category: "Conditional Clause (Type 2 Subjunctive Were)",
      regionIndex: 2
    },
    {
      id: 'stg3_sec3_q4',
      monster_text: "Unless you do not possess the enchanted key, the door remains shut.",
      question: "Perbaiki makna 'Unless' (Unless = If not, hindari makna negatif ganda):",
      options: [
        "Unless you possess the enchanted key, the door remains shut.",
        "Unless you do not possess the enchanted key, the door remains shut.",
        "Unless you won't possess the enchanted key, the door remains shut."
      ],
      correct: 0,
      explanation: "'Unless' sudah bermakna negatif ('kecuali jika / jika tidak'). Menambahkan 'do not' menghasilkan double negative yang salah.",
      category: "Adverbial Clause of Condition (Unless)",
      regionIndex: 2
    },
    {
      id: 'stg3_sec3_q5',
      monster_text: "While we were marching, suddenly the chimera attacked us.",
      question: "Pilih konjungsi waktu yang tepat untuk aksi panjang yang disela:",
      options: [
        "While we were marching, the chimera attacked us.",
        "During we were marching, the chimera attacked us.",
        "While of our marching, the chimera attacked us."
      ],
      correct: 0,
      explanation: "'While' diikuti oleh klausa lengkap (Subject + Verb: 'we were marching'), sedangkan 'during' hanya diikuti oleh frasa kata benda (noun phrase).",
      category: "Adverbial Clause of Time (While vs During)",
      regionIndex: 2
    },
    {
      id: 'stg3_sec3_q6',
      monster_text: "We will guard the stronghold until the reinforcement will arrive.",
      question: "Perbaiki Adverbial Clause dengan konjungsi 'until':",
      options: [
        "We will guard the stronghold until the reinforcements arrive.",
        "We will guard the stronghold until the reinforcement will arrive.",
        "We will guard the stronghold until the reinforcement shall arrive."
      ],
      correct: 0,
      explanation: "Anak kalimat waktu yang diawali 'until' tidak boleh menggunakan 'will'; gunakan Simple Present 'arrive'.",
      category: "Adverbial Clause of Time (Until)",
      regionIndex: 2
    }
  ],

  // Sektor 4: Adverbial Clauses of Cause, Purpose & Contrast
  3: [
    {
      id: 'stg3_sec4_q1',
      monster_text: "Although the fierce blizzard, the guild pressed forward.",
      question: "Perbaiki konjungsi 'Although' (wajib klausa) vs preposisi 'Despite' (diikuti noun phrase):",
      options: [
        "Despite the fierce blizzard, the guild pressed forward.",
        "Although the fierce blizzard, the guild pressed forward.",
        "In spite the fierce blizzard, the guild pressed forward."
      ],
      correct: 0,
      explanation: "'The fierce blizzard' adalah noun phrase (bukan klausa berpredikat). Oleh karena itu gunakan preposisi 'Despite' atau 'In spite of', bukan 'Although'.",
      category: "Adverbial Clause of Concession (Although vs Despite)",
      regionIndex: 3
    },
    {
      id: 'stg3_sec4_q2',
      monster_text: "The rogue drank an invisibility potion so that he can sneak past the sentries.",
      question: "Sesuaikan modal verb dalam Purpose Clause dengan Tense kalimat lampau ('drank'):",
      options: [
        "The rogue drank an invisibility potion so that he could sneak past the sentries.",
        "The rogue drank an invisibility potion so that he can sneak past the sentries.",
        "The rogue drank an invisibility potion so that he will sneak past the sentries."
      ],
      correct: 0,
      explanation: "Karena klausa utama menggunakan kata kerja lampau ('drank'), klausa tujuan (so that...) wajib menggunakan modal lampau 'could', bukan 'can'.",
      category: "Adverbial Clause of Purpose (So That + Could)",
      regionIndex: 3
    },
    {
      id: 'stg3_sec4_q3',
      monster_text: "The bridge collapsed because of the torrential flood swept the foundation.",
      question: "Pilih konjungsi kausalitas yang tepat untuk klausa utuh ('the flood swept'):",
      options: [
        "The bridge collapsed because the torrential flood swept the foundation.",
        "The bridge collapsed because of the torrential flood swept the foundation.",
        "The bridge collapsed due to the torrential flood swept the foundation."
      ],
      correct: 0,
      explanation: "'Because' adalah konjungsi yang diikuti klausa lengkap (S + V). 'Because of' dan 'due to' adalah preposisi yang hanya boleh diikuti noun phrase.",
      category: "Adverbial Clause of Cause (Because vs Because Of)",
      regionIndex: 3
    },
    {
      id: 'stg3_sec4_q4',
      monster_text: "Even though he was severely fatigued, but he continued chanting the barrier spell.",
      question: "Perbaiki pemakaian konjungsi redundan ('Even though' tidak boleh dipasangkan dengan 'but'):",
      options: [
        "Even though he was severely fatigued, he continued chanting the barrier spell.",
        "Even though he was severely fatigued, but he continued chanting the barrier spell.",
        "Even though he was severely fatigued, yet but he continued chanting the barrier spell."
      ],
      correct: 0,
      explanation: "Jangan memasangkan subordinating conjunction 'Even though' dengan coordinating conjunction 'but' dalam satu kalimat majemuk.",
      category: "Adverbial Clause of Concession (Redundancy)",
      regionIndex: 3
    },
    {
      id: 'stg3_sec4_q5',
      monster_text: "The paladin raised his shield in order that protect his companions.",
      question: "Pilih frasa tujuan yang tepat (In order to + Infinitive vs In order that + Clause):",
      options: [
        "The paladin raised his shield in order to protect his companions.",
        "The paladin raised his shield in order that protect his companions.",
        "The paladin raised his shield in order so protect his companions."
      ],
      correct: 0,
      explanation: "'In order to' diikuti langsung oleh Bare Verb/Infinitive ('protect'). Sedangkan 'in order that' wajib diikuti klausa lengkap (Subject + Modal + Verb).",
      category: "Adverbial Clause of Purpose (In order to vs In order that)",
      regionIndex: 3
    },
    {
      id: 'stg3_sec4_q6',
      monster_text: "The cleric prefers healing magic, whereas the sorcerer prefers destructive spells.",
      question: "Tentukan fungsi klausa yang diawali konjungsi 'whereas':",
      options: [
        "Adverbial Clause of Contrast (menunjukkan perbandingan langsung dua fakta berbeda)",
        "Adverbial Clause of Condition (pengandaian)",
        "Noun Clause (klausa kata benda)"
      ],
      correct: 0,
      explanation: "'Whereas' berfungsi menghubungkan dua klausa untuk menunjukkan perbandingan atau kontras langsung yang jelas antara dua fakta atau subjek.",
      category: "Adverbial Clause of Contrast (Whereas)",
      regionIndex: 3
    }
  ],

  // Sektor 5: Advanced & Reduced Clauses, Inversion & Syntactic Cohesion
  4: [
    {
      id: 'stg3_sec5_q1',
      monster_text: "The archer spotted the scouts who were hiding in the dense foliage.",
      question: "Reduksi Relative Clause aktif menjadi Participial Phrase (Reduced Adjective Clause):",
      options: [
        "The archer spotted the scouts hiding in the dense foliage.",
        "The archer spotted the scouts hidden in the dense foliage.",
        "The archer spotted the scouts were hiding in the dense foliage."
      ],
      correct: 0,
      explanation: "Relative clause aktif ('who were hiding') direduksi dengan menghilangkan relative pronoun dan to-be, menyisakan Present Participle (-ing): 'scouts hiding in the dense foliage'.",
      category: "Reduced Clauses (Active Participle -ing)",
      regionIndex: 4
    },
    {
      id: 'stg3_sec5_q2',
      monster_text: "The enchanted blade that was crafted by ancient dwarves glowed faintly.",
      question: "Reduksi Relative Clause pasif menjadi Past Participle Phrase (Reduced Passive Clause):",
      options: [
        "The enchanted blade crafted by ancient dwarves glowed faintly.",
        "The enchanted blade crafting by ancient dwarves glowed faintly.",
        "The enchanted blade being crafted by ancient dwarves glowed faintly."
      ],
      correct: 0,
      explanation: "Relative clause pasif ('that was crafted') direduksi menjadi Past Participle (V3) murni: 'The enchanted blade crafted by ancient dwarves'.",
      category: "Reduced Clauses (Passive Participle V3)",
      regionIndex: 4
    },
    {
      id: 'stg3_sec5_q3',
      monster_text: "If the commander had sounded the horn, the retreat would have been orderly.",
      question: "Terapkan Inversi Bersyarat (Conditional Inversion) tanpa kata 'If' pada Conditional Type 3:",
      options: [
        "Had the commander sounded the horn, the retreat would have been orderly.",
        "Did the commander sound the horn, the retreat would have been orderly.",
        "Should the commander sound the horn, the retreat would have been orderly."
      ],
      correct: 0,
      explanation: "Inversi pada Conditional Type 3 dilakukan dengan menghilangkan 'If' dan memindahkan auxiliary 'Had' ke depan subjek: 'Had the commander sounded the horn...'.",
      category: "Clause Inversion (Conditional Type 3 Inversion)",
      regionIndex: 4
    },
    {
      id: 'stg3_sec5_q4',
      monster_text: "Not until the sun rose completely, the shadows dispersed.",
      question: "Terapkan Inversi pada Klausa Utama setelah Negative Adverbial Expression 'Not until...':",
      options: [
        "Not until the sun rose completely did the shadows disperse.",
        "Not until the sun rose completely, the shadows dispersed.",
        "Not until the sun rose completely the shadows had dispersed."
      ],
      correct: 0,
      explanation: "Ketika kalimat diawali ekspresi negatif pembatas seperti 'Not until ...', klausa utama wajib mengalami pembalikan (inversion) dengan kata bantu: 'did the shadows disperse'.",
      category: "Negative Adverbial Clause Inversion",
      regionIndex: 4
    },
    {
      id: 'stg3_sec5_q5',
      monster_text: "While walking through the misty woods, a falling branch struck the knight.",
      question: "Perbaiki Dangling Modifier pada Reduced Adverbial Clause (subjek aksi harus sama dengan subjek kalimat):",
      options: [
        "While walking through the misty woods, the knight was struck by a falling branch.",
        "While walking through the misty woods, a falling branch struck the knight.",
        "While walking through the misty woods, struck the knight a falling branch."
      ],
      correct: 0,
      explanation: "Subjek dari aksi 'walking' adalah 'the knight', bukan 'a falling branch'. Menempatkan 'a falling branch' tepat setelah koma menciptakan Dangling Modifier yang salah nalar.",
      category: "Dangling Modifiers in Reduced Clauses",
      regionIndex: 4
    },
    {
      id: 'stg3_sec5_q6',
      monster_text: "If any intruder should enter the sanctum, the defensive wards will ignite.",
      question: "Lakukan Inversi Bersyarat (Inverted Condition) menggunakan 'Should' tanpa kata 'If':",
      options: [
        "Should any intruder enter the sanctum, the defensive wards will ignite.",
        "If should any intruder enter the sanctum, the defensive wards will ignite.",
        "Were any intruder enter the sanctum, the defensive wards will ignite."
      ],
      correct: 0,
      explanation: "Inversi bersyarat untuk kemungkinan di masa depan dilakukan dengan memindahkan 'Should' ke awal kalimat menggantikan 'If': 'Should any intruder enter...'.",
      category: "Clause Inversion (Should Inversion)",
      regionIndex: 4
    }
  ]
};
