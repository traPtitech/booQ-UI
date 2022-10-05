<template>
  <icon-button
    :icon="icon"
    :label="label"
    :variant="variant"
    :disabled="disabled"
    :class="$style.button"
    :data-custom-width="customWidth"
  />
</template>

<script lang="ts" setup>
import type { Variant } from './IconButton.vue'
import IconButton from './IconButton.vue'

withDefaults(
  defineProps<{
    icon: string
    label: string
    variant?: Variant
    customWidth?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'primary' as const,
    customWidth: false,
    disabled: false
  }
)
</script>

<style lang="scss" module>
$height: 36px;

.button {
  height: $height;
  border-radius: math.div($height, 2);
  &:not([data-custom-width='true']) {
    width: 96px;
  }
}
</style>
