<script lang="ts" setup>
const props = defineProps({
    activeTime: {
        type: Number,
        required: false,
        default: 0
    },
    activeTeam: {
        type: String,
        required: false,
        default: ''
    },
    radiantBonusTime: {
        type: Number,
        required: false,
        default: 0
    },
    direBonusTime: {
        type: Number,
        required: false,
        default: 0
    },
})

const formatTime = (seconds: any) => {
  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

</script>
<template>
    <div class="relative flex flex-col w-full h-full bg-blue-300">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="flex flex-row mb-12">
                    <div v-if="activeTeam == 'radiant'">
                        <img class="h-14 scale-x-[-1]" src="@/assets/images/arrow.png" alt="" />
                    </div>
                    <div v-else-if="activeTeam == 'dire'">
                        <img  class="h-14 scale-x-[-1] opacity-0" src="@/assets/images/arrow.png" alt="" />
                    </div>
                    <p class="text-5xl activeteam_time_remaining text-black">
                        {{ formatTime(activeTime) }}
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
                            <p class="text-2xl reserve_time text-black">{{ formatTime(radiantBonusTime) }}</p>
                        </div>
                    </div>
                    <div class="w-full bg-red-500">
                        <div class="flex flex-col items-end pr-2">
                            <p class="text-sm reserve_time text-black">RESERVE TIME</p>
                            <p class="text-2xl reserve_time text-black">{{ formatTime(direBonusTime) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
