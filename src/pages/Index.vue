<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AnimatedGradientText from '@/components/magic-ui/AnimatedGradientText.vue'
import BorderBeam from '@/components/magic-ui/BorderBeam.vue'
import ShineBorder from '@/components/magic-ui/ShineBorder.vue'
import Particles from '@/components/magic-ui/Particles.vue'
import BlurFade from '@/components/magic-ui/BlurFade.vue'
import Meteors from '@/components/magic-ui/Meteors.vue'
import MagicCard from '@/components/magic-ui/MagicCard.vue'
import OrbitingCircles from '@/components/magic-ui/OrbitingCircles.vue'
import AnimatedGridPattern from '@/components/magic-ui/AnimatedGridPattern.vue'
import DotPattern from '@/components/magic-ui/DotPattern.vue'
import FlickeringGrid from '@/components/magic-ui/FlickeringGrid.vue'
import Ripple from '@/components/magic-ui/Ripple.vue'
import AuroraBackground from '@/components/magic-ui/AuroraBackground.vue'
</script>

<template>
  <div class="d2cast-home">
    <!-- Hero Section -->
    <section class="d2cast-hero relative overflow-hidden w-full max-w-full">
      <div class="d2cast-hero__background"></div>
      <AuroraBackground className="opacity-60" />
      <AnimatedGridPattern 
        :width="50" 
        :height="50" 
        :duration="8"
        className="opacity-40"
      />
      <DotPattern 
        :width="20" 
        :height="20" 
        color="#FD2A36"
        className="opacity-20"
      />
      <FlickeringGrid :squares="80" :duration="3" />
      <Particles 
        :quantity="80" 
        :size="0.6" 
        color="#FD2A36"
        className="opacity-40"
      />
      <Particles 
        :quantity="40" 
        :size="0.4" 
        color="#FFAF0E"
        className="opacity-30"
      />
      <Meteors :number="25" />
      <Ripple 
        :main-circle-size="250"
        :num-circles="10"
        className="opacity-30"
      />
      <div class="d2cast-hero__content container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <BlurFade :delay="100" :duration="0.8">
            <AnimatedGradientText className="mb-8">
              ✨ Plataforma Profissional
            </AnimatedGradientText>
          </BlurFade>
          
          <BlurFade :delay="200" :duration="0.8">
            <h1 class="d2cast-hero__title text-5xl md:text-7xl font-bold mb-6">
              O novo padrão visual para <span class="d2cast-hero__highlight">transmissões</span> de Dota 2
            </h1>
          </BlurFade>
          
          <BlurFade :delay="300" :duration="0.8">
            <p class="text-xl md:text-2xl mb-10" style="color: #A4A4A4; line-height: 1.7;">
              Crie HUDs profissionais direto no navegador. Sem instalação, sem complicação. 
              Integre com OBS em segundos e transmita com qualidade de campeonato.
            </p>
          </BlurFade>
          
          <BlurFade :delay="400" :duration="0.8">
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/signup">
                <p-button label="Começar Agora" size="large" class="d2cast-hero__cta-primary px-8 py-3" />
              </RouterLink>
              <RouterLink to="/signin">
                <p-button label="Fazer Login" outlined size="large" class="d2cast-hero__cta-secondary px-8 py-3" />
              </RouterLink>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="d2cast-features py-24 relative w-full max-w-full overflow-hidden">
      <div class="d2cast-features__pattern"></div>
      <AuroraBackground className="opacity-40" />
      <AnimatedGridPattern 
        :width="40" 
        :height="40" 
        :duration="6"
        className="opacity-30"
      />
      <DotPattern 
        :width="16" 
        :height="16" 
        color="#FFAF0E"
        className="opacity-15"
      />
      <FlickeringGrid :squares="60" :duration="4" />
      <Particles 
        :quantity="50" 
        :size="0.4" 
        color="#FFAF0E"
        className="opacity-25"
      />
      <div class="container mx-auto px-6 relative z-10">
        <BlurFade :delay="100" :duration="0.8">
          <div class="text-center mb-20">
            <AnimatedGradientText className="mb-4">
              Funcionalidades
            </AnimatedGradientText>
            <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #FFFFFF;">
              Transmissões profissionais ao alcance de todos
            </h2>
            <p class="text-xl max-w-3xl mx-auto" style="color: #A4A4A4; line-height: 1.7;">
              RadiantCast leva as transmissões de Dota 2 para um novo patamar visual. Escolha entre layouts 
              pré-prontos ou crie seu próprio HUD personalizado com scoreboard, networth, K/D/A e muito mais.
            </p>
          </div>
        </BlurFade>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <!-- Feature 1: HUDs and Overlays -->
          <BlurFade :delay="200" :duration="0.8">
            <div class="relative">
              <MagicCard 
                className="d2cast-feature-card h-full"
                gradient-color="#FD2A36"
                :gradient-opacity="0.15"
              >
                <div class="text-center p-8 relative z-10">
                  <div class="d2cast-feature-icon mb-6">
                    <div class="d2cast-icon-wrapper">
                      <i class="pi pi-desktop text-6xl" style="color: #FD2A36;"></i>
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold mb-4" style="color: #FFFFFF;">100% Web, Zero Instalação</h3>
                  <p style="color: #A4A4A4; line-height: 1.6;">
                    Funciona direto no navegador. Sem programas complexos, sem configurações complicadas. 
                    Acesse de qualquer lugar e crie HUDs profissionais em minutos.
                  </p>
                </div>
              </MagicCard>
              <BorderBeam 
                :size="250" 
                :duration="12" 
                :border-width="2"
                color-from="#FD2A36"
                color-to="#FFAF0E"
              />
            </div>
          </BlurFade>

          <!-- Feature 2: Observação Inteligente -->
          <BlurFade :delay="300" :duration="0.8">
            <div class="relative">
              <MagicCard 
                className="d2cast-feature-card h-full"
                gradient-color="#FFAF0E"
                :gradient-opacity="0.15"
              >
                <div class="text-center p-8 relative z-10">
                  <div class="d2cast-feature-icon mb-6">
                    <div class="d2cast-icon-wrapper">
                      <i class="pi pi-eye text-6xl" style="color: #FD2A36;"></i>
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold mb-4" style="color: #FFFFFF;">Layouts Pré-prontos ou Personalizados</h3>
                  <p style="color: #A4A4A4; line-height: 1.6;">
                    Escolha entre templates profissionais ou crie seu próprio HUD do zero. Configure scoreboard, 
                    informações de equipes, networth, K/D/A e área de patrocinadores.
                  </p>
                </div>
              </MagicCard>
              <BorderBeam 
                :size="250" 
                :duration="12" 
                :border-width="2"
                color-from="#FFAF0E"
                color-to="#2671F4"
              />
            </div>
          </BlurFade>

          <!-- Feature 3: Replays Automatizados -->
          <BlurFade :delay="400" :duration="0.8">
            <div class="relative">
              <MagicCard 
                className="d2cast-feature-card h-full"
                gradient-color="#2671F4"
                :gradient-opacity="0.15"
              >
                <div class="text-center p-8 relative z-10">
                  <div class="d2cast-feature-icon mb-6">
                    <div class="d2cast-icon-wrapper">
                      <i class="pi pi-video text-6xl" style="color: #FD2A36;"></i>
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold mb-4" style="color: #FFFFFF;">Integração Instantânea com OBS</h3>
                  <p style="color: #A4A4A4; line-height: 1.6;">
                    Cada HUD gera uma URL única. Adicione como Browser Source no OBS ou qualquer software 
                    de streaming. Simples, prático e escalável.
                  </p>
                </div>
              </MagicCard>
              <BorderBeam 
                :size="250" 
                :duration="12" 
                :border-width="2"
                color-from="#2671F4"
                color-to="#FD2A36"
              />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="d2cast-how-it-works py-24 relative w-full max-w-full overflow-hidden">
      <div class="d2cast-how-it-works__background"></div>
      <AuroraBackground className="opacity-50" />
      <AnimatedGridPattern 
        :width="35" 
        :height="35" 
        :duration="10"
        className="opacity-25"
      />
      <DotPattern 
        :width="18" 
        :height="18" 
        color="#2671F4"
        className="opacity-20"
      />
      <FlickeringGrid :squares="70" :duration="2.5" />
      <Particles 
        :quantity="60" 
        :size="0.35" 
        color="#2671F4"
        className="opacity-30"
      />
      <Particles 
        :quantity="30" 
        :size="0.5" 
        color="#FD2A36"
        className="opacity-25"
      />
      <Ripple 
        :main-circle-size="200"
        :num-circles="8"
        className="opacity-20"
      />
      <div class="container mx-auto px-6 relative z-10">
        <BlurFade :delay="100" :duration="0.8">
          <div class="text-center mb-20">
            <AnimatedGradientText className="mb-4">
              Como Funciona
            </AnimatedGradientText>
            <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #FFFFFF;">
              Comece a transmitir profissionalmente em 5 passos
            </h2>
          </div>
        </BlurFade>

        <div class="d2cast-steps-container max-w-6xl mx-auto">
          <div class="d2cast-steps-grid">
            <BlurFade 
              v-for="(step, index) in steps" 
              :key="index"
              :delay="200 + (index * 100)" 
              :duration="0.8"
            >
              <div class="d2cast-step-item relative">
                <div class="d2cast-step-number-wrapper">
                  <div class="d2cast-step-number relative overflow-visible">
                    {{ String(index + 1).padStart(2, '0') }}
                    <OrbitingCircles 
                      v-if="index < 4"
                      :radius="38"
                      :duration="15"
                      :delay="index * 1.5"
                      :path="true"
                      path-color="#FD2A36"
                      className="absolute inset-0 pointer-events-none"
                    />
                  </div>
                  <div v-if="index < 4" class="d2cast-step-connector"></div>
                </div>
                <div class="d2cast-step-content">
                  <h3 class="text-xl font-bold mb-3" style="color: #FFFFFF;">{{ step.title }}</h3>
                  <p class="text-sm" style="color: #A4A4A4; line-height: 1.6;">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>

    <!-- Functionalities Section -->
    <section class="d2cast-functionalities py-24 relative w-full max-w-full overflow-hidden">
      <AuroraBackground className="opacity-35" />
      <AnimatedGridPattern 
        :width="30" 
        :height="30" 
        :duration="7"
        className="opacity-20"
      />
      <DotPattern 
        :width="14" 
        :height="14" 
        color="#FD2A36"
        className="opacity-18"
      />
      <FlickeringGrid :squares="100" :duration="3.5" />
      <Particles 
        :quantity="70" 
        :size="0.3" 
        color="#FD2A36"
        className="opacity-20"
      />
      <div class="container mx-auto px-6 relative z-10">
        <BlurFade :delay="100" :duration="0.8">
          <div class="text-center mb-20">
            <AnimatedGradientText className="mb-4">
              Recursos
            </AnimatedGradientText>
            <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #FFFFFF;">
              Tudo que você precisa para uma transmissão profissional
            </h2>
            <p class="text-xl max-w-3xl mx-auto" style="color: #A4A4A4; line-height: 1.7;">
              RadiantCast oferece todos os elementos essenciais para criar overlays interativos e profissionais, 
              respeitando a identidade do Dota 2 e as necessidades reais de quem transmite.
            </p>
          </div>
        </BlurFade>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <BlurFade 
            v-for="(func, index) in functionalities" 
            :key="index"
            :delay="150 + (index * 50)" 
            :duration="0.6"
          >
            <ShineBorder 
              :border-radius="12"
              color="#FD2A36"
              :duration="14"
              className="h-full"
            >
              <div class="d2cast-functionality-item">
                <div class="d2cast-functionality-icon">
                  <i :class="func.icon"></i>
                </div>
                <p class="d2cast-functionality-text">{{ func.text }}</p>
              </div>
            </ShineBorder>
          </BlurFade>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="d2cast-cta py-24 relative overflow-hidden w-full max-w-full">
      <div class="d2cast-cta__background"></div>
      <div class="d2cast-cta__pattern"></div>
      <AuroraBackground className="opacity-70" />
      <AnimatedGridPattern 
        :width="45" 
        :height="45" 
        :duration="5"
        className="opacity-40"
      />
      <DotPattern 
        :width="22" 
        :height="22" 
        color="#FFFFFF"
        className="opacity-25"
      />
      <FlickeringGrid :squares="90" :duration="2" />
      <Particles 
        :quantity="100" 
        :size="0.5" 
        color="#FFFFFF"
        className="opacity-30"
      />
      <Meteors :number="30" />
      <Ripple 
        :main-circle-size="300"
        :num-circles="12"
        className="opacity-40"
      />
      <div class="container mx-auto px-6 text-center relative z-10">
        <BlurFade :delay="100" :duration="0.8">
          <div class="max-w-3xl mx-auto">
            <AnimatedGradientText className="mb-6" style="background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2);">
              Pronto para Começar?
            </AnimatedGradientText>
            <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #FFFFFF;">
              O novo padrão visual para quem ama Dota 2
            </h2>
            <p class="text-xl mb-10 opacity-95 max-w-2xl mx-auto" style="color: #D4D4D4; line-height: 1.7;">
              RadiantCast não é apenas uma ferramenta — é uma experiência que combina tecnologia, 
              design esportivo e performance. Perfeito para streamers, organizadores de campeonatos e estúdios.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/signup">
                <p-button label="Começar Grátis" size="large" class="d2cast-cta__button-primary px-8 py-3" />
              </RouterLink>
              <RouterLink to="/signin">
                <p-button label="Agendar Demo" outlined size="large" class="d2cast-cta__button-secondary px-8 py-3" />
              </RouterLink>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      steps: [
        {
          title: 'Criar Conta',
          description: 'Registre-se gratuitamente na plataforma web. Sem downloads, sem instalações complicadas.'
        },
        {
          title: 'Escolher ou Criar HUD',
          description: 'Selecione um template profissional ou comece do zero criando seu próprio design personalizado.'
        },
        {
          title: 'Configurar Elementos',
          description: 'Configure scoreboard, networth, K/D/A, status de partida, área de patrocinadores e outros elementos essenciais.'
        },
        {
          title: 'Integrar com OBS',
          description: 'Copie a URL única do seu HUD e adicione como Browser Source no OBS ou outro software de streaming.'
        },
        {
          title: 'Transmitir',
          description: 'Pronto! Sua transmissão agora tem qualidade profissional de campeonato internacional.'
        }
      ],
      functionalities: [
        { icon: 'pi pi-palette', text: 'Scoreboard' },
        { icon: 'pi pi-chart-line', text: 'Networth' },
        { icon: 'pi pi-users', text: 'K/D/A' },
        { icon: 'pi pi-info-circle', text: 'Status de Partida' },
        { icon: 'pi pi-briefcase', text: 'Área de Patrocinadores' },
        { icon: 'pi pi-id-card', text: 'Informações de Equipes' },
        { icon: 'pi pi-link', text: 'Integração OBS' },
        { icon: 'pi pi-cloud', text: 'URL Única por HUD' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.d2cast-home {
  width: 100%;
  overflow-x: hidden;
  max-width: 100%;
  
  * {
    box-sizing: border-box;
  }
  
  section {
    overflow-x: hidden;
    position: relative;
  }
}

.d2cast-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #000000 0%, #121212 100%);
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(253, 42, 54, 0.16) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 175, 14, 0.12) 0%, transparent 50%);
    z-index: 0;
  }

  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(253, 42, 54, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(253, 42, 54, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 0;
    opacity: 0.5;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__badge {
    display: inline-block;
  }

  &__title {
    background: linear-gradient(135deg, #FFFFFF 0%, #FD2A36 50%, #FFAF0E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    line-height: 1.2;
    letter-spacing: -0.02em;
    // animation: pulse-glow 3s ease-in-out infinite;
    filter: drop-shadow(0 0 14px rgba(253, 42, 54, 0.18));
  }

  &__highlight {
    background: linear-gradient(135deg, #FD2A36 0%, #FFAF0E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    animation: shimmer 3s linear infinite;
    background-size: 200% 100%;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #FD2A36, transparent);
      opacity: 0.8;
      animation: shimmer 2s linear infinite;
      box-shadow: 0 0 10px rgba(253, 42, 54, 0.45);
    }
  }

  &__cta-primary {
    background: linear-gradient(135deg, #FD2A36 0%, #e60011 100%) !important;
    border: none !important;
    color: #FFFFFF !important;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(253, 42, 54, 0.25);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 30px rgba(253, 42, 54, 0.35), 0 0 40px rgba(253, 42, 54, 0.2);
      
      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px) scale(0.98);
    }
  }

  &__cta-secondary {
    border: 2px solid #242424 !important;
    color: #FFFFFF !important;
    background: rgba(255, 255, 255, 0.02) !important;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: rgba(253, 42, 54, 0.1);
      transition: width 0.3s ease;
      z-index: -1;
    }

    &:hover {
      background: rgba(253, 42, 54, 0.12) !important;
      transform: translateY(-3px);
      box-shadow: 0 6px 25px rgba(253, 42, 54, 0.2), inset 0 0 20px rgba(253, 42, 54, 0.08);
      border-color: #FD2A36 !important;
      color: #FD2A36 !important;
      
      &::before {
        width: 100%;
      }
    }
  }
}

