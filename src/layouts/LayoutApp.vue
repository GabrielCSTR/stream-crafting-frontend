<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="stream-crafting-layout-app flex w-full h-full gap-4">
    <Sidebar></Sidebar>

    <div class="stream-crafting-layout-app__content">
      <router-view></router-view>
    </div>
  </div>
</template>
