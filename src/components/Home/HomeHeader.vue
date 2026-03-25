<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '../Logo.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <header class="d2cast-header fixed top-0 left-0 right-0 w-full z-50 max-w-full">
    <nav class="d2cast-header__nav container mx-auto px-6">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <RouterLink to="/" class="d2cast-header__logo flex items-center">
          <Logo :width="120" :height="40" />
        </RouterLink>

        <!-- Navigation Links -->
        <div class="d2cast-header__links hidden md:flex items-center gap-6">
          <a href="#features" class="d2cast-header__link">Funcionalidades</a>
          <a href="#how-it-works" class="d2cast-header__link">Como Funciona</a>
          <a href="#pricing" class="d2cast-header__link">Preços</a>
        </div>

        <!-- Actions -->
        <div class="d2cast-header__actions flex items-center gap-4">
          <RouterLink to="/signin">
            <p-button :label="t('buttons.signin')" text class="d2cast-header__button-text" />
          </RouterLink>
          <RouterLink to="/signup">
            <p-button label="Download" class="d2cast-header__button-primary" />
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.d2cast-header {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  background-color: rgba(18, 18, 18, 0.92);
  border-bottom: 1px solid #242424;
  transition: all 0.3s ease;

  &__nav {
    max-width: 1400px;
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  &__logo {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__links {
    flex: 1;
    justify-content: center;
  }

  &__link {
    color: #D4D4D4;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(253, 42, 54, 0.08);
      color: #FD2A36;
    }
  }

  &__actions {
    gap: 0.75rem;
  }

  &__button-text {
    color: #D4D4D4;
  }

  &__button-primary {
    background: #FD2A36;
    border: none;
    color: #FFFFFF;
  }
}
</style>
