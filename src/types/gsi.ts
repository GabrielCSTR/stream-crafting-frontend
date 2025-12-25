/**
 * Tipos TypeScript para Dota 2 GSI (Game State Integration)
 * Baseado na estrutura do example.json e lexogrine/dota2-react-hud
 */

export interface Dota2GSIData {
  provider: {
    name: string
    appid: number
    version: number
    timestamp: number
  }
  map: Dota2Map
  player: {
    team2?: Record<string, Dota2Player>  // Radiant
    team3?: Record<string, Dota2Player>  // Dire
  }
  hero?: Record<string, Dota2Hero>
  abilities?: Record<string, Dota2Ability>
  items?: Record<string, Dota2Item>
  draft?: Dota2Draft
  buildings?: {
    radiant: Record<string, any>
    dire: Record<string, any>
  }
  wearables?: Record<string, any>
}

export interface Dota2Map {
  name: string
  matchid: string
  game_time: number
  clock_time: number
  daytime: boolean
  nightstalker_night: boolean
  radiant_score: number
  dire_score: number
  game_state: Dota2GameState
  paused: boolean
  win_team: 'none' | 'radiant' | 'dire'
  customgamename: string
  radiant_ward_purchase_cooldown: number
  dire_ward_purchase_cooldown: number
  roshan_state: string
  roshan_state_end_seconds: number
  radiant_win_chance: number
  radiant?: Dota2TeamMapData
  dire?: Dota2TeamMapData
}

export interface Dota2TeamMapData {
  id?: string
  name?: string
  logo?: string
  map_score?: number
}

export type Dota2GameState =
  | 'DOTA_GAMERULES_STATE_INIT'
  | 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD'
  | 'DOTA_GAMERULES_STATE_HERO_SELECTION'
  | 'DOTA_GAMERULES_STATE_STRATEGY_TIME'
  | 'DOTA_GAMERULES_STATE_PRE_GAME'
  | 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS'
  | 'DOTA_GAMERULES_STATE_POST_GAME'
  | 'DOTA_GAMERULES_STATE_DISCONNECT'
  | 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE'
  | 'DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP'

export interface Dota2Player {
  steamid: string
  accountid: string
  name: string
  activity: string
  kills: number
  deaths: number
  assists: number
  last_hits: number
  denies: number
  kill_streak: number
  commands_issued: number
  kill_list: Record<string, any>
  team_name: 'radiant' | 'dire'
  player_slot: number
  team_slot: number
  gold: number
  gold_reliable: number
  gold_unreliable: number
  gold_from_hero_kills: number
  gold_from_creep_kills: number
  gold_from_income: number
  gold_from_shared: number
  gpm: number
  xpm: number
  net_worth: number
  hero_damage: number
  hero_healing: number
  tower_damage: number
  wards_purchased: number
  wards_placed: number
  wards_destroyed: number
  runes_activated: number
  camps_stacked: number
  support_gold_spent: number
  consumable_gold_spent: number
  item_gold_spent: number
  gold_lost_to_death: number
  gold_spent_on_buybacks: number
  hero?: Dota2Hero
  abilities?: Dota2Ability[]
  items?: Dota2Item[]
  id?: number
}

export interface Dota2Hero {
  id: number
  name: string
  level: number
  xp: number
  alive: boolean
  respawn_seconds: number
  buyback_cost: number
  buyback_cooldown: number
  health: number
  max_health: number
  health_percent: number
  mana: number
  max_mana: number
  mana_percent: number
  silenced: boolean
  stunned: boolean
  disarmed: boolean
  magicimmune: boolean
  hexed: boolean
  muted: boolean
  break: boolean
  smoked: boolean
  has_debuff: boolean
  selected_unit: boolean
  talent_1: boolean
  talent_2: boolean
  talent_3: boolean
  talent_4: boolean
  talent_5: boolean
  talent_6: boolean
  talent_7: boolean
  talent_8: boolean
  facetIndex?: number
}

export interface Dota2Ability {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  ultimate: boolean
}

