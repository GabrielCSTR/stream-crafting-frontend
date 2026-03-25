<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
  }>(),
  { width: 100, height: 50 }
)
</script>

<template>
  <div class="stream-crafting-logo">
    <svg 
      :width="props.width" 
      :height="props.height" 
      viewBox="0 0 200 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="stream-crafting-logo__svg"
    >
      <!-- Background gradient -->
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FD2A36;stop-opacity:1" />
          <stop offset="55%" style="stop-color:#FFAF0E;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2671F4;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Icon -->
      <g filter="url(#glow)">
        <!-- Circle base -->
        <circle cx="50" cy="50" r="35" fill="url(#logoGradient)" opacity="0.1"/>
        
        <!-- Play/Stream icon -->
        <path 
          d="M 40 30 L 40 70 L 70 50 Z" 
          fill="url(#logoGradient)"
          class="stream-crafting-logo__icon"
        />
        
        <!-- Signal waves -->
        <path 
          d="M 75 40 Q 80 45 75 50" 
          stroke="url(#logoGradient)" 
          stroke-width="3" 
          fill="none"
          opacity="0.7"
        />
        <path 
          d="M 80 35 Q 87 45 80 55" 
          stroke="url(#logoGradient)" 
          stroke-width="3" 
          fill="none"
          opacity="0.5"
        />
      </g>
      
      <!-- Text -->
      <text 
        x="105" 
        y="60" 
        font-family="'Inter', sans-serif" 
        font-size="28" 
        font-weight="700" 
        fill="url(#logoGradient)"
      >
        D2Cast
      </text>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__svg {
    filter: drop-shadow(0 0 10px rgba(253, 42, 54, 0.25));
  }
  
  &__icon {
    animation: pulse 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

