# Componentes de HUD do Dota 2

Este documento descreve os componentes visuais disponíveis para criar HUDs personalizados para transmissões de Dota 2.

## 📊 Estrutura de Dados (example.json)

O arquivo `example.json` contém dados do backend da API do Dota 2 com as seguintes seções:

### Map Data
- `game_time`: Tempo de jogo em segundos
- `radiant_score` / `dire_score`: Placar dos times
- `game_state`: Estado atual do jogo (seleção de heróis, em progresso, etc.)
- `daytime`: Se é dia ou noite no jogo
- `nightstalker_night`: Se Night Stalker ativou a noite

### Player Data
Informações de cada jogador (10 jogadores total - 5 por time):
- `name`: Nome do jogador
- `kills` / `deaths` / `assists`: KDA
- `last_hits` / `denies`: Farm
- `net_worth`: Valor total (ouro + itens)
- `gold`: Ouro atual
- `gpm` / `xpm`: Gold/XP por minuto
- `hero_damage` / `hero_healing`: Dano e cura
- `tower_damage`: Dano em torres

### Draft Data
- `activeteam`: Time ativo no draft (2=Radiant, 3=Dire)
- `pick`: true se é fase de pick, false se é ban
- `activeteam_time_remaining`: Tempo restante
- `pick0_id` / `pick0_class`: ID e nome do herói pickado
- `ban0_id` / `ban0_class`: ID e nome do herói banido

### Hero Data
- `id`: ID do herói (-1 se ainda não selecionado)

## 🎨 Componentes Disponíveis

### 1. PlayerCard
**Arquivo**: `src/components/Huds/elements/PlayerCard.vue`

Exibe informações de um jogador individual.

**Props**:
- `playerData`: Dados do jogador (nome, KDA, gold, etc.)
- `heroImage`: URL da imagem do herói
- `team`: 'radiant' ou 'dire'

**Uso**:
```vue
<PlayerCard 
  :playerData="player"
  team="radiant"
  heroImage="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/anti-mage.png"
/>
```

**Visual**:
- Card com imagem do herói
- Nome do jogador
- KDA (Kills/Deaths/Assists)
- Net worth e last hits
- Cores diferentes para Radiant (verde) e Dire (vermelho)

---

### 2. ScoreBoard
**Arquivo**: `src/components/Huds/elements/ScoreBoard.vue`

Placar principal do jogo com tempo e pontuação dos times.

**Props**:
- `mapData`: Dados do mapa (tempo, pontuação, estado)
- `radiantLogo`: URL do logo do time Radiant
- `direLogo`: URL do logo do time Dire
- `radiantName`: Nome do time Radiant
- `direName`: Nome do time Dire

**Uso**:
```vue
<ScoreBoard 
  :mapData="map"
  radiantName="Team Secret"
  direName="OG"
/>
```

**Visual**:
- Logos dos times em cada lado
- Placar central destacado
- Timer do jogo no centro
- Estado do jogo (Hero Selection, In Progress, etc.)

---

### 3. DraftPanel
**Arquivo**: `src/components/Huds/elements/DraftPanel.vue`

Painel completo do draft com picks e bans dos dois times.

**Props**:
- `draftData`: Dados do draft (picks, bans, timer)
- `radiantName`: Nome do time Radiant
- `direName`: Nome do time Dire

**Uso**:
```vue
<DraftPanel 
  :draftData="draft"
  radiantName="Team Secret"
  direName="OG"
/>
```

**Visual**:
- Grid 5x1 com picks de cada time
- Grid 7x1 com bans (imagens em grayscale)
- Timer central indicando tempo restante
- Indicação de fase (PICK ou BAN)
- Imagens dos heróis da CDN do Steam

**URL das imagens de heróis**:
```
https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/{hero_class}.png
```

---

### 4. GameTimer
**Arquivo**: `src/components/Huds/elements/GameTimer.vue`

Timer do jogo com indicação de dia/noite.

**Props**:
- `mapData`: Dados do mapa (game_time, daytime)

**Uso**:
```vue
<GameTimer :mapData="map" />
```

**Visual**:
- Ícone de sol (dia) ou lua (noite)
- Timer no formato MM:SS
- Cores diferentes para dia (amarelo) e noite (azul)
- Background com gradiente

---

### 5. TeamBanner
**Arquivo**: `src/components/Huds/elements/TeamBanner.vue`

Banner de time com logo, nome e pontuação.

**Props**:
- `team`: 'radiant' ou 'dire'
- `teamName`: Nome do time
- `teamTag`: Tag/sigla do time
- `logoUrl`: URL do logo do time
- `score`: Pontuação atual

**Uso**:
```vue
<TeamBanner 
  team="radiant"
  teamName="Team Secret"
  teamTag="SECRET"
  :score="24"
/>
```

