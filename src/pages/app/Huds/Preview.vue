<template>
  <div class="dota-hud-preview">
    <div class="preview-header">
      <h2>Dota 2 HUD Components Preview</h2>
      <Button 
        :icon="PrimeIcons.TIMES" 
        text 
        rounded 
        severity="secondary"
        @click="$router.back()"
      />
    </div>

    <div class="preview-section">
      <h3>Scoreboard</h3>
      <ScoreBoard 
        :data="{
          mapData: sampleData.map,
          radiantName: 'Team Secret',
          direName: 'OG'
        }"
      />
    </div>

    <div class="preview-section">
      <h3>Player Cards</h3>
      <div class="player-cards-grid">
        <PlayerCard 
          v-for="(player, key) in sampleData.player.team2"
          :key="key"
          :data="{
            playerData: player,
            team: 'radiant',
            heroImage: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/anti-mage.png'
          }"
        />
      </div>
    </div>

    <div class="preview-section">
      <h3>Draft Panel</h3>
      <DraftPanel 
        :data="{
          draftData: sampleData.draft,
          radiantName: 'Team Secret',
          direName: 'OG'
        }"
      />
    </div>

    <div class="preview-section">
      <h3>Game Timer</h3>
      <GameTimer 
        :data="{
          mapData: sampleData.map
        }"
      />
    </div>

    <div class="preview-section">
      <h3>Team Banners</h3>
      <div class="team-banners-grid">
        <TeamBanner 
          :data="{
            team: 'radiant',
            teamName: 'Team Secret',
            teamTag: 'SECRET',
            score: sampleData.map.radiant_score
          }"
        />
        <TeamBanner 
          :data="{
            team: 'dire',
            teamName: 'OG',
            teamTag: 'OG',
            score: sampleData.map.dire_score
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { ref } from 'vue'
import {
  PlayerCard,
  ScoreBoard,
  DraftPanel,
  GameTimer,
  TeamBanner
} from '@/components/Huds/elements'

// Sample data from example.json
const sampleData = ref({
  map: {
    game_time: 1847,
    radiant_score: 24,
    dire_score: 18,
    game_state: 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS',
    daytime: true,
    nightstalker_night: false
  },
  player: {
    team2: {
      player0: {
        name: 'Puppey',
        kills: 2,
        deaths: 4,
        assists: 18,
        last_hits: 42,
        denies: 12,
        net_worth: 12500,
        gold: 1250,
        team_name: 'radiant' as const
      },
      player1: {
        name: 'Nisha',
        kills: 12,
        deaths: 2,
        assists: 8,
        last_hits: 287,
        denies: 18,
        net_worth: 24800,
        gold: 3200,
        team_name: 'radiant' as const
      },
      player2: {
        name: 'Zai',
        kills: 4,
        deaths: 3,
        assists: 15,
        last_hits: 156,
        denies: 8,
        net_worth: 15600,
        gold: 1800,
        team_name: 'radiant' as const
      }
    }
  },
  draft: {
    activeteam: 2,
    pick: true,
    activeteam_time_remaining: 25,
    team2: {
      pick0_class: 'anti-mage',
      pick1_class: 'crystal_maiden',
      pick2_class: 'earthshaker',
      pick3_class: 'invoker',
      pick4_class: 'pudge',
      ban0_class: 'shredder',
      ban1_class: 'batrider',
      ban2_class: 'templar_assassin',
      ban3_class: 'storm_spirit',
      ban4_class: 'wisp'
    },
    team3: {
      pick0_class: 'spirit_breaker',
      pick1_class: 'lion',
      pick2_class: 'juggernaut',
      pick3_class: 'shadow_fiend',
      pick4_class: 'vengefulspirit',
      ban0_class: 'grimstroke',
      ban1_class: 'dark_willow',
      ban2_class: 'muerta',
      ban3_class: 'ursa',
      ban4_class: 'tiny'
    }
  }
})
</script>

<style lang="scss" scoped>
.dota-hud-preview {
  padding: 2rem;
  min-height: calc(100vh - 180px);
  background: #020617;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(52, 245, 163, 0.2);

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
    }
  }

  .preview-section {
    margin-bottom: 3rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #E2E8F0;
      margin: 0 0 1.5rem 0;
      padding-left: 0.5rem;
      border-left: 4px solid #34F5A3;
    }
  }

  .player-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }

  .team-banners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .dota-hud-preview {
    padding: 1rem;

    .preview-header h2 {
      font-size: 1.25rem;
    }

    .player-cards-grid,
    .team-banners-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
