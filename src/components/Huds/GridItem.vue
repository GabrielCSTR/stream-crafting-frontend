<script setup lang="ts">
import type { Hud } from '@/services/models/hud'
import dayjs from 'dayjs'
import { PrimeIcons } from '@primevue/core/api'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { api } from '@/plugins/services'

const props = defineProps<{
  hud: Hud
}>()

const emit = defineEmits<{
  'delete': [hudId: string]
}>()

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()

const list = computed(() => [
  {
    key: 'elements',
    icon: PrimeIcons.TH_LARGE,
    text: 'Elementos',
    value: props.hud.elements?.length || 0
  },
  {
    key: 'created_at',
    icon: PrimeIcons.CALENDAR_PLUS,
    text: 'Criado',
    value: dayjs().to(props.hud.created_at)
  },
  {
    key: 'updated_at',
    icon: PrimeIcons.CLOCK,
    text: 'Atualizado',
    value: dayjs().to(props.hud.updated_at)
  }
])

const viewHud = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  router.push(`/app/huds/${props.hud._id}`)
}

const editHud = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  router.push(`/app/huds/${props.hud._id}/editor`)
}

const deleteHud = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  
  confirm.require({
    message: `Deseja realmente excluir o HUD "${props.hud.name}"?`,
    header: 'Confirmar exclusão',
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    rejectLabel: 'Cancelar',
    acceptLabel: 'Excluir',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Excluir',
      severity: 'danger'
    },
    accept: async () => {
      try {
        await api.huds.delete(props.hud._id)
        toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'HUD excluído com sucesso!',
          life: 3000
        })
        emit('delete', props.hud._id)
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir HUD',
          life: 3000
        })
      }
    }
  })
}
</script>

<template>
  <router-link 
    class="stream-crafting-hud-grid-item" 
    :to="`/app/huds/${props.hud._id}/editor`"
  >
    <div class="stream-crafting-hud-grid-item__card">
      <!-- Preview Image -->
      <div class="stream-crafting-hud-grid-item__preview">
        <img 
          :src="props.hud.src || `https://placehold.co/1000x500/transparent/png?font=oswald&text=${props.hud.name ? `${encodeURIComponent(props.hud.name)}` : ''}`" 
          :alt="`${props.hud.name} preview`"
          class="stream-crafting-hud-grid-item__image"
        />
        <div class="stream-crafting-hud-grid-item__overlay">
          <div class="stream-crafting-hud-grid-item__actions">
            <button 
              class="stream-crafting-hud-grid-item__action-btn"
              @click="viewHud"
            >
              <i :class="PrimeIcons.EYE" />
              <span>Visualizar</span>
            </button>
            <button 
              class="stream-crafting-hud-grid-item__action-btn"
              @click="editHud"
            >
              <i :class="PrimeIcons.PENCIL" />
              <span>Editar</span>
            </button>
            <button 
              class="stream-crafting-hud-grid-item__action-btn stream-crafting-hud-grid-item__action-btn--danger"
              @click="deleteHud"
            >
              <i :class="PrimeIcons.TRASH" />
              <span>Remover</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="stream-crafting-hud-grid-item__content">
        <h3 class="stream-crafting-hud-grid-item__title">{{ props.hud.name }}</h3>
        
        <ul class="stream-crafting-hud-grid-item__info">
          <li 
            v-for="listItem in list" 
            :key="listItem.key" 
            class="stream-crafting-hud-grid-item__info-item"
          >
            <span class="stream-crafting-hud-grid-item__info-label">
              <i :class="listItem.icon" />
              {{ listItem.text }}
            </span>
            <span class="stream-crafting-hud-grid-item__info-value">
              {{ listItem.value }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Footer Badge -->
      <div class="stream-crafting-hud-grid-item__footer">
        <div class="stream-crafting-hud-grid-item__badge">
          <i :class="PrimeIcons.CHECK_CIRCLE" />
          Ativo
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-grid-item {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;

  &__card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(135deg, #090909 0%, #242424 100%);
    border: 1px solid rgba(253, 42, 54, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

    &:hover {
      border-color: rgba(253, 42, 54, 0.3);
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);

      .stream-crafting-hud-grid-item__overlay {
        opacity: 1;
      }

      .stream-crafting-hud-grid-item__image {
        transform: scale(1.05);
      }
    }
  }

  &__preview {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #121212;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(2, 6, 23, 0.4) 0%,
      rgba(2, 6, 23, 0.8) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(253, 42, 54, 0.1);
    border: 1px solid rgba(253, 42, 54, 0.3);
    border-radius: 12px;
    color: #FD2A36;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(253, 42, 54, 0.2);
      transform: scale(1.05);
    }

    &--danger {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: #EF4444;

      &:hover {
        background: rgba(239, 68, 68, 0.2);
      }
    }

    i {
      font-size: 1.5rem;
    }

    span {
      white-space: nowrap;
    }
  }

  &__content {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #FFFFFF;
    background: linear-gradient(135deg, #FFFFFF 0%, #D4D4D4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__info {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(253, 42, 54, 0.1);
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
      border-color: rgba(253, 42, 54, 0.2);
      background: rgba(15, 23, 42, 0.8);
    }
  }

  &__info-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #A4A4A4;
    font-size: 0.875rem;
    font-weight: 500;

    i {
      color: #FD2A36;
      font-size: 0.875rem;
    }
  }

  &__info-value {
    color: #D4D4D4;
    font-size: 0.875rem;
    font-weight: 600;
  }

  &__footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(253, 42, 54, 0.1);
    background: rgba(11, 18, 32, 0.5);
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(253, 42, 54, 0.1);
    border: 1px solid rgba(253, 42, 54, 0.2);
    border-radius: 20px;
    color: #FD2A36;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    i {
      font-size: 0.875rem;
    }
  }
}
</style>
