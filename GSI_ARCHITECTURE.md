# Arquitetura GSI (Game State Integration) - D2Cast

Este documento explica como funciona a integração com dados do Dota 2 GSI, inspirado na arquitetura do [lexogrine/dota2-react-hud](https://github.com/lexogrine/dota2-react-hud).

## 📋 Visão Geral

O sistema GSI permite que os componentes do HUD recebam dados em tempo real do Dota 2 durante uma partida. A arquitetura foi projetada para:

1. **Gerenciamento Centralizado**: Um único ponto de verdade para todos os dados do jogo
2. **Reatividade**: Componentes se atualizam automaticamente quando os dados mudam
3. **Compatibilidade**: Suporte tanto para dados GSI quanto para dados mockados
4. **Tipagem Forte**: TypeScript garante segurança de tipos

## 🏗️ Estrutura

### 1. Composable `useGSI`

**Arquivo**: `src/composables/useGSI.ts`

Similar ao padrão `configs.onChange()` do lexogrine, este composable:

- Mantém o estado global dos dados GSI
- Permite que componentes "escutem" mudanças nos dados
- Fornece métodos helper para acessar dados específicos

**Exemplo de uso básico**:

```typescript
import { useGSI } from '@/composables/useGSI'

const { map, players, onChange, loadExampleData } = useGSI()

// Carregar dados de exemplo
await loadExampleData()

// Escutar mudanças (similar ao configs.onChange do lexogrine)
onChange((data) => {
  console.log('Dados GSI atualizados:', data)
})
```

### 2. Tipos TypeScript

**Arquivo**: `src/types/gsi.ts`

Define todas as interfaces para dados do Dota 2:

- `Dota2GSIData` - Estrutura completa dos dados GSI
- `Dota2Map` - Informações do mapa/partida
- `Dota2Player` - Dados de um jogador
- `Dota2Hero` - Informações do herói
- `Dota2Draft` - Dados da fase de draft
- Helpers utilitários (formatação de tempo, URLs de imagens, etc.)

### 3. Componentes Atualizados

Os seguintes componentes foram atualizados para suportar dados GSI:

#### PlayerCard
```vue
<!-- Modo GSI (recomendado) -->
<PlayerCard :data="{ steamid: '76561198...' }" />

<!-- Ou passar player diretamente -->
<PlayerCard :data="{ player: playerObject }" />

<!-- Modo legacy (compatibilidade) -->
<PlayerCard :data="{ 
  playerData: { name: 'Player', kills: 5, ... }
}" />
```

#### ScoreBoard
```vue
<!-- Usando dados GSI globais -->
<ScoreBoard :data="{ useGSIData: true }" />

<!-- Ou passar map diretamente -->
<ScoreBoard :data="{ map: mapObject }" />
```

## 🎯 Padrões de Uso

### Hook Especializado para Player

```typescript
import { usePlayer } from '@/composables/useGSI'

// Buscar player específico por steamid
const steamidRef = ref('76561198131528630')
const { player } = usePlayer(steamidRef)

// player é reativo e atualiza automaticamente
```

### Hook para Time

```typescript
import { useTeam } from '@/composables/useGSI'

const teamRef = ref<'radiant' | 'dire'>('radiant')
const { players, teamData, score } = useTeam(teamRef)
```

### Hook para Draft

```typescript
import { useDraft } from '@/composables/useGSI'

const { draft, radiantDraft, direDraft, activeTeam, activeTime } = useDraft()
```

## 📊 Estrutura de Dados

### Exemplo de dados GSI (simplificado):

```typescript
{
  "map": {
    "matchid": "7767295255",
    "game_time": 286,
    "radiant_score": 5,
    "dire_score": 3,
    "game_state": "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS",
    "daytime": false
  },
  "player": {
    "team2": {
      "player0": {
        "steamid": "76561198...",
        "name": "Player Name",
        "kills": 5,
        "deaths": 2,
        "assists": 8,
        "team_name": "radiant",
        "hero": {
          "name": "npc_dota_hero_axe",
          "level": 12,
          "health": 1250,
          "max_health": 1500
        }
      }
    }
  }
}
```

## 🖼️ Helpers de Imagens

O sistema inclui funções para obter URLs de assets do Dota 2:

```typescript
import { getHeroImageURL, getItemImageURL, getAbilityImageURL } from '@/types/gsi'

// Imagem do herói
const heroImg = getHeroImageURL('npc_dota_hero_axe', 'icon')
// https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/axe.png

// Item
const itemImg = getItemImageURL('item_blink')
// https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blink.png

// Habilidade
const abilityImg = getAbilityImageURL('axe_berserkers_call')
// https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/axe_berserkers_call.png
```

## 🔄 Fluxo de Dados

```
┌─────────────┐
│  Dota 2 GSI │ (Game State Integration)
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│   useGSI()      │ (Estado Global Singleton)
│   composable    │
└──────┬──────────┘
       │
       ├─→ onChange() listeners
       │
       ├─→ Computed properties (map, players, draft)
       │
       └─→ Specialized hooks (usePlayer, useTeam, useDraft)
              │
              ↓
       ┌─────────────┐
       │ Componentes │ (PlayerCard, ScoreBoard, etc.)
       └─────────────┘
```

## 🎨 Exemplo Completo

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useGSI } from '@/composables/useGSI'
import { PlayerCard, ScoreBoard } from '@/components/Huds/elements'

const { players, loadExampleData, onChange } = useGSI()

onMounted(async () => {
  // Carregar dados de exemplo
  await loadExampleData()
  
  // Escutar mudanças (como lexogrine)
  onChange((data) => {
    console.log('Game state updated:', data?.map?.game_state)
  })
})
</script>

<template>
  <div class="hud-preview">
    <!-- Scoreboard com dados GSI globais -->
    <ScoreBoard :data="{ useGSIData: true }" />
    
    <!-- Player cards para cada jogador -->
    <PlayerCard 
      v-for="player in players" 
      :key="player.steamid"
      :data="{ player }"
    />
  </div>
</template>
```

## 🔧 Próximos Passos

1. **Templates System**: Criar sistema de templates pré-configurados (similar às views do lexogrine)
2. **Live GSI Connection**: Conectar com dados GSI em tempo real via WebSocket
3. **Canvas Data Selector**: UI para selecionar qual dado GSI cada elemento mostra
4. **Actions System**: Implementar sistema de ações (similar ao `actions.on()` do lexogrine)

## 📚 Referências

- [lexogrine/dota2-react-hud](https://github.com/lexogrine/dota2-react-hud) - Inspiração arquitetural
- [Dota 2 GSI Documentation](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration) - Documentação oficial
- [LHM.gg](https://lhm.gg) - Plataforma de HUD management

---

**Última atualização**: $(date +%Y-%m-%d)  
**Autor**: D2Cast Team
