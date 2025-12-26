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
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()

const list = ref<IHUDElement[]>([])
const hudName = ref('')
const hasUnsavedChanges = ref(false)
const isSaving = ref(false)

onMounted(() => {
  list.value = []
})

// Detectar mudanças na lista ou no nome
watch(
  [list, hudName],
  () => {
    hasUnsavedChanges.value = list.value.length > 0 || hudName.value.trim() !== ''
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

const saveHUD = async () => {
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
      name: hudName.value.trim(),
      elements: list.value.map((element, index) => ({
        id: element.id,
        component: element.component,
        backgroundColor: element.backgroundColor,
        color: element.color,
        position: element.position,
        size: element.size,
        isShowed: element.isShowed,
        maintainAspectRatio: element.maintainAspectRatio,
        layer: index,
        data: element.data,
        active: true,
        isInsideBoundingBox: true,
        ...(element.groupId && { groupId: element.groupId }),
        ...(element.transparentBackground && { transparentBackground: element.transparentBackground })
      }))
    }

    await api.huds.create(payload as any)
    
    hasUnsavedChanges.value = false
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'HUD salvo com sucesso!',
      life: 3000
    })
    
    // Redirecionar após salvar
    setTimeout(() => {
      router.push('/app/huds')
    }, 1500)
  } catch (error) {
    console.log("ERROR", error);
    
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao salvar HUD. Tente novamente.',
      life: 3000
    })
  } finally {
    isSaving.value = false
  }
}

const canSave = computed(() => hudName.value.trim() !== '' && list.value.length > 0 && !isSaving.value)
</script>

<template>
  <div class="stream-crafting-hud-new">
    <ConfirmDialog />
    
    <div class="stream-crafting-hud-new__header">
      <Button
        :icon="PrimeIcons.ARROW_LEFT"
        text
        rounded
        severity="info"
        @click="goBack"
        class="stream-crafting-hud-new__back-btn"
      />
      <div class="stream-crafting-hud-new__title-section">
        <h1 class="stream-crafting-hud-new__title">
          <i :class="PrimeIcons.PLUS_CIRCLE" />
          Criar Novo HUD
        </h1>
        <div class="stream-crafting-hud-new__name-input">
          <InputText
            v-model="hudName"
            placeholder="Digite o nome do HUD"
            class="w-full"
          />
        </div>
      </div>
      <Button
        label="Salvar HUD"
        :icon="PrimeIcons.SAVE"
        severity="success"
        :disabled="!canSave"
        :loading="isSaving"
        @click="saveHUD"
        class="stream-crafting-hud-new__save-btn"
      />
    </div>

    <div class="stream-crafting-hud-new__content">
      <HUDCanvas v-model="list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stream-crafting-hud-new {
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__back-btn {
    margin-top: 0.25rem;
  }

  &__save-btn {
    margin-top: 0.25rem;
  }

  &__title-section {
    flex: 1;
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

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
}

:deep(.p-confirm-dialog) {
  z-index: 100000 !important;
}

:deep(.p-dialog-mask) {
  z-index: 99999 !important;
}
</style>
