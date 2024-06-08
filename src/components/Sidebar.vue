<script lang="ts" setup>
import { computed } from 'vue'
import Logo from './Logo.vue'
import { logout } from '@/utils'
import { PrimeIcons } from 'primevue/api'

const logoutBtn = computed(() => ({
  icon: PrimeIcons.SIGN_OUT,
  label: '[Sair]',
  pt: {
    icon: 'mr-2 ml-0 -rotate-180'
  },
  onClick: logout
}))
</script>

<template>
  <div class="stream-crafting-sidebar flex flex-column h-full px-2 py-2">
    <!-- header -->
    <div class="stream-crafting-sidebar__header">
      <Logo></Logo>
    </div>

    <!-- content -->
    <nav class="stream-crafting-sidebar__content flex flex-column h-full">content</nav>

    <!-- footer -->
    <div class="stream-crafting-sidebar__footer">
      <p-button v-bind="logoutBtn"></p-button>
    </div>
  </div>
</template>
