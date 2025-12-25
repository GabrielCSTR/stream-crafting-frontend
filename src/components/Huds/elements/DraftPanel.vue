<script setup lang="ts">
import type { Dota2Draft, HUDElementBaseEmits, HUDElementBaseProps } from '@/types';
import Base from './Base.vue';
import useGSI, { useDraft } from '@/composables/useGSI';
import { generateListeners } from '@/utils';
import { onMounted, ref } from 'vue';
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
  color: '#ffffff',
  maintainAspectRatio: false,
  // transparentBackground: true,
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


const { draft: gsiDraft, activeTeam, activeTime, radiant_bonus_time, dire_bonus_time, pickPhase } = useDraft()

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

const loadData = async () => {
  DRAFT_ACTIVE_TIME_REMAINING.value = activeTime.value;
  RADIANT_BONUS_TIME.value = radiant_bonus_time.value;
  DIRE_BONUS_TIME.value = dire_bonus_time.value;

  const isPickPhase = pickPhase.value;
  const phase = isPickPhase ? "picking" : "banning"; // Assign phase inside the callback

  console.log("DATA GSI", gsiDraft.value);
  


  for (let i = 0; i <= 6; i++) {
    const banKeyDire = `ban${i}_class`;
    const banDataDire = gsiDraft.value.team3[banKeyDire];
    const banKeyRadiant = `ban${i}_class`;
    const banDataRadiant = gsiDraft.value.team2[banKeyRadiant];

    if (banDataDire) {
      DIRE_BANS.value[i] = banDataDire;
      direState.value = banDataDire;
      direBans.value[i] = banDataDire;
    } else {
      DIRE_BANS.value[i] = "black_image";
      direState.value = phase;
      direBans.value[i] = "none";
    }

    if (banDataRadiant) {
      RADIANT_BANS.value[i] = banDataRadiant;
      radiantState.value = banDataRadiant;
      radiantBans.value[i] = banDataRadiant;
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

  for (let i = 0; i <= 4; i++) {
    const pickKeyDire = `pick${i}_class`;
    const pickDataDire = gsiDraft.value.team3[pickKeyDire];
    const pickKeyRadiant = `pick${i}_class`;
    const pickDataRadiant = gsiDraft.value.team2[pickKeyRadiant];

    if (pickDataDire) {
      DIRE_PICKS.value[i] = pickDataDire;
      direState.value = pickDataDire;
      direPicks.value[i] = pickDataDire;
    } else {
      DIRE_PICKS.value[i] = "dota2_logo_animated";
      direState.value = phase;
      direPicks.value[i] = "none";
    }

    if (pickDataRadiant) {
      RADIANT_PICKS.value[i] = pickDataRadiant;
      radiantState.value = pickDataRadiant;
      radiantPicks.value[i] = pickDataRadiant;
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
    "Draft Active Time Remaining": formatTime(DRAFT_ACTIVE_TIME_REMAINING),
    "Radiant Bonus Time": formatTime(RADIANT_BONUS_TIME),
    "Dire Bonus Time": formatTime(DIRE_BONUS_TIME),
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
  await loadData()
})
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

    <div class="flex flex-row w-full">
        <!-- DRAFT LEFT PANEL -->
        <div class="flex flex-col w-full">
            <!-- RADIANT PICKS HERO -->
            <div class="flex flex-row">
                <div v-for="(player, index) in radiantPicks" :key="index" class="w-auto">
                  <CardHeroPick :player="player" :index="Number(index)" />
                </div>
            </div>
            <!-- RADIANT BANS HERO -->
            <div class="flex flex-row bg-red-600 w-full">
                <div v-for="(heroBan, index) in radiantBans" :key="index">
                    <CardHeroBans :heroBan="heroBan" />
                </div>
            </div>
        </div>
        
        <!-- DRAFT MIDDLE PANEL -->
        <CardTimer 
            :activeTeam="activeTeam" 
            :activeTime="DRAFT_ACTIVE_TIME_REMAINING" 
            :radiantBonusTime="RADIANT_BONUS_TIME" 
            :direBonusTime="DIRE_BONUS_TIME"
        />

        <!-- DRAFT RIGHT PANEL -->
        <div class="flex flex-col w-full">
            <!-- DIRE PICKS HERO -->
            <div class="flex flex-row-reverse">
               <div v-for="(player, index) in direPicks" :key="index" class="w-auto">
                   <CardHeroPick :player="player" :index="Number(index)" />
                </div>
            </div>
            <!-- DIRE BANS HERO -->
              <div class="flex flex-row-reverse bg-red-600">
                <div v-for="(heroBan, index) in direBans" :key="index">
                   <CardHeroBans :heroBan="heroBan" />
                </div>
            </div>
        </div>
    </div>
</Base>
</template>