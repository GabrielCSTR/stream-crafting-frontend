<script setup lang="ts">
import HomeHeader from '@/components/Home/HomeHeader.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
</script>

<template>
  <Fluid class="d2cast-layout-home flex flex-col min-h-screen overflow-x-hidden">
    <div class="d2cast-layout-home__container flex flex-col flex-1 w-full max-w-full">
      <!-- header -->
      <HomeHeader class="d2cast-layout-home__header"></HomeHeader>

      <!-- main -->
      <main class="d2cast-layout-home__content flex-1 w-full max-w-full overflow-x-hidden">
        <router-view></router-view>
      </main>

      <!-- footer -->
      <footer class="d2cast-layout-home__footer">
        <div class="container mx-auto px-6 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <!-- About -->
            <div>
              <h3 class="text-lg font-bold mb-4" style="color: #FFFFFF;">RadiantCast</h3>
              <p class="text-sm mb-4" style="color: #A4A4A4;">
                A plataforma web de HUDs para transmissões profissionais de Dota 2.
              </p>
            </div>

            <!-- Features -->
            <div>
              <h4 class="font-semibold mb-4" style="color: #FFFFFF;">Funcionalidades</h4>
              <ul class="space-y-2 text-sm" style="color: #A4A4A4;">
                <li><a href="#features" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">100% Web</a></li>
                <li><a href="#features" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Layouts Personalizados</a></li>
                <li><a href="#features" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Integração OBS</a></li>
              </ul>
            </div>

            <!-- Resources -->
            <div>
              <h4 class="font-semibold mb-4">Recursos</h4>
              <ul class="space-y-2 text-sm" style="color: #A4A4A4;">
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Documentação</a></li>
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Suporte</a></li>
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">API</a></li>
              </ul>
            </div>

            <!-- Company -->
            <div>
              <h4 class="font-semibold mb-4">Empresa</h4>
              <ul class="space-y-2 text-sm" style="color: #A4A4A4;">
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Sobre</a></li>
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Blog</a></li>
                <li><a href="#" class="transition-colors hover:text-brand-primary" style="color: #A4A4A4;">Contato</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style="border-color: #242424;">
            <div class="text-sm" style="color: #A4A4A4;">
              <p>© 2024 RadiantCast. Todos os direitos reservados.</p>
              <p class="mt-2 text-xs">
                RadiantCast não é afiliado à Valve Corporation ou Dota 2.
              </p>
            </div>
            <div class="flex items-center gap-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Fluid>
</template>

<style lang="scss" scoped>
.d2cast-layout-home {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  &__container {
    padding-top: 5rem;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  &__content {
    width: 100%;
    max-width: 100%;
  }

  &__footer {
    border-top: 1px solid #242424;
    background: #121212;
    margin-top: auto;
    width: 100%;
    max-width: 100%;
  }
}
</style>
