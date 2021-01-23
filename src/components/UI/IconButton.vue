<template>
  <button :class="$style.container" :data-variant="variant">
    <icon :class="$style.icon" :name="icon" />
    <div>{{ label }}</div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export type Variant = 'primary' | 'secondary' | 'caution'

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
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:focus {
    outline: 0;
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
  &[data-variant='secondary'] {
    color: $color-text-secondary;
    border: solid 1px $color-text-secondary;
    background-color: $color-background;
    &:hover:not(:disabled) {
      color: $color-background;
      background-color: $color-text-secondary;
    }
  }
  &[data-variant='caution'] {
    color: $color-error;
    border: solid 1px $color-error;
    background-color: $color-background;
    &:hover:not(:disabled) {
      color: $color-background;
      background-color: $color-error;
    }
  }
}

.icon {
  margin-right: 4px;
}
</style>