**Visual**:
- Logo do time em destaque
- Nome e tag do time
- Pontuação em fonte grande
- Gradiente de fundo baseado no time
- Borda colorida (verde para Radiant, vermelho para Dire)

---

## 🎯 Templates Disponíveis

### 1. Tournament Pro
**Categoria**: Professional  
**Descrição**: HUD profissional completo para transmissões de torneios  
**Componentes**: ScoreBoard, DraftPanel, PlayerCards, GameTimer  
**Uso**: 245 downloads

### 2. Clean Overlay
**Categoria**: Minimal  
**Descrição**: Overlay minimalista com informações essenciais  
**Componentes**: ScoreBoard simplificado, Timer  
**Uso**: 189 downloads

### 3. Draft Focus
**Categoria**: Draft  
**Descrição**: Template especializado para fase de draft  
**Componentes**: DraftPanel grande, TeamBanners  
**Uso**: 156 downloads

### 4. In-Game Complete
**Categoria**: Complete  
**Descrição**: HUD completo com todas as estatísticas  
**Componentes**: Todos os componentes disponíveis  
**Uso**: 312 downloads

### 5. Team Comparison
**Categoria**: Comparison  
**Descrição**: Layout focado em comparação entre times  
**Componentes**: TeamBanners, PlayerCards side-by-side  
**Uso**: 134 downloads

### 6. Minimal Scoreboard
**Categoria**: Minimal  
**Descrição**: Apenas scoreboard para não obstruir a visão  
**Componentes**: ScoreBoard compacto  
**Uso**: 201 downloads

---

## 🎨 Cores do Tema

### Times
- **Radiant**: `#92E66F` (Verde claro)
- **Dire**: `#E66F6F` (Vermelho claro)

### Brand Colors
- **Primary**: `#34F5A3` (Verde neon)
- **Secondary**: `#6D5DF6` (Roxo)
- **Accent**: `#3AF2E9` (Ciano)

### Backgrounds
- **Dark**: `#020617`
- **Card**: `#0F172A`
- **Card Alt**: `#1E293B`

### Text
- **Primary**: `#F9FAFB`
- **Secondary**: `#E2E8F0`
- **Muted**: `#94A3B8`
- **Subtle**: `#64748B`

---

## 📝 Exemplo de Uso Completo

```vue
<template>
  <div class="dota-hud">
    <!-- Scoreboard no topo -->
    <ScoreBoard 
      :mapData="gameData.map"
      :radiantName="teams.radiant.name"
      :direName="teams.dire.name"
      :radiantLogo="teams.radiant.logo"
      :direLogo="teams.dire.logo"
    />

    <!-- Player cards em grid -->
    <div class="players-grid">
      <PlayerCard 
        v-for="(player, key) in gameData.player.team2"
        :key="key"
        :playerData="player"
        team="radiant"
        :heroImage="getHeroImage(player.hero_id)"
      />
    </div>

    <!-- Draft panel durante a fase de draft -->
    <DraftPanel 
      v-if="isDraftPhase"
      :draftData="gameData.draft"
      :radiantName="teams.radiant.name"
      :direName="teams.dire.name"
    />

    <!-- Timer flutuante -->
    <GameTimer :mapData="gameData.map" />
  </div>
</template>

<script setup>
import { 
  ScoreBoard, 
  PlayerCard, 
  DraftPanel, 
  GameTimer 
} from '@/components/Huds/elements'

// Carregar dados do backend
const gameData = await fetch('/api/dota2/gamestate').then(r => r.json())

const teams = {
  radiant: {
    name: 'Team Secret',
    logo: '/assets/teams/secret.png'
  },
  dire: {
    name: 'OG',
    logo: '/assets/teams/og.png'
  }
}

const isDraftPhase = computed(() => 
  gameData.map.game_state === 'DOTA_GAMERULES_STATE_HERO_SELECTION'
)

const getHeroImage = (heroId) => {
  // Mapear ID para nome do herói
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroClass}.png`
}
</script>
```

---

## 🔗 Links Úteis

- **API do Dota 2**: https://dev.dota2.com/
- **CDN de Imagens de Heróis**: https://cdn.cloudflare.steamstatic.com/apps/dota2/images/
- **Implementação LHM**: https://lhm.gg/custom-hud-implementation/dota2
- **OpenDota API**: https://docs.opendota.com/

---

## 🚀 Próximos Passos

1. ✅ Criar componentes base (PlayerCard, ScoreBoard, etc.)
2. ✅ Implementar templates pré-configurados
3. ⏳ Conectar com API do Dota 2
4. ⏳ Implementar sistema de atualização em tempo real (WebSocket)
5. ⏳ Adicionar mais componentes (Items, Abilities, Minimap)
6. ⏳ Suporte para customização de cores e fontes
7. ⏳ Export para OBS/Streamlabs

---

**Última atualização**: 24 de Dezembro de 2025
