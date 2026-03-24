<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  quantity: 30,
  staticity: 50,
  ease: 50,
  size: 0.4,
  refresh: false,
  color: '#34F5A3',
  vx: 0,
  vy: 0
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let particles: Array<{
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}> = []

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = rect.height
    } else {
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = canvas.offsetHeight || window.innerHeight
    }
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const generateParticles = () => {
    particles = []
    for (let i = 0; i < props.quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5 + props.vx,
        vy: (Math.random() - 0.5) * 0.5 + props.vy,
        radius: Math.random() * props.size + 0.1
      })
    }
  }

  generateParticles()

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = props.color
      ctx.globalAlpha = 0.4
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    window.removeEventListener('resize', resizeCanvas)
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}

onMounted(() => {
  const cleanup = initCanvas()
  onUnmounted(() => {
    if (cleanup) cleanup()
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)"
    style="max-width: 100%; max-height: 100%;"
  />
</template>
