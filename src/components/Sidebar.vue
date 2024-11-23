<script lang="ts" setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import { logout } from '@/utils'
import { PrimeIcons } from '@primevue/core/api'
import SidebarItem from './Sidebar/SidebarItem.vue'
import { useSessionStore } from '@/stores/session'
import type { PanelMenuProps } from 'primevue/panelmenu'
import type { MenuItem } from 'primevue/menuitem'

const sessionStore = useSessionStore()

const list: MenuItem[] = [
  {
    icon: PrimeIcons.HOME,
    label: '[Início]',
    route: '/app/welcome'
  },
  {
    icon: PrimeIcons.TH_LARGE,
    label: '[Huds]',
    route: '/app/huds'
  }
]

const profileBind = computed<PanelMenuProps>(() => ({
  pt: {
    panel: 'flex flex-col-reverse'
  },
  model: [
    {
      icon: PrimeIcons.HOME,
      label: sessionStore.user?.name,
      items: [
        {
          icon: PrimeIcons.USER,
          label: '[Profile]',
          route: '/app/profile'
        },
        {
          icon: PrimeIcons.SIGN_OUT,
          label: '[Sair]',
          command: logout
        }
      ]
    }
  ]
}))
</script>

<template>
  <div class="stream-crafting-sidebar flex flex-col w-2/12 h-full min-w-[20%] px-2">
    <!-- header -->
    <div class="stream-crafting-sidebar__header flex justify-center py-4">
      <router-link to="/app">
        <Logo></Logo>
      </router-link>
    </div>

    <!-- content -->
    <div class="stream-crafting-sidebar__content flex flex-col w-full h-full">
      <!-- <SidebarItem v-for="(item, itemIndex) in list" :key="item.key || itemIndex" :item="item" /> -->
      <PanelMenu :model="list">
        <template #item="{ item }">
          <SidebarItem :item="item" />
        </template>
      </PanelMenu>
    </div>

    <!-- footer -->
    <div class="stream-crafting-sidebar__footer">
      <ul class="list-none p-0 m-0">
        <PanelMenu v-bind="profileBind">
          <template #item="{ item, active }">
            <SidebarItem :item="item" :active="active" />
          </template>
        </PanelMenu>
      </ul>
    </div>
  </div>
</template>
