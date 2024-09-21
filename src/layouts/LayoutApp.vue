<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showSidebar = computed(() => !/\/app\/huds\/?(new|(\w)+)/gm.test(route.path))
</script>

<template>
  <div class="stream-crafting-layout-app flex w-full h-full gap-6">
    <Sidebar v-if="showSidebar"></Sidebar>

    <div class="stream-crafting-layout-app__content w-full">
      <router-view></router-view>
    </div>
  </div>
</template>
