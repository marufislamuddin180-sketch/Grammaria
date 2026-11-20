import grammarForestImg from '../assets/images/bg_grammar_forest_1795160753065.jpg';
import chronoRuinsImg from '../assets/images/bg_chrono_ruins_1795160753624.jpg';
import syntaxCitadelImg from '../assets/images/bg_syntax_citadel_1795160754171.jpg';
import nexusSanctumImg from '../assets/images/bg_nexus_sanctum_1795160754512.jpg';

export interface StageBackdrop {
  id: string;
  stageId: number | null;
  name: string;
  realmLabel: string;
  subtitle: string;
  imageUrl: string;
  fallbackGradient: string;
  accentTextClass: string;
}

export const STAGE_BACKDROPS: StageBackdrop[] = [
  {
    id: 'grammar-forest',
    stageId: 1,
    name: 'Grammar Forest',
    realmLabel: 'Stage 1 · Hutan Kaidah Kata',
    subtitle: 'Rimba kuno dengan rune pendar hijau dan gerbang batu Parts of Speech',
    imageUrl: grammarForestImg,
    fallbackGradient: 'bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-950',
    accentTextClass: 'text-emerald-300',
  },
  {
    id: 'chrono-ruins',
    stageId: 2,
    name: 'Chrono Ruins',
    realmLabel: 'Stage 2 · Reruntuhan Dimensi Waktu',
    subtitle: 'Kuil jam pasir kuno tempat 16 Tenses Wilayah 1-4 berbenturan',
    imageUrl: chronoRuinsImg,
    fallbackGradient: 'bg-gradient-to-b from-amber-950 via-slate-950 to-slate-950',
    accentTextClass: 'text-amber-300',
  },
  {
    id: 'syntax-citadel',
    stageId: 3,
    name: 'Syntax Citadel',
    realmLabel: 'Stage 3 · Benteng Sintaksis Kompleks',
    subtitle: 'Kastel obsidian di puncak gunung petir penjaga rahasia Clauses Mastery',
    imageUrl: syntaxCitadelImg,
    fallbackGradient: 'bg-gradient-to-b from-purple-950 via-slate-950 to-slate-950',
    accentTextClass: 'text-purple-300',
  },
  {
    id: 'nexus-sanctum',
    stageId: null,
    name: 'Nexus Sanctum',
    realmLabel: 'Boss Realm · Kuil Gerhana Tertinggi',
    subtitle: 'Altar kosmik gerhana merah tempat Overlord Tata Bahasa menanti',
    imageUrl: nexusSanctumImg,
    fallbackGradient: 'bg-gradient-to-b from-rose-950 via-slate-950 to-slate-950',
    accentTextClass: 'text-rose-300',
  },
];

export function getDefaultBackdropIndex(
  stageId: number,
  encounterIndex: number,
  totalEncounters: number
): number {
  if (encounterIndex >= totalEncounters - 1) {
    return 3; // Nexus Sanctum for Final Boss encounter
  }
  const matchedIndex = STAGE_BACKDROPS.findIndex((b) => b.stageId === stageId);
  return matchedIndex >= 0 ? matchedIndex : 1;
}
