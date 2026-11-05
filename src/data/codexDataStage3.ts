import { SectorCodex } from './codexData';

export const STAGE_3_CODEX_DATA: Record<number, SectorCodex> = {
  // Sektor 1: Noun Clauses
  0: {
    sectorTitle: "Stage 3 • Sektor 1: Noun Clauses",
    monsterName: "Noun Clause Goblin",
    theme: "Embedded Sentences & Subject/Object Clauses",
    description: "Pedoman klausa nomina yang berfungsi sebagai subjek atau objek kalimat, susunan embedded questions, dan subjunctive mood.",
    accentColor: "emerald",
    topics: [
      {
        title: "1. Embedded Questions Word Order",
        formula: "Question Word (where, what, why, how) + Subject + Verb [HINDARI inversi tanya seperti does/did]",
        usage: "Ketika pertanyaan disisipkan ke dalam kalimat pernyataan atau klausa nomina, susunan katanya kembali menjadi kalimat positif.",
        tips: "Katakan 'I wonder where he lives', BUKAN 'where does he live'. Jangan gunakan kata bantu tanya 'do/does/did'.",
        examplePattern: "Pattern: Verb + [wh-word + Subject + Verb]"
      },
      {
        title: "2. Noun Clause as Subject",
        formula: "[That / What / Whether + Subject + Verb] + Main Verb + Complement",
        usage: "Seluruh klausa bertindak sebagai satu kesatuan subjek tunggal bagi kata kerja utama kalimat.",
        tips: "What the high priest proclaimed surprised everyone. (Subjek = What the high priest proclaimed; Kata kerja = surprised).",
        examplePattern: "Pattern: [What + S + V] + Verb"
      },
      {
        title: "3. Whether vs If in Noun Clauses",
        formula: "Gunakan 'Whether' setelah preposisi atau sebelum 'or not' langsung",
        usage: "Setelah preposisi (prepositional phrase 'about whether...'), wajib gunakan 'whether', tidak boleh 'if'.",
        tips: "'The council debated about whether they should attack' (bukan about if).",
        examplePattern: "Pattern: Preposition + whether + [Clause]"
      },
      {
        title: "4. Subjunctive Mood in Noun Clauses",
        formula: "Demand / Insist / Require / Suggest + that + Subject + Bare Infinitive (Verb 1 murni tanpa -s)",
        usage: "Digunakan setelah kata kerja perintah/tuntutan formal.",
        tips: "The king demanded that the knight [leave / be ready] at once (bukan leaves atau is).",
        examplePattern: "Pattern: Verb of Demand + that + S + [V1 Bare]"
      }
    ]
  },

  // Sektor 2: Relative / Adjective Clauses
  1: {
    sectorTitle: "Stage 3 • Sektor 2: Relative / Adjective Clauses",
    monsterName: "Relative Clause Troll",
    theme: "Relative Pronouns & Restrictive vs Non-Restrictive Precision",
    description: "Pedoman kata ganti relatif (who, whom, whose, which, that), preposisi + relative pronoun, dan kaidah tanda koma.",
    accentColor: "cyan",
    topics: [
      {
        title: "1. Who vs Whom vs Whose",
        formula: "Who: Subjek orang | Whom: Objek orang | Whose: Kepemilikan (orang atau benda)",
        usage: "'The wizard who cast the spell' (subjek); 'The wizard whom we consulted' (objek); 'The wizard whose staff was broken' (kepemilikan).",
        tips: "Ganti dengan 'he/him' untuk menguji: jika jawabannya 'him', gunakan 'whom'; jika 'he', gunakan 'who'.",
        examplePattern: "Pattern: Person + who + Verb | Person + whom + Subject + Verb"
      },
      {
        title: "2. Restrictive vs Non-Restrictive Clauses",
        formula: "Restrictive: Tanpa koma (informasi esensial, boleh pakai 'that') | Non-Restrictive: Diapit koma (informasi tambahan, DILARANG pakai 'that', wajib 'which/who')",
        usage: "Non-restrictive memberikan detail ekstra yang bila dihapus tidak mengubah identitas subjek pokok.",
        tips: "Excalibur, which was forged in starlight, cuts through evil. (Gunakan 'which', jangan 'that' di antara tanda koma).",
        examplePattern: "Pattern: Proper Noun, [which / who + Clause], Main Predicate"
      },
      {
        title: "3. Preposition + Relative Pronoun",
        formula: "Preposition + Whom (orang) / Which (benda) [DILARANG: Preposition + That]",
        usage: "Preposisi diletakkan langsung sebelum pronoun dalam bahasa formal.",
        tips: "'The sacred crypt in which the relics are buried' (bukan in that).",
        examplePattern: "Pattern: Noun + [preposition + which / whom] + Clause"
      },
      {
        title: "4. Relative Adverbs (Where, When, Why)",
        formula: "Where (= in/at which) | When (= at/on which) | Why (= for which)",
        usage: "Menggantikan frasa preposisi penunjuk tempat, waktu, atau alasan.",
        tips: "'This is the place where the battle occurred' = 'in which the battle occurred'.",
        examplePattern: "Pattern: Place + where + Clause | Time + when + Clause"
      }
    ]
  },

  // Sektor 3: Adverbial Clauses of Time & Condition
  2: {
    sectorTitle: "Stage 3 • Sektor 3: Adverbial Clauses of Time & Condition",
    monsterName: "Temporal & Conditional Drake",
    theme: "Temporal Synchronization & Conditional Logic",
    description: "Pedoman aturan tenses anak kalimat waktu (larangan 'will'), serta 3 tipe kalimat pengandaian (Conditionals Type 1, 2, 3).",
    accentColor: "rose",
    topics: [
      {
        title: "1. Present Tense for Future in Time Clauses",
        formula: "Time Conjunction (when, as soon as, before, after, until) + Simple Present (V1) [DILARANG 'will']",
        usage: "Meskipun peristiwa terjadi di masa depan, anak kalimat waktu TIDAK boleh menggunakan kata bantu 'will'.",
        tips: "As soon as the war horn sounds (bukan will sound), the army will march.",
        examplePattern: "Pattern: As soon as + S + V1, S + will + V1"
      },
      {
        title: "2. Conditionals Type 1 & Type 2",
        formula: "Type 1 (Nyata di masa depan): If + V1, will + V1 | Type 2 (Pengandaian masa kini): If + V2 / were, would + V1",
        usage: "Type 1 menyatakan kemungkinan realistis; Type 2 menyatakan hal bertolak belakang dengan fakta saat ini.",
        tips: "Pada Type 2, gunakan 'were' untuk semua subjek (I, he, she, it): 'If the hero were immortal...'.",
        examplePattern: "Pattern: If + S + were ..., S + would + Bare Verb"
      },
      {
        title: "3. Conditional Type 3 (Past Unreal)",
        formula: "If + had + Verb 3 (Past Participle), Subject + would have + Verb 3",
        usage: "Menyatakan pengandaian tentang masa lampau yang tidak mungkin terwujud lagi (penyesalan).",
        tips: "If the mage had cast the spell earlier, we would have won the skirmish.",
        examplePattern: "Pattern: If + S + had + V3, S + would have + V3"
      },
      {
        title: "4. Unless (= If Not)",
        formula: "Unless + Afirmatif (Positif) [HINDARI kata negatif ganda 'do not / won't']",
        usage: "'Unless' sudah berarti 'kecuali jika' atau 'jika tidak'.",
        tips: "Unless you possess the key, the gate remains closed (bukan unless you don't possess).",
        examplePattern: "Pattern: Unless + Subject + Verb (Positif) ..."
      }
    ]
  },

  // Sektor 4: Adverbial Clauses of Cause, Purpose & Contrast
  3: {
    sectorTitle: "Stage 3 • Sektor 4: Cause, Purpose & Concession Clauses",
    monsterName: "Contrast & Cause Chimera",
    theme: "Logical Connectors of Purpose, Reason & Concession",
    description: "Pedoman klausa konsesi (Although vs Despite), tujuan (So that vs In order to), dan kausalitas (Because vs Because of).",
    accentColor: "purple",
    topics: [
      {
        title: "1. Although vs Despite / In Spite Of",
        formula: "Although / Even Though + Full Clause (S + V) | Despite / In Spite Of + Noun Phrase / Gerund (V-ing)",
        usage: "Keduanya menyatakan pertentangan (konsesi), namun struktur setelahnya berbeda.",
        tips: "'Although it was stormy' (klausa) vs 'Despite the storm' (frasa kata benda).",
        examplePattern: "Pattern: Although + S + V vs Despite + Noun Phrase"
      },
      {
        title: "2. Purpose Clauses: So That / In Order That",
        formula: "So that / In order that + Subject + Modal (can / could / may / might) + Verb 1",
        usage: "Menjelaskan maksud atau tujuan dilakukannya aksi pada klausa utama.",
        tips: "Gunakan modal lampau 'could' jika kalimat utama lampau: 'He drank a potion so that he could sneak in'.",
        examplePattern: "Pattern: Main Clause + so that + S + could + V1"
      },
      {
        title: "3. Because vs Because Of / Due To",
        formula: "Because / Since / As + Full Clause (S + V) | Because of / Due to + Noun Phrase",
        usage: "'The bridge collapsed because the flood was strong' vs 'because of the strong flood'.",
        tips: "Jika ada subjek dan kata kerja berkonjugasi, gunakan 'because', bukan 'because of'.",
        examplePattern: "Pattern: S + V + because + [S + V]"
      },
      {
        title: "4. Contrast: Whereas & While",
        formula: "Clause A, whereas Clause B (Perbandingan kontras dua fakta sejajar)",
        usage: "'The cleric prefers healing magic, whereas the sorcerer prefers destructive spells.'",
        tips: "Gunakan tanda koma sebelum 'whereas' saat menghubungkan dua perbandingan kontras.",
        examplePattern: "Pattern: [Fact A], whereas [Fact B]"
      }
    ]
  },

  // Sektor 5: Advanced & Reduced Clauses, Inversion & Syntactic Cohesion
  4: {
    sectorTitle: "Stage 3 • Sektor 5: Syntactic Supremacy & Clause Architecture",
    monsterName: "The Arch-Clause Nexus Overlord",
    theme: "Reduced Participial Clauses & Conditional/Negative Inversion",
    description: "Ujian tertinggi sintaksis bahasa Inggris: mereduksi klausa adjektiva menjadi partisip, menghindari dangling modifiers, dan inversi kalimat bersyarat.",
    accentColor: "amber",
    topics: [
      {
        title: "1. Reduced Relative Clauses (Active vs Passive)",
        formula: "Aktif: Hilangkan who/which + be -> V-ing | Pasif: Hilangkan who/which + be -> V3 murni",
        usage: "'The knights who guard the gate' -> 'The knights guarding the gate'; 'The blade that was forged' -> 'The blade forged'.",
        tips: "Pastikan bentuk aktif menggunakan -ing dan pasif menggunakan bentuk ketiga (Past Participle).",
        examplePattern: "Pattern: Noun + [V-ing Phrase] (Aktif) / Noun + [V3 Phrase] (Pasif)"
      },
      {
        title: "2. Conditional Inversion (Tanpa 'If')",
        formula: "Type 1: Should + S + V1 | Type 2: Were + S + to + V1 / Were + S + Adj | Type 3: Had + S + V3",
        usage: "Bentuk inversi sastra formal tingkat tinggi dengan menghilangkan kata 'If'.",
        tips: "'Had the commander sounded the horn' = 'If the commander had sounded the horn'.",
        examplePattern: "Pattern: Had + S + V3, S + would have + V3"
      },
      {
        title: "3. Negative Adverbial Inversion",
        formula: "Not until / Rarely / Seldom / Never + Auxiliary (did/had) + Subject + Bare Verb",
        usage: "Ketika kalimat diawali ekspresi negatif pembatas, subjek dan kata bantu pada klausa utama wajib dibalik.",
        tips: "Not until the sun rose did the shadows disperse (bukan the shadows dispersed).",
        examplePattern: "Pattern: Not until ... + [did + S + V1]"
      },
      {
        title: "4. Dangling Modifiers Prevention",
        formula: "Subjek pada frasa partisip pembuka WAJIB identik dengan subjek yang berada tepat setelah tanda koma",
        usage: "'While walking in the forest, the knight was struck by a branch' (BENAR); 'While walking in the forest, a branch struck the knight' (SALAH - ranting pohon tidak bisa berjalan!).",
        tips: "Selalu tanyakan: 'Siapa yang melakukan tindakan pada frasa pembuka?'. Letakkan nama orang tersebut persis setelah koma.",
        examplePattern: "Pattern: [While V-ing ...], [Logical Actor] + Verb ..."
      }
    ]
  }
};
