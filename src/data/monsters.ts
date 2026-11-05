import { MonsterTemplate } from '../types/game';

// Stage 1: Parts of Speech (5 Sectors / Sektor 1-5)
export const STAGE_1_ENCOUNTERS: MonsterTemplate[] = [
  {
    name: "Noun & Pronoun Goblin",
    hp: 40,
    damage: 14,
    tier: 1,
    title: "Keeper of Names & Pronoun Shifts",
    lore: "Monster perantara yang gemar mengacaukan kata benda jamak, kata ganti subjek-objek, dan kepemilikan (Possessive Nouns & Pronouns)!",
    avatarType: "goblin",
    accentColor: "emerald"
  },
  {
    name: "Action Verb Troll",
    hp: 65,
    damage: 18,
    tier: 1,
    title: "Warden of Stative & Dynamic Verbs",
    lore: "Raksasa pemukul yang menantang pemahaman kata kerja aksi, kata kerja kondisi (stative verbs), verba bantu modal, dan transitive verbs!",
    avatarType: "troll",
    accentColor: "cyan"
  },
  {
    name: "Modifier Dragon",
    hp: 85,
    damage: 24,
    tier: 2,
    title: "Scourge of Adjectives & Adverbs",
    lore: "Naga berkilau yang menyamarkan perbedaan antara kata sifat (menerangkan benda) dan kata keterangan (menerangkan cara, tempat, waktu, derajat)!",
    avatarType: "dragon",
    accentColor: "rose"
  },
  {
    name: "Preposition Chimera",
    hp: 105,
    damage: 28,
    tier: 2,
    title: "Beast of Spatial & Temporal Relations",
    lore: "Chimera berdimensi ruang dan waktu yang menguji ketepatan preposisi (in, on, at, by, for) dan penggunaan artikel definit-indefinit!",
    avatarType: "chimera",
    accentColor: "purple"
  },
  {
    name: "The Lexical Part-of-Speech Overlord",
    hp: 140,
    damage: 34,
    tier: 3,
    title: "Master of All 8 Lexical Classes",
    lore: "Entitas kuno penjaga harmoni 8 kelas kata bahasa Inggris! Menguji Conjunctions, Interjections, dan identifikasi peran sintaksis kata dalam kalimat utuh!",
    avatarType: "overlord",
    accentColor: "amber"
  }
];

// Stage 2: 16 Tenses & Conjunctions (Wilayah 1-5 preserved exactly)
export const STAGE_2_ENCOUNTERS: MonsterTemplate[] = [
  {
    name: "Present Tense Goblin",
    hp: 40,
    damage: 15,
    tier: 1,
    title: "Master of the 4 Present Tenses",
    lore: "Makhluk perbatasan yang menguji penguasaan 4 Present Tenses: Simple Present, Present Continuous, Present Perfect, dan Present Perfect Continuous!",
    avatarType: "goblin",
    accentColor: "emerald"
  },
  {
    name: "Past Tense Troll",
    hp: 65,
    damage: 20,
    tier: 1,
    title: "Warden of the 4 Past Tenses",
    lore: "Raksasa penjaga gerbang masa lampau yang menguji 4 Past Tenses: Simple Past, Past Continuous, Past Perfect, dan Past Perfect Continuous!",
    avatarType: "troll",
    accentColor: "cyan"
  },
  {
    name: "Future Chrono Dragon",
    hp: 90,
    damage: 25,
    tier: 2,
    title: "Scourge of the 4 Future Tenses",
    lore: "Naga penjelajah masa depan yang menguji 4 Future Tenses: Simple Future, Future Continuous, Future Perfect, dan Future Perfect Continuous!",
    avatarType: "dragon",
    accentColor: "rose"
  },
  {
    name: "Past-Future Chimera",
    hp: 110,
    damage: 30,
    tier: 2,
    title: "Abomination of the 4 Past Future Tenses",
    lore: "Monster berkepala tiga dimensi waktu pengandaian yang menguji 4 Past Future Tenses: Simple Past Future, Past Future Continuous, Past Future Perfect, dan Past Future Perfect Continuous!",
    avatarType: "chimera",
    accentColor: "purple"
  },
  {
    name: "The Great Conjunction Overlord",
    hp: 150,
    damage: 35,
    tier: 3,
    title: "Master of All Syntactic Linkages (Nexus Demon)",
    lore: "Penguasa kegelapan tertinggi pemutus hubungan kalimat! Ujian pamungkas: Coordinating (FANBOYS), Subordinating, Correlative Conjunctions, dan Conjunctive Adverbs!",
    avatarType: "overlord",
    accentColor: "amber"
  }
];

// Stage 3: Clauses Mastery (Noun, Relative, Adverbial Clauses)
export const STAGE_3_ENCOUNTERS: MonsterTemplate[] = [
  {
    name: "Noun Clause Goblin",
    hp: 45,
    damage: 16,
    tier: 1,
    title: "Infiltrator of Embedded Sentences",
    lore: "Goblin cerdik yang menyusupkan pertanyaan tertanam (embedded questions) dan klausa nomina 'that-clause' yang bertindak sebagai subjek atau objek kalimat!",
    avatarType: "goblin",
    accentColor: "emerald"
  },
  {
    name: "Relative Clause Troll",
    hp: 70,
    damage: 22,
    tier: 1,
    title: "Severer of Pronouns & Antecedents",
    lore: "Troll raksasa yang merusak hubungan kata ganti penghubung (who, whom, whose, which, that) serta memecah klausa restriktif dan non-restriktif!",
    avatarType: "troll",
    accentColor: "cyan"
  },
  {
    name: "Temporal & Conditional Drake",
    hp: 95,
    damage: 27,
    tier: 2,
    title: "Warden of Time & Condition Clauses",
    lore: "Naga bersayap ganda penguasa klausa waktu (when, while, until) dan klausa pengandaian bersyarat (Conditionals Type 1, 2, 3)!",
    avatarType: "dragon",
    accentColor: "rose"
  },
  {
    name: "Contrast & Cause Chimera",
    hp: 115,
    damage: 32,
    tier: 2,
    title: "Weaver of Paradoxes & Reasons",
    lore: "Chimera berbahaya yang menguji klausa pertentangan (although, even though, whereas) dan klausa kausalitas (because, since, so that)!",
    avatarType: "chimera",
    accentColor: "purple"
  },
  {
    name: "The Arch-Clause Nexus Overlord",
    hp: 160,
    damage: 38,
    tier: 3,
    title: "Supreme Sovereign of Complex Sentences",
    lore: "Penguasa tertinggi seluruh rantai klausa bahasa Inggris! Menguji reduksi klausa (reduced clauses), inversi bersyarat, dan harmoni kalimat majemuk bertingkat!",
    avatarType: "overlord",
    accentColor: "amber"
  }
];

// Mapping per stage ID (1, 2, 3)
export const STAGE_ENCOUNTERS: Record<number, MonsterTemplate[]> = {
  1: STAGE_1_ENCOUNTERS,
  2: STAGE_2_ENCOUNTERS,
  3: STAGE_3_ENCOUNTERS
};

// Backward compatibility default (Stage 2: 16 Tenses Wilayah 1-5)
export const MONSTER_ENCOUNTERS: MonsterTemplate[] = STAGE_2_ENCOUNTERS;
