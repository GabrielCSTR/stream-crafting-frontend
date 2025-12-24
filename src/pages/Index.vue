<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="d2cast-home">
    <!-- Hero Section -->
    <section class="d2cast-hero relative overflow-hidden w-full max-w-full">
      <div class="d2cast-hero__background"></div>
      <div class="d2cast-hero__grid"></div>
      <div class="d2cast-hero__content container mx-auto px-6 py-24 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="d2cast-hero__title text-5xl md:text-7xl font-bold mb-6">
            O novo padrão visual para <span class="d2cast-hero__highlight">transmissões</span> de Dota 2
          </h1>
          <p class="text-xl md:text-2xl mb-10" style="color: #94A3B8; line-height: 1.7;">
            Crie HUDs profissionais direto no navegador. Sem instalação, sem complicação. 
            Integre com OBS em segundos e transmita com qualidade de campeonato.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/signup">
              <p-button label="Começar Agora" size="large" class="d2cast-hero__cta-primary px-8 py-3" />
            </RouterLink>
            <RouterLink to="/signin">
              <p-button label="Fazer Login" outlined size="large" class="d2cast-hero__cta-secondary px-8 py-3" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="d2cast-features py-24 relative w-full max-w-full overflow-x-hidden">
      <div class="d2cast-features__pattern"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="d2cast-section-badge mb-4">
            <span>Funcionalidades</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #F9FAFB;">
            Transmissões profissionais ao alcance de todos
          </h2>
          <p class="text-xl max-w-3xl mx-auto" style="color: #94A3B8; line-height: 1.7;">
            RadiantCast leva as transmissões de Dota 2 para um novo patamar visual. Escolha entre layouts 
            pré-prontos ou crie seu próprio HUD personalizado com scoreboard, networth, K/D/A e muito mais.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <!-- Feature 1: HUDs and Overlays -->
          <Card class="d2cast-feature-card">
            <template #content>
              <div class="text-center p-8">
                <div class="d2cast-feature-icon mb-6">
                  <div class="d2cast-icon-wrapper">
                    <i class="pi pi-desktop text-6xl" style="color: #34F5A3;"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-4" style="color: #F9FAFB;">100% Web, Zero Instalação</h3>
                <p style="color: #94A3B8; line-height: 1.6;">
                  Funciona direto no navegador. Sem programas complexos, sem configurações complicadas. 
                  Acesse de qualquer lugar e crie HUDs profissionais em minutos.
                </p>
              </div>
            </template>
          </Card>

          <!-- Feature 2: Observação Inteligente -->
          <Card class="d2cast-feature-card">
            <template #content>
              <div class="text-center p-8">
                <div class="d2cast-feature-icon mb-6">
                  <div class="d2cast-icon-wrapper">
                    <i class="pi pi-eye text-6xl" style="color: #34F5A3;"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-4" style="color: #F9FAFB;">Layouts Pré-prontos ou Personalizados</h3>
                <p style="color: #94A3B8; line-height: 1.6;">
                  Escolha entre templates profissionais ou crie seu próprio HUD do zero. Configure scoreboard, 
                  informações de equipes, networth, K/D/A e área de patrocinadores.
                </p>
              </div>
            </template>
          </Card>

          <!-- Feature 3: Replays Automatizados -->
          <Card class="d2cast-feature-card">
            <template #content>
              <div class="text-center p-8">
                <div class="d2cast-feature-icon mb-6">
                  <div class="d2cast-icon-wrapper">
                    <i class="pi pi-video text-6xl" style="color: #34F5A3;"></i>
                  </div>
                </div>
                <h3 class="text-2xl font-bold mb-4" style="color: #F9FAFB;">Integração Instantânea com OBS</h3>
                <p style="color: #94A3B8; line-height: 1.6;">
                  Cada HUD gera uma URL única. Adicione como Browser Source no OBS ou qualquer software 
                  de streaming. Simples, prático e escalável.
                </p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="d2cast-how-it-works py-24 relative w-full max-w-full overflow-x-hidden">
      <div class="d2cast-how-it-works__background"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="d2cast-section-badge mb-4">
            <span>Como Funciona</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #F9FAFB;">
            Comece a transmitir profissionalmente em 5 passos
          </h2>
        </div>

        <div class="d2cast-steps-container max-w-6xl mx-auto">
          <div class="d2cast-steps-grid">
            <div class="d2cast-step-item">
              <div class="d2cast-step-number-wrapper">
                <div class="d2cast-step-number">01</div>
                <div class="d2cast-step-connector"></div>
              </div>
              <div class="d2cast-step-content">
                <h3 class="text-xl font-bold mb-3" style="color: #F9FAFB;">Criar Conta</h3>
                <p class="text-sm" style="color: #94A3B8; line-height: 1.6;">
                  Registre-se gratuitamente na plataforma web. Sem downloads, sem instalações complicadas.
                </p>
              </div>
            </div>
            <div class="d2cast-step-item">
              <div class="d2cast-step-number-wrapper">
                <div class="d2cast-step-number">02</div>
                <div class="d2cast-step-connector"></div>
              </div>
              <div class="d2cast-step-content">
                <h3 class="text-xl font-bold mb-3" style="color: #F9FAFB;">Escolher ou Criar HUD</h3>
                <p class="text-sm" style="color: #94A3B8; line-height: 1.6;">
                  Selecione um template profissional ou comece do zero criando seu próprio design personalizado.
                </p>
              </div>
            </div>
            <div class="d2cast-step-item">
              <div class="d2cast-step-number-wrapper">
                <div class="d2cast-step-number">03</div>
                <div class="d2cast-step-connector"></div>
              </div>
              <div class="d2cast-step-content">
                <h3 class="text-xl font-bold mb-3" style="color: #F9FAFB;">Configurar Elementos</h3>
                <p class="text-sm" style="color: #94A3B8; line-height: 1.6;">
                  Configure scoreboard, networth, K/D/A, status de partida, área de patrocinadores e outros elementos essenciais.
                </p>
              </div>
            </div>
            <div class="d2cast-step-item">
              <div class="d2cast-step-number-wrapper">
                <div class="d2cast-step-number">04</div>
                <div class="d2cast-step-connector"></div>
              </div>
              <div class="d2cast-step-content">
                <h3 class="text-xl font-bold mb-3" style="color: #F9FAFB;">Integrar com OBS</h3>
                <p class="text-sm" style="color: #94A3B8; line-height: 1.6;">
                  Copie a URL única do seu HUD e adicione como Browser Source no OBS ou outro software de streaming.
                </p>
              </div>
            </div>
            <div class="d2cast-step-item">
              <div class="d2cast-step-number-wrapper">
                <div class="d2cast-step-number">05</div>
              </div>
              <div class="d2cast-step-content">
                <h3 class="text-xl font-bold mb-3" style="color: #F9FAFB;">Transmitir</h3>
                <p class="text-sm" style="color: #94A3B8; line-height: 1.6;">
                  Pronto! Sua transmissão agora tem qualidade profissional de campeonato internacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Functionalities Section -->
    <section class="d2cast-functionalities py-24 relative w-full max-w-full overflow-x-hidden">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20">
          <div class="d2cast-section-badge mb-4">
            <span>Recursos</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #F9FAFB;">
            Tudo que você precisa para uma transmissão profissional
          </h2>
          <p class="text-xl max-w-3xl mx-auto" style="color: #94A3B8; line-height: 1.7;">
            RadiantCast oferece todos os elementos essenciais para criar overlays interativos e profissionais, 
            respeitando a identidade do Dota 2 e as necessidades reais de quem transmite.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-palette"></i>
            </div>
            <p class="d2cast-functionality-text">Scoreboard</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-chart-line"></i>
            </div>
            <p class="d2cast-functionality-text">Networth</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-users"></i>
            </div>
            <p class="d2cast-functionality-text">K/D/A</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-info-circle"></i>
            </div>
            <p class="d2cast-functionality-text">Status de Partida</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-briefcase"></i>
            </div>
            <p class="d2cast-functionality-text">Área de Patrocinadores</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-id-card"></i>
            </div>
            <p class="d2cast-functionality-text">Informações de Equipes</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-link"></i>
            </div>
            <p class="d2cast-functionality-text">Integração OBS</p>
          </div>
          <div class="d2cast-functionality-item">
            <div class="d2cast-functionality-icon">
              <i class="pi pi-cloud"></i>
            </div>
            <p class="d2cast-functionality-text">URL Única por HUD</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="d2cast-cta py-24 relative overflow-hidden w-full max-w-full">
      <div class="d2cast-cta__background"></div>
      <div class="d2cast-cta__pattern"></div>
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="max-w-3xl mx-auto">
          <div class="d2cast-section-badge mb-6" style="background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2);">
            <span style="color: #F9FAFB;">Pronto para Começar?</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #F9FAFB;">
            O novo padrão visual para quem ama Dota 2
          </h2>
          <p class="text-xl mb-10 opacity-95 max-w-2xl mx-auto" style="color: #F9FAFB; line-height: 1.7;">
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
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.d2cast-home {
  width: 100%;
  overflow-x: hidden;
  max-width: 100%;
}

