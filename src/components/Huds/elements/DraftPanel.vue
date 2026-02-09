<script setup lang="ts">
import type { Dota2Draft, HUDElementBaseEmits, HUDElementBaseProps } from '@/types';
import Base from './Base.vue';
import useGSI, { useDraft } from '@/composables/useGSI';
import { generateListeners } from '@/utils';
import { onMounted, ref, watch } from 'vue';
import CardHeroPick from './draft/CardHeroPick.vue';
import CardHeroBans from './draft/CardHeroBans.vue';
import CardTimer from './draft/CardTimer.vue';

interface Props extends Partial<HUDElementBaseProps> {
  data: {
    draft?: Dota2Draft
    useGSIData?: boolean
    matchType?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  active: false,
  disable: false,
  isInsideBoundingBox: false,
  isResizing: true,
  isShowed: true,
  backgroundColor: '#000000',
  minWidth: '1200px',
  color: '#ffffff',
  maintainAspectRatio: false,
  transparentBackground: true,
  layer: 0,
  position: () => ({ x: 0, y: 0 }),
  size: () => ({ width: 1920, height: 1080 })
})

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)

const formatTime = (seconds: any) => {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}


const { draft: gsiDraft, activeTeam, activeTime, radiant_bonus_time, dire_bonus_time, pickPhase, radiantPlayers, direPlayers } = useDraft()

const radiantState: any = ref([]);
const radiantPicks: any = ref([]);
const radiantBans: any = ref([]);

const direState: any = ref([]);
const direPicks: any = ref([]);
const direBans: any = ref([]);

const DIRE_BANS: any = ref([]);
const RADIANT_BANS: any = ref([]);
const DIRE_PICKS: any = ref([]);
const RADIANT_PICKS: any = ref([]);

const DRAFT_ACTIVE_TIME_REMAINING = ref();
const RADIANT_BONUS_TIME = ref();
const DIRE_BONUS_TIME = ref();

// Team info
const radiantTeamName = ref('Team Radiant');
const direTeamName = ref('Team Dire');
const radiantPlayerNames = ref('');
const direPlayerNames = ref('');

