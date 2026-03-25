<script lang="tsx">
import { PrimeIcons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SidebarItem',

  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true
    },
    direction: {
      type: String as PropType<'default' | 'inverted'>,
      default: 'default'
    },
    active: Boolean,
    collapsed: Boolean
  },

  setup(props) {
    const route = useRoute()
    
    const isActive = () => {
      if (!props.item.route) return false
      return route.path === props.item.route
    }

    const classes = [
      'stream-crafter-sidebar-item',
      'group',
      'relative',
      'overflow-hidden'
    ]

    function click(evt: MouseEvent) {
      props.item.command?.({ originalEvent: evt, item: props.item })
    }

    function renderPrepend() {
      const content = (
        <i 
          class={[
            props.item.icon,
            'stream-crafter-sidebar-item__icon',
            'transition-all',
            'duration-200'
          ]}
        />
      )
      return (
        <div class="stream-crafter-sidebar-item__prepend">
          {content}
        </div>
      )
    }

    function renderText() {
      if (props.collapsed) return null
      
      return (
        <span class="stream-crafter-sidebar-item__text">
          {props.item.label}
        </span>
      )
    }

    function renderArrow() {
      if (!props.item.items || props.collapsed) {
        return
      }

      return (
        <i
          class={[
            'stream-crafter-sidebar-item__arrow',
            PrimeIcons.ANGLE_DOWN,
            'transition-transform',
            'duration-200'
          ]}
        />
      )
    }

    function renderTooltip() {
      if (!props.collapsed) return null
      
      return (
        <div class="stream-crafter-sidebar-item__tooltip">
          {props.item.label}
        </div>
      )
    }

    function renderParent() {
      return (
        <a
          v-ripple
          class={[
            ...classes,
            {
              'stream-crafter-sidebar-item--parent': props.item.items,
              'stream-crafter-sidebar-item--open': props.active,
              'stream-crafter-sidebar-item--collapsed': props.collapsed
            }
          ]}
          href={props.item.url}
          target={props.item.target}
        >
          <div class="stream-crafter-sidebar-item__content">
            {renderPrepend()}
            {renderText()}
            {renderArrow()}
          </div>
          {renderTooltip()}
        </a>
      )
    }

    function renderItem() {
      return (
        <router-link to={props.item.route} custom>
          {({ href, navigate }: { href: string; navigate: (evt: MouseEvent) => void }) => (
            <a
              v-ripple
              class={[
                ...classes,
                {
                  'stream-crafter-sidebar-item--active': isActive(),
                  'stream-crafter-sidebar-item--collapsed': props.collapsed
                }
              ]}
              href={href}
              onClick={(evt) => {
                click(evt)
                navigate(evt)
              }}
            >
              <div class="stream-crafter-sidebar-item__content">
                {renderPrepend()}
                {renderText()}
              </div>
              {renderTooltip()}
            </a>
          )}
        </router-link>
      )
    }

    return () => (props.item.route ? renderItem() : renderParent())
  }
})
</script>

<style lang="scss">
.stream-crafter-sidebar-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  color: #A4A4A4;
  background: transparent;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: #FD2A36;
    border-radius: 0 2px 2px 0;
    transform: scaleY(0);
    transition: transform 0.2s;
  }

  &:hover {
    background: rgba(253, 42, 54, 0.08);
    color: #FD2A36;
    border-color: rgba(253, 42, 54, 0.2);
    transform: translateX(4px);

    .stream-crafter-sidebar-item__icon {
      transform: scale(1.1);
      color: #FD2A36;
    }
  }

  &--active {
    background: rgba(253, 42, 54, 0.12);
    color: #FD2A36;
    border-color: rgba(253, 42, 54, 0.25);
    font-weight: 600;

    &::before {
      transform: scaleY(1);
    }

    .stream-crafter-sidebar-item__icon {
      color: #FD2A36;
      filter: drop-shadow(0 0 8px rgba(253, 42, 54, 0.35));
    }
  }

  &--collapsed {
    justify-content: center;
    padding: 0.75rem;
    
    &:hover .stream-crafter-sidebar-item__tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
  }

  &--parent {
    &.stream-crafter-sidebar-item--open {
      background: rgba(253, 42, 54, 0.08);
      color: #FD2A36;

      .stream-crafter-sidebar-item__arrow {
        transform: rotate(180deg);
      }
    }
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__prepend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__icon {
    font-size: 1.125rem;
    transition: all 0.2s;
  }

  &__text {
    flex: 1;
    font-size: 0.9375rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s;
  }

  &__arrow {
    margin-left: auto;
    font-size: 0.875rem;
    transition: transform 0.2s;
  }

  &__tooltip {
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%) translateX(-8px);
    background: linear-gradient(135deg, #090909 0%, #121212 100%);
    color: #FFFFFF;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s;
    pointer-events: none;
    z-index: 1000;
    border: 1px solid rgba(253, 42, 54, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

    &::before {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 6px solid transparent;
      border-right-color: rgba(253, 42, 54, 0.2);
    }

    &::after {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(1px);
      border: 5px solid transparent;
      border-right-color: #090909;
    }
  }

  // Animação de ripple do PrimeVue
  :deep(.p-ink) {
    background: rgba(253, 42, 54, 0.3);
  }
}
</style>
