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
    <div class="relative flex items-center justify-center w-full h-full bg-black">
        <!-- Central Timer Display -->
        <div class="flex flex-col items-center justify-center">
            <!-- Dota 2 Logo/Icon -->
            <div class="mb-4 flex items-center justify-center">
                <div class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border-4 border-white">
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.93l7 3.5v7.39l-7-3.5V9.93zm16 0v7.39l-7 3.5v-7.39l7-3.5z"/>
                        </svg>
                    </div>
                </div>
                
                <!-- Arrow Indicator -->
                <div 
                    :class="[
                        'absolute transition-all duration-300',
                        activeTeam === 'radiant' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
                    ]"
                >
                    <svg 
                        class="w-8 h-8" 
                        :class="activeTeam === 'radiant' ? 'text-pink-500' : 'text-pink-500'"
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                </div>
            </div>
            
            <!-- Reserve Time Label and Value -->
            <div class="text-center bg-gray-900 px-6 py-2 rounded border-2 border-gray-700">
                <p class="text-white text-sm font-bold uppercase tracking-wider mb-1">RESERVE TIME</p>
                <p class="text-white text-4xl font-bold tracking-wider">{{ formatTime(activeTime) }}</p>
            </div>
        </div>
    </div>
</template>
