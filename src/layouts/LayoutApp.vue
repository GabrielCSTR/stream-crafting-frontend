<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showSidebar = computed(() => !route.meta.hideSidebar)
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="stream-crafting-layout-app">
    <Sidebar 
      v-if="showSidebar" 
      :collapsed="sidebarCollapsed"
      @toggle="toggleSidebar"
    />

    <main 
      class="stream-crafting-layout-app__content"
      :class="{ 
        'stream-crafting-layout-app__content--expanded': sidebarCollapsed,
        'stream-crafting-layout-app__content--with-sidebar': showSidebar 
      }"
    >
      <AppHeader v-if="showSidebar" />
      
      <div 
        class="stream-crafting-layout-app__container"
        :class="{ 'stream-crafting-layout-app__container--no-padding': !showSidebar }"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-layout-app {
  display: flex;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #020617 0%, #0B1220 100%);
  overflow: hidden;

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &--with-sidebar {
      margin-left: 280px;

      &.stream-crafting-layout-app__content--expanded {
        margin-left: 80px;
      }
    }

    /* Scrollbar customizada */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.5);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(52, 245, 163, 0.3);
      border-radius: 4px;
      
      &:hover {
        background: rgba(52, 245, 163, 0.5);
      }
    }
  }

  &__container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    
    &--no-padding {
      max-width: 100%;
      padding: 0;
      height: 100%;
    }
    
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
}

/* Transições de página */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
