import { MonsterTemplate } from '../types/game';

export const MONSTER_ENCOUNTERS: MonsterTemplate[] = [
  {
    name: "Typo Goblin",
    hp: 40,
    damage: 15,
    tier: 1,
    title: "The Mischievous Speller",
    lore: "Makhluk kecil liar yang suka menukar huruf dan merusak bentuk kata kerja di jalan setapak perbatasan.",
    avatarType: "goblin",
    accentColor: "emerald"
  },
  {
    name: "Tense-Twisting Troll",
    hp: 65,
    damage: 20,
    tier: 1,
    title: "Guardian of Twisted Timelines",
    lore: "Raksasa penjaga jembatan kuno yang mencampuradukkan masa lalu, masa kini, dan masa depan dalam satu nafas.",
    avatarType: "troll",
    accentColor: "cyan"
  },
  {
    name: "Comma Splice Dragon",
    hp: 90,
    damage: 25,
    tier: 2,
    title: "Scourge of Run-On Sentences",
    lore: "Naga bersisik tajam yang menggabungkan klausa mandiri tanpa kata hubung, menghembuskan api kekacauan sintaksis.",
    avatarType: "dragon",
    accentColor: "rose"
  },
  {
    name: "Dangling Modifier Chimera",
    hp: 110,
    damage: 30,
    tier: 2,
    title: "Abomination of Ambiguous Subjects",
    lore: "Monster berkepala tiga yang membingungkan siapa pelaku aksi sebenarnya di setiap kalimat yang dirapalnya.",
    avatarType: "chimera",
    accentColor: "purple"
  },
  {
    name: "The Great Chaos Overlord (Passive Voice Demon)",
    hp: 150,
    damage: 35,
    tier: 3,
    title: "The Ultimate Distortion of Meaning",
    lore: "Penguasa kegelapan yang menghapus pelaku dari kenyataan, memutarbalikkan struktur dunia menjadi pasif tak berdaya.",
    avatarType: "overlord",
    accentColor: "amber"
  }
];
