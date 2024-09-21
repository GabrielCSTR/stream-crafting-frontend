<script lang="tsx">
import { PrimeIcons } from '@primevue/core/api'
import type { MenuItem } from 'primevue/menuitem'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

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
    active: Boolean
  },

  setup(props) {
    const classes =
      'stream-crafter-sidebar-item flex items-center cursor-pointer text-color p-4'

    function click(evt: MouseEvent) {
      props.item.command?.({ originalEvent: evt, item: props.item })
    }

    function renderPrepend() {
      const content = <i class={props.item.icon}> </i>
      return <div class="stream-crafter-sidebar-item__prepend mr-4"> {content} </div>
    }

    function renderText() {
      return <span class="stream-crafter-sidebar-item__text text-color">{props.item.label}</span>
    }

    function renderArrow() {
      if (!props.item.items) {
        return
      }

      return (
        <i
          class={['stream-crafter-sidebar-item__arrow text-primary ml-auto', PrimeIcons.ANGLE_LEFT]}
        ></i>
      )
    }

    function renderParent() {
      return (
        <a
          v-ripple
          class={[
            classes,
            {
              'stream-crafter-sidebar-item--is-default': props.item.items,
              'stream-crafter-sidebar-item--open': props.active
            }
          ]}
          href={props.item.url}
          target={props.item.target}
        >
          {renderPrepend()}
          {renderText()}
          {renderArrow()}
        </a>
      )
    }

    function renderItem() {
      return (
        <router-link to={props.item.route} custom>
          {({ href, navigate }: { href: string; navigate: (ect: MouseEvent) => void }) => (
            <a
              v-ripple
              class={classes}
              href={href}
              onClick={(evt) => {
                click(evt)
                navigate(evt)
              }}
            >
              {renderPrepend()}
              {renderText()}
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
  &__arrow {
    transform-origin: center;
    transition-duration: 400ms;
    transition-property: transform;
  }

  &--open {
    &.stream-crafter-sidebar-item {
      &--is-default {
        .stream-crafter-sidebar-item__arrow {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
        }
      }

      &:not(&--is-default) {
        .stream-crafter-sidebar-item__arrow {
          transform: rotate(-90deg);
          -webkit-transform: rotate(-90deg);
        }
      }
    }
  }
}
</style>
