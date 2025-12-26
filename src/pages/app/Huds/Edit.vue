<script lang="ts" setup>
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/app/huds')
}
</script>

<template>
  <div class="stream-crafting-hud-edit">
    <div class="stream-crafting-hud-edit__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="secondary"
        @click="goBack"
        class="stream-crafting-hud-edit__back-btn"
      />
      <div class="stream-crafting-hud-edit__title-section">
        <h1 class="stream-crafting-hud-edit__title">
          <i :class="PrimeIcons.PENCIL" />
          Editar HUD
        </h1>
        <p class="stream-crafting-hud-edit__subtitle">
          Modifique seu HUD personalizado
        </p>
      </div>
    </div>
    
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-edit {
  width: 100%;
  height: 100%;
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
}
</style>
