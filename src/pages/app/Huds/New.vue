<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import type { IHUDElement } from '@/types/hud'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const list = ref<IHUDElement[]>([])

onMounted(() => {
  list.value = []
})

const goBack = () => {
  router.push('/app/huds')
}
</script>

<template>
  <div class="stream-crafting-hud-new">
    <div class="stream-crafting-hud-new__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="info"
        @click="goBack"
        class="stream-crafting-hud-new__back-btn"
      />
      <div class="stream-crafting-hud-new__title-section">
        <h1 class="stream-crafting-hud-new__title">
          <i :class="PrimeIcons.PLUS_CIRCLE" />
          Criar Novo HUD
        </h1>
        <p class="stream-crafting-hud-new__subtitle">
          Crie seu HUD personalizado do zero
        </p>
      </div>
    </div>

    <div class="stream-crafting-hud-new__content">
      <HUDCanvas v-model="list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-new {
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__back-btn {
    margin-top: 0.25rem;
  }

  &__title-section {
    flex: 1;
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

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
}
</style>
