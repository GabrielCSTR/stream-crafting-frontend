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
    <div class="relative flex flex-col w-full h-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <!-- Central Timer Display -->
        <div class="flex-1 flex flex-col items-center justify-center relative">
            <!-- Dota 2 Logo/Icon -->
            <div class="mb-5 flex items-center justify-center relative">
                <div class="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-4 border-gray-600 shadow-2xl">
                    <div class="w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                        <svg class="w-10 h-10 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.93l7 3.5v7.39l-7-3.5V9.93zm16 0v7.39l-7 3.5v-7.39l7-3.5z"/>
                        </svg>
                    </div>
                </div>
                
                <!-- Arrow Indicator -->
                <div 
                    :class="[
                        'absolute transition-all duration-500 ease-out',
                        activeTeam === 'radiant' ? '-left-20' : '-right-20'
                    ]"
                >
                    <svg 
                        class="w-16 h-16 drop-shadow-lg" 
                        :class="[
                            activeTeam === 'radiant' ? 'text-blue-400 scale-x-[-1]' : 'text-pink-400',
                            'animate-pulse'
                        ]"
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                </div>
            </div>
            
            <!-- Active Time Display -->
            <div class="text-center bg-gradient-to-br from-gray-800 to-gray-900 px-8 py-3 rounded-lg border-2 border-gray-600 shadow-2xl">
                <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">RESERVE TIME</p>
                <p class="activeteam_time_remaining text-white text-5xl font-black tracking-wider tabular-nums">{{ formatTime(activeTime) }}</p>
            </div>
        </div>

        <!-- Reserve Times Bottom Bar -->
        <div class="flex flex-row h-full mt-5 border-t-2 border-gray-800">
            <!-- Radiant Reserve Time -->
            <div 
                class="flex-1 bg-gradient-to-br from-blue-900 to-blue-950 flex flex-col justify-center items-center px-2 border-r border-gray-800 transition-all duration-300"
                :class="activeTeam === 'radiant' ? 'border-t-4 border-t-blue-400' : ''"
            >
                <p class="text-blue-300 text-xs font-bold uppercase tracking-wider">Radiant</p>
                <p class="reserve_time text-white text-3xl font-bold tabular-nums">{{ formatTime(radiantBonusTime) }}</p>
            </div>

            <!-- Dire Reserve Time -->
            <div 
                class="flex-1 bg-gradient-to-bl from-pink-900 to-pink-950 flex flex-col justify-center items-center px-2 transition-all duration-300"
                :class="activeTeam === 'dire' ? 'border-t-4 border-t-pink-400' : ''"
            >
                <p class="text-pink-300 text-xs font-bold uppercase tracking-wider">Dire</p>
                <p class="reserve_time text-white text-3xl font-bold tabular-nums">{{ formatTime(direBonusTime) }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
  .activeteam_time_remaining {
    font-family: "Radiance_bold", sans-serif;
  }
  .game_series {
    font-family: "Radiance_black", sans-serif;
  }
  .reserve_time {
    font-family: "Radiance_semibold", sans-serif;
  }
</style>
