<script lang="ts" setup>
const props = defineProps({
    player: {
        type: String,
        required: true,
        default: "none"
    },
    index: {
        type: Number,
        required: true,
        default: 0
    },
    team: {
        type: String,
        required: false,
        default: "radiant"
    },
    isPicking: {
        type: Boolean,
        required: false,
        default: false
    }
})

const getImageUrl = (hero_name: string) => {
    if(!hero_name || hero_name === "none" || hero_name === "banning" || hero_name === "picking") {
      return new URL(`../../../../assets/images/dota2_logo_animated.mp4`, import.meta.url).href;
    }
    const image = new URL(`../../../../assets/images/heroes_animated/npc_dota_hero_${hero_name}.webm`, import.meta.url).href;
    return image;
};

const getPickLabel = (index: number, team: string) => {
    const labels = ["1ST PICK", "2ND PICK", "3RD PICK", "4TH PICK", "5TH PICK"];
    if (team === "radiant") {
        return labels[4 - index];
    }
    return labels[index];
};

const getPickHeroLabel = (player: string) => {
    return player.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};


const getPickLabelClass = (team: string, isPicking: boolean) => {
    if (isPicking) {
        return team === "radiant" ? "bg-blue-600 text-white" : "bg-pink-600 text-white";
    }
    return team === "radiant" ? "bg-blue-900 text-blue-300" : "bg-pink-900 text-pink-300";
};

</script>
<template>
    <div class="flex flex-col w-full h-full relative">
        <!-- Pick Label -->
        <div 
            :class="[
                'absolute left-0 right-0 bottom-0 z-10 text-center py-1 font-bold text-xs uppercase tracking-wider',
                getPickLabelClass(props.team, props.isPicking)
            ]"
        >
            {{ isPicking ? 'PICKING...' : getPickLabel(props.index, props.team) }}
        </div>
        <div 
            :class="[
                'absolute top-0 left-0 right-0 z-10 text-center py-1 font-bold text-xs uppercase tracking-wider',
                getPickLabelClass(props.team, props.isPicking)
            ]"
        >
            {{ isPicking ? '' : getPickHeroLabel(props.player) }}
        </div>
        
        <!-- Hero Video -->
        <div class="flex w-full h-full overflow-hidden relative">
            <video 
                :id="`${props.team}_pick:pick${props.index}_class_image`" 
                autoplay 
                muted 
                loop
                :class="[
                    'w-full h-full object-cover',
                    props.player === 'none' || props.player === 'picking' ? 'opacity-30' : ''
                ]"
            >
                <source :src="getImageUrl(props.player)" type="video/mp4" />
            </video>
            
            <!-- Overlay for team color -->
            <div 
                :class="[
                    'absolute inset-0 pointer-events-none',
                    props.team === 'radiant' ? 'bg-blue-600' : 'bg-pink-600'
                ]"
                :style="{ opacity: 0.15 }"
            ></div>
        </div>
    </div>
</template>