/**
 * Composable para gerenciar dados do Dota 2 GSI (Game State Integration)
 * Similar ao padrão configs.onChange() do lexogrine/dota2-react-hud
 */
import { ref, computed, type Ref } from 'vue'
import type { Dota2GSIData, Dota2Player } from '@/types/gsi'

// Estado global singleton para GSI
const gsiData = ref<Dota2GSIData | null>(null)
const listeners = new Set<(data: Dota2GSIData | null) => void>()

/**
 * Composable principal para acesso aos dados GSI
 */
export function useGSI() {
  /**
   * Registra um callback para ser executado quando os dados GSI mudarem
   * Similar ao configs.onChange() do lexogrine
   */
  const onChange = (callback: (data: Dota2GSIData | null) => void) => {
    listeners.add(callback)
    
    // Executa imediatamente se já houver dados
    if (gsiData.value) {
      callback(gsiData.value)
    }

    // Retorna função para remover o listener
    return () => {
      listeners.delete(callback)
    }
  }

  /**
   * Atualiza os dados GSI e notifica todos os listeners
   */
  const setData = (newData: Dota2GSIData | null) => {
    gsiData.value = newData
    
    // Notifica todos os listeners
    listeners.forEach(callback => {
      callback(newData)
    })
  }

  /**
   * Carrega dados de exemplo do arquivo example.json
   */
  const loadExampleData = async () => {
    try {
      const response = await fetch('/example.json')
      const data = await response.json()
      setData(data as Dota2GSIData)
    } catch (error) {
      console.error('Erro ao carregar dados de exemplo:', error)
    }
  }

  /**
   * Limpa os dados GSI
   */
  const clearData = () => {
    setData(null)
  }

  // Computed properties para acesso fácil aos dados
  const map = computed(() => gsiData.value?.map || null)
  const players = computed(() => {
    if (!gsiData.value?.player) return []
    
    const allPlayers: Dota2Player[] = []
    
    // Team 2 (Radiant)
    if (gsiData.value.player.team2) {
      Object.values(gsiData.value.player.team2).forEach(player => {
        allPlayers.push(player)
      })
    }
    
    // Team 3 (Dire)
    if (gsiData.value.player.team3) {
      Object.values(gsiData.value.player.team3).forEach(player => {
        allPlayers.push(player)
      })
    }
    
    return allPlayers
  })
  
  const radiantPlayers = computed(() => 
    players.value.filter(p => p.team_name === 'radiant')
  )
  
  const direPlayers = computed(() => 
    players.value.filter(p => p.team_name === 'dire')
  )
  
  const draft = computed(() => gsiData.value?.draft || null)
  
  const gameState = computed(() => gsiData.value?.map?.game_state || null)

  return {
    // Estado
    data: gsiData,
    map,
    players,
    radiantPlayers,
    direPlayers,
    draft,
    gameState,
    
    // Métodos
    onChange,
    setData,
    loadExampleData,
    clearData
  }
}

/**
 * Hook para obter um player específico por steamid
 */
export function usePlayer(steamidRef: Ref<string | undefined>) {
  const { players, data } = useGSI()
  
  const player = computed(() => {
    if (!steamidRef.value) return null
    return players.value.find(p => p.steamid === steamidRef.value) || null
  })

  return {
    player,
    data
  }
}

/**
 * Hook para obter dados de um time específico
 */
export function useTeam(teamRef: Ref<'radiant' | 'dire' | undefined>) {
  const { radiantPlayers, direPlayers, map, data } = useGSI()
  
  const players = computed(() => {
    if (!teamRef.value) return []
    return teamRef.value === 'radiant' ? radiantPlayers.value : direPlayers.value
  })

  const teamData = computed(() => {
    if (!teamRef.value || !map.value) return null
    return teamRef.value === 'radiant' ? map.value.radiant : map.value.dire
  })

  const score = computed(() => {
    if (!teamRef.value || !map.value) return 0
    return teamRef.value === 'radiant' ? map.value.radiant_score : map.value.dire_score
  })

  return {
    players,
    teamData,
    score,
    data
  }
}

/**
 * Hook para obter dados do draft
 */
export function useDraft() {
  const { draft, data } = useGSI()
  
  const radiantDraft = computed(() => draft.value?.radiant || null)
  const direDraft = computed(() => draft.value?.dire || null)
  const activeTeam = computed(() => draft.value?.activeteam === 2 ? "radiant" : "dire")
  const activeTime = computed(() => draft.value?.activeteam_time_remaining || 0)
  const radiant_bonus_time = computed(() => draft.value?.radiant_bonus_time || 0)
  const dire_bonus_time = computed(() => draft.value?.dire_bonus_time || 0)
  const pickPhase = computed(() => draft.value?.pick || false)

  return {
    draft,
    radiantDraft,
    direDraft,
    activeTeam,
    activeTime,
    radiant_bonus_time,
    dire_bonus_time,
    pickPhase,
    data
  }
}

export default useGSI