.d2cast-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #020617 0%, #0B1220 100%);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(52, 245, 163, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(109, 93, 246, 0.1) 0%, transparent 50%);
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

  &__content {
    position: relative;
    z-index: 1;
  }

  &__badge {
    display: inline-block;
  }

  &__title {
    background: linear-gradient(135deg, #F9FAFB 0%, #34F5A3 50%, #6D5DF6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  &__highlight {
    background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #34F5A3, transparent);
      opacity: 0.5;
    }
  }

  &__cta-primary {
    background: linear-gradient(135deg, #34F5A3 0%, #2ae693 100%) !important;
    border: none !important;
    color: #020617 !important;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(52, 245, 163, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(52, 245, 163, 0.4);
    }
  }

  &__cta-secondary {
    border: 2px solid #34F5A3 !important;
    color: #34F5A3 !important;
    background: transparent !important;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(52, 245, 163, 0.1) !important;
      transform: translateY(-2px);
    }
  }
}

.d2cast-badge-text {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, rgba(52, 245, 163, 0.15) 0%, rgba(109, 93, 246, 0.15) 100%);
  border: 1px solid rgba(52, 245, 163, 0.3);
  border-radius: 50px;
  color: #34F5A3;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.d2cast-section-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(52, 245, 163, 0.1);
  border: 1px solid rgba(52, 245, 163, 0.3);
  border-radius: 50px;
  color: #34F5A3;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.d2cast-features {
  background: linear-gradient(180deg, #0B1220 0%, #020617 100%);
  position: relative;

  &__pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(52, 245, 163, 0.05) 1px, transparent 0);
    background-size: 40px 40px;
    opacity: 0.5;
    z-index: 0;
  }
}

