# Overlay de HUD - Documentação

## Visão Geral

A página de overlay permite exibir uma HUD em uma janela separada, ideal para uso com OBS Studio ou outros softwares de streaming/captura. O overlay recebe dados em tempo real via GSI (Game State Integration) do Dota 2.

## Como Usar

### 1. Acessar o Overlay

Para exibir uma HUD específica no overlay, acesse a seguinte URL:

```
http://localhost:5173/overlay/{hudId}
```

Substitua `{hudId}` pelo ID da HUD que você deseja exibir.

**Exemplo:**
```
http://localhost:5173/overlay/65a1b2c3d4e5f6g7h8i9j0k1
```

### 2. Adicionar no OBS Studio

1. Abra o OBS Studio
2. Adicione uma nova fonte: **Browser Source**
3. Configure:
   - **URL**: `http://localhost:5173/overlay/{hudId}`
   - **Width**: 1920
   - **Height**: 1080
   - Marque: ✅ **Shutdown source when not visible**
   - Marque: ✅ **Refresh browser when scene becomes active**

### 3. Configurar GSI do Dota 2

Para que o overlay receba dados em tempo real do jogo:

1. Navegue até a pasta de configuração do Dota 2:
   ```
   C:\Program Files (x86)\Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\
   ```

2. Crie um arquivo chamado `gamestate_integration_d2cast.cfg` com o seguinte conteúdo:

```cfg
"D2Cast GSI Configuration"
{
  "uri"           "http://localhost:4000/gsi"
  "timeout"       "5.0"
  "buffer"        "0.1"
  "throttle"      "0.1"
  "heartbeat"     "30.0"
  "data"
  {
    "provider"      "1"
    "map"           "1"
    "player"        "1"
    "hero"          "1"
    "abilities"     "1"
    "items"         "1"
    "draft"         "1"
    "wearables"     "1"
  }
  "auth"
  {
    "token"         "d2cast_secret_token"
  }
}
```

3. Reinicie o Dota 2

## Estrutura Técnica

### Arquivos Criados

- **`src/pages/Overlay.vue`**: Página principal do overlay
- **`src/components/Huds/OverlayCanvas.vue`**: Canvas que renderiza os elementos da HUD

### Fluxo de Dados

```
Dota 2 GSI → WebSocket Server → Overlay Page → OverlayCanvas → HUD Elements
```

1. **Dota 2** envia dados via GSI para o servidor WebSocket
2. **Overlay Page** conecta ao WebSocket e recebe os dados
3. **useGSI composable** gerencia o estado global dos dados
4. **OverlayCanvas** renderiza os elementos da HUD
5. **HUD Elements** (PlayerCard, ScoreBoard, etc.) consomem os dados e se atualizam automaticamente

### Conexão WebSocket

O overlay se conecta automaticamente ao servidor GSI via WebSocket. A URL padrão é:

```
ws://localhost:4000/gsi
```

Para alterar a URL, edite o arquivo `src/pages/Overlay.vue`:

```typescript
const ws = new WebSocket('ws://SEU_SERVIDOR:PORTA/gsi')
```

### Reconexão Automática

O overlay possui reconexão automática. Se a conexão cair, ele tentará reconectar a cada 5 segundos.

## Características

### ✅ Características Implementadas

- 📱 **Carregamento Dinâmico**: A HUD é carregada dinamicamente via API
- 🔄 **Tempo Real**: Dados do jogo são atualizados em tempo real via GSI
- 🎨 **Transparente**: Fundo transparente, ideal para overlays
- 📐 **Resolução Fixa**: 1920x1080 (Full HD)
- 🔌 **Auto-Reconexão**: Reconecta automaticamente se a conexão cair
- 👁️ **Apenas Visíveis**: Exibe apenas elementos com `isShowed: true`
- 🚫 **Sem Edição**: Modo visualização apenas (sem arrastar, redimensionar, etc.)

## Componentes de HUD Disponíveis

Os seguintes componentes podem ser usados na HUD:

- **HudText**: Texto personalizado
- **HudImage**: Imagens/logos
- **PlayerCard**: Card de jogador com dados do GSI
- **ScoreBoard**: Placar do jogo
- **DraftPanel**: Painel de draft/picks
- **GameTimer**: Timer do jogo
- **TeamBanner**: Banner de time

## Dados GSI Disponíveis

O composable `useGSI()` fornece acesso aos seguintes dados:

```typescript
const { 
  data,            // Dados completos do GSI
  map,             // Informações do mapa/partida
  players,         // Todos os jogadores
  radiantPlayers,  // Jogadores do Radiant
  direPlayers,     // Jogadores do Dire
  draft,           // Dados do draft
  gameState,       // Estado atual do jogo
  onChange,        // Listener para mudanças
  setData,         // Atualizar dados manualmente
  clearData        // Limpar dados
} = useGSI()
```

## Exemplo de Uso nos Componentes

Dentro de um componente de HUD element:

```vue
<script setup lang="ts">
import { useGSI } from '@/composables/useGSI'

const { radiantPlayers, direPlayers, map } = useGSI()
</script>

<template>
  <div class="scoreboard">
    <div class="team radiant">
      <span>{{ map?.radiant_score || 0 }}</span>
    </div>
    <div class="team dire">
      <span>{{ map?.dire_score || 0 }}</span>
    </div>
  </div>
</template>
```

## Desenvolvimento

### Testar com Dados de Exemplo

Para testar o overlay sem o Dota 2 rodando, você pode usar dados de exemplo:

1. Certifique-se de ter o arquivo `example.json` na pasta `public/`
2. No arquivo `src/pages/Overlay.vue`, descomente a linha:

```typescript
// loadExampleData()
```

### Adicionar Novo Servidor GSI

Se você precisar criar um servidor GSI simples para testes:

```javascript
// server.js (Node.js)
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
});

// Endpoint para receber dados do Dota 2
server.on('request', (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const data = JSON.parse(body);
      
      // Envia para todos os clientes WebSocket
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
      
      res.writeHead(200);
      res.end();
    });
  }
});

server.listen(4000, () => {
  console.log('Servidor GSI rodando na porta 4000');
});
```

## Troubleshooting

### Overlay não carrega

- Verifique se o ID da HUD está correto
- Confirme que a HUD existe no banco de dados
- Verifique o console do navegador para erros

### Dados não atualizam

- Confirme que o servidor WebSocket está rodando
- Verifique a configuração GSI do Dota 2
- Certifique-se de que o Dota 2 está enviando dados
- Verifique a URL do WebSocket no código

### Elementos não aparecem

- Confirme que os elementos têm `isShowed: true`
- Verifique se as posições não estão fora da tela (1920x1080)
- Confira se o layer (z-index) está correto

## Próximos Passos

### Melhorias Sugeridas

1. **Configuração de Resolução**: Permitir diferentes resoluções
2. **Modo de Teste**: Interface para testar com dados mockados
3. **Hot Reload**: Recarregar HUD quando for editada
4. **Painel de Status**: Mostrar status da conexão GSI
5. **Gravação**: Salvar snapshots dos dados do jogo
6. **Replay**: Reproduzir partidas salvas no overlay

## Suporte

Para questões ou sugestões, entre em contato com a equipe de desenvolvimento.
