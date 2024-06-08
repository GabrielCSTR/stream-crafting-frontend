<script setup lang="ts">
import type { IHeaderLink } from '@/types'
import { RouterLink } from 'vue-router'
import Logo from '../Logo.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const links: IHeaderLink[] = [
  {
    i18nKey: 'area-1',
    to: '/#area-1'
  },
  {
    i18nKey: 'area-2',
    to: '/#area-2'
  },
  {
    i18nKey: 'area-3',
    to: '/#area-3'
  }
]
</script>

<template>
  <header class="stream-crafting-header fixed top-0 w-full">
    <nav class="flex align-items-center gap-4 p-3">
      <!-- main content -->
      <main class="stream-crafting-header__main flex align-items-center w-full gap-2">
        <!-- logo -->
        <Logo></Logo>

        <!-- links -->
        <RouterLink v-for="link in links" :key="link.i18nKey" class="h-full" :to="link.to">
          <p-button :label="link.i18nKey" plain text />
        </RouterLink>
      </main>

      <!-- aside content -->
      <aside class="stream-crafting-header__aside">
        <RouterLink to="/signin">
          <p-button :label="t('buttons.signin')" outlined text />
        </RouterLink>
      </aside>
    </nav>
  </header>
</template>

<style lang="scss">
.stream-crafting-header {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-color: var(--topbar-sticky-bg);
  border-bottom: 1px solid var(--surface-border);
}
</style>
