<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
</script>

<template>
  <div class="radiantcast-layout-auth flex items-center w-full h-full min-h-screen overflow-hidden">
    <!-- Background Effects -->
    <div class="radiantcast-layout-auth__background"></div>
    <div class="radiantcast-layout-auth__grid"></div>
    
    <!-- Main Content -->
    <div class="radiantcast-layout-auth__container container mx-auto px-6 py-12 w-full max-w-6xl">
      <div class="radiantcast-layout-auth__card">
        <!-- Header -->
        <div class="radiantcast-layout-auth__header">
          <router-link to="/" class="radiantcast-layout-auth__logo">
            <Logo :width="180" :height="60" />
          </router-link>
          <p class="radiantcast-layout-auth__subtitle">
            Plataforma Web de HUDs para Dota 2
          </p>
        </div>

        <!-- Body -->
        <div class="radiantcast-layout-auth__body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radiantcast-layout-auth {
  position: relative;
  background: linear-gradient(180deg, #020617 0%, #0B1220 100%);
  min-height: 100vh;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(52, 245, 163, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(109, 93, 246, 0.08) 0%, transparent 50%);
    z-index: 0;
  }

  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(52, 245, 163, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(52, 245, 163, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    opacity: 0.5;
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__card {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(17, 26, 47, 0.9) 100%);
    border: 1px solid rgba(52, 245, 163, 0.2);
    border-radius: 24px;
    padding: 3rem;
    backdrop-filter: blur(20px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(52, 245, 163, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #34F5A3, transparent);
      opacity: 0.6;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  &__logo {
    display: inline-block;
    transition: opacity 0.3s ease;
    margin-bottom: 1rem;

    &:hover {
      opacity: 0.8;
    }
  }

  &__subtitle {
    color: #94A3B8;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-top: 0.5rem;
  }

  &__body {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .radiantcast-layout-auth {
    &__card {
      padding: 2rem 1.5rem;
      border-radius: 16px;
    }
  }
}
</style>
