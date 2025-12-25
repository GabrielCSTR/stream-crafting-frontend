<script lang="ts" setup>
defineProps<{
  title?: string
  subtitle?: string
  noPadding?: boolean
  hoverable?: boolean
  glowEffect?: boolean
}>()
</script>

<template>
  <div 
    class="professional-card"
    :class="{
      'professional-card--hoverable': hoverable,
      'professional-card--glow': glowEffect
    }"
  >
    <div v-if="title || subtitle || $slots.header" class="professional-card__header">
      <slot name="header">
        <div v-if="title || subtitle" class="professional-card__title-section">
          <h3 v-if="title" class="professional-card__title">{{ title }}</h3>
          <p v-if="subtitle" class="professional-card__subtitle">{{ subtitle }}</p>
        </div>
      </slot>
      <div v-if="$slots.actions" class="professional-card__actions">
        <slot name="actions" />
      </div>
    </div>
    
    <div 
      class="professional-card__content"
      :class="{ 'professional-card__content--no-padding': noPadding }"
    >
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="professional-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.professional-card {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border: 1px solid rgba(52, 245, 163, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

  &--hoverable {
    cursor: pointer;

    &:hover {
      border-color: rgba(52, 245, 163, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }
  }

  &--glow {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      padding: 1px;
      background: linear-gradient(135deg, #34F5A3, #3AF2E9);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(52, 245, 163, 0.1);
    gap: 1rem;
  }

  &__title-section {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #F9FAFB;
    margin: 0 0 0.25rem 0;
    background: linear-gradient(135deg, #F9FAFB 0%, #CBD5E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__subtitle {
    font-size: 0.875rem;
    color: #94A3B8;
    margin: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__content {
    padding: 1.5rem;

    &--no-padding {
      padding: 0;
    }
  }

  &__footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(52, 245, 163, 0.1);
    background: rgba(11, 18, 32, 0.5);
  }
}
</style>
