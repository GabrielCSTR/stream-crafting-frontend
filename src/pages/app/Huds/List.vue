<script lang="ts" setup>
import GridItem from '@/components/Huds/GridItem.vue'
import ProfessionalLoading from '@/components/ProfessionalLoading.vue'
import { dayjs } from '@/plugins/dayjs'
import { api } from '@/plugins/services'
import type { Hud } from '@/services/models/hud'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const searchQuery = ref('')

const huds = ref<Hud[]>([])

const filteredHuds = ref(huds.value)

const handleSearch = () => {
  if (!searchQuery.value) {
    filteredHuds.value = huds.value
    return
  }
  filteredHuds.value = huds.value.filter(hud => 
    hud.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}

const createNewHud = () => {
  router.push('/app/huds/new')
}

const handleDeleteHud = (hudId: string) => {
  huds.value = huds.value.filter(hud => hud._id !== hudId)
  handleSearch()
}

onMounted(async () => {
  loading.value = true
  try {
    const hudsResponse = await api.huds.find()
    huds.value = hudsResponse.items || hudsResponse || []
    filteredHuds.value = huds.value
  } catch (error) {
    console.error('Error fetching HUDs:', error)
    huds.value = []
    filteredHuds.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="stream-crafting-huds-page">
    <ConfirmDialog />
    
    <!-- Header Section -->
    <div class="stream-crafting-huds-page__header">
      <div class="stream-crafting-huds-page__header-content">
        <div class="stream-crafting-huds-page__title-section">
          <h1 class="stream-crafting-huds-page__title">
            <i :class="PrimeIcons.TH_LARGE" />
            Meus HUDs
          </h1>
          <p class="stream-crafting-huds-page__subtitle">
            Gerencie seus HUDs personalizados para streaming
          </p>
        </div>
        <Button 
          label="Criar Novo HUD"
          :icon="PrimeIcons.PLUS"
          severity="success"
          class="stream-crafting-huds-page__create-btn"
          @click="createNewHud"
        />
      </div>

      <!-- Search and Filter -->
      <div class="stream-crafting-huds-page__toolbar">
        <div class="stream-crafting-huds-page__search">
          <IconField>
            <InputIcon :class="PrimeIcons.SEARCH" />
            <InputText 
              v-model="searchQuery"
              placeholder="Buscar HUDs..."
              class="stream-crafting-huds-page__search-input"
              @input="handleSearch"
            />
          </IconField>
        </div>
        
        <div class="stream-crafting-huds-page__stats">
          <div class="stream-crafting-huds-page__stat">
            <i :class="PrimeIcons.TH_LARGE" />
            <span>{{ filteredHuds?.length }} HUD{{ filteredHuds?.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="stream-crafting-huds-page__content">
      <ProfessionalLoading v-if="loading" text="Carregando HUDs..." />
      
      <div v-else-if="filteredHuds?.length === 0" class="stream-crafting-huds-page__empty">
        <i :class="PrimeIcons.INBOX" />
        <h3>{{ searchQuery ? 'Nenhum HUD encontrado' : 'Nenhum HUD criado ainda' }}</h3>
        <p>{{ searchQuery ? 'Tente outro termo de busca' : 'Comece criando seu primeiro HUD personalizado' }}</p>
        <Button 
          v-if="!searchQuery"
          label="Criar Primeiro HUD"
          :icon="PrimeIcons.PLUS"
          severity="success"
          @click="createNewHud"
        />
      </div>

      <div v-else class="stream-crafting-huds-page__grid">
        <GridItem 
          v-for="hud in filteredHuds" 
          :key="hud._id" 
          :hud="hud"
          @delete="handleDeleteHud"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-huds-page {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__title-section {
    flex: 1;
    min-width: 250px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #FD2A36 0%, #2671F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    i {
      color: #FD2A36;
      -webkit-text-fill-color: #FD2A36;
    }
  }

  &__subtitle {
    color: #A4A4A4;
    font-size: 1rem;
    margin: 0;
  }

  &__create-btn {
    white-space: nowrap;
  }

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(253, 42, 54, 0.1);
    border-radius: 12px;
    flex-wrap: wrap;
  }

  &__search {
    flex: 1;
    min-width: 250px;
    max-width: 400px;
  }

  &__search-input {
    width: 100%;
  }

  &__stats {
    display: flex;
    gap: 1.5rem;
  }

  &__stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(253, 42, 54, 0.1);
    border: 1px solid rgba(253, 42, 54, 0.2);
    border-radius: 8px;
    color: #FD2A36;
    font-weight: 600;

    i {
      font-size: 1.125rem;
    }
  }

  &__content {
    flex: 1;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background: rgba(15, 23, 42, 0.4);
    border: 2px dashed rgba(253, 42, 54, 0.2);
    border-radius: 16px;
    min-height: 400px;

    i {
      font-size: 4rem;
      color: #A4A4A4;
      margin-bottom: 1rem;
    }

    h3 {
      color: #FFFFFF;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #A4A4A4;
      margin: 0 0 1.5rem 0;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
