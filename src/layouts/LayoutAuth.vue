<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <div class="stream-crafting-layout-auth flex items-center w-full h-full rounded-none">
    <!-- card -->
    <div
      class="stream-crafting-layout-auth__card flex flex-col items-center justify-center w-full h-full px-8 bg-surface-800"
    >
      <!-- header -->
      <div class="stream-crafting-layout-auth__card__header flex justify-center pt-8">
        <router-link to="/">
          <Logo :width="150" :height="75" />
        </router-link>
      </div>

      <!-- body -->
      <div class="stream-crafting-layout-auth__card__body w-full h-full">
        <router-view></router-view>
      </div>
    </div>

    <!-- banner -->
    <div class="stream-crafting-layout-auth__banner min-w-[20%]">banner</div>
  </div>
</template>
