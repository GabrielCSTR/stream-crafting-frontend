# D2Cast - Dota 2 HUD Creator

Sistema de criação e gerenciamento de HUDs personalizadas para transmissões de Dota 2, com integração GSI (Game State Integration).

## 🎯 Visão Geral

D2Cast permite criar HUDs dinâmicas e interativas para transmissões de Dota 2, similar ao [lexogrine/dota2-react-hud](https://github.com/lexogrine/dota2-react-hud). O sistema inclui:

- **Editor Visual**: Canvas com drag-and-drop para posicionar elementos
- **Componentes Pré-construídos**: PlayerCard, ScoreBoard, DraftPanel, GameTimer, TeamBanner
- **Integração GSI**: Dados em tempo real do Dota 2
- **Sistema de Templates**: Layouts pré-configurados prontos para uso
- **Agrupamento de Elementos**: Agrupe e mova múltiplos elementos juntos
- **Controles por Teclado**: Setas para mover, Delete para remover

## 🏗️ Arquitetura GSI

A integração com dados do Dota 2 é feita através de um sistema reativo inspirado no lexogrine:

```typescript
import { useGSI } from '@/composables/useGSI'

// Carregar dados de exemplo
const { players, map, loadExampleData, onChange } = useGSI()
await loadExampleData()

// Escutar mudanças (similar ao configs.onChange do lexogrine)
onChange((data) => {
  console.log('Game state updated:', data?.map?.game_state)
})
```

**Documentação completa**: [GSI_ARCHITECTURE.md](./GSI_ARCHITECTURE.md)

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

```sh
pnpm install
```

### Desenvolvimento

```sh
pnpm dev
```

Acesse:
- **App**: http://localhost:5173
- **Exemplo GSI**: http://localhost:5173/app/gsi-example

## 📦 Estrutura do Projeto

```
src/
├── components/
│   └── Huds/
│       ├── Canvas.vue              # Editor visual com drag-and-drop
│       └── elements/               # Componentes HUD
│           ├── Base.vue           # Wrapper com drag/resize
│           ├── PlayerCard.vue     # Card de jogador (K/D/A, gold, etc)
│           ├── ScoreBoard.vue     # Placar com timer e estado
│           ├── DraftPanel.vue     # Painel de draft (picks/bans)
│           ├── GameTimer.vue      # Timer com ciclo dia/noite
│           └── TeamBanner.vue     # Banner de time
├── composables/
│   ├── useGSI.ts                  # Gerenciamento de dados GSI
│   ├── useElement.ts              # Lógica de drag/drop/resize
│   └── useElementSelection.ts     # Seleção múltipla e grouping
├── types/
│   ├── gsi.ts                     # Tipos TypeScript para GSI
│   └── hud.ts                     # Tipos para elementos do HUD
└── pages/
    └── app/
        ├── Huds/                  # Páginas de gerenciamento
        └── GSIExample.vue         # Página de exemplo GSI
```

## 🎮 Componentes HUD

### PlayerCard

Exibe informações de um jogador (KDA, net worth, last hits).

```vue
<!-- Usando dados GSI -->
<PlayerCard :data="{ steamid: '76561198...' }" />

<!-- Ou passar player diretamente -->
<PlayerCard :data="{ player: playerObject }" />

<!-- Modo legacy -->
<PlayerCard :data="{ 
  playerData: { name: 'Player', kills: 5, deaths: 2, assists: 8 }
}" />
```

### ScoreBoard

Placar central com timer, estado do jogo e score dos times.

```vue
<!-- Usando dados GSI globais -->
<ScoreBoard :data="{ useGSIData: true }" />

<!-- Ou passar map diretamente -->
<ScoreBoard :data="{ map: mapObject }" />
```

### DraftPanel

Painel de draft mostrando picks e bans de ambos os times.

```vue
<DraftPanel :data="{ draft: draftObject }" />
```

### GameTimer

Timer do jogo com indicador de ciclo dia/noite.

```vue
<GameTimer :data="{ time: 1234, isDaytime: true }" />
```

### TeamBanner

Banner de time com logo, nome e score.

```vue
<TeamBanner :data="{ team: 'radiant', teamData: teamObject }" />
```

## 🎨 Editor de HUD

O Canvas editor permite:

- **Arrastar e Soltar**: Clique e arraste elementos
- **Redimensionar**: Arraste as bordas para redimensionar
- **Seleção Múltipla**: Ctrl+Click ou arraste uma área
- **Agrupar**: Selecione múltiplos elementos e clique em "Agrupar"
- **Mover com Teclado**: Setas (1px) ou Shift+Setas (10px)
- **Remover**: Delete ou Backspace
- **Centralizar**: Novos elementos aparecem no centro do canvas

## 🔧 Atalhos de Teclado

- `↑ ↓ ← →` - Mover elemento selecionado 1px
- `Shift + ↑ ↓ ← →` - Mover elemento selecionado 10px
- `Delete` / `Backspace` - Remover elementos selecionados
- `Ctrl + Click` - Seleção múltipla

## 📊 Dados GSI

### Carregar Dados de Exemplo

```typescript
import { useGSI } from '@/composables/useGSI'

const { loadExampleData } = useGSI()
await loadExampleData()  // Carrega example.json
```

### Hooks Especializados

```typescript
// Hook para player específico
import { usePlayer } from '@/composables/useGSI'
const steamidRef = ref('76561198...')
const { player } = usePlayer(steamidRef)

// Hook para time
import { useTeam } from '@/composables/useGSI'
const teamRef = ref<'radiant' | 'dire'>('radiant')
const { players, teamData, score } = useTeam(teamRef)

// Hook para draft
import { useDraft } from '@/composables/useGSI'
const { draft, radiantDraft, direDraft, activeTeam } = useDraft()
```

### Helpers de Imagens

```typescript
import { getHeroImageURL, getItemImageURL, getAbilityImageURL } from '@/types/gsi'

// Imagem do herói (Steam CDN)
const img = getHeroImageURL('npc_dota_hero_axe', 'icon')
// https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crops/axe.png

// Item
const itemImg = getItemImageURL('item_blink')

// Habilidade
const abilityImg = getAbilityImageURL('axe_berserkers_call')
```

## 🧪 Testing

### Unit Tests

```sh
pnpm test:unit
```

### E2E Tests

```sh
# Development
pnpm test:e2e:dev

# Production build
pnpm build
pnpm test:e2e
```

## 📝 Scripts Disponíveis

```sh
pnpm dev          # Desenvolvimento com hot-reload
pnpm build        # Build de produção
pnpm preview      # Preview do build
pnpm lint         # Lint com ESLint
pnpm format       # Format com Prettier
pnpm type-check   # Type checking com vue-tsc
```

## 🎯 Roadmap

- [x] Editor visual com drag-and-drop
- [x] Componentes básicos (PlayerCard, ScoreBoard, etc.)
- [x] Sistema de agrupamento de elementos
- [x] Integração GSI com composables
- [x] Tipos TypeScript completos
- [ ] Sistema de templates pré-configurados
- [ ] Conexão GSI em tempo real (WebSocket)
- [ ] Sistema de ações (keybinds)
- [ ] Export de HUD para produção
- [ ] Preview em tempo real

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📚 Referências

- [lexogrine/dota2-react-hud](https://github.com/lexogrine/dota2-react-hud) - Inspiração arquitetural
- [Dota 2 GSI Documentation](https://developer.valvesoftware.com/wiki/Dota_2_Game_State_Integration)
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ pela equipe D2Cast**