.d2cast-feature-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  background: linear-gradient(135deg, #0F172A 0%, #111A2F 100%) !important;
  border: 1px solid #1E293B !important;
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
    background: linear-gradient(90deg, transparent, #34F5A3, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-12px);
    border-color: #34F5A3 !important;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(52, 245, 163, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);

    &::before {
      opacity: 1;
    }

    .d2cast-feature-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 12px rgba(52, 245, 163, 0.6));
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
    background: linear-gradient(135deg, rgba(52, 245, 163, 0.1) 0%, rgba(52, 245, 163, 0.05) 100%);
    border: 1px solid rgba(52, 245, 163, 0.2);
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
      background: radial-gradient(circle, rgba(52, 245, 163, 0.3) 0%, transparent 70%);
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
  background: linear-gradient(135deg, rgba(52, 245, 163, 0.2) 0%, rgba(52, 245, 163, 0.1) 100%);
  border-color: rgba(52, 245, 163, 0.4);
  box-shadow: 0 0 20px rgba(52, 245, 163, 0.3);

  &::before {
    width: 120px;
    height: 120px;
  }
}

.d2cast-how-it-works {
  position: relative;
  background: linear-gradient(180deg, #0F172A 0%, #0B1220 100%);

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 50% 0%, rgba(52, 245, 163, 0.08) 0%, transparent 50%);
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
  background: linear-gradient(135deg, #34F5A3 0%, #2ae693 100%);
  color: #020617;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 4px 15px rgba(52, 245, 163, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 
      0 6px 20px rgba(52, 245, 163, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.d2cast-step-connector {
  position: absolute;
  top: 50%;
  left: calc(100% + 0.5rem);
  width: calc(100% - 70px - 1rem);
  max-width: 2rem;
  height: 2px;
  background: linear-gradient(90deg, #34F5A3 0%, transparent 100%);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  background: linear-gradient(135deg, #0F172A 0%, #111A2F 100%);
  border: 1px solid #1E293B;
  padding: 1.5rem;
  text-align: center;
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
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: #34F5A3;
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(52, 245, 163, 0.15);

    &::before {
      opacity: 1;
    }

    .d2cast-functionality-icon {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 10px rgba(52, 245, 163, 0.6));
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
  background: linear-gradient(135deg, rgba(52, 245, 163, 0.1) 0%, rgba(52, 245, 163, 0.05) 100%);
  border: 1px solid rgba(52, 245, 163, 0.2);
  transition: all 0.3s ease;
  position: relative;

  i {
    font-size: 1.75rem;
    color: #34F5A3;
    transition: all 0.3s ease;
  }
}

.d2cast-functionality-text {
  font-weight: 600;
  color: #CBD5E1;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.d2cast-cta {
  position: relative;
  background: linear-gradient(135deg, #34F5A3 0%, #6D5DF6 100%);
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 50%, rgba(109, 93, 246, 0.2) 0%, transparent 50%);
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
    background: #020617 !important;
    border: none !important;
    color: #34F5A3 !important;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(2, 6, 23, 0.3);

    &:hover {
      background: #0B1220 !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(2, 6, 23, 0.4);
    }
  }

  &__button-secondary {
    border: 2px solid rgba(255, 255, 255, 0.9) !important;
    color: #F9FAFB !important;
    background: transparent !important;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: #F9FAFB !important;
      transform: translateY(-2px);
    }
  }
}
</style>
