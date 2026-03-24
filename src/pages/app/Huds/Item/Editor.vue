<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import { api } from '@/plugins/services'
import type { IHUDElement } from '@/types/hud'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const confirm = useConfirm()

const list = ref<IHUDElement[]>([])
const hudName = ref('')
const originalHudName = ref('')
const originalList = ref<IHUDElement[]>([])
const hasUnsavedChanges = ref(false)
const isSaving = ref(false)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const hudId = route.params.hudId as string
    const hudData = await api.huds.findOne(hudId)
    
    if (!hudData) {
      throw new Error('HUD não encontrada')
    }
    
    hudName.value = hudData.name || 'Meu HUD'
    
    // Mapear elementos para o formato correto do frontend
    list.value = (hudData.elements || []).map((element: any) => ({
      id: element.id,
      component: element.component,
      backgroundColor: element.backgroundColor || '#000000',
      color: element.color || '#ffffff',
      position: element.position,
      size: element.size,
      isShowed: element.isShowed,
      maintainAspectRatio: element.maintainAspectRatio || false,
      layer: element.layer || 0,
      data: element.data || {},
      ...(element.groupId && { groupId: element.groupId }),
      ...(element.transparentBackground && { transparentBackground: element.transparentBackground })
    }))
    
    // Salvar estado original para comparação
    originalHudName.value = hudName.value
    originalList.value = JSON.parse(JSON.stringify(list.value))
  } catch (error) {
    console.error('Error loading HUD:', error)
    
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao carregar HUD',
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
})

// Detectar mudanças na lista ou no nome
watch(
  [list, hudName],
  () => {
    const nameChanged = hudName.value !== originalHudName.value
    const listChanged = JSON.stringify(list.value) !== JSON.stringify(originalList.value)
    hasUnsavedChanges.value = nameChanged || listChanged
  },
  { deep: true }
)

// Guard de navegação
onBeforeRouteLeave((to, from, next) => {
  if (!hasUnsavedChanges.value) {
    next()
    return
  }

  confirm.require({
    message: 'Você tem alterações não salvas. Deseja sair sem salvar?',
    header: 'Alterações não salvas',
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    rejectLabel: 'Cancelar',
    acceptLabel: 'Sair sem salvar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Sair sem salvar',
      severity: 'danger'
    },
    accept: () => {
      next()
    },
    reject: () => {
      next(false)
    }
  })
})

const goBack = () => {
  router.push('/app/huds')
}

const viewHud = () => {
  router.push(`/app/huds/${route.params.hudId}`)
}

const saveHud = async () => {
  if (!hudName.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Por favor, insira um nome para o HUD',
      life: 3000
    })
    return
  }

  if (list.value.length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Adicione pelo menos um elemento ao HUD antes de salvar',
      life: 3000
    })
    return
  }

  try {
    isSaving.value = true
    
    // Preparar payload no formato esperado pelo backend
    const payload = {
      _id: route.params.hudId as string,
      name: hudName.value.trim(),
      elements: list.value.map(element => ({
        id: element.id,
        component: element.component,
        backgroundColor: element.backgroundColor,
        color: element.color,
        position: element.position,
        size: element.size,
        isShowed: element.isShowed,
        maintainAspectRatio: element.maintainAspectRatio,
        layer: element.layer,
        data: element.data,
        active: true,
        isInsideBoundingBox: true,
        ...(element.groupId && { groupId: element.groupId }),
        ...(element.transparentBackground && { transparentBackground: element.transparentBackground })
      }))
    }
    
    await api.huds.update(payload)
    
    // Atualizar estado original após salvar
    originalHudName.value = hudName.value
    originalList.value = JSON.parse(JSON.stringify(list.value))
    hasUnsavedChanges.value = false
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'HUD atualizado com sucesso!',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao salvar HUD',
      life: 3000
    })
  } finally {
    isSaving.value = false
  }
}

const canSave = computed(() => hudName.value.trim() !== '' && list.value.length > 0 && !isSaving.value && hasUnsavedChanges.value)
</script>

<template>
  <div class="stream-crafting-hud-editor">
    <ConfirmDialog />
    
    <div class="stream-crafting-hud-editor__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="info"
        @click="goBack"
        class="stream-crafting-hud-editor__back-btn"
      />
      <div class="stream-crafting-hud-editor__title-section">
        <h1 class="stream-crafting-hud-editor__title">
          <i :class="PrimeIcons.PALETTE" />
          Editor de HUD
        </h1>
        <div class="stream-crafting-hud-editor__name-input">
          <InputText
            v-model="hudName"
            placeholder="Nome do HUD"
            class="w-full"
            :disabled="isLoading"
          />
        </div>
      </div>
      <div class="stream-crafting-hud-editor__actions">
        <Button
          label="Visualizar"
          :icon="PrimeIcons.EYE"
          severity="secondary"
          outlined
          @click="viewHud"
          :disabled="isLoading"
        />
        <Button
          label="Salvar"
          :icon="PrimeIcons.SAVE"
          severity="success"
          :loading="isSaving"
          :disabled="!canSave"
          @click="saveHud"
        />
      </div>
    </div>

    <div class="stream-crafting-hud-editor__content">
      <div v-if="isLoading" class="stream-crafting-hud-editor__loading">
        <i :class="PrimeIcons.SPINNER" class="pi-spin" />
        <p>Carregando HUD...</p>
      </div>
      <div v-else class="stream-crafting-hud-editor__canvas-wrapper">
        <HUDCanvas v-model="list" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-editor {
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__back-btn {
    margin-top: 0.25rem;
  }

  &__title-section {
    flex: 1;
    min-width: 200px;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    background: linear-gradient(135deg, #34F5A3 0%, #3AF2E9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    i {
      color: #34F5A3;
      -webkit-text-fill-color: #34F5A3;
    }
  }

  &__name-input {
    max-width: 400px;
  }

  &__subtitle {
    color: #94A3B8;
    font-size: 0.9375rem;
    margin: 0;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.25rem;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  &__loading {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #34F5A3;
    
    i {
      font-size: 3rem;
    }
    
    p {
      font-size: 1.125rem;
      color: #94A3B8;
    }
  }

  &__canvas-wrapper {
    flex: 1;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
    border: 1px solid rgba(52, 245, 163, 0.1);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      padding: 1px;
      background: linear-gradient(135deg, rgba(52, 245, 163, 0.2), rgba(58, 242, 233, 0.2));
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
    }
  }
}

:deep(.p-confirm-dialog) {
  z-index: 100000 !important;
}

:deep(.p-dialog-mask) {
  z-index: 99999 !important;
}
</style>
