<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import type { Dota2Player } from '@/types/gsi'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'
import { computed } from 'vue'
import { getHeroImageURL } from '@/types/gsi'
import { usePlayer } from '@/composables/useGSI'

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    // Modo legacy (compatibilidade)
    playerData?: {
      name: string
      kills: number
      deaths: number
      assists: number
      last_hits: number
      denies: number
      net_worth: number
      gold: number
      team_name: 'radiant' | 'dire'
    }
    heroImage?: string
    team?: 'radiant' | 'dire'
    
    // Modo GSI (novo - recomendado)
    steamid?: string  // Para buscar player dos dados GSI
    player?: Dota2Player  // Ou passar player diretamente
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
  size: () => ({ width: 300, height: 120 })
})

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)

// Hook para buscar player do GSI se steamid fornecido
const steamidRef = computed(() => props.data.steamid)
const { player: gsiPlayer } = usePlayer(steamidRef)

// Determina qual fonte de dados usar (prioridade: player direto > GSI > legacy playerData)
const activePlayer = computed(() => {
  return props.data.player || gsiPlayer.value || null
})

// Computed properties para dados do player
const playerName = computed(() => {
  if (activePlayer.value) return activePlayer.value.name
  return props.data.playerData?.name || 'Player'
})

const playerKills = computed(() => {
  if (activePlayer.value) return activePlayer.value.kills
  return props.data.playerData?.kills || 0
})

const playerDeaths = computed(() => {
  if (activePlayer.value) return activePlayer.value.deaths
  return props.data.playerData?.deaths || 0
})

const playerAssists = computed(() => {
  if (activePlayer.value) return activePlayer.value.assists
  return props.data.playerData?.assists || 0
})

const playerLastHits = computed(() => {
  if (activePlayer.value) return activePlayer.value.last_hits
  return props.data.playerData?.last_hits || 0
})

const playerNetWorth = computed(() => {
  if (activePlayer.value) return activePlayer.value.net_worth
  return props.data.playerData?.net_worth || 0
})

const playerTeam = computed<'radiant' | 'dire'>(() => {
  if (activePlayer.value) return activePlayer.value.team_name
  return props.data.playerData?.team_name || props.data.team || 'radiant'
})

const heroImageUrl = computed(() => {
  // Se tem hero no GSI
  if (activePlayer.value?.hero?.name) {
    return getHeroImageURL(activePlayer.value.hero.name, 'icon')
  }
  // Fallback para imagem legada
  return props.data.heroImage || ''
})

const formatGold = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}
</script>

<template>
  <Base class="stream-crafter-hud-element-player-card" v-bind="props" v-on="on">
    <div class="dota-player-card" :class="[`dota-player-card--${playerTeam}`]">
      <div class="dota-player-card__hero">
        <img 
          v-if="heroImageUrl"
          :src="heroImageUrl" 
          :alt="playerName"
          class="dota-player-card__hero-img"
        />
        <div v-else class="dota-player-card__hero-placeholder">
          <i :class="PrimeIcons.USER"></i>
        </div>
      </div>
      
      <div class="dota-player-card__info">
        <div class="dota-player-card__name">{{ playerName }}</div>
        <div class="dota-player-card__stats">
          <span class="stat stat--kills">{{ playerKills }}</span>
          <span class="stat-separator">/</span>
          <span class="stat stat--deaths">{{ playerDeaths }}</span>
          <span class="stat-separator">/</span>
          <span class="stat stat--assists">{{ playerAssists }}</span>
        </div>
        <div class="dota-player-card__meta">
          <div class="meta-item">
            <i :class="PrimeIcons.DOLLAR"></i>
            <span>{{ formatGold(playerNetWorth) }}</span>
          </div>
          <div class="meta-item">
            <span>{{ playerLastHits }} LH</span>
          </div>
        </div>
      </div>
    </div>
  </Base>
</template>

<style lang="scss" scoped>
.dota-player-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  min-width: 280px;

  &--radiant {
    border-color: rgba(146, 230, 111, 0.3);
    
    &:hover {
      border-color: rgba(146, 230, 111, 0.6);
      box-shadow: 0 0 20px rgba(146, 230, 111, 0.3);
    }
  }

  &--dire {
    border-color: rgba(230, 111, 111, 0.3);
    
    &:hover {
      border-color: rgba(230, 111, 111, 0.6);
      box-shadow: 0 0 20px rgba(230, 111, 111, 0.3);
    }
  }

  &__hero {
    position: relative;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    background: #090909;
    border: 2px solid rgba(253, 42, 54, 0.2);
  }

  &__hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__hero-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #334155;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__name {
    font-size: 1rem;
    font-weight: 700;
    color: #FFFFFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.125rem;
    font-weight: 600;

    .stat {
      &--kills {
        color: #92E66F;
      }

      &--deaths {
        color: #E66F6F;
      }

      &--assists {
        color: #6FD4E6;
      }
    }

    .stat-separator {
      color: #737373;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #A4A4A4;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      i {
        color: #FFD700;
        font-size: 0.875rem;
      }
    }
  }
}
</style>