export interface Dota2Item {
  name: string
  purchaser?: number
  item_level?: number
  contains_rune?: string
  can_cast?: boolean
  cooldown?: number
  passive?: boolean
  charges?: number
  id?: number
  type?: 'slot' | 'neutral' | 'stash' | 'backpack'
}

export interface Dota2Draft {
  activeteam: 0 | 2 | 3  // 0 = none, 2 = radiant, 3 = dire
  pick: boolean
  activeteam_time_remaining: number
  radiant_bonus_time: number
  dire_bonus_time: number
  radiant?: Dota2TeamDraft
  dire?: Dota2TeamDraft
}

export interface Dota2TeamDraft {
  home_team: boolean
  picks: Dota2DraftEntry[]
  bans: Dota2DraftEntry[]
  bonus_time?: number
  id?: string
  name?: string
  tag?: string
  logo?: string
}

export interface Dota2DraftEntry {
  hero_id: number
  order: number
  class?: string  // Hero name (e.g., "npc_dota_hero_axe")
  type?: 'pick' | 'ban'
}

/**
 * Tipos para configuração de elementos do HUD
 */
export interface GSIDataSelector {
  type: 'player' | 'team' | 'map' | 'draft' | 'custom'
  
  // Para type === 'player'
  steamid?: string
  playerSlot?: number
  
  // Para type === 'team'
  team?: 'radiant' | 'dire'
  
  // Para type === 'custom'
  customPath?: string
}

/**
 * Helper para obter a URL da imagem do herói
 */
export function getHeroImageURL(heroName: string, type: 'icon' | 'full' | 'animated' = 'icon'): string {
  const cleanName = heroName.replace('npc_dota_hero_', '')
  
  switch (type) {
    case 'icon':
      return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/${cleanName}.png`
    case 'full':
      return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${cleanName}.png`
    case 'animated':
      return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${cleanName}.webm`
    default:
      return ''
  }
}

/**
 * Helper para obter a URL da imagem do item
 */
export function getItemImageURL(itemName: string): string {
  const cleanName = itemName.replace('item_', '')
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${cleanName}.png`
}

/**
 * Helper para obter a URL da imagem da habilidade
 */
export function getAbilityImageURL(abilityName: string): string {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`
}

/**
 * Formata tempo em segundos para MM:SS
 */
export function formatGameTime(seconds: number): string {
  const isNegative = seconds < 0
  const absSeconds = Math.abs(seconds)
  const minutes = Math.floor(absSeconds / 60)
  const secs = Math.floor(absSeconds % 60)
  const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`
  return isNegative ? `-${formatted}` : formatted
}

/**
 * Retorna informação sobre o estado do jogo
 */
export function getGameStateInfo(state: Dota2GameState): { label: string; phase: 'draft' | 'game' | 'ended' } {
  const stateMap: Record<Dota2GameState, { label: string; phase: 'draft' | 'game' | 'ended' }> = {
    'DOTA_GAMERULES_STATE_INIT': { label: 'Initializing', phase: 'draft' },
    'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD': { label: 'Loading', phase: 'draft' },
    'DOTA_GAMERULES_STATE_HERO_SELECTION': { label: 'Hero Selection', phase: 'draft' },
    'DOTA_GAMERULES_STATE_STRATEGY_TIME': { label: 'Strategy Time', phase: 'draft' },
    'DOTA_GAMERULES_STATE_PRE_GAME': { label: 'Pre Game', phase: 'draft' },
    'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS': { label: 'In Progress', phase: 'game' },
    'DOTA_GAMERULES_STATE_POST_GAME': { label: 'Post Game', phase: 'ended' },
    'DOTA_GAMERULES_STATE_DISCONNECT': { label: 'Disconnected', phase: 'ended' },
    'DOTA_GAMERULES_STATE_TEAM_SHOWCASE': { label: 'Team Showcase', phase: 'draft' },
    'DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP': { label: 'Setup', phase: 'draft' }
  }
  
  return stateMap[state] || { label: 'Unknown', phase: 'draft' }
}
