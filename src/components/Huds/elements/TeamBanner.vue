<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    team: 'radiant' | 'dire'
    teamName?: string
    teamTag?: string
    logoUrl?: string
    score?: number
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
  size: () => ({ width: 300, height: 100 })
})

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)
</script>

<template>
  <Base class="stream-crafter-hud-element-team-banner" v-bind="props" v-on="on">
    <div class="dota-team-banner" :class="[`dota-team-banner--${props.data.team}`]">
      <div class="team-logo-container">
        <img v-if="props.data.logoUrl" :src="props.data.logoUrl" :alt="props.data.teamName" class="team-logo" />
        <i v-else :class="PrimeIcons.SHIELD" class="team-logo-placeholder"></i>
      </div>
      
      <div class="team-info">
        <div class="team-name">{{ props.data.teamName || 'Team Name' }}</div>
        <div class="team-tag">{{ props.data.teamTag }}</div>
      </div>

      <div class="team-score">{{ props.data.score }}</div>
    </div>
  </Base>
</template>

<style lang="scss" scoped>
.dota-team-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border-radius: 12px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  min-width: 300px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    pointer-events: none;
  }

  &--radiant {
    border-color: rgba(146, 230, 111, 0.4);

    &::before {
      background: linear-gradient(135deg, #92E66F 0%, transparent 100%);
    }

    .team-score {
      color: #92E66F;
      text-shadow: 0 0 10px rgba(146, 230, 111, 0.5);
    }
  }

  &--dire {
    border-color: rgba(230, 111, 111, 0.4);

    &::before {
      background: linear-gradient(135deg, #E66F6F 0%, transparent 100%);
    }

    .team-score {
      color: #E66F6F;
      text-shadow: 0 0 10px rgba(230, 111, 111, 0.5);
    }
  }

  .team-logo-container {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 12px;
    background: rgba(253, 42, 54, 0.1);
    border: 2px solid rgba(253, 42, 54, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    z-index: 1;
  }

  .team-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-logo-placeholder {
    font-size: 2rem;
    color: #FD2A36;
  }

  .team-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 1;
  }

  .team-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .team-tag {
    font-size: 0.875rem;
    font-weight: 500;
    color: #A4A4A4;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .team-score {
    font-size: 3rem;
    font-weight: 900;
    font-family: 'Rajdhani', sans-serif;
    line-height: 1;
    z-index: 1;
  }
}
</style>
