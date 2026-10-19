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
  damageMod: number;
  questionsAnswered: number;
  correctAnswers: number;
  potionsUsed: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
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