const loadData = async () => {
  DRAFT_ACTIVE_TIME_REMAINING.value = activeTime.value;
  RADIANT_BONUS_TIME.value = radiant_bonus_time.value;
  DIRE_BONUS_TIME.value = dire_bonus_time.value;

  const isPickPhase = pickPhase.value;
  const phase = isPickPhase ? "picking" : "banning";
  
  // Load team and player names
  if (radiantPlayers.value && radiantPlayers.value.length > 0) {
    radiantPlayerNames.value = radiantPlayers.value.map((p: any) => p.name).join(' \\ ');
  }
  
  if (direPlayers.value && direPlayers.value.length > 0) {
    direPlayerNames.value = direPlayers.value.map((p: any) => p.name).join(' \\ ');
  }

  // Processar bans - usar nova estrutura draft.radiant e draft.dire
  const radiantBansData = gsiDraft.value?.radiant?.picks?.filter((p: any) => p.type === 'ban') || [];
  const direBansData = gsiDraft.value?.dire?.picks?.filter((p: any) => p.type === 'ban') || [];

  for (let i = 0; i <= 6; i++) {
    const direBan = direBansData.find((b: any) => b.order === i);
    const radiantBan = radiantBansData.find((b: any) => b.order === i);

    if (direBan && direBan.class) {
      DIRE_BANS.value[i] = direBan.class;
      direState.value = direBan.class;
      direBans.value[i] = direBan.class;
    } else {
      DIRE_BANS.value[i] = "black_image";
      direState.value = phase;
      direBans.value[i] = "none";
    }

    if (radiantBan && radiantBan.class) {
      RADIANT_BANS.value[i] = radiantBan.class;
      radiantState.value = radiantBan.class;
      radiantBans.value[i] = radiantBan.class;
    } else {
      RADIANT_BANS.value[i] = "black_image";
      radiantState.value = phase;
      radiantBans.value[i] = "none";
    }
  }

  if (activeTeam.value === "radiant" && phase === "banning") {
    const nextRadiantBanIndex = radiantBans.value.findIndex(
      (ban: any) => ban === "none"
    );
    if (nextRadiantBanIndex !== -1) {
      radiantBans.value[nextRadiantBanIndex] = "banning";
    }
  }

  if (activeTeam.value === "dire" && phase === "banning") {
    const nextDireBanIndex = direBans.value.findIndex((ban: any) => ban === "none");
    if (nextDireBanIndex !== -1) {
      direBans.value[nextDireBanIndex] = "banning";
    }
  }

  // Processar picks - usar nova estrutura
  const radiantPicksData = gsiDraft.value?.radiant?.picks?.filter((p: any) => p.type === 'pick') || [];
  const direPicksData = gsiDraft.value?.dire?.picks?.filter((p: any) => p.type === 'pick') || [];

  for (let i = 0; i <= 4; i++) {
    const direPick = direPicksData.find((p: any) => p.order === i);
    const radiantPick = radiantPicksData.find((p: any) => p.order === i);

    if (direPick && direPick.class) {
      DIRE_PICKS.value[i] = direPick.class;
      direState.value = direPick.class;
      direPicks.value[i] = direPick.class;
    } else {
      DIRE_PICKS.value[i] = "dota2_logo_animated";
      direState.value = phase;
      direPicks.value[i] = "none";
    }

    if (radiantPick && radiantPick.class) {
      RADIANT_PICKS.value[i] = radiantPick.class;
      radiantState.value = radiantPick.class;
      radiantPicks.value[i] = radiantPick.class;
    } else {
      RADIANT_PICKS.value[i] = "dota2_logo_animated";
      radiantState.value = phase;
      radiantPicks.value[i] = "none";
    }
  }

  if (activeTeam.value === "radiant" && phase === "picking") {
    const nextRadiantPickIndex = radiantPicks.value.findIndex(
      (pick: any) => pick === "none"
    );
    if (nextRadiantPickIndex !== -1) {
      radiantPicks.value[nextRadiantPickIndex] = "picking";
    }
  }

  if (activeTeam.value === "dire" && phase === "picking") {
    const nextDirePickIndex = direPicks.value.findIndex((pick: any) => pick === "none");
    if (nextDirePickIndex !== -1) {
      direPicks.value[nextDirePickIndex] = "picking";
    }
  }

  console.table({
    "Draft Active Time Remaining": formatTime(DRAFT_ACTIVE_TIME_REMAINING.value),
    "Radiant Bonus Time": formatTime(RADIANT_BONUS_TIME.value),
    "Dire Bonus Time": formatTime(DIRE_BONUS_TIME.value),
    "Active Team": activeTeam.value,
    "Current Phase": phase,
    "Radiant State": radiantState.value,
    "Dire State": direState.value,
    "Radiant Picks": radiantPicks.value,
    "Dire Picks": direPicks.value,
    "Radiant Bans": radiantBans.value,
    "Dire Bans": direBans.value,
  });
}

const { 
  loadExampleData, 
} = useGSI()

onMounted(async () => {
  await loadExampleData()
  // await loadData()
})

// Watch para atualizar automaticamente quando dados do GSI mudarem
watch(
  [gsiDraft, activeTime, radiant_bonus_time, dire_bonus_time, pickPhase, activeTeam],
  () => {
    if (gsiDraft.value) {
      loadData()
    }
  },
  { deep: true }
)

