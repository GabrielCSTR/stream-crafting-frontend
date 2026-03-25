<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGSI } from '@/composables/useGSI'
import OverlayCanvas from '@/components/Huds/OverlayCanvas.vue'
import type { IHUDElement } from '@/types/hud'
import { api } from '@/plugins/services'
import { io } from 'socket.io-client';

const route = useRoute()
const { setData, updateData, clearData } = useGSI()

const hudElements = ref<IHUDElement[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const hudId = ref<string>()
const connectionStatus = ref<'connecting' | 'connected' | 'disconnected'>('disconnected')
const useTestData = ref(false)

// Função para buscar a HUD (rota pública, sem autenticação)
async function fetchHUD(id: string) {
    try {
        loading.value = true
        error.value = null

        // Usa rota pública para não exigir login (importante para OBS Studio)
        const response = await api.huds.findOnePublic(id)

        if (response && response.elements) {
            hudElements.value = response.elements
        } else {
            error.value = 'HUD não encontrada'
        }
    } catch (err) {
        console.error('Erro ao carregar HUD:', err)
        error.value = 'Erro ao carregar HUD'
    } finally {
        loading.value = false
    }
}

// Conectar ao GSI via Socket.io
function connectGSI() {
    // Verificar se deve usar dados de teste via URL query
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('test') === 'true') {
        useTestData.value = true
        connectionStatus.value = 'connected'
        console.log('🧪 Modo de teste ativado - sem conexão Socket.io')
        return null
    }

    connectionStatus.value = 'connecting'
    console.log('🔌 Conectando ao servidor GSI via Socket.io...')

    // Socket.io client com configuração adequada
    const socket = io('http://localhost:5120', {
        transports: ['websocket', 'polling'], // Tenta WebSocket primeiro, fallback para polling
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionAttempts: Infinity,
        autoConnect: true,
    })

    socket.on('connect', () => {
        connectionStatus.value = 'connected'
        console.log('✅ Conectado ao servidor GSI')
        console.log('Socket ID:', socket.id)
        
        // Entrar no room da HUD específica
        if (hudId.value) {
            socket.emit('join-hud', { hudId: hudId.value })
            console.log(`📥 Entrando no room da HUD: ${hudId.value}`)
        }
    })

    // Eventos GSI do servidor - Draft
    socket.on('dota:draft', (draftData) => {
        try {
            console.log('📊 Draft recebido:', draftData)
            updateData({ ...draftData })
        } catch (err) {
            console.error('Erro ao processar dados do draft:', err)
        }
    })

    // Eventos GSI completos
    socket.on('gsi-update', (gsiData) => {
        try {
            console.log('📊 GSI completo recebido')
            setData(gsiData)
        } catch (err) {
            console.error('Erro ao processar dados GSI:', err)
        }
    })

    // Evento para mapa/partida
    socket.on('dota:map', (mapData) => {
        try {
            console.log('🗺️ Dados do mapa recebidos')
            updateData({ map: mapData.map })
        } catch (err) {
            console.error('Erro ao processar dados do mapa:', err)
        }
    })

    // Evento para jogadores
    socket.on('dota:player', (playerData) => {
        try {
            console.log('👥 Dados dos jogadores recebidos')
            updateData({ player: playerData.player })
        } catch (err) {
            console.error('Erro ao processar dados dos jogadores:', err)
        }
    })

    socket.on('connect_error', (error) => {
        connectionStatus.value = 'disconnected'
        console.error('❌ Erro na conexão Socket.io:', error.message)
    })

    socket.on('disconnect', (reason) => {
        connectionStatus.value = 'disconnected'
        console.log('🔌 Socket.io desconectado. Motivo:', reason)
        
        // Socket.io reconecta automaticamente, não precisa de setTimeout manual
        if (reason === 'io server disconnect') {
            // Se o servidor desconectou, reconecta manualmente
            socket.connect()
        }
    })

    socket.on('reconnect', (attemptNumber) => {
        console.log(`🔄 Reconectado após ${attemptNumber} tentativa(s)`)
        connectionStatus.value = 'connected'
        
        // Re-entrar no room após reconexão
        if (hudId.value) {
            socket.emit('join-hud', hudId.value)
        }
    })

    socket.on('reconnect_attempt', (attemptNumber) => {
        console.log(`🔄 Tentando reconectar... (tentativa ${attemptNumber})`)
        connectionStatus.value = 'connecting'
    })

    socket.on('reconnect_failed', () => {
        console.error('❌ Falha ao reconectar ao servidor GSI')
        connectionStatus.value = 'disconnected'
    })

    return socket
}

let wsConnection: ReturnType<typeof io> | null = null

onMounted(async () => {
    hudId.value = route.params.hudId as string

    if (hudId.value) {
        await fetchHUD(hudId.value)

        // Verificar se deve usar dados de teste
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('test') === 'true') {
            wsConnection = connectGSI() // Retorna null no modo teste
        } else {
            wsConnection = connectGSI()
        }
    } else {
        error.value = 'ID da HUD não fornecido'
        loading.value = false
    }
})

onUnmounted(() => {
    // Limpar conexão Socket.io
    if (wsConnection) {
        wsConnection.disconnect()
        wsConnection.removeAllListeners()
    }
    clearData()
})

// Recarregar HUD se o ID mudar
watch(() => route.params.hudId, (newId) => {
    if (newId && newId !== hudId.value) {
        hudId.value = newId as string
        fetchHUD(hudId.value)
    }
})
</script>

<template>
    <div class="overlay">
        <!-- Status indicator (apenas em modo debug) -->
        <div v-if="$route.query.debug === 'true'" class="overlay__status">
            <span :class="`status-indicator status-indicator--${connectionStatus}`">
                {{ connectionStatus === 'connected' ? '🟢' : connectionStatus === 'connecting' ? '🟡' : '🔴' }}
                {{ useTestData ? 'Modo Teste' : connectionStatus }}
            </span>
        </div>

        <div v-if="loading" class="overlay__loading">
            <span>Carregando HUD...</span>
        </div>

        <div v-else-if="error" class="overlay__error">
            <span>{{ error }}</span>
        </div>

        <OverlayCanvas v-else :elements="hudElements" />
    </div>
</template>

<style scoped lang="scss">
.overlay {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: transparent;
    position: relative;

    &__status {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.8);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.875rem;
        color: white;
        backdrop-filter: blur(4px);

        .status-indicator {
            display: flex;
            align-items: center;
            gap: 6px;

            &--connected {
                color: #FD2A36;
            }

            &--connecting {
                color: #FFA500;
            }

            &--disconnected {
                color: #ff4444;
            }
        }
    }

    &__loading,
    &__error {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
        background: rgba(0, 0, 0, 0.8);
    }

    &__error {
        color: #ff4444;
    }
}
</style>
