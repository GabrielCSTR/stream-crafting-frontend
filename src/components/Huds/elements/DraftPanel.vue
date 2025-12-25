<script lang="ts" setup>
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'

interface DraftData {
  activeteam: number
  pick: boolean
  activeteam_time_remaining: number
  team2?: Record<string, string | number | boolean>
  team3?: Record<string, string | number | boolean>
}

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    draftData?: DraftData
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
  size: () => ({ width: 800, height: 400 })
})

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)

const getHeroImage = (heroClass: string | number | boolean) => {
  if (!heroClass || typeof heroClass !== 'string') return ''
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroClass}.png`
}

const getHeroAlt = (heroClass: string | number | boolean) => {
  if (!heroClass || typeof heroClass !== 'string') return ''
  return heroClass
}

const formatTimer = (seconds: number) => {
  return seconds > 0 ? `${seconds}s` : '--'
}
</script>

<template>
  <Base class="stream-crafter-hud-element-draft-panel" v-bind="props" v-on="on">
    <div class="dota-draft-panel">
      <div class="dota-draft-panel__team dota-draft-panel__team--radiant">
        <div class="team-header">
          <span class="team-name">{{ props.data.radiantName || 'Radiant' }}</span>
        </div>
        
        <!-- Picks -->
        <div class="draft-section">
          <div class="section-label">Picks</div>
          <div class="heroes-grid">
            <div 
              v-for="i in 5" 
              :key="`radiant-pick-${i}`"
              class="hero-slot"
            >
              <img 
                v-if="props.data.draftData?.team2?.[`pick${i-1}_class`]"
                :src="getHeroImage(props.data.draftData.team2[`pick${i-1}_class`])"
                :alt="getHeroAlt(props.data.draftData.team2[`pick${i-1}_class`])"
                class="hero-img"
              />
              <div v-else class="hero-placeholder">
                <i :class="PrimeIcons.QUESTION"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Bans -->
        <div class="draft-section draft-section--bans">
          <div class="section-label">Bans</div>
          <div class="heroes-grid heroes-grid--small">
            <div 
              v-for="i in 7" 
              :key="`radiant-ban-${i}`"
              class="hero-slot hero-slot--small"
            >
              <img 
                v-if="props.data.draftData?.team2?.[`ban${i-1}_class`]"
                :src="getHeroImage(props.data.draftData.team2[`ban${i-1}_class`])"
                :alt="getHeroAlt(props.data.draftData.team2[`ban${i-1}_class`])"
                class="hero-img hero-img--banned"
              />
              <div v-else class="hero-placeholder">
                <i :class="PrimeIcons.BAN"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dota-draft-panel__divider">
        <div class="timer">
          <i :class="PrimeIcons.CLOCK"></i>
          <span>{{ formatTimer(props.data.draftData?.activeteam_time_remaining || 0) }}</span>
        </div>
        <div class="phase">{{ props.data.draftData?.pick ? 'PICK' : 'BAN' }} PHASE</div>
      </div>

      <div class="dota-draft-panel__team dota-draft-panel__team--dire">
        <div class="team-header">
          <span class="team-name">{{ props.data.direName || 'Dire' }}</span>
        </div>
        
        <!-- Picks -->
        <div class="draft-section">
          <div class="section-label">Picks</div>
          <div class="heroes-grid">
            <div 
              v-for="i in 5" 
              :key="`dire-pick-${i}`"
              class="hero-slot"
            >
              <img 
                v-if="props.data.draftData?.team3?.[`pick${i-1}_class`]"
                :src="getHeroImage(props.data.draftData.team3[`pick${i-1}_class`])"
                :alt="getHeroAlt(props.data.draftData.team3[`pick${i-1}_class`])"
                class="hero-img"
              />
              <div v-else class="hero-placeholder">
                <i :class="PrimeIcons.QUESTION"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Bans -->
        <div class="draft-section draft-section--bans">
          <div class="section-label">Bans</div>
          <div class="heroes-grid heroes-grid--small">
            <div 
              v-for="i in 7" 
              :key="`dire-ban-${i}`"
              class="hero-slot hero-slot--small"
            >
              <img 
                v-if="props.data.draftData?.team3?.[`ban${i-1}_class`]"
                :src="getHeroImage(props.data.draftData.team3[`ban${i-1}_class`])"
                :alt="getHeroAlt(props.data.draftData.team3[`ban${i-1}_class`])"
                class="hero-img hero-img--banned"
              />
              <div v-else class="hero-placeholder">
                <i :class="PrimeIcons.BAN"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Base>
</template>

<style lang="scss" scoped>
.dota-draft-panel {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  border-radius: 12px;
  border: 2px solid rgba(52, 245, 163, 0.2);
  backdrop-filter: blur(10px);

  &__team {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &--radiant {
      .team-name {
        color: #92E66F;
      }
    }

    &--dire {
      .team-name {
        color: #E66F6F;
      }
    }
  }

  .team-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(52, 245, 163, 0.1);
  }

  .team-name {
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .draft-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &--bans {
      margin-top: 0.5rem;
    }
  }

  .section-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .heroes-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;

    &--small {
      grid-template-columns: repeat(7, 1fr);
    }
  }

  .hero-slot {
    position: relative;
    aspect-ratio: 16/9;
    border-radius: 4px;
    overflow: hidden;
    background: #0F172A;
    border: 2px solid rgba(52, 245, 163, 0.2);

    &--small {
      aspect-ratio: 1;
    }
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--banned {
      opacity: 0.4;
      filter: grayscale(100%);
    }
  }

  .hero-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #334155;
    font-size: 1.25rem;
  }

  &__divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-left: 2px solid rgba(52, 245, 163, 0.1);
    border-right: 2px solid rgba(52, 245, 163, 0.1);
    min-width: 120px;
  }

  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Rajdhani', sans-serif;
    color: #34F5A3;

    i {
      font-size: 1rem;
      color: #94A3B8;
    }
  }

  .phase {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
</style>
