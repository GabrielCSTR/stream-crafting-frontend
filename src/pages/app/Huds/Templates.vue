<template>
  <div class="huds-templates">
    <!-- Header -->
    <div class="huds-templates__header">
      <div class="huds-templates__title-section">
        <h1 class="huds-templates__title">
          <i :class="PrimeIcons.IMAGES" class="huds-templates__title-icon"></i>
          Templates
        </h1>
        <p class="huds-templates__description">
          Escolha um template pronto para começar rapidamente
        </p>
      </div>
      <Button
        :icon="PrimeIcons.EYE"
        label="Ver Componentes"
        outlined
        @click="router.push('/app/huds/preview')"
      />
    </div>

    <!-- Loading State -->
    <ProfessionalLoading v-if="loading" />

    <!-- Templates Grid -->
    <div v-else class="huds-templates__grid">
      <div
        v-for="template in templates"
        :key="template._id"
        class="template-card"
        @click="useTemplate(template)"
      >
        <div class="template-card__image-container">
          <img
            :src="template.src"
            :alt="template.name"
            class="template-card__image"
          />
          <div class="template-card__overlay">
            <Button
              :icon="PrimeIcons.CHECK"
              label="Usar Template"
              severity="success"
              rounded
              @click.stop="useTemplate(template)"
            />
          </div>
          <div class="template-card__badge">
            <i :class="PrimeIcons.STAR"></i>
            Template
          </div>
        </div>
        <div class="template-card__content">
          <h3 class="template-card__title">{{ template.name }}</h3>
          <p class="template-card__description">{{ template.description }}</p>
          <div class="template-card__meta">
            <span class="template-card__meta-item">
              <i :class="PrimeIcons.EYE"></i>
              {{ template.uses || 0 }} usos
            </span>
            <span class="template-card__meta-item">
              <i :class="PrimeIcons.TAGS"></i>
              {{ template.category }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && templates.length === 0" class="huds-templates__empty">
      <i :class="PrimeIcons.IMAGES" class="huds-templates__empty-icon"></i>
      <h3 class="huds-templates__empty-title">Nenhum template disponível</h3>
      <p class="huds-templates__empty-text">
        Em breve teremos templates prontos para você usar
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProfessionalLoading from '@/components/ProfessionalLoading.vue'
import { dayjs } from '@/plugins/dayjs'
import type { Hud } from '@/services/models/hud'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const loading = ref(false)

interface Template extends Hud {
  description: string
  category: string
  uses?: number
}

const templates = ref<Template[]>([
  {
    _id: 'template-1',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/0F172A/34F5A3?text=Tournament+Pro+HUD&font=raleway',
    name: 'Tournament Pro',
    description: 'HUD profissional para transmissões de torneios. Inclui scoreboard, draft panel, player cards e timer.',
    category: 'Professional',
    uses: 245
  },
  {
    _id: 'template-2',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/1E293B/6D5DF6?text=Clean+Overlay&font=raleway',
    name: 'Clean Overlay',
    description: 'Overlay limpo e minimalista com foco nas informações essenciais do jogo.',
    category: 'Minimal',
    uses: 189
  },
  {
    _id: 'template-3',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/020617/3AF2E9?text=Draft+Focus&font=raleway',
    name: 'Draft Focus',
    description: 'Template especializado para fase de draft com destaque para picks e bans.',
    category: 'Draft',
    uses: 156
  },
  {
    _id: 'template-4',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/0B1220/92E66F?text=In-Game+Complete&font=raleway',
    name: 'In-Game Complete',
    description: 'HUD completo para transmissão in-game com todas as estatísticas dos jogadores.',
    category: 'Complete',
    uses: 312
  },
  {
    _id: 'template-5',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/1E293B/E66F6F?text=Team+Comparison&font=raleway',
    name: 'Team Comparison',
    description: 'Layout focado em comparação entre times com banners e estatísticas side-by-side.',
    category: 'Comparison',
    uses: 134
  },
  {
    _id: 'template-6',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1200x675/0F172A/FFC864?text=Minimal+Scoreboard&font=raleway',
    name: 'Minimal Scoreboard',
    description: 'Scoreboard minimalista para não obstruir a visão do jogo.',
    category: 'Minimal',
    uses: 201
  }
])

const useTemplate = async (template: Template) => {
  loading.value = true
  try {
    // Aqui você faria a lógica de copiar o template
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.add({
      severity: 'success',
      summary: 'Template aplicado',
      detail: `O template "${template.name}" foi adicionado aos seus HUDs`,
      life: 3000
    })
    
    // Redirecionar para edição do novo HUD
    router.push('/app/huds')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível usar o template',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.huds-templates {
  min-height: calc(100vh - 180px);
  padding: 2rem;

  &__header {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  &__title-section {
    flex: 1;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #FD2A36 0%, #2671F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__title-icon {
    font-size: 1.75rem;
  }

  &__description {
    color: #A4A4A4;
    font-size: 1rem;
    margin: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    padding: 3rem;
  }

  &__empty-icon {
    font-size: 4rem;
    color: #334155;
    margin-bottom: 1.5rem;
  }

  &__empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #E2E8F0;
    margin: 0 0 0.5rem 0;
  }

  &__empty-text {
    color: #A4A4A4;
    font-size: 1rem;
    margin: 0;
  }
}

.template-card {
  background: linear-gradient(135deg, #090909 0%, #242424 100%);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(253, 42, 54, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(253, 42, 54, 0.15);
    border-color: rgba(253, 42, 54, 0.3);

    .template-card__image {
      transform: scale(1.05);
    }

    .template-card__overlay {
      opacity: 1;
    }
  }

  &__image-container {
    position: relative;
    width: 100%;
    padding-top: 50%;
    overflow: hidden;
    background: #000000;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #FFAF0E 0%, #2671F4 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(255, 175, 14, 0.3);
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #E2E8F0;
    margin: 0 0 0.5rem 0;
  }

  &__description {
    color: #A4A4A4;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }

  &__meta {
    display: flex;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
  }

  &__meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #737373;
    font-size: 0.875rem;

    i {
      color: #FD2A36;
    }
  }
}

@media (max-width: 768px) {
  .huds-templates {
    padding: 1rem;

    &__grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