.d2cast-badge-text {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, rgba(253, 42, 54, 0.12) 0%, rgba(255, 175, 14, 0.12) 100%);
  border: 1px solid rgba(253, 42, 54, 0.25);
  border-radius: 50px;
  color: #FD2A36;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.d2cast-section-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(253, 42, 54, 0.1);
  border: 1px solid rgba(253, 42, 54, 0.25);
  border-radius: 50px;
  color: #FD2A36;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.d2cast-features {
  background: linear-gradient(180deg, #121212 0%, #000000 100%);
  position: relative;
  overflow: hidden;

  &__pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(253, 42, 54, 0.05) 1px, transparent 0);
    background-size: 40px 40px;
    opacity: 0.5;
    z-index: 0;
  }
}

.d2cast-feature-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  background: linear-gradient(135deg, #090909 0%, #121212 100%) !important;
  border: 1px solid #242424 !important;
  border-radius: 16px !important;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FD2A36, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: shimmer 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(253, 42, 54, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: #FD2A36 !important;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(253, 42, 54, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 60px rgba(253, 42, 54, 0.12);

    &::before {
      opacity: 1;
      height: 3px;
    }

    &::after {
      opacity: 1;
    }

    .d2cast-feature-icon {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 20px rgba(253, 42, 54, 0.5));
    }
  }
}

