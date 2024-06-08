<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <div class="stream-crafting-layout-auth flex align-items-center w-full h-full">
    <div
      class="stream-crafting-layout-auth__card flex align-items-center justify-content-center w-full h-full"
    >
      <div class="stream-crafting-layout-auth__card__body w-full">
        <div class="stream-crafting-layout-auth__card__logo flex justify-content-center pb-5">
          <router-link to="/">
            <Logo :width="150" :height="75" />
          </router-link>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <div class="stream-crafting-layout-auth__banner"></div>
  </div>
</template>

<style lang="scss">
.stream-crafting-layout-auth {
  &__card {
    background: var(--surface-card);
    border-radius: 0;
    max-width: 75vw;

    &__body {
      max-width: 60rem;
    }
  }
}
</style>
