<template>
  <icon-button
    :icon="icon"
    :label="label"
    :variant="variant"
    :class="$style.button"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import IconButton, { Variant } from './IconButton.vue'

export default defineComponent({
  name: 'WideIconButton',
  components: { IconButton },
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
  }
})
</script>

<style lang="scss" module>
$height: 36px;

.button {
  height: $height;
  width: 80%;
  border-radius: $height / 2;
}
</style>
