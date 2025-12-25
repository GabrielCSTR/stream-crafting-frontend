<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'

interface MapData {
  game_time: number
  daytime: boolean
  nightstalker_night: boolean
}

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    mapData?: MapData
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
  size: () => ({ width: 200, height: 80 })
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
</script>

<template>
  <Base class="stream-crafter-hud-element-game-timer" v-bind="props" v-on="on">
    <div class="dota-game-timer" :class="{ 'dota-game-timer--night': !props.data.mapData?.daytime }">
      <div class="timer-icon">
        <i :class="props.data.mapData?.daytime ? PrimeIcons.SUN : PrimeIcons.MOON"></i>
      </div>
      <div class="timer-display">
        <div class="timer-value">{{ formatTime(props.data.mapData?.game_time || 0) }}</div>
        <div class="timer-label">{{ props.data.mapData?.daytime ? 'Day' : 'Night' }}</div>
      </div>
    </div>
  </Base>
</template>

<style lang="scss" scoped>
.dota-game-timer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, rgba(255, 200, 100, 0.15) 0%, rgba(255, 150, 50, 0.15) 100%);
  border-radius: 12px;
  border: 2px solid rgba(255, 200, 100, 0.3);
  transition: all 0.3s ease;

  &--night {
    background: linear-gradient(135deg, rgba(100, 150, 255, 0.15) 0%, rgba(50, 100, 200, 0.15) 100%);
    border-color: rgba(100, 150, 255, 0.3);

    .timer-icon {
      color: #6496FF;
    }

    .timer-value {
      color: #6496FF;
    }
  }

  .timer-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    color: #FFC864;
    font-size: 1.25rem;
  }

  .timer-display {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .timer-value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Rajdhani', sans-serif;
    color: #FFC864;
    line-height: 1;
  }

  .timer-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style>