// Watch para atualizar nomes dos jogadores quando mudarem
watch(
  [radiantPlayers, direPlayers],
  () => {
    if (radiantPlayers.value && radiantPlayers.value.length > 0) {
      radiantPlayerNames.value = radiantPlayers.value.map((p: any) => p.name).join(' \\ ')
    }
    
    if (direPlayers.value && direPlayers.value.length > 0) {
      direPlayerNames.value = direPlayers.value.map((p: any) => p.name).join(' \\ ')
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
<Base class="stream-crafter-hud-element-draft-panel" v-bind="props" v-on="on">
     <!-- 
        // draft:activeteam
        // draft:activeteam_time_remaining
        // draft:dire_bonus_time
        // draft:pick
        // draft:radiant_bonus_time
        // draft:team#:home_team
        // draft:team#:ban#_class (0-5)
        // draft:team#:ban#_id (0-5)
        // draft:team#:pick#_class (0-4)
        // draft:team#:pick#_id (0-4)
     -->

    <div class="flex flex-col w-full h-full" :class="{ 'bg-gradient-to-b from-gray-900 to-black': !transparentBackground }">
        <!-- TOP ROW: PICKS -->
        <div class="flex flex-row w-full h-full">
            <!-- RADIANT PICKS -->
            <div class="flex flex-row" style="width: calc((100% - 14rem) / 2)">
                <div v-for="(player, index) in radiantPicks" :key="`radiant-pick-${index}-${player}`" class="flex-1 border-r border-black">
                    <CardHeroPick 
                        :player="player" 
                        :index="Number(index)" 
                        team="radiant"
                        :isPicking="activeTeam === 'radiant' && player === 'picking'"
                    />
                </div>
            </div>
            
            <!-- MIDDLE TIMER -->
            <div class="w-56 flex-shrink-0 border-x-4 border-gray-800 z-50">
                <CardTimer 
                    :activeTeam="activeTeam" 
                    :activeTime="DRAFT_ACTIVE_TIME_REMAINING" 
                    :radiantBonusTime="RADIANT_BONUS_TIME" 
                    :direBonusTime="DIRE_BONUS_TIME"
                />
            </div>
            
            <!-- DIRE PICKS -->
            <div class="flex flex-row" style="width: calc((100% - 14rem) / 2)">
                <div v-for="(player, index) in direPicks" :key="`dire-pick-${index}-${player}`" class="flex-1 border-l border-black">
                    <CardHeroPick 
                        :player="player" 
                        :index="Number(index)" 
                        team="dire"
                        :isPicking="activeTeam === 'dire' && player === 'picking'"
                    />
                </div>
            </div>
        </div>

        <!-- BOTTOM ROW: TEAM INFO -->
        <div class="flex flex-row w-full h-full">
            <!-- RADIANT TEAM INFO -->
            <div class="flex flex-row items-center justify-between bg-gradient-to-r from-blue-950 to-blue-900 px-1.5 gap-1" style="width: calc((100% - 14rem) / 2)">
                <!-- Team Number -->
                <div class="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    1
                </div>
                
                <!-- Team Name and Players -->
                <div class="flex-shrink min-w-0 text-left max-w-xs overflow-hidden">
                    <h2 class="text-white text-xl font-bold truncate">{{ radiantTeamName }}</h2>
                    <div class="relative overflow-hidden">
                        <p 
                            class="text-blue-300 text-xs whitespace-nowrap inline-block"
                            :class="radiantPlayerNames.length > 0 ? 'animate-marquee' : ''"
                        >
                            {{ radiantPlayerNames }}
                        </p>
                    </div>
                </div>

                <!-- RADIANT BANS -->
                <div class="flex flex-row gap-1 flex-shrink-0">
                    <div v-for="(heroBan, index) in radiantBans" :key="`radiant-ban-${index}-${heroBan}`" class="w-12 h-12">
                        <CardHeroBans :heroBan="heroBan" />
                    </div>
                </div>
            </div>
            
            <!-- CENTER DIVIDER -->
            <div class="w-56 flex-shrink-0 bg-black border-x-4 border-gray-800"></div>
            
            <!-- DIRE TEAM INFO -->
            <div class="flex flex-row items-center justify-between bg-gradient-to-l from-pink-950 to-pink-900 px-2 gap-1" style="width: calc((100% - 14rem) / 2)">
                <!-- DIRE BANS -->
                <div class="flex flex-row-reverse gap-1 flex-shrink-0">
                    <div v-for="(heroBan, index) in direBans" :key="`dire-ban-${index}-${heroBan}`" class="w-12 h-12">
                        <CardHeroBans :heroBan="heroBan" />
                    </div>
                </div>
                <!-- Team Name and Players -->
                <div class="flex-shrink min-w-0 text-right max-w-xs overflow-hidden">
                    <h2 class="text-white text-xl font-bold truncate">{{ direTeamName }}</h2>
                    <div class="relative overflow-hidden">
                        <p 
                            class="text-pink-300 text-xs whitespace-nowrap inline-block"
                            :class="direPlayerNames.length > 0 ? 'animate-marquee' : ''"
                        >
                            {{ direPlayerNames }}
                        </p>
                    </div>
                </div>
                <!-- Team Number -->
                <div class="w-8 h-8 bg-pink-700 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    1
                </div>
            </div>
        </div>
    </div>
</Base>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    transform: translateX(-100%);
    opacity: 0;
  }
  96% {
    transform: translateX(20%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
}

.animate-marquee {
  animation: marquee 12s ease-in-out infinite;
}
</style>