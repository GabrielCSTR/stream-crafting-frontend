<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'

interface MapData {
  game_time: number
  radiant_score: number
  dire_score: number
  game_state: string
  daytime: boolean
}

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    mapData?: MapData
    radiantLogo?: string
    direLogo?: string
    radiantName?: string
    direName?: string
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

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

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
    <div class="dota-scoreboard">
      <div class="dota-scoreboard__team dota-scoreboard__team--radiant">
        <div class="team-logo">
          <img v-if="props.data.radiantLogo" :src="props.data.radiantLogo" alt="Radiant" />
          <i v-else :class="PrimeIcons.SHIELD"></i>
        </div>
        <div class="team-name">{{ props.data.radiantName || 'Radiant' }}</div>
        <div class="team-score">{{ props.data.mapData?.radiant_score || 0 }}</div>
      </div>

      <div class="dota-scoreboard__center">
        <div class="game-time">{{ formatTime(props.data.mapData?.game_time || 0) }}</div>
        <div class="game-state">{{ formatGameState(props.data.mapData?.game_state) }}</div>
      </div>

      <div class="dota-scoreboard__team dota-scoreboard__team--dire">
        <div class="team-score">{{ props.data.mapData?.dire_score || 0 }}</div>
        <div class="team-name">{{ props.data.direName || 'Dire' }}</div>
        <div class="team-logo">
          <img v-if="props.data.direLogo" :src="props.data.direLogo" alt="Dire" />
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
