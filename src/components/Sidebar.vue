<script lang="ts" setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import { logout } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'
import SidebarItem from './Sidebar/SidebarItem.vue'
import { useSessionStore } from '@/stores/session'
import type { PanelMenuProps } from 'primevue/panelmenu'
import type { MenuItem } from 'primevue/menuitem'

const props = defineProps<{
  collapsed?: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

const sessionStore = useSessionStore()

const list: MenuItem[] = [
  {
    icon: PrimeIcons.HOME,
    label: 'Início',
    route: '/app/welcome'
  },
  {
    icon: PrimeIcons.TH_LARGE,
    label: 'HUDs',
    route: '/app/huds'
  }
]

const profileBind = computed<PanelMenuProps>(() => ({
  pt: {
    panel: 'flex flex-col-reverse'
  },
  model: [
    {
      icon: PrimeIcons.USER,
      label: sessionStore.user?.name || 'Usuário',
      items: [
        {
          icon: PrimeIcons.USER,
          label: 'Perfil',
          route: '/app/profile'
        },
        {
          icon: PrimeIcons.SIGN_OUT,
          label: 'Sair',
          command: logout
        }
      ]
    }
  ]
}))
</script>

<template>
  <aside 
    class="stream-crafting-sidebar"
    :class="{ 'stream-crafting-sidebar--collapsed': collapsed }"
  >
    <!-- Header -->
    <div class="stream-crafting-sidebar__header">
      <router-link to="/app" class="stream-crafting-sidebar__logo-link">
        <Logo :width="collapsed ? 40 : 100" :height="collapsed ? 20 : 50" />
        <transition name="fade">
          <span v-if="!collapsed" class="stream-crafting-sidebar__brand">D2Cast</span>
        </transition>
      </router-link>
      
      <button 
        class="stream-crafting-sidebar__toggle"
        @click="emit('toggle')"
        :title="collapsed ? 'Expandir sidebar' : 'Recolher sidebar'"
      >
        <i :class="collapsed ? PrimeIcons.ANGLE_RIGHT : PrimeIcons.ANGLE_LEFT"></i>
      </button>
    </div>

    <div class="stream-crafting-sidebar__divider"></div>

    <!-- Content -->
    <nav class="stream-crafting-sidebar__content">
      <PanelMenu :model="list" class="stream-crafting-sidebar__menu">
        <template #item="{ item }">
          <SidebarItem :item="item" :collapsed="collapsed" />
        </template>
      </PanelMenu>
    </nav>

    <!-- Footer -->
    <div class="stream-crafting-sidebar__footer">
      <div class="stream-crafting-sidebar__divider"></div>
      <PanelMenu v-bind="profileBind" class="stream-crafting-sidebar__profile">
        <template #item="{ item, active }">
          <SidebarItem :item="item" :active="active" :collapsed="collapsed" />
        </template>
      </PanelMenu>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.stream-crafting-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0B1220 0%, #0F172A 100%);
  border-right: 1px solid rgba(52, 245, 163, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);

  &--collapsed {
    width: 80px;

    .stream-crafting-sidebar__brand,
    .stream-crafting-sidebar__menu :deep(.p-menuitem-text) {
      opacity: 0;
      width: 0;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    position: relative;
  }

  &__logo-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__brand {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
    transition: opacity 0.3s;
  }

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(52, 245, 163, 0.1);
    border: 1px solid rgba(52, 245, 163, 0.2);
    color: #34F5A3;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(52, 245, 163, 0.2);
      transform: scale(1.1);
    }

    i {
      font-size: 0.875rem;
    }
  }

  &__divider {
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(52, 245, 163, 0) 0%,
      rgba(52, 245, 163, 0.2) 50%,
      rgba(52, 245, 163, 0) 100%
    );
    margin: 0 1rem;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem 0.5rem;

    /* Scrollbar customizada */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(52, 245, 163, 0.2);
      border-radius: 2px;
      
      &:hover {
        background: rgba(52, 245, 163, 0.3);
      }
    }
  }

  &__menu,
  &__profile {
    :deep(.p-panelmenu) {
      background: transparent;
      border: none;
    }

    :deep(.p-panelmenu-panel) {
      background: transparent;
      border: none;
      margin-bottom: 0.25rem;
    }

    :deep(.p-panelmenu-header) {
      background: transparent;
      border: none;
    }

    :deep(.p-panelmenu-content) {
      background: transparent;
      border: none;
      padding: 0;
    }
  }

  &__footer {
    padding: 0.5rem;
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
