<template>
  <button :class="$style.container" :data-variant="variant">
    <icon :class="$style.icon" :name="icon" />
    <div>{{ label }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export type Variant = 'primary' | 'secondary'

export default defineComponent({
  name: 'IconButton',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    variant: {
      type: String as PropType<Variant>,
      default: 'primary' as const
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  &:disabled {
    opacity: 0.5;
  }

  &[data-variant='primary'] {
    color: $color-primary;
    border: solid 1px $color-primary;
    background-color: $color-background;
    &:hover:not(:disabled) {
      color: $color-background;
      background-color: $color-primary;
    }
  }
}

.icon {
  margin-right: 4px;
}
</style>
