<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import { api } from '@/plugins/services'
import type { IHUDElement } from '@/types/hud'
import { PrimeIcons } from '@primevue/core/api'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const list = ref<IHUDElement[]>([])
const loading = ref(true)
const error = ref('')

const overlayUrl = computed(() => {
  const hudId = route.params.hudId
  return `${window.location.origin}/overlay/${hudId}`
})

const loadHud = async (hudId: string) => {
  try {
    loading.value = true
    error.value = ''

    const hudData = await api.huds.findOne(hudId)

    if (!hudData) {
      throw new Error('HUD não encontrada')
    }

    list.value = (hudData.elements || []).map((element: any) => ({
      id: element.id,
      component: element.component,
      backgroundColor: element.backgroundColor || '#000000',
      color: element.color || '#ffffff',
      position: element.position,
      size: element.size,
      isShowed: element.isShowed,
      maintainAspectRatio: element.maintainAspectRatio || false,
      layer: element.layer || 0,
      data: element.data || {},
      ...(element.groupId && { groupId: element.groupId }),
      ...(element.transparentBackground && { transparentBackground: element.transparentBackground })
    }))
  } catch (err) {
    console.error('Error loading HUD:', err)
    error.value = 'Erro ao carregar HUD'
    list.value = []

    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao carregar HUD',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const hudId = route.params.hudId as string | undefined

  if (!hudId) {
    error.value = 'ID da HUD não fornecido'
    loading.value = false
    return
  }

  await loadHud(hudId)
})

watch(
  () => route.params.hudId,
  async (newHudId) => {
    if (typeof newHudId === 'string' && newHudId) {
      await loadHud(newHudId)
    }
  }
)

const goBack = () => {
  router.push('/app/huds')
}

const editHud = () => {
  router.push(`/app/huds/${route.params.hudId}/editor`)
}

const copyOverlayLink = async () => {
  try {
    await navigator.clipboard.writeText(overlayUrl.value)
    toast.add({
      severity: 'success',
      summary: 'Link copiado!',
      detail: 'O link do overlay foi copiado para a área de transferência',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível copiar o link',
      life: 3000
    })
  }
}

const openOverlay = () => {
  window.open(overlayUrl.value, '_blank', 'width=1920,height=1080')
}
</script>

<template>
  <div class="stream-crafting-hud-view">
    <div class="stream-crafting-hud-view__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="secondary"
        @click="goBack"
        class="stream-crafting-hud-view__back-btn"
      />
      <div class="stream-crafting-hud-view__title-section">
        <h1 class="stream-crafting-hud-view__title">
          <i :class="PrimeIcons.EYE" />
          Visualizar HUD
        </h1>
        <p class="stream-crafting-hud-view__subtitle">
          Prévia do seu HUD em modo de visualização
        </p>
      </div>
      <div class="stream-crafting-hud-view__actions">
        <Button
          label="Copiar Link Overlay"
          :icon="PrimeIcons.COPY"
          severity="secondary"
          outlined
          @click="copyOverlayLink"
        />
        <Button
          label="Abrir Overlay"
          :icon="PrimeIcons.EXTERNAL_LINK"
          severity="success"
          outlined
          @click="openOverlay"
        />
        <Button
          label="Editar"
          :icon="PrimeIcons.PENCIL"
          severity="info"
          @click="editHud"
        />
      </div>
    </div>

    <div class="stream-crafting-hud-view__content">
      <div v-if="loading" class="stream-crafting-hud-view__state">
        <i :class="PrimeIcons.SPINNER" class="pi-spin" />
        <p>Carregando HUD...</p>
      </div>

      <div v-else-if="error" class="stream-crafting-hud-view__state stream-crafting-hud-view__state--error">
        <i :class="PrimeIcons.EXCLAMATION_TRIANGLE" />
        <p>{{ error }}</p>
      </div>

      <div v-else class="stream-crafting-hud-view__canvas-wrapper">
        <HUDCanvas v-model="list" disable />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-view {
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__back-btn {
    margin-top: 0.25rem;
  }

  &__title-section {
    flex: 1;
    min-width: 200px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    i {
      color: #34F5A3;
      -webkit-text-fill-color: #34F5A3;
    }
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;

    button {
      white-space: nowrap;
    }
  }

  &__subtitle {
    color: #94A3B8;
    font-size: 0.9375rem;
    margin: 0;
  }

  &__edit-btn {
    white-space: nowrap;
    margin-top: 0.25rem;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  &__state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border: 1px solid rgba(52, 245, 163, 0.1);
    border-radius: 16px;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    color: #CBD5E1;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

    i {
      font-size: 2rem;
      color: #34F5A3;
    }
  }

  &__state--error {
    i {
      color: #F87171;
    }
  }

  &__canvas-wrapper {
    flex: 1;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border: 1px solid rgba(52, 245, 163, 0.1);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }
}
</style>
