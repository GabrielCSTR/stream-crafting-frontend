<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { PrimeIcons } from '@primevue/core/api'

const route = useRoute()

const searchQuery = ref('')
const showSearch = ref(false)

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, index) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    path: '/' + paths.slice(0, index + 1).join('/')
  }))
})

const pageTitle = computed(() => {
  return route.meta.title || breadcrumbs.value[breadcrumbs.value.length - 1]?.label || 'Dashboard'
})

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    setTimeout(() => {
      const input = document.querySelector('.app-header__search-input') as HTMLInputElement
      input?.focus()
    }, 100)
  }
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <!-- Left Section: Breadcrumbs -->
      <div class="app-header__left">
        <div class="app-header__breadcrumbs">
          <h1 class="app-header__title">{{ pageTitle }}</h1>
          <nav class="app-header__breadcrumb-nav">
            <router-link
              v-for="(crumb, index) in breadcrumbs"
              :key="crumb.path"
              :to="crumb.path"
              class="app-header__breadcrumb-item"
              :class="{ 'app-header__breadcrumb-item--active': index === breadcrumbs.length - 1 }"
            >
              {{ crumb.label }}
              <i v-if="index < breadcrumbs.length - 1" :class="PrimeIcons.ANGLE_RIGHT" />
            </router-link>
          </nav>
        </div>
      </div>

      <!-- Right Section: Actions -->
      <div class="app-header__right">
        <!-- Search -->
        <div class="app-header__search" :class="{ 'app-header__search--active': showSearch }">
          <transition name="search-expand">
            <input
              v-if="showSearch"
              v-model="searchQuery"
              type="text"
              class="app-header__search-input"
              placeholder="Buscar..."
              @blur="showSearch = false"
            />
          </transition>
          <button
            class="app-header__action-btn app-header__search-btn"
            @click="toggleSearch"
            :title="showSearch ? 'Fechar busca' : 'Buscar'"
          >
            <i :class="showSearch ? PrimeIcons.TIMES : PrimeIcons.SEARCH" />
          </button>
        </div>

        <!-- Notifications -->
        <button class="app-header__action-btn" title="Notificações">
          <i :class="PrimeIcons.BELL" />
          <span class="app-header__badge">3</span>
        </button>

        <!-- Settings -->
        <button class="app-header__action-btn" title="Configurações">
          <i :class="PrimeIcons.COG" />
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 18, 32, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(52, 245, 163, 0.1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    gap: 2rem;

    @media (max-width: 768px) {
      padding: 0.75rem 1rem;
      gap: 1rem;
    }
  }

  &__left {
    flex: 1;
    min-width: 0;
  }

  &__breadcrumbs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #F9FAFB;
    margin: 0;
    background: linear-gradient(135deg, #F9FAFB 0%, #CBD5E1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #94A3B8;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #34F5A3;
    }

    &--active {
      color: #34F5A3;
      font-weight: 600;
    }

    i {
      font-size: 0.75rem;
      opacity: 0.5;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__search {
    display: flex;
    align-items: center;
    position: relative;

    &--active {
      .app-header__search-btn {
        background: rgba(52, 245, 163, 0.2);
        color: #34F5A3;
      }
    }
  }

  &__search-input {
    position: absolute;
    right: 48px;
    width: 200px;
    padding: 0.5rem 1rem;
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(52, 245, 163, 0.3);
    border-radius: 8px;
    color: #F9FAFB;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;

    &::placeholder {
      color: #64748B;
    }

    &:focus {
      border-color: #34F5A3;
      box-shadow: 0 0 0 3px rgba(52, 245, 163, 0.1);
    }

    @media (max-width: 768px) {
      width: 150px;
    }
  }

  &__action-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(52, 245, 163, 0.1);
    color: #CBD5E1;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(52, 245, 163, 0.1);
      border-color: rgba(52, 245, 163, 0.3);
      color: #34F5A3;
      transform: translateY(-2px);
    }

    i {
      font-size: 1.125rem;
    }
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background: linear-gradient(135deg, #F87171 0%, #DC2626 100%);
    border: 2px solid #0B1220;
    border-radius: 9px;
    font-size: 0.625rem;
    font-weight: 700;
    color: #FFF;
    box-shadow: 0 2px 8px rgba(248, 113, 113, 0.4);
  }
}

/* Search expand animation */
.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-expand-enter-from {
  opacity: 0;
  transform: translateX(20px);
  width: 0;
}

.search-expand-leave-to {
  opacity: 0;
  transform: translateX(20px);
  width: 0;
}
</style>