.d2cast-feature-icon {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease;
  margin-bottom: 1rem;
  
  .d2cast-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(253, 42, 54, 0.12) 0%, rgba(253, 42, 54, 0.04) 100%);
    border: 1px solid rgba(253, 42, 54, 0.2);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(253, 42, 54, 0.25) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: width 0.4s ease, height 0.4s ease;
    }
  }

  i {
    display: inline-block;
    transition: all 0.4s ease;
    position: relative;
    z-index: 1;
  }
}

.d2cast-feature-card:hover .d2cast-feature-icon .d2cast-icon-wrapper {
  background: linear-gradient(135deg, rgba(253, 42, 54, 0.2) 0%, rgba(253, 42, 54, 0.1) 100%);
  border-color: rgba(253, 42, 54, 0.35);
  box-shadow: 0 0 20px rgba(253, 42, 54, 0.18);

  &::before {
    width: 120px;
    height: 120px;
  }
}

.d2cast-how-it-works {
  position: relative;
  background: linear-gradient(180deg, #090909 0%, #121212 100%);
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 0%, rgba(253, 42, 54, 0.08) 0%, transparent 50%);
    z-index: 0;
  }
}

.d2cast-steps-container {
  position: relative;
}

.d2cast-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  position: relative;
  width: 100%;
  max-width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
  }

  @media (max-width: 1023px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

.d2cast-step-item {
  position: relative;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.d2cast-step-number-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.d2cast-step-number {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FD2A36 0%, #e60011 100%);
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 4px 15px rgba(253, 42, 54, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 20px rgba(253, 42, 54, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulse-glow 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FD2A36, #FFAF0E, #2671F4);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
    filter: blur(10px);
  }

  &:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 8px 30px rgba(253, 42, 54, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      0 0 40px rgba(253, 42, 54, 0.22);

    &::before {
      opacity: 0.5;
    }
  }
}

.d2cast-step-connector {
  position: absolute;
  top: 50%;
  left: calc(100% + 0.5rem);
  width: calc(100% - 70px - 1rem);
  max-width: 2rem;
  height: 2px;
  background: linear-gradient(90deg, #FD2A36 0%, transparent 100%);
  opacity: 0.3;
  z-index: 1;
  transform: translateY(-50%);

  @media (max-width: 1023px) {
    display: none;
  }
}

.d2cast-step-item:last-child .d2cast-step-connector {
  display: none;
}

.d2cast-step-content {
  padding: 0 0.5rem;
}

.d2cast-functionality-item {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  background: linear-gradient(135deg, #090909 0%, #121212 100%);
  border: 1px solid #242424;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FD2A36, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: shimmer 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(253, 42, 54, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.05);
    border-color: #FD2A36;
    box-shadow: 
      0 12px 32px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(253, 42, 54, 0.18),
      inset 0 0 20px rgba(253, 42, 54, 0.08);

    &::before {
      opacity: 1;
      height: 3px;
    }

    &::after {
      opacity: 1;
    }

    .d2cast-functionality-icon {
      transform: scale(1.2) rotate(10deg);
      filter: drop-shadow(0 0 15px rgba(253, 42, 54, 0.45));
    }
  }
}

.d2cast-functionality-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(253, 42, 54, 0.12) 0%, rgba(253, 42, 54, 0.04) 100%);
  border: 1px solid rgba(253, 42, 54, 0.18);
  transition: all 0.3s ease;
  position: relative;

  i {
    font-size: 1.75rem;
    color: #FD2A36;
    transition: all 0.3s ease;
  }
}

.d2cast-functionality-text {
  font-weight: 600;
  color: #D4D4D4;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.d2cast-cta {
  position: relative;
  background: linear-gradient(135deg, #090909 0%, #121212 100%);
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 50%, rgba(253, 42, 54, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 70% 50%, rgba(255, 175, 14, 0.12) 0%, transparent 50%);
    z-index: 0;
  }

  &__pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3;
    z-index: 0;
  }

  &__button-primary {
    background: #FD2A36 !important;
    border: none !important;
    color: #FFFFFF !important;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(253, 42, 54, 0.2);

    &:hover {
      background: #e60011 !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(253, 42, 54, 0.3);
    }
  }

  &__button-secondary {
    border: 2px solid #333333 !important;
    color: #FFFFFF !important;
    background: transparent !important;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(253, 42, 54, 0.08) !important;
      border-color: #FD2A36 !important;
      transform: translateY(-2px);
    }
  }
}
</style>
