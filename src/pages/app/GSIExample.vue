<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGSI } from '@/composables/useGSI'
import { PlayerCard, ScoreBoard } from '@/components/Huds/elements'

const { 
  players, 
  radiantPlayers, 
  direPlayers, 
  map, 
  gameState, 
  loadExampleData, 
  onChange 
} = useGSI()

// Carrega dados de exemplo quando componente monta
onMounted(async () => {
  await loadExampleData()
  
  // Log para debug
  console.log('GSI Data loaded:', { 
    playersCount: players.value.length,
    gameState: gameState.value,
    mapData: map.value 
  })
  
  // Escutar mudanças (similar ao configs.onChange do lexogrine)
  onChange((data) => {
    if (data) {
      console.log('Game state updated:', data.map?.game_state)
    }
  })
})

// Computed para primeiros 3 players de cada time (exemplo)
const radiantTop3 = computed(() => radiantPlayers.value.slice(0, 3))
const direTop3 = computed(() => direPlayers.value.slice(0, 3))
</script>

<template>
  <div class="gsi-example-page">
    <div class="page-header">
      <h1>Exemplo GSI - Dota 2 Data Integration</h1>
      <p>Demonstração dos componentes usando dados reais do Dota 2 GSI</p>
    </div>

    <!-- Scoreboard -->
    <div class="section">
      <h2>ScoreBoard Component</h2>
      <div class="component-demo">
        <ScoreBoard 
          :data="{ useGSIData: true }" 
          :size="{ width: 800, height: 120 }"
        />
      </div>
      <div class="data-preview">
        <h3>Map Data:</h3>
        <pre>{{ map }}</pre>
      </div>
    </div>

    <!-- Player Cards - Radiant -->
    <div class="section">
      <h2>PlayerCard Components - Radiant Team</h2>
      <div class="component-demo component-demo--grid">
        <PlayerCard 
          v-for="player in radiantTop3" 
          :key="player.steamid"
          :data="{ player }"
          :size="{ width: 300, height: 120 }"
        />
      </div>
      <div class="data-preview">
        <h3>Radiant Players Data:</h3>
        <pre>{{ radiantTop3 }}</pre>
      </div>
    </div>

    <!-- Player Cards - Dire -->
    <div class="section">
      <h2>PlayerCard Components - Dire Team</h2>
      <div class="component-demo component-demo--grid">
        <PlayerCard 
          v-for="player in direTop3" 
          :key="player.steamid"
          :data="{ player }"
          :size="{ width: 300, height: 120 }"
        />
      </div>
      <div class="data-preview">
        <h3>Dire Players Data:</h3>
        <pre>{{ direTop3 }}</pre>
      </div>
    </div>

    <!-- All Players Summary -->
    <div class="section">
      <h2>All Players Summary</h2>
      <div class="players-summary">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>K/D/A</th>
              <th>Net Worth</th>
              <th>GPM/XPM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player.steamid" :class="`team-${player.team_name}`">
              <td>{{ player.name }}</td>
              <td>{{ player.team_name }}</td>
              <td>{{ player.kills }}/{{ player.deaths }}/{{ player.assists }}</td>
              <td>{{ player.net_worth }}</td>
              <td>{{ player.gpm }}/{{ player.xpm }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Instructions -->
    <div class="section section--info">
      <h2>Como Funciona</h2>
      <div class="info-content">
        <h3>1. Carregamento de Dados</h3>
        <p>Esta página carrega automaticamente os dados do arquivo <code>example.json</code> usando o composable <code>useGSI()</code>.</p>
        
        <h3>2. Componentes Reativos</h3>
        <p>Todos os componentes (PlayerCard, ScoreBoard, etc.) reagem automaticamente a mudanças nos dados GSI.</p>
        
        <h3>3. Arquitetura Inspirada no Lexogrine</h3>
        <p>Similar ao <code>configs.onChange()</code> do <a href="https://github.com/lexogrine/dota2-react-hud" target="_blank">lexogrine/dota2-react-hud</a>.</p>
        
        <h3>4. Uso nos Componentes</h3>
        <pre><code>// Usando dados GSI globais
&lt;ScoreBoard :data="{ useGSIData: true }" /&gt;

// Ou passando player diretamente
&lt;PlayerCard :data="{ player: playerObject }" /&gt;

// Ou usando steamid para buscar do GSI
&lt;PlayerCard :data="{ steamid: '76561198...' }" /&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gsi-example-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  color: #E2E8F0;
}

.page-header {
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #FD2A36;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.125rem;
    color: #A4A4A4;
  }
}

.section {
  margin-bottom: 3rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(253, 42, 54, 0.1);
  border-radius: 12px;
  padding: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #FD2A36;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #FFAF0E;
    margin-bottom: 1rem;
  }
  
  &--info {
    border-color: rgba(255, 175, 14, 0.3);
    background: rgba(255, 175, 14, 0.05);
    
    code {
      background: rgba(15, 23, 42, 0.8);
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      color: #2671F4;
    }
    
    pre {
      background: rgba(15, 23, 42, 0.8);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      
      code {
        background: transparent;
        padding: 0;
      }
    }
    
    a {
      color: #2671F4;
      text-decoration: underline;
      
      &:hover {
        color: #FD2A36;
      }
    }
  }
}

.component-demo {
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  
  &--grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
}

.data-preview {
  pre {
    background: rgba(15, 23, 42, 0.8);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #A4A4A4;
    max-height: 300px;
    overflow-y: auto;
  }
}

.players-summary {
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    thead {
      background: rgba(253, 42, 54, 0.1);
      
      th {
        padding: 0.75rem 1rem;
        text-align: left;
        font-weight: 600;
        color: #FD2A36;
        border-bottom: 2px solid rgba(253, 42, 54, 0.3);
      }
    }
    
    tbody {
      tr {
        border-bottom: 1px solid rgba(253, 42, 54, 0.1);
        transition: background-color 0.2s;
        
        &:hover {
          background: rgba(253, 42, 54, 0.05);
        }
        
        &.team-radiant {
          td:nth-child(2) {
            color: #92E66F;
            font-weight: 600;
          }
        }
        
        &.team-dire {
          td:nth-child(2) {
            color: #E66F6F;
            font-weight: 600;
          }
        }
      }
      
      td {
        padding: 0.75rem 1rem;
        color: #E2E8F0;
      }
    }
  }
}

.info-content {
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  h3 {
    margin-top: 1.5rem;
    
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
