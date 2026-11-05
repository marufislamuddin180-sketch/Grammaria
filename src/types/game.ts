export type CharacterClass = 'Syntax Knight' | 'Vocab Mage' | 'Punctuation Rogue';

export interface Player {
  name: string;
  charClass: CharacterClass;
  hp: number;
  maxHp: number;
  level: number;
  exp: number;
  expNeeded: number;
  potions: number;
  scrollEliminate: number;
  smokeBombs: number;
  damageRunes: number;
  aegisWards: number;
  skillCooldown: number;
  damageMod: number;
  questionsAnswered: number;
  correctAnswers: number;
  potionsUsed: number;
  itemsUsed: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
}

export type ItemType = 'potion' | 'scrollEliminate' | 'smokeBomb' | 'damageRune' | 'aegisWard';

export interface ConsumableItemInfo {
  id: ItemType;
  name: string;
  shortName: string;
  description: string;
  effect: string;
  icon: string;
  color: string;
}

export interface ClassActiveSkillInfo {
  id: string;
  name: string;
  artifactName: string;
  tagline: string;
  cooldownMax: number;
  description: string;
  effectLabel: string;
  icon: string;
}


export interface GrammarQuestion {
  id: string;
  monster_text: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category?: string;
  regionIndex?: number;
}

export interface MonsterTemplate {
  name: string;
  hp: number;
  damage: number;
  tier: number;
  title: string;
  lore: string;
  avatarType: 'goblin' | 'troll' | 'dragon' | 'chimera' | 'overlord';
  accentColor: string;
}

export interface MonsterState extends MonsterTemplate {
  currentHp: number;
}

export type GameStage = 
  | 'character-creation'
  | 'encounter-intro'
  | 'battle'
  | 'battle-victory'
  | 'level-up'
  | 'game-over'
  | 'game-cleared';

export interface BattleLogEntry {
  id: string;
  text: string;
  type: 'narrative' | 'monster' | 'hero' | 'damage-deal' | 'damage-take' | 'heal' | 'system' | 'explanation';
  timestamp: string;
  actor?: string;
  target?: string;
  actionName?: string;
  damage?: number;
  heal?: number;
  isCritical?: boolean;
}

export interface CampaignStageInfo {
  id: number;
  title: string;
  subtitle: string;
  focus: string;
  description: string;
  badge: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  accentColor: string;
  sectorsCount: number;
}

