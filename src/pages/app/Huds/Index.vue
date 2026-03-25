<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PrimeIcons } from '@primevue/core/api'
import TabMenu from 'primevue/tabmenu'
import type { MenuItem } from 'primevue/menuitem'

const route = useRoute()
const router = useRouter()

const tabs: MenuItem[] = [
  {
    label: 'Meus HUDs',
    icon: PrimeIcons.LIST,
    route: '/app/huds'
  },
  {
    label: 'Templates',
    icon: PrimeIcons.IMAGES,
    route: '/app/huds/templates'
  }
]

const activeIndex = computed(() => {
  const path = route.path
  if (path.includes('/templates')) return 1
  return 0
})

const onTabChange = (event: any) => {
  const tab = tabs[event.index]
  if (tab.route) {
    router.push(tab.route)
  }
}
</script>

<template>
  <div class="huds-page">
    <!-- <div class="huds-page__tabs">
      <TabMenu 
        :model="tabs" 
        :activeIndex="activeIndex"
        @tab-change="onTabChange"
      />
    </div> -->
    <div class="huds-page__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.huds-page {
  min-height: calc(100vh - 180px);
  
  &__tabs {
    background: #090909;
    border-bottom: 1px solid rgba(253, 42, 54, 0.1);
    padding: 0 2rem;
    
    :deep(.p-tabmenu) {
      background: transparent;
      border: none;
      overflow-y: hidden;

      
      
      .p-tabmenu-nav {
        background: transparent;
        border: none;
        padding: 0;
        gap: 0.5rem;
        overflow-y: hidden;
      }

      .p-tabmenu-tablist {
        background: transparent;
        border: none;
        color: #090909;
      }
      
      .p-tabmenu-item {
        background: transparent;
        border: none;
        margin: 0;
        
        .p-tabmenu-item-link {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #A4A4A4;
          padding: 1rem 1.5rem;
          font-weight: 500;
          transition: all 0.2s;
          border-radius: 0;
          
          &:hover {
            background: rgba(253, 42, 54, 0.05);
            color: #FD2A36;
          }
          
          .p-tabmenu-item-icon {
            margin-right: 0.5rem;
            font-size: 1.125rem;
          }
        }
        
        &.p-highlight {
          .p-tabmenu-item-link {
            background: transparent;
            color: #FD2A36;
            border-bottom-color: #FD2A36;
            
            .p-tabmenu-item-icon {
              color: #FD2A36;
            }
          }
        }
      }
    }
  }
  
  &__content {
  }
}

@media (max-width: 768px) {
  .huds-page {
    &__tabs {
      padding: 0 1rem;
      
      :deep(.p-tabmenu .p-tabmenu-nav) {
        gap: 0.25rem;
      }
      
      :deep(.p-tabmenu-item .p-tabmenu-item-link) {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        
        .p-tabmenu-item-icon {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
