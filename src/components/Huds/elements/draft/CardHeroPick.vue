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
    }
})

const getImageUrl = (hero_name: string) => {
    if(!hero_name || hero_name === "none" || hero_name === "banning" || hero_name === "picking") {
      return new URL(`../../../../assets/images/dota2_logo_animated.mp4`, import.meta.url).href;
    }
    const image = new URL(`../../../../assets/images/heroes_animated/npc_dota_hero_${hero_name}.webm`, import.meta.url).href;
    return image;
};

</script>
<template>
    <div class="flex w-full h-full overflow-hidden">
        <video :id="`radiant_pick:pick${props.index}_class_image`" autoplay muted loop
            class="w-full h-full object-fill">
            <source :src="getImageUrl(props.player)" type="video/mp4" />
        </video>
    </div>
</template>