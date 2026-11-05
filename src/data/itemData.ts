import { CharacterClass, ConsumableItemInfo, ClassActiveSkillInfo, ItemType } from '../types/game';

export const CONSUMABLE_ITEMS: Record<ItemType, ConsumableItemInfo> = {
  potion: {
    id: 'potion',
    name: 'Elixir of Eloquence',
    shortName: 'Elixir HP',
    description: 'Cairan sintaksis murni beraroma mint yang memulihkan +45 HP saat diteguk.',
    effect: '+45 HP',
    icon: '🧪',
    color: 'emerald'
  },
  scrollEliminate: {
    id: 'scrollEliminate',
    name: 'Scroll of Clarification (50:50)',
    shortName: 'Gulungan 50:50',
    description: 'Membakar distorsi kata: melenyapkan 1 opsi jawaban yang salah pada pertanyaan aktif.',
    effect: 'Eliminasi 1 Jawaban Salah',
    icon: '📜',
    color: 'cyan'
  },
  smokeBomb: {
    id: 'smokeBomb',
    name: 'Punctuation Smoke Bomb',
    shortName: 'Bom Asap',
    description: 'Melempar kepulan kabut tanda baca untuk mengganti kalimat soal tanpa terkena serangan balasan monster.',
    effect: 'Ganti Soal Bebas Serangan',
    icon: '💨',
    color: 'slate'
  },
  damageRune: {
    id: 'damageRune',
    name: 'Rune of Critical Agreement',
    shortName: 'Rune Serangan',
    description: 'Mengalirkan percikan tata bahasa ke senjatamu: serangan benar berikutnya mendapat bonus +25 DMG!',
    effect: '+25 DMG Serangan Berikutnya',
    icon: '⚡',
    color: 'amber'
  },
  aegisWard: {
    id: 'aegisWard',
    name: 'Aegis Ward (Barrier Scroll)',
    shortName: 'Perisai Ward',
    description: 'Memasang perisai runik pelindung: menahan 1 kali serangan salah monster & memantulkan 15 DMG.',
    effect: 'Blok 1x Serangan Salah + Balas 15 DMG',
    icon: '🛡️',
    color: 'blue'
  }
};

export const CLASS_ACTIVE_SKILLS: Record<CharacterClass, ClassActiveSkillInfo> = {
  "Syntax Knight": {
    id: "knight_fortress",
    name: "Fortress of Concord",
    artifactName: "Aegis of Concord",
    tagline: "Perisai Keselarasan Mutlak",
    cooldownMax: 3,
    description: "Mengaktifkan dinding perisai tata bahasa selama 1 putaran. Jika jawabanmu salah, damage monster ditahan 100% dan kamu memantulkan 20 DMG balik ke monster!",
    effectLabel: "Perisai Kebal Salah 1 Turn + Parry 20 DMG",
    icon: "🛡️"
  },
  "Vocab Mage": {
    id: "mage_lexical_elimination",
    name: "Lexical Elimination",
    artifactName: "Lexicon of Erudition",
    tagline: "Pelenyapan Diksi Palsu (50:50)",
    cooldownMax: 2,
    description: "Membuka kitab leksikal adidaya untuk mendeteksi kelemahan musuh dan melenyapkan 1 pilihan jawaban salah secara cuma-cuma!",
    effectLabel: "Eliminasi 1 Pilihan Salah Instan",
    icon: "📖"
  },
  "Punctuation Rogue": {
    id: "rogue_temporal_semicolon",
    name: "Temporal Semicolon Reroll",
    artifactName: "Chronos Semicolon",
    tagline: "Pembelah Dimensi Kalimat & Ambush",
    cooldownMax: 2,
    description: "Menancapkan belati titik koma untuk mereset dan membelah soal saat ini dengan kalimat baru, serta meningkatkan serangan berikutnya (+20 DMG)!",
    effectLabel: "Ganti Soal Baru + Buff +20 DMG",
    icon: "⏳"
  }
};

export const CLASS_STARTING_LOADOUTS: Record<CharacterClass, {
  hp: number;
  damageMod: number;
  weapon: string;
  artifactName: string;
  potions: number;
  scrollEliminate: number;
  smokeBombs: number;
  damageRunes: number;
  aegisWards: number;
}> = {
  "Syntax Knight": {
    hp: 125,
    damageMod: 30,
    weapon: "Blade of Proper Agreement",
    artifactName: "Aegis of Concord",
    potions: 2,
    scrollEliminate: 0,
    smokeBombs: 0,
    damageRunes: 1,
    aegisWards: 1
  },
  "Vocab Mage": {
    hp: 100,
    damageMod: 40,
    weapon: "Lexical Surge",
    artifactName: "Lexicon of Erudition",
    potions: 2,
    scrollEliminate: 2,
    smokeBombs: 0,
    damageRunes: 1,
    aegisWards: 0
  },
  "Punctuation Rogue": {
    hp: 105,
    damageMod: 35,
    weapon: "Semicolon Dagger",
    artifactName: "Chronos Semicolon",
    potions: 3,
    scrollEliminate: 1,
    smokeBombs: 2,
    damageRunes: 0,
    aegisWards: 0
  }
};
