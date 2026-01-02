<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import { LIST } from '@/composables/useElement'
import type { IHUDElement } from '@/types/hud'
import { PrimeIcons } from '@primevue/core/api'
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const list = ref<IHUDElement[]>([])

const overlayUrl = computed(() => {
  const hudId = route.params.hudId
  return `${window.location.origin}/overlay/${hudId}`
})

onMounted(() => {
  list.value = LIST
})

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
      <div class="stream-crafting-hud-view__canvas-wrapper">
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
    -actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 0.25rem;

      button {
        white-space: nowrap;
      }
      i {
        color: #34F5A3;
        -webkit-text-fill-color: #34F5A3;
      }
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
