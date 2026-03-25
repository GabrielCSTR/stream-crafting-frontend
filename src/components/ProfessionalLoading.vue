<script lang="ts" setup>
defineProps<{
  fullscreen?: boolean
  text?: string
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <div 
    class="professional-loading"
    :class="{
      'professional-loading--fullscreen': fullscreen,
      [`professional-loading--${size}`]: size
    }"
  >
    <div class="professional-loading__spinner">
      <div class="professional-loading__circle"></div>
      <div class="professional-loading__circle"></div>
      <div class="professional-loading__circle"></div>
    </div>
    <p v-if="text" class="professional-loading__text">{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.professional-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;

  &--fullscreen {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.82);
    backdrop-filter: blur(8px);
    z-index: 9999;
  }

  &--small {
    .professional-loading__spinner {
      width: 40px;
      height: 40px;
    }

    .professional-loading__circle {
      width: 12px;
      height: 12px;
    }
  }

  &--medium {
    .professional-loading__spinner {
      width: 60px;
      height: 60px;
    }

    .professional-loading__circle {
      width: 16px;
      height: 16px;
    }
  }

  &--large {
    .professional-loading__spinner {
      width: 80px;
      height: 80px;
    }

    .professional-loading__circle {
      width: 20px;
      height: 20px;
    }
  }

  &__spinner {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__circle {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FD2A36 0%, #FFAF0E 100%);
    box-shadow: 0 0 20px rgba(253, 42, 54, 0.35);
    animation: orbit 2s ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }

    &:nth-child(2) {
      animation-delay: 0.33s;
    }

    &:nth-child(3) {
      animation-delay: 0.66s;
    }
  }

  &__text {
    font-size: 1rem;
    color: #D4D4D4;
    font-weight: 500;
    text-align: center;
    margin: 0;
    animation: pulse-text 1.5s ease-in-out infinite;
  }
}

@keyframes orbit {
  0%, 100% {
    transform: translate(0, -25px) scale(1);
    opacity: 1;
  }
  33% {
    transform: translate(22px, 12px) scale(0.8);
    opacity: 0.7;
  }
  66% {
    transform: translate(-22px, 12px) scale(0.8);
    opacity: 0.7;
  }
}

@keyframes pulse-text {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
