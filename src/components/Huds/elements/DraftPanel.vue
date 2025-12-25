<script setup lang="ts">
import type { Dota2Draft, HUDElementBaseEmits, HUDElementBaseProps } from '@/types';
import Base from './Base.vue';
import useGSI, { useDraft } from '@/composables/useGSI';
import { generateListeners } from '@/utils';
import { computed, onMounted, ref } from 'vue';

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

const getImageUrl = (hero_name: string) => {
    if(!hero_name || hero_name === "none" || hero_name === "banning" || hero_name === "picking") {
      return new URL(`../../../assets/images/dota2_logo_animated.mp4`, import.meta.url).href;
    }
    const image = new URL(`../../../assets/images/heroes_animated/npc_dota_hero_${hero_name}.webm`, import.meta.url).href;
    return image;
};


const getImageStaticUrl = (hero_name: string) => {
    const image = new URL(`../../../assets/images/heroes_static/${hero_name}.png`, import.meta.url).href;
    return image || '';
};


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
                    <div class="media-container">
                        <video :id="`radiant_pick:pick${index}_class_image`" autoplay muted loop
                            class=" w-[600px] h-[200px] object-fill">
                            <source :src="getImageUrl(player)" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <!-- RADIANT BANS HERO -->
            <div class="flex flex-row bg-red-600 w-full">
                <div v-for="(heroBan, index) in radiantBans" :key="index">
                    <div v-if="heroBan == 'banning' && heroBan != 'none'"
                      class="relative w-full h-full bg-red-600 animate-fade-in">
                      <div class="banning-inner-shadow absolute inset-0 bg-red-600 opacity-60"></div>
                      <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%] h-[28px] pulse"
                          src="@/assets/images/cross.png" alt="cross.png" onerror="this.style.display='none'" />
                      <p
                          class="banning-font tracking-[.25em] absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center mb-[4px] text-white text-[10px] font-bold pulse">
                          BANNING
                      </p>
                    </div>

                    <div v-if="heroBan == 'none' && heroBan != 'banning'"
                        class="relative w-full h-full bg-red-600 animate-fade-in">
                        <img class="h-[55px] w-full grayscale" src="@/assets/images/black_image.png" alt="" />
                        <div class="absolute inset-0 bg-red-950 opacity-60"></div>
                    </div>

                    <div v-if="heroBan != 'none' && heroBan != 'banning'" class=" relative w-full h-full bg-red-600">
                        <img class="h-[55px] w-full grayscale contrast-125 animate-fade-in" :src="getImageStaticUrl(heroBan)"
                            alt="" />
                        <div class="slash"></div>
                        <div class="inner-shadow absolute inset-0 bg-red-600 opacity-30"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- DRAFT MIDDLE PANEL -->
        <div class="relative flex flex-col w-[1280px] bg-blue-300">
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div class="flex flex-row mb-12">
                      <div v-if="activeTeam == 'radiant'">
                          <img class="h-14 scale-x-[-1]" src="@/assets/images/arrow.png" alt="" />
                      </div>
                      <div v-else-if="activeTeam == 'dire'">
                          <img  class="h-14 scale-x-[-1] opacity-0" src="@/assets/images/arrow.png" alt="" />
                      </div>
                      <p class="text-5xl activeteam_time_remaining text-black">
                          {{ formatTime(DRAFT_ACTIVE_TIME_REMAINING) }}
                      </p>

                      <div v-if="activeTeam == 'dire'">
                          <img class="h-14" src="@/assets/images/arrow.png" alt="" />
                      </div>
                      <div v-else-if="activeTeam == 'radiant'">
                          <img class="h-14 opacity-0" src="@/assets/images/arrow.png" alt="" />
                      </div>

                  </div>
              </div>
              <div class="absolute bottom-0 w-full bg-orange-500">
                  <div class="flex flex-row">
                      <div class="w-full bg-emerald-400">
                          <div class="flex flex-col pl-2">
                              <p class="text-sm reserve_time text-black">RESERVE TIME</p>
                              <p class="text-2xl reserve_time text-black">{{ formatTime(RADIANT_BONUS_TIME) }}</p>
                          </div>
                      </div>
                      <div class="w-full bg-red-500">
                          <div class="flex flex-col items-end pr-2">
                              <p class="text-sm reserve_time text-black">RESERVE TIME</p>
                              <p class="text-2xl reserve_time text-black">{{ formatTime(DIRE_BONUS_TIME) }}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        <!-- DRAFT RIGHT PANEL -->
        <div class="flex flex-col w-full">
            <!-- DIRE PICKS HERO -->
            <div class="flex flex-row-reverse">
               <div v-for="(player, index) in direPicks" :key="index" class="w-auto">
                    <div class="media-container">
                        <video :id="`radiant_pick:pick${index}_class_image`" autoplay muted loop
                            class=" w-[600px] h-[200px] object-fill">
                            <source :src="getImageUrl(player)" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <!-- DIRE BANS HERO -->
              <div class="flex flex-row-reverse bg-red-600">
                <div v-for="(heroBan, index) in direBans" :key="index">
                    <div v-if="heroBan == 'banning' && heroBan != 'none'"
                      class="relative w-full h-full bg-red-600 animate-fade-in">
                      <div class="banning-inner-shadow absolute inset-0 bg-red-600 opacity-60"></div>
                      <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%] h-[28px] pulse"
                          src="@/assets/images/cross.png" alt="cross.png" onerror="this.style.display='none'" />
                      <p
                          class="banning-font tracking-[.25em] absolute bottom-0 ml-2 text-center mb-[4px] text-white text-[10px] font-bold pulse">
                          BANNING
                      </p>
                    </div>

                    <div v-if="heroBan == 'none' && heroBan != 'banning'"
                        class="relative w-full h-full bg-red-600 animate-fade-in">
                        <img class="h-[55px] w-full grayscale" src="@/assets/images/black_image.png" alt="" />
                        <div class="absolute inset-0 bg-red-950 opacity-60"></div>
                    </div>

                    <div v-if="heroBan != 'none' && heroBan != 'banning'" class=" relative w-full h-full bg-red-600">
                        <img class="h-[55px] w-full grayscale contrast-125 animate-fade-in" :src="getImageStaticUrl(heroBan)"
                            alt="" />
                        <div class="slash"></div>
                        <div class="inner-shadow absolute inset-0 bg-red-600 opacity-30"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Base>
</template>