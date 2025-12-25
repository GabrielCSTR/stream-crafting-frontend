<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'

interface PlayerData {
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

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    playerData?: PlayerData
    heroImage?: string
    team?: 'radiant' | 'dire'
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

const formatGold = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}
</script>

<template>
  <Base class="stream-crafter-hud-element-player-card" v-bind="props" v-on="on">
    <div class="dota-player-card" :class="[`dota-player-card--${props.data.team}`]">
      <div class="dota-player-card__hero">
        <img 
          v-if="props.data.heroImage"
          :src="props.data.heroImage" 
          :alt="props.data.playerData?.name"
          class="dota-player-card__hero-img"
        />
        <div v-else class="dota-player-card__hero-placeholder">
          <i :class="PrimeIcons.USER"></i>
        </div>
      </div>
      
      <div class="dota-player-card__info">
        <div class="dota-player-card__name">{{ props.data.playerData?.name || 'Player' }}</div>
        <div class="dota-player-card__stats">
          <span class="stat stat--kills">{{ props.data.playerData?.kills || 0 }}</span>
          <span class="stat-separator">/</span>
          <span class="stat stat--deaths">{{ props.data.playerData?.deaths || 0 }}</span>
          <span class="stat-separator">/</span>
          <span class="stat stat--assists">{{ props.data.playerData?.assists || 0 }}</span>
        </div>
        <div class="dota-player-card__meta">
          <div class="meta-item">
            <i :class="PrimeIcons.DOLLAR"></i>
            <span>{{ formatGold(props.data.playerData?.net_worth || 0) }}</span>
          </div>
          <div class="meta-item">
            <span>{{ props.data.playerData?.last_hits || 0 }} LH</span>
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
    background: #0F172A;
    border: 2px solid rgba(52, 245, 163, 0.2);
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
    color: #F9FAFB;
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
      color: #64748B;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #94A3B8;

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
