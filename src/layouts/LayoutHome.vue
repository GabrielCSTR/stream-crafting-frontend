<script setup lang="ts">
import HomeHeader from '@/components/Home/HomeHeader.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
</script>

<template>
  <div class="stream-crafting-layout-home flex w-full h-full">
    <div class="stream-crafting-layout-home__container">
      <!-- header -->
      <HomeHeader class="stream-crafting-layout-home__header"></HomeHeader>

      <!-- main -->
      <main class="stream-crafting-layout-home__content">
        <router-view></router-view>
      </main>

      <!-- footer -->
      <footer class="stream-crafting-layout-home__footer flex align-items-center mt-8 px-5">
        <LanguageSelector />
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
.stream-crafting-layout-home {
  &__container {
    padding-top: 5.5rem;
  }

  &__footer {
    border-top: 1px solid;
    min-height: 6rem;
  }
}
</style>
