import { SectorCodex } from './codexData';

export const STAGE_1_CODEX_DATA: Record<number, SectorCodex> = {
  // Sektor 1: Nouns & Pronouns
  0: {
    sectorTitle: "Stage 1 • Sektor 1: Nouns & Pronouns",
    monsterName: "Noun & Pronoun Goblin",
    theme: "Mastery of Nouns & Pronoun Cases",
    description: "Pedoman kaidah kata benda (Countable, Uncountable, Irregular Plurals) dan kata ganti (Subject, Object, Possessive, Reflexive).",
    accentColor: "emerald",
    topics: [
      {
        title: "1. Countable vs Uncountable Nouns",
        formula: "Countable: a/an + Noun / Noun-s (many, few) | Uncountable: Much / Little / Piece of",
        usage: "Kata benda tak dapat dihitung (information, advice, equipment, furniture, luggage) tidak boleh diberi akhiran -s atau artikel 'a/an'.",
        timeSignals: ["Much information", "A piece of advice", "Many items", "Few warriors"],
        tips: "Jangan pernah menulis 'informations' atau 'advices'. Gunakan 'much information' atau 'pieces of information'.",
        examplePattern: "Pattern: We need [much / a lot of] information before the quest."
      },
      {
        title: "2. Irregular Plural Nouns",
        formula: "Bentuk jamak berubah huruf vokal atau bentuk kata khusus (tanpa -s biasa)",
        usage: "Menyatakan jumlah jamak untuk kata benda tidak beraturan.",
        timeSignals: ["child -> children", "person -> people", "tooth -> teeth", "criterion -> criteria"],
        tips: "Waspadai kata serapan ilmiah: criterion (tunggal) -> criteria (jamak); phenomenon -> phenomena; datum -> data.",
        examplePattern: "Pattern: Three children [bukan childs] entered the dungeon."
      },
      {
        title: "3. Subject vs Object vs Possessive Pronouns",
        formula: "Subject: I, He, She, They | Object: Me, Him, Her, Them | Possessive: Mine, His, Hers, Theirs",
        usage: "Gunakan Object Pronoun setelah preposisi (between you and me; to him and me). Gunakan Possessive Pronoun jika berdiri tanpa kata benda.",
        tips: "Ingat: 'Its' (tanpa apostrof) = kepemilikan benda/hewan; 'It's' (dengan apostrof) = singkatan 'it is' / 'it has'.",
        examplePattern: "Pattern: The king gave the reward to [him and me]."
      },
      {
        title: "4. Reflexive Pronouns",
        formula: "Myself, Yourself, Himself, Herself, Itself, Ourselves, Themselves",
        usage: "Digunakan ketika subjek dan objek adalah orang yang sama, atau untuk penekanan (intensifying).",
        tips: "Kata 'hisself' atau 'theirselves' tidak ada dalam bahasa Inggris baku; gunakan 'himself' dan 'themselves'.",
        examplePattern: "Pattern: Subject + Verb + [Himself / Herself / Themselves]"
      }
    ]
  },

  // Sektor 2: Verbs (Action, Stative, Transitive, Modals)
  1: {
    sectorTitle: "Stage 1 • Sektor 2: Verbs & Modals",
    monsterName: "Action Verb Troll",
    theme: "Dynamic vs Stative Verbs & Modal Auxiliaries",
    description: "Pedoman kata kerja dinamis vs statif, kata kerja transitif/intransitif (Lie vs Lay), modal auxiliaries, dan pola gerund/to-infinitive.",
    accentColor: "cyan",
    topics: [
      {
        title: "1. Action Verbs vs Stative Verbs",
        formula: "Stative: S + Verb 1 (Simple Form) [HINDARI akhiran -ing continuous]",
        usage: "Stative verbs menyatakan keadaan, pikiran, emosi, kepemilikan, atau persepsi (know, believe, understand, belong, hear, love).",
        tips: "Gunakan 'I know the answer', BUKAN 'I am knowing the answer'.",
        examplePattern: "Pattern: I [understand / believe / know] the secret formula."
      },
      {
        title: "2. Transitive vs Intransitive (Lie vs Lay)",
        formula: "Lie (intransitif: berbaring): lie - lay - lain | Lay (transitif: menaruh + objek): lay - laid - laid",
        usage: "'Lie' tidak membutuhkan objek langsung; 'Lay' wajib diikuti objek penderita yang diletakkan.",
        tips: "'The warrior lay on the grass' (berbaring, lampau); 'The knight laid his sword on the altar' (menaruh pedang, lampau).",
        examplePattern: "Pattern: Subject + lay [berbaring] vs Subject + laid + [Object]"
      },
      {
        title: "3. Modal Auxiliaries & Past Modals",
        formula: "Present Modal: Modal + Verb 1 Bare | Past Modal (Penyesalan): Modal + have + Verb 3",
        usage: "Modal (can, could, must, should, will, might) selalu diikuti Bare Infinitive tanpa 'to' atau '-s'.",
        tips: "Untuk penyesalan masa lalu: 'should have + V3' (seharusnya sudah). Setelah modal 'should/could', selalu gunakan 'have', tidak pernah 'had' atau 'has'.",
        examplePattern: "Pattern: S + should have + V3 (He should have warned us)."
      },
      {
        title: "4. Gerund vs To-Infinitive Patterns",
        formula: "Verb + Gerund (V-ing) vs Verb + To-Infinitive (to + V1)",
        usage: "Kata kerja tertentu mewajibkan gerund (enjoy, avoid, admit, mind, practice) sedangkan yang lain mewajibkan infinitive (decide, hope, plan, promise, agree).",
        tips: "'Enjoy doing' (bukan enjoy to do); 'Decide to do' (bukan decide doing).",
        examplePattern: "Pattern: enjoy + V-ing | decide + to + V1"
      }
    ]
  },

  // Sektor 3: Adjectives & Adverbs
  2: {
    sectorTitle: "Stage 1 • Sektor 3: Adjectives & Adverbs",
    monsterName: "Modifier Dragon",
    theme: "Descriptive Hierarchy & Modifying Precision",
    description: "Pedoman perbedaan kata sifat vs kata keterangan, aturan urutan kata sifat (Royal Order), dan perbandingan komparatif/superlatif.",
    accentColor: "rose",
    topics: [
      {
        title: "1. Adjective vs Adverb of Manner",
        formula: "Adjective: Menerangkan Noun | Adverb of Manner (-ly): Menerangkan Verb / Adjective / Adverb lain",
        usage: "Gunakan adjective setelah linking verbs (feel, look, smell, taste, seem) dan adverb untuk kata kerja aksi.",
        tips: "The knight is swift (Adj). The knight charges swiftly (Adv). Jangan gunakan 'good' untuk menerangkan kata kerja tindakan; gunakan 'well' ('fought well').",
        examplePattern: "Pattern: Verb + Adverb(-ly) vs Linking Verb + Adjective"
      },
      {
        title: "2. Royal Order of Adjectives",
        formula: "Opinion -> Size -> Physical Quality -> Shape -> Age -> Color -> Origin -> Material -> Purpose + Noun",
        usage: "Ketika menggunakan lebih dari satu kata sifat sebelum kata benda, ikuti urutan standar ini.",
        tips: "Contoh: 'A beautiful (Opinion) ancient (Age) wooden (Material) relic'.",
        examplePattern: "Pattern: [Opinion] + [Age] + [Material] + Noun"
      },
      {
        title: "3. Comparative of Two Items",
        formula: "Dua Benda: The + Comparative (-er / more) | Tiga Benda+: The + Superlative (-est / most)",
        usage: "Jika membandingkan tepat 2 benda ('of the two swords'), gunakan bentuk komparatif.",
        tips: "Tulis 'Of the two blades, this is the sharper' (BUKAN the sharpest).",
        examplePattern: "Pattern: Of the two [items], A is the [comparative]."
      },
      {
        title: "4. Participle Adjectives: -ed vs -ing",
        formula: "-ed: Menerangkan perasaan/kondisi yang dialami seseorang | -ing: Menerangkan sifat penyebab",
        usage: "'The apprentice was bored' (merasa bosan); 'The lecture was boring' (menyebabkan kebosanan).",
        tips: "Jangan katakan 'I am very boring' kecuali bermaksud menyatakan diri Anda orang yang membosankan!",
        examplePattern: "Pattern: Person + feel + [bored / interested / excited]"
      }
    ]
  },

  // Sektor 4: Prepositions & Articles
  3: {
    sectorTitle: "Stage 1 • Sektor 4: Prepositions & Articles",
    monsterName: "Preposition Chimera",
    theme: "Spatial, Temporal & Article Precision",
    description: "Pedoman preposisi waktu (At, On, In), gerak (In vs Into), kelompok (Between vs Among), serta artikel A, An, The.",
    accentColor: "purple",
    topics: [
      {
        title: "1. Prepositions of Time (At / On / In)",
        formula: "AT: Jam & Titik waktu spesifik | ON: Hari & Tanggal | IN: Bulan, Tahun, Abad, Musim",
        usage: "At 5 PM, at midnight, at dawn; On Monday, on July 4th; In July, in 2024, in the winter.",
        tips: "Jika ada kata 'next', 'last', 'every', 'this', JANGAN tambahkan preposisi ('next Friday', bukan 'on next Friday').",
        examplePattern: "Pattern: at + [clock time] | on + [day/date] | in + [month/year]"
      },
      {
        title: "2. In vs Into (Position vs Movement)",
        formula: "IN: Posisi diam di dalam | INTO: Gerakan perpindahan dari luar masuk ke dalam",
        usage: "'The fish swims in the pond' (posisi); 'The frog jumped into the pond' (gerak masuk).",
        tips: "Kata kerja gerak aktif (jump, dive, step, fall) berpasangan dengan 'into'.",
        examplePattern: "Pattern: Verb of Motion + into + [Container / Place]"
      },
      {
        title: "3. Between vs Among",
        formula: "Between: 2 pihak / entitas terpisah | Among: 3 orang/benda atau lebih dalam satu kelompok",
        usage: "Divided between the two warriors; Divided among the guild members.",
        tips: "Gunakan 'among' untuk perkumpulan kelompok besar tanpa batas individu yang kaku.",
        examplePattern: "Pattern: between [A and B] vs among [the members]"
      },
      {
        title: "4. Indefinite Articles: A vs An",
        formula: "A + Bunyi Konsonan | AN + Bunyi Vokal (/a/, /i/, /u/, /e/, /o/)",
        usage: "Berdasarkan BUNYI lafal awal kata, bukan semata huruf tertulis.",
        tips: "'An honest knight' (huruf h bisu, berbunyi vokal /ɒ/); 'A European kingdom' (berbunyi konsonan /j/).",
        examplePattern: "Pattern: an + [vowel sound] vs a + [consonant sound]"
      }
    ]
  },

  // Sektor 5: Conjunctions, Interjections & Full Part-of-Speech Mastery
  4: {
    sectorTitle: "Stage 1 • Sektor 5: Lexical Syntactic Harmony",
    monsterName: "The Lexical Part-of-Speech Overlord",
    theme: "Mastery of All 8 Parts of Speech in Sentence Context",
    description: "Ujian pamungkas Stage 1: mengenali kelas kata kontekstual, kata seru (Interjections), konjungsi subordinatif/koordinatif, dan kalimat setara.",
    accentColor: "amber",
    topics: [
      {
        title: "1. The 8 Word Classes (Parts of Speech)",
        formula: "Noun (benda), Pronoun (ganti), Verb (kerja), Adjective (sifat), Adverb (keterangan), Preposition (depan), Conjunction (hubung), Interjection (seru)",
        usage: "Satu kata yang sama bisa memiliki kelas kata berbeda tergantung posisinya di dalam kalimat.",
        tips: "'The fast runner' (fast = Adjective); 'The runner runs fast' (fast = Adverb of manner).",
        examplePattern: "Pattern: Analisis fungsi kata terhadap kata lain di sekitarnya."
      },
      {
        title: "2. Prepositions vs Adverbs (Same Words)",
        formula: "Preposition: Wajib diikuti Noun Object | Adverb: Berdiri sendiri menerangkan arah/tindakan",
        usage: "'He fell down the stairs' (down = Preposition karena diikuti 'the stairs'); 'He fell down' (down = Adverb).",
        tips: "Periksa apakah ada kata benda objek tepat setelah kata tersebut.",
        examplePattern: "Pattern: Word + Noun Object = Preposition | Word alone = Adverb"
      },
      {
        title: "3. Interjections & Emotional Expressions",
        formula: "Interjection + tanda seru (!) atau tanda koma (,)",
        usage: "Kata seru pendek tanpa hubungan gramatikal langsung dengan kalimat utama untuk meluapkan emosi mendalam.",
        tips: "Contoh: 'Alas!' (duka cita mendalam), 'Ouch!' (rasa sakit tiba-tiba), 'Bravo!' (pujian).",
        examplePattern: "Pattern: [Interjection!] + [Full Sentence]"
      },
      {
        title: "4. Correlative Conjunctions Pairs",
        formula: "Neither ... nor | Either ... or | Both ... and | Not only ... but also",
        usage: "Pasangan konjungsi yang menghubungkan dua elemen dengan struktur gramatikal yang setara (paralel).",
        tips: "Jangan pernah memasangkan 'Neither' dengan 'or' (wajib 'Neither ... nor').",
        examplePattern: "Pattern: Neither [Noun A] nor [Noun B] + Verb"
      }
    ]
  }
};
