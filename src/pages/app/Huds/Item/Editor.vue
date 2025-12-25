<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import { LIST } from '@/composables/useElement'
import type { IHUDElement } from '@/types/hud'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const list = ref<IHUDElement[]>([])
const isSaving = ref(false)

onMounted(() => {
  list.value = LIST
})

const goBack = () => {
  router.push('/app/huds')
}

const viewHud = () => {
  router.push(`/app/huds/${route.params.id}`)
}

const saveHud = async () => {
  isSaving.value = true
  try {
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'HUD salvo com sucesso!',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao salvar HUD',
      life: 3000
    })
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="stream-crafting-hud-editor">
    <div class="stream-crafting-hud-editor__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="secondary"
        @click="goBack"
        class="stream-crafting-hud-editor__back-btn"
      />
      <div class="stream-crafting-hud-editor__title-section">
        <h1 class="stream-crafting-hud-editor__title">
          <i :class="PrimeIcons.PALETTE" />
          Editor de HUD
        </h1>
        <p class="stream-crafting-hud-editor__subtitle">
          Personalize todos os elementos do seu HUD
        </p>
      </div>
      <div class="stream-crafting-hud-editor__actions">
        <Button
          label="Visualizar"
          :icon="PrimeIcons.EYE"
          severity="secondary"
          outlined
          @click="viewHud"
        />
        <Button
          label="Salvar"
          :icon="PrimeIcons.SAVE"
          severity="success"
          :loading="isSaving"
          @click="saveHud"
        />
      </div>
    </div>

    <div class="stream-crafting-hud-editor__content">
      <div class="stream-crafting-hud-editor__canvas-wrapper">
        <HUDCanvas v-model="list" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-editor {
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

  &__subtitle {
    color: #94A3B8;
    font-size: 0.9375rem;
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
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
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      padding: 1px;
      background: linear-gradient(135deg, rgba(52, 245, 163, 0.2), rgba(58, 242, 233, 0.2));
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
    }
  }
}
</style>
