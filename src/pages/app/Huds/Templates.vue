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
    src: 'https://placehold.co/1000x500/1a1a1a/34F5A3?text=Minimal+Dark',
    name: 'Minimal Dark',
    description: 'Template minimalista com fundo escuro e elementos destacados',
    category: 'Minimal',
    uses: 145
  },
  {
    _id: 'template-2',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1000x500/6D5DF6/ffffff?text=Tournament+Pro',
    name: 'Tournament Pro',
    description: 'Design profissional para transmissões de torneios',
    category: 'Professional',
    uses: 89
  },
  {
    _id: 'template-3',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1000x500/3AF2E9/1a1a1a?text=Neon+Glow',
    name: 'Neon Glow',
    description: 'Visual moderno com efeitos neon e cores vibrantes',
    category: 'Modern',
    uses: 203
  },
  {
    _id: 'template-4',
    created_at: dayjs().toDate(),
    updated_at: dayjs().toDate(),
    src: 'https://placehold.co/1000x500/0F172A/34F5A3?text=Clean+Stream',
    name: 'Clean Stream',
    description: 'Layout limpo e simples para streams casuais',
    category: 'Casual',
    uses: 67
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
    background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
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
    color: #94A3B8;
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
    color: #94A3B8;
    font-size: 1rem;
    margin: 0;
  }
}

.template-card {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(52, 245, 163, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(52, 245, 163, 0.15);
    border-color: rgba(52, 245, 163, 0.3);

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
    background: #020617;
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
    background: linear-gradient(135deg, #6D5DF6 0%, #8B7CFF 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(109, 93, 246, 0.3);
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
    color: #94A3B8;
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
    color: #64748B;
    font-size: 0.875rem;

    i {
      color: #34F5A3;
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
