<script lang="ts" setup>

const props = defineProps({
    heroBan: {
        type: String,
        required: true,
    }
})

const getImageStaticUrl = (hero_name: string) => {
    const image = new URL(`../../../../assets/images/heroes_static/${hero_name}.png`, import.meta.url).href;
    return image || '';
};

</script>
<template>
     <div v-if="props.heroBan == 'banning'"
        class="relative w-full h-full bg-red-600 animate-fade-in">
        <div class="banning-inner-shadow absolute inset-0 bg-red-600 opacity-60"></div>
        <img class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%] h-1/2 pulse"
            src="@/assets/images/cross.png" alt="cross.png" onerror="this.style.display='none'" />
        <p
            class="banning-font tracking-[.25em] absolute bottom-0 ml-2 text-center mb-[4px] text-white text-xs font-bold pulse">
            BANNING
        </p>
    </div>

    <div v-if="props.heroBan == 'none'"
        class="relative w-full h-full bg-red-600 animate-fade-in">
        <img class="w-full h-full object-fill grayscale" src="@/assets/images/black_image.png" alt="" />
        <div class="absolute inset-0 bg-red-950 opacity-60"></div>
    </div>

    <div v-if="props.heroBan != 'none' && props.heroBan != 'banning'" class=" relative w-full h-full bg-red-600">
        <img class="w-full h-full object-fill grayscale contrast-125 animate-fade-in" :src="getImageStaticUrl(props.heroBan)"
            alt="" />
        <div class="slash"></div>
        <div class="inner-shadow absolute inset-0 bg-red-600 opacity-30"></div>
    </div>
</template>