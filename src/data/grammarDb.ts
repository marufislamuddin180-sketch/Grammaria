import { GrammarQuestion } from '../types/game';
import { STAGE_1_GRAMMAR_DB } from './grammarDbStage1';
import { STAGE_3_GRAMMAR_DB } from './grammarDbStage3';

// Re-export individual stage databases
export { STAGE_1_GRAMMAR_DB } from './grammarDbStage1';
export { STAGE_3_GRAMMAR_DB } from './grammarDbStage3';

// Stage 2 (Wilayah 1-5): 16 English Tenses across Sectors 1-4, and Conjunctions for the Final Boss Sector 5
export const STAGE_2_GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  // =========================================================================
  // SEKTOR 1 (WILAYAH 1): 4 PRESENT TENSES
  // 1. Simple Present | 2. Present Continuous | 3. Present Perfect | 4. Present Perfect Continuous
  // =========================================================================
  0: [
    {
      id: 'sec1_q1',
      monster_text: "Every dawn, the castle sentry sleep at his post!",
      question: "Perbaiki Simple Present Tense untuk subjek tunggal orang ketiga (Habitual Action):",
      options: [
        "Every dawn, the castle sentry sleeps at his post.",
        "Every dawn, the castle sentry is sleeping at his post.",
        "Every dawn, the castle sentry slept at his post."
      ],
      correct: 0,
      explanation: "Simple Present Tense (S + V1-s/es) digunakan untuk rutinitas/fakta. Subjek tunggal 'the castle sentry' membutuhkan kata kerja berakhiran -s ('sleeps').",
      category: "1. Simple Present Tense",
      regionIndex: 0
    },
    {
      id: 'sec1_q2',
      monster_text: "She do not knows the sacred formula to awaken the holy sword.",
      question: "Perbaiki bentuk negatif Simple Present Tense (Auxiliary + Bare Verb):",
      options: [
        "She does not know the sacred formula to awaken the holy sword.",
        "She does not knows the sacred formula to awaken the holy sword.",
        "She do not know the sacred formula to awaken the holy sword."
      ],
      correct: 0,
      explanation: "Rumus negatif Simple Present: S + does not + Verb 1 murni (Bare Infinitive). Gunakan 'does not know', bukan 'knows'.",
      category: "1. Simple Present (Negative)",
      regionIndex: 0
    },
    {
      id: 'sec1_q3',
      monster_text: "Look! The fiery goblin is attack our supply wagon right now!",
      question: "Perbaiki Present Continuous Tense untuk aksi yang sedang berlangsung saat ini:",
      options: [
        "Look! The fiery goblin is attacking our supply wagon right now!",
        "Look! The fiery goblin attacks our supply wagon right now!",
        "Look! The fiery goblin is attacked our supply wagon right now!"
      ],
      correct: 0,
      explanation: "Kata penanda 'Look!' dan 'right now' menandakan aksi sedang berlangsung. Rumus Present Continuous: S + is/am/are + V-ing ('is attacking').",
      category: "2. Present Continuous Tense",
      regionIndex: 0
    },
    {
      id: 'sec1_q4',
      monster_text: "The brave paladins has already cleared the outer dungeon perimeter.",
      question: "Perbaiki Present Perfect Tense (Kesesuaian Subjek Jamak 'Paladins'):",
      options: [
        "The brave paladins have already cleared the outer dungeon perimeter.",
        "The brave paladins has already clear the outer dungeon perimeter.",
        "The brave paladins have already clear the outer dungeon perimeter."
      ],
      correct: 0,
      explanation: "Rumus Present Perfect: S + have/has + Past Participle (V3). Subjek jamak 'paladins' menggunakan 'have', bukan 'has'.",
      category: "3. Present Perfect Tense",
      regionIndex: 0
    },
    {
      id: 'sec1_q5',
      monster_text: "Our elven scholar is translating this ancient runic scroll for three straight hours.",
      question: "Perbaiki Present Perfect Continuous Tense untuk durasi aksi yang masih berlanjut:",
      options: [
        "Our elven scholar has been translating this ancient runic scroll for three straight hours.",
        "Our elven scholar was translating this ancient runic scroll for three straight hours.",
        "Our elven scholar has translated this ancient runic scroll since three straight hours."
      ],
      correct: 0,
      explanation: "Untuk kegiatan yang dimulai di masa lampau dan masih berlanjut hingga detik ini dengan keterangan durasi 'for three straight hours', gunakan Present Perfect Continuous: S + have/has + been + V-ing ('has been translating').",
      category: "4. Present Perfect Continuous",
      regionIndex: 0
    },
    {
      id: 'sec1_q6',
      monster_text: "They have been lived in the sanctuary since the war started.",
      question: "Pilih rumus Present Perfect Continuous yang tepat (been + V-ing):",
      options: [
        "They have been living in the sanctuary since the war started.",
        "They have lived in the sanctuary for the war started.",
        "They are living in the sanctuary since the war started."
      ],
      correct: 0,
      explanation: "Rumus Present Perfect Continuous adalah have/has + been + V-ing ('have been living'). Penanda titik awal waktu lampau menggunakan 'since'.",
      category: "4. Present Perfect Continuous",
      regionIndex: 0
    }
  ],

  // =========================================================================
  // SEKTOR 2 (WILAYAH 2): 4 PAST TENSES
  // 5. Simple Past | 6. Past Continuous | 7. Past Perfect | 8. Past Perfect Continuous
  // =========================================================================
  1: [
    {
      id: 'sec2_q1',
      monster_text: "Yesterday, the mountain troll stealed the royal crystal from the caravan.",
      question: "Perbaiki bentuk kata kerja lampau tak beraturan (Irregular Simple Past):",
      options: [
        "Yesterday, the mountain troll stole the royal crystal from the caravan.",
        "Yesterday, the mountain troll stolen the royal crystal from the caravan.",
        "Yesterday, the mountain troll was stealed the royal crystal from the caravan."
      ],
      correct: 0,
      explanation: "Simple Past Tense (S + V2) dari kata kerja tidak beraturan 'steal' adalah 'stole' (steal - stole - stolen), bukan 'stealed'.",
      category: "5. Simple Past Tense",
      regionIndex: 1
    },
    {
      id: 'sec2_q2',
      monster_text: "The royal vanguard did not retreated despite the troll's thunderous roar.",
      question: "Perbaiki kalimat negatif Simple Past (did not + Verb 1):",
      options: [
        "The royal vanguard did not retreat despite the troll's thunderous roar.",
        "The royal vanguard did not retreats despite the troll's thunderous roar.",
        "The royal vanguard was not retreated despite the troll's thunderous roar."
      ],
      correct: 0,
      explanation: "Setelah auxiliary lampau 'did not', kata kerja harus kembali ke bentuk Verb 1 murni (Bare Infinitive): 'did not retreat'.",
      category: "5. Simple Past (Negative)",
      regionIndex: 1
    },
    {
      id: 'sec2_q3',
      monster_text: "While the troll was slept soundly, the stealthy rogue took back the stolen banner.",
      question: "Perbaiki Past Continuous Tense untuk aksi yang sedang berlangsung di masa lampau:",
      options: [
        "While the troll was sleeping soundly, the stealthy rogue took back the stolen banner.",
        "While the troll is sleeping soundly, the stealthy rogue took back the stolen banner.",
        "While the troll were sleeping soundly, the stealthy rogue took back the stolen banner."
      ],
      correct: 0,
      explanation: "Rumus Past Continuous Tense: S + was/were + V-ing ('was sleeping'). Subjek tunggal 'the troll' berpasangan dengan 'was'.",
      category: "6. Past Continuous Tense",
      regionIndex: 1
    },
    {
      id: 'sec2_q4',
      monster_text: "By the time our reinforcements arrived, the troll already demolished the stone bridge.",
      question: "Perbaiki Past Perfect Tense untuk kejadian yang sudah tuntas sebelum peristiwa lampau lain:",
      options: [
        "By the time our reinforcements arrived, the troll had already demolished the stone bridge.",
        "By the time our reinforcements arrived, the troll has already demolished the stone bridge.",
        "By the time our reinforcements had arrived, the troll already demolished the stone bridge."
      ],
      correct: 0,
      explanation: "Past Perfect Tense (S + had + V3) digunakan untuk aksi yang terjadi lebih dahulu sebelum kejadian lampau lainnya ('arrived'). Maka gunakan 'had already demolished'.",
      category: "7. Past Perfect Tense",
      regionIndex: 1
    },
    {
      id: 'sec2_q5',
      monster_text: "The troll had been terrorize the mountain pass for twenty years before we arrived.",
      question: "Perbaiki bentuk Past Perfect Continuous Tense (had been + V-ing):",
      options: [
        "The troll had been terrorizing the mountain pass for twenty years before we arrived.",
        "The troll has been terrorizing the mountain pass for twenty years before we arrived.",
        "The troll was terrorizing the mountain pass for twenty years before we arrived."
      ],
      correct: 0,
      explanation: "Past Perfect Continuous Tense (S + had + been + V-ing) menekankan durasi aksi berkelanjutan di masa lampau sebelum disusul peristiwa lampau lain ('before we arrived').",
      category: "8. Past Perfect Continuous",
      regionIndex: 1
    },
    {
      id: 'sec2_q6',
      monster_text: "We were exhausted because we had been marched through the swamp all night.",
      question: "Perbaiki bentuk kata kerja Past Perfect Continuous (had been marching):",
      options: [
        "We were exhausted because we had been marching through the swamp all night.",
        "We were exhausted because we have been marching through the swamp all night.",
        "We were exhausted because we were marched through the swamp all night."
      ],
      correct: 0,
      explanation: "Aksi lampau yang berlangsung terus-menerus dan menyebabkan dampak di masa lampau ('were exhausted') dinyatakan dengan Past Perfect Continuous: had + been + V-ing ('had been marching').",
      category: "8. Past Perfect Continuous",
      regionIndex: 1
    }
  ],

  // =========================================================================
  // SEKTOR 3 (WILAYAH 3): 4 FUTURE TENSES
  // 9. Simple Future | 10. Future Continuous | 11. Future Perfect | 12. Future Perfect Continuous
  // =========================================================================
  2: [
    {
      id: 'sec3_q1',
      monster_text: "Tomorrow morning, the dragon will scorched the entire valley!",
      question: "Perbaiki Simple Future Tense (Modal 'will' + Bare Infinitive):",
      options: [
        "Tomorrow morning, the dragon will scorch the entire valley!",
        "Tomorrow morning, the dragon will scorches the entire valley!",
        "Tomorrow morning, the dragon will scorching the entire valley!"
      ],
      correct: 0,
      explanation: "Rumus Simple Future: S + will + Verb 1 murni (Bare Infinitive). Setelah modal 'will', jangan tambahkan akhiran -ed atau -s ('will scorch').",
      category: "9. Simple Future Tense",
      regionIndex: 2
    },
    {
      id: 'sec3_q2',
      monster_text: "Look at those crackling lightning clouds! The storm will strike us in minutes.",
      question: "Pilih bentuk Future berbasis bukti langsung saat ini ('be going to'):",
      options: [
        "Look at those crackling lightning clouds! The storm is going to strike us in minutes.",
        "Look at those crackling lightning clouds! The storm strikes us in minutes.",
        "Look at those crackling lightning clouds! The storm will be strike us in minutes."
      ],
      correct: 0,
      explanation: "Ketika ada bukti nyata di depan mata saat ini ('Look at those clouds'), 'be going to' lebih tepat digunakan untuk prediksi masa depan yang sudah pasti terjadi dalam waktu dekat.",
      category: "9. Simple Future (be going to)",
      regionIndex: 2
    },
    {
      id: 'sec3_q3',
      monster_text: "At this exact hour tomorrow, our warriors will soaring above the dragon's lair.",
      question: "Perbaiki Future Continuous Tense (will be + V-ing) untuk aksi yang sedang berlangsung di masa depan:",
      options: [
        "At this exact hour tomorrow, our warriors will be soaring above the dragon's lair.",
        "At this exact hour tomorrow, our warriors will soar above the dragon's lair.",
        "At this exact hour tomorrow, our warriors will been soaring above the dragon's lair."
      ],
      correct: 0,
      explanation: "Rumus Future Continuous Tense: S + will + be + V-ing ('will be soaring'). Digunakan untuk menyatakan aksi yang sedang dalam proses pada titik waktu spesifik di masa depan.",
      category: "10. Future Continuous Tense",
      regionIndex: 2
    },
    {
      id: 'sec3_q4',
      monster_text: "By sunset tomorrow, the mages will completed the defensive barrier.",
      question: "Perbaiki Future Perfect Tense (will have + V3) untuk target selesai sebelum tenggat waktu:",
      options: [
        "By sunset tomorrow, the mages will have completed the defensive barrier.",
        "By sunset tomorrow, the mages will had completed the defensive barrier.",
        "By sunset tomorrow, the mages will be completed the defensive barrier."
      ],
      correct: 0,
      explanation: "Rumus Future Perfect Tense: S + will + have + Past Participle (V3). Keterangan waktu diawali 'By + waktu masa depan' menandakan aksi sudah selesai sebelum waktu tersebut tercapai.",
      category: "11. Future Perfect Tense",
      regionIndex: 2
    },
    {
      id: 'sec3_q5',
      monster_text: "By midnight, the dragon will have been fly across the sky for twelve hours straight.",
      question: "Perbaiki Future Perfect Continuous Tense (will have been + V-ing):",
      options: [
        "By midnight, the dragon will have been flying across the sky for twelve hours straight.",
        "By midnight, the dragon will have flying across the sky for twelve hours straight.",
        "By midnight, the dragon will be flying across the sky since twelve hours straight."
      ],
      correct: 0,
      explanation: "Rumus Future Perfect Continuous Tense: S + will + have + been + V-ing ('will have been flying'). Digunakan untuk mengukur durasi aksi yang terus berjalan hingga titik waktu tertentu di masa depan.",
      category: "12. Future Perfect Continuous",
      regionIndex: 2
    },
    {
      id: 'sec3_q6',
      monster_text: "By next year, the grand temple will have been stand atop the peak for a millennium.",
      question: "Pilih bentuk kata kerja Future Perfect Continuous yang benar:",
      options: [
        "By next year, the grand temple will have been standing atop the peak for a millennium.",
        "By next year, the grand temple will has been standing atop the peak for a millennium.",
        "By next year, the grand temple will have been stood atop the peak for a millennium."
      ],
      correct: 0,
      explanation: "Rumus: will + have (selalu 'have', bukan 'has') + been + V-ing ('standing').",
      category: "12. Future Perfect Continuous",
      regionIndex: 2
    }
  ],

  // =========================================================================
  // SEKTOR 4 (WILAYAH 4): 4 PAST FUTURE TENSES
  // 13. Simple Past Future | 14. Past Future Continuous | 15. Past Future Perfect | 16. Past Future Perfect Continuous
  // =========================================================================
  3: [
    {
      id: 'sec4_q1',
      monster_text: "The High Oracle promised that the chosen hero will liberate the kingdom.",
      question: "Perbaiki Simple Past Future Tense dalam kalimat tak langsung (Indirect/Reported Speech):",
      options: [
        "The High Oracle promised that the chosen hero would liberate the kingdom.",
        "The High Oracle promised that the chosen hero would liberated the kingdom.",
        "The High Oracle promised that the chosen hero will be liberated the kingdom."
      ],
      correct: 0,
      explanation: "Bila klausa utama bernilai lampau ('promised'), maka 'will' berubah menjadi Past Future 'would' + Verb 1 murni ('would liberate').",
      category: "13. Simple Past Future",
      regionIndex: 3
    },
    {
      id: 'sec4_q2',
      monster_text: "If I possessed the legendary sword, I will slay the chimera easily.",
      question: "Perbaiki klausa akibat Second Conditional (Past Simple -> Past Future 'would'):",
      options: [
        "If I possessed the legendary sword, I would slay the chimera easily.",
        "If I possessed the legendary sword, I would have slayed the chimera easily.",
        "If I possessed the legendary sword, I will be slaying the chimera easily."
      ],
      correct: 0,
      explanation: "Second Conditional (pengandaian masa kini yang mustahil/berlawanan): If + Simple Past (possessed), S + would + Verb 1 ('would slay').",
      category: "13. Simple Past Future (Conditional 2)",
      regionIndex: 3
    },
    {
      id: 'sec4_q3',
      monster_text: "The knight knew that at noon yesterday he will be battling the chimera's three heads.",
      question: "Perbaiki Past Future Continuous Tense (would be + V-ing) dari sudut pandang masa lalu:",
      options: [
        "The knight knew that at noon yesterday he would be battling the chimera's three heads.",
        "The knight knew that at noon yesterday he would battled the chimera's three heads.",
        "The knight knew that at noon yesterday he will be battling the chimera's three heads."
      ],
      correct: 0,
      explanation: "Rumus Past Future Continuous: S + would + be + V-ing ('would be battling'). Menyatakan aksi yang direncanakan sedang berlangsung di masa lampau.",
      category: "14. Past Future Continuous",
      regionIndex: 3
    },
    {
      id: 'sec4_q4',
      monster_text: "If the scouts had warned us earlier, our fortress will have defended against the ambush.",
      question: "Perbaiki Past Future Perfect Tense (Third Conditional):",
      options: [
        "If the scouts had warned us earlier, our fortress would have defended against the ambush.",
        "If the scouts had warned us earlier, our fortress would defended against the ambush.",
        "If the scouts had warned us earlier, our fortress will defend against the ambush."
      ],
      correct: 0,
      explanation: "Third Conditional (penyesalan masa lampau): If + Past Perfect (had warned), S + would have + V3 ('would have defended').",
      category: "15. Past Future Perfect",
      regionIndex: 3
    },
    {
      id: 'sec4_q5',
      monster_text: "By dusk yesterday, the paladins would have been fight for eight hours if reinforcements hadn't arrived.",
      question: "Perbaiki Past Future Perfect Continuous Tense (would have been + V-ing):",
      options: [
        "By dusk yesterday, the paladins would have been fighting for eight hours if reinforcements hadn't arrived.",
        "By dusk yesterday, the paladins would have fought for eight hours if reinforcements hadn't arrived.",
        "By dusk yesterday, the paladins will have been fighting for eight hours if reinforcements hadn't arrived."
      ],
      correct: 0,
      explanation: "Rumus Past Future Perfect Continuous: S + would + have + been + V-ing ('would have been fighting'). Menyatakan durasi hipotesis yang seharusnya telah berlangsung di masa lampau.",
      category: "16. Past Future Perfect Continuous",
      regionIndex: 3
    },
    {
      id: 'sec4_q6',
      monster_text: "She told me that by the end of that day, she would had been meditating for ten hours.",
      question: "Perbaiki bentuk auxiliary Past Future Perfect Continuous (would have been):",
      options: [
        "She told me that by the end of that day, she would have been meditating for ten hours.",
        "She told me that by the end of that day, she would has been meditating for ten hours.",
        "She told me that by the end of that day, she will have been meditating for ten hours."
      ],
      correct: 0,
      explanation: "Setelah modal 'would', selalu gunakan 'have' murni, bukan 'had' atau 'has': 'would have been meditating'.",
      category: "16. Past Future Perfect Continuous",
      regionIndex: 3
    }
  ],

  // =========================================================================
  // SEKTOR 5 (WILAYAH 5 - FINAL BOSS): CONJUNCTIONS (KATA HUBUNG)
  // Coordinating (FANBOYS) | Subordinating | Correlative | Conjunctive Adverbs
  // =========================================================================
  4: [
    {
      id: 'sec5_q1',
      monster_text: "The Conjunction Overlord unleashed a devastating shadow wave, so the brave heroes refused to retreat.",
      question: "Pilih Coordinating Conjunction (FANBOYS) yang tepat untuk menyatakan kontras/pertentangan yang mengejutkan:",
      options: [
        "The Conjunction Overlord unleashed a devastating shadow wave, yet the brave heroes refused to retreat.",
        "The Conjunction Overlord unleashed a devastating shadow wave, for the brave heroes refused to retreat.",
        "The Conjunction Overlord unleashed a devastating shadow wave, so the brave heroes refused to retreat."
      ],
      correct: 0,
      explanation: "Gunakan 'yet' untuk menghubungkan dua klausa independen yang kontras dan mengejutkan (meski diserang gelombang bayangan, namun para pahlawan menolak mundur). 'So' keliru karena menyatakan sebab-akibat.",
      category: "Coordinating Conjunction (FANBOYS: Yet)",
      regionIndex: 4
    },
    {
      id: 'sec5_q2',
      monster_text: "The demon could not pierce our enchanted shield, and neither he could diminish our celestial fire.",
      question: "Perbaiki Coordinating Conjunction negatif 'nor' dengan Inversi Subjek-Auxiliary:",
      options: [
        "The demon could not pierce our enchanted shield, nor could he diminish our celestial fire.",
        "The demon could not pierce our enchanted shield, nor he could diminish our celestial fire.",
        "The demon could not pierce our enchanted shield, but nor could he diminish our celestial fire."
      ],
      correct: 0,
      explanation: "Konjungsi koordinatif 'nor' menghubungkan dua pernyataan negatif dan mewajibkan inversi (auxiliary diletakkan sebelum subjek): ', nor could he diminish...'.",
      category: "Coordinating Conjunction (FANBOYS: Nor)",
      regionIndex: 4
    },
    {
      id: 'sec5_q3',
      monster_text: "Despite the demon was protected by dark armor, the spell pierced its wicked core.",
      question: "Perbaiki Subordinating Conjunction konsesi klausa (klausa lengkap S + V):",
      options: [
        "Although the demon was protected by dark armor, the spell pierced its wicked core.",
        "Despite of the demon was protected by dark armor, the spell pierced its wicked core.",
        "In spite the demon was protected by dark armor, the spell pierced its wicked core."
      ],
      correct: 0,
      explanation: "'Despite' adalah preposisi yang hanya diikuti noun/noun phrase. Bila diikuti klausa lengkap (S + V 'the demon was protected'), gunakan Subordinating Conjunction 'Although' atau 'Even though'.",
      category: "Subordinating Conjunction (Although vs Despite)",
      regionIndex: 4
    },
    {
      id: 'sec5_q4',
      monster_text: "The kingdom will never find peace if the dark core is not completely destroyed.",
      question: "Ganti klausa 'if... not' dengan Subordinating Conjunction 'unless' secara gramatikal:",
      options: [
        "The kingdom will never find peace unless the dark core is completely destroyed.",
        "The kingdom will never find peace unless the dark core is not completely destroyed.",
        "The kingdom will never find peace unless if the dark core is completely destroyed."
      ],
      correct: 0,
      explanation: "'Unless' bermakna 'if... not' (kecuali jika). Maka klausa di dalamnya harus berbentuk afirmatif/positif ('unless the dark core is completely destroyed').",
      category: "Subordinating Conjunction (Unless)",
      regionIndex: 4
    },
    {
      id: 'sec5_q5',
      monster_text: "The demon's spell corrupted neither the valiant knights or the elven archers.",
      question: "Perbaiki pasangan Correlative Conjunction yang tepat ('Neither... nor'):",
      options: [
        "The demon's spell corrupted neither the valiant knights nor the elven archers.",
        "The demon's spell corrupted neither the valiant knights and the elven archers.",
        "The demon's spell corrupted either the valiant knights nor the elven archers."
      ],
      correct: 0,
      explanation: "Pasangan Correlative Conjunction yang baku adalah 'Neither... nor...' (bukan 'or') dan 'Either... or...'.",
      category: "Correlative Conjunction (Neither... nor)",
      regionIndex: 4
    },
    {
      id: 'sec5_q6',
      monster_text: "The hero sought not only to defeat the overlord, but also restoring the realm of GramMaru.",
      question: "Perbaiki struktur paralel (Parallelism) pada Correlative Conjunction 'not only... but also':",
      options: [
        "The hero sought not only to defeat the overlord, but also to restore the realm of GramMaru.",
        "The hero sought not only defeating the overlord, but also to restore the realm of GramMaru.",
        "The hero sought not only to defeat the overlord, but restoring also the realm of GramMaru."
      ],
      correct: 0,
      explanation: "Unsur bahasa setelah 'not only' dan 'but also' harus sejajar (paralel). Karena 'not only' diikuti infinitive 'to defeat', maka 'but also' wajib diikuti infinitive 'to restore'.",
      category: "Correlative Conjunction (Parallelism)",
      regionIndex: 4
    },
    {
      id: 'sec5_q7',
      monster_text: "The demon's barrier collapsed, however we lacked the magical energy to deliver the finishing blow.",
      question: "Perbaiki tanda baca pada Conjunctive Adverb 'however' yang menghubungkan dua klausa independen:",
      options: [
        "The demon's barrier collapsed; however, we lacked the magical energy to deliver the finishing blow.",
        "The demon's barrier collapsed, however, we lacked the magical energy to deliver the finishing blow.",
        "The demon's barrier collapsed; however we lacked the magical energy to deliver the finishing blow."
      ],
      correct: 0,
      explanation: "Conjunctive adverb seperti 'however' yang menghubungkan dua klausa independen wajib diawali titik koma (;) dan diakhiri koma (,). Menggunakan koma saja menghasilkan Comma Splice.",
      category: "Conjunctive Adverbs (Punctuation)",
      regionIndex: 4
    },
    {
      id: 'sec5_q8',
      monster_text: "We struck the beast decisively, because of its defensive nexus was momentarily offline.",
      question: "Pilih Subordinating Conjunction yang tepat untuk klausa penyebab (Cause and Effect):",
      options: [
        "We struck the beast decisively, because its defensive nexus was momentarily offline.",
        "We struck the beast decisively, because of it was momentarily offline.",
        "We struck the beast decisively, owing to its defensive nexus was momentarily offline."
      ],
      correct: 0,
      explanation: "'Because of' dan 'owing to' adalah preposisi (hanya diikuti noun/noun phrase). Untuk klausa lengkap dengan subjek dan kata kerja ('its defensive nexus was offline'), gunakan conjunction 'because' atau 'since'.",
      category: "Subordinating Conjunction (Because vs Because of)",
      regionIndex: 4
    }
  ]
};

// Backward compatibility alias for Stage 2 (Wilayah 1-5: 16 Tenses & Conjunctions)
export const REGION_GRAMMAR_DB = STAGE_2_GRAMMAR_DB;

// Comprehensive multi-stage grammar database (Stage 1: Part of Speech, Stage 2: 16 Tenses, Stage 3: Clauses)
export const CAMPAIGN_GRAMMAR_DB: Record<number, Record<number, GrammarQuestion[]>> = {
  1: STAGE_1_GRAMMAR_DB,
  2: STAGE_2_GRAMMAR_DB,
  3: STAGE_3_GRAMMAR_DB
};

// Flattened database grouped by Tier for backward compatibility
export const GRAMMAR_DB: Record<number, GrammarQuestion[]> = {
  1: [...REGION_GRAMMAR_DB[0], ...REGION_GRAMMAR_DB[1]],
  2: [...REGION_GRAMMAR_DB[2], ...REGION_GRAMMAR_DB[3]],
  3: [...REGION_GRAMMAR_DB[4]]
};

