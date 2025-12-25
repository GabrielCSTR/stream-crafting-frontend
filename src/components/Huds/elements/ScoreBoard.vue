<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import type { Dota2Map } from '@/types/gsi'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'
import { computed } from 'vue'
import { formatGameTime, getGameStateInfo } from '@/types/gsi'
import { useGSI } from '@/composables/useGSI'

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    // Modo legacy (compatibilidade)
    mapData?: {
      game_time: number
      radiant_score: number
      dire_score: number
      game_state: string
      daytime: boolean
    }
    radiantLogo?: string
    direLogo?: string
    radiantName?: string
    direName?: string
    
    // Modo GSI (novo - recomendado)
    map?: Dota2Map  // Passar dados do map diretamente
    useGSIData?: boolean  // Usar dados GSI globais
  }
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  active: false,
  disable: false,
  isInsideBoundingBox: false,
  isShowed: true,
  backgroundColor: '#000000',
  color: '#ffffff',
  maintainAspectRatio: false,
  layer: 0,
  position: () => ({ x: 0, y: 0 }),
  size: () => ({ width: 600, height: 120 })
})

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)

// Hook GSI para buscar dados globais se solicitado
const { map: gsiMap } = useGSI()

// Determina qual fonte de dados usar
const activeMap = computed(() => {
  if (props.data.map) return props.data.map
  if (props.data.useGSIData) return gsiMap.value
  return null
})

// Computed properties para dados do scoreboard
const gameTime = computed(() => {
  if (activeMap.value) return activeMap.value.game_time || activeMap.value.clock_time
  return props.data.mapData?.game_time || 0
})

const radiantScore = computed(() => {
  if (activeMap.value) return activeMap.value.radiant_score
  return props.data.mapData?.radiant_score || 0
})

const direScore = computed(() => {
  if (activeMap.value) return activeMap.value.dire_score
  return props.data.mapData?.dire_score || 0
})

const gameState = computed(() => {
  if (activeMap.value) return getGameStateInfo(activeMap.value.game_state).label
  return formatGameState(props.data.mapData?.game_state)
})

const radiantName = computed(() => {
  if (activeMap.value?.radiant?.name) return activeMap.value.radiant.name
  return props.data.radiantName || 'Radiant'
})

const direName = computed(() => {
  if (activeMap.value?.dire?.name) return activeMap.value.dire.name
  return props.data.direName || 'Dire'
})

const radiantLogo = computed(() => {
  if (activeMap.value?.radiant?.logo) return activeMap.value.radiant.logo
  return props.data.radiantLogo || ''
})

const direLogo = computed(() => {
  if (activeMap.value?.dire?.logo) return activeMap.value.dire.logo
  return props.data.direLogo || ''
})

const isDaytime = computed(() => {
  if (activeMap.value) return activeMap.value.daytime
  return props.data.mapData?.daytime ?? true
})

const formatGameState = (state?: string) => {
  if (!state) return 'Waiting'
  
  const states: Record<string, string> = {
    'DOTA_GAMERULES_STATE_HERO_SELECTION': 'Hero Selection',
    'DOTA_GAMERULES_STATE_PRE_GAME': 'Pre-Game',
    'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS': 'In Progress',
    'DOTA_GAMERULES_STATE_POST_GAME': 'Post Game'
  }
  
  return states[state] || state
}
</script>

<template>
  <Base class="stream-crafter-hud-element-scoreboard" v-bind="props" v-on="on">
    <div class="dota-scoreboard" :class="{ 'dota-scoreboard--night': !isDaytime }">
      <div class="dota-scoreboard__team dota-scoreboard__team--radiant">
        <div class="team-logo">
          <img v-if="radiantLogo" :src="radiantLogo" alt="Radiant" />
          <i v-else :class="PrimeIcons.SHIELD"></i>
        </div>
        <div class="team-name">{{ radiantName }}</div>
        <div class="team-score">{{ radiantScore }}</div>
      </div>

      <div class="dota-scoreboard__center">
        <div class="game-time">{{ formatGameTime(gameTime) }}</div>
        <div class="game-state">{{ gameState }}</div>
      </div>

      <div class="dota-scoreboard__team dota-scoreboard__team--dire">
        <div class="team-score">{{ direScore }}</div>
        <div class="team-name">{{ direName }}</div>
        <div class="team-logo">
          <img v-if="direLogo" :src="direLogo" alt="Dire" />
          <i v-else :class="PrimeIcons.SHIELD"></i>
        </div>
      </div>
    </div>
  </Base>
</template>

<style lang="scss" scoped>
.dota-scoreboard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  border-radius: 12px;
  border: 2px solid rgba(52, 245, 163, 0.2);
  backdrop-filter: blur(10px);
  min-width: 600px;

  &__team {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;

    &--radiant {
      .team-score {
        color: #92E66F;
        text-shadow: 0 0 10px rgba(146, 230, 111, 0.5);
      }
    }

    &--dire {
      flex-direction: row-reverse;
      
      .team-score {
        color: #E66F6F;
        text-shadow: 0 0 10px rgba(230, 111, 111, 0.5);
      }
    }
  }

  .team-logo {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: rgba(52, 245, 163, 0.1);
    border: 2px solid rgba(52, 245, 163, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    i {
      font-size: 1.5rem;
      color: #34F5A3;
    }
  }

  .team-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: #F9FAFB;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .team-score {
    font-size: 2.5rem;
    font-weight: 900;
    font-family: 'Rajdhani', sans-serif;
  }

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0 2rem;
  }

  .game-time {
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Rajdhani', sans-serif;
    color: #F9FAFB;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .game-state {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style>
