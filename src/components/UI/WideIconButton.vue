<template>
  <icon-button
    :type="type"
    :icon="icon"
    :label="label"
    :variant="variant"
    :disabled="disabled"
    :class="$style.button"
  />
</template>

<script lang="ts" setup>
import type { Variant } from './IconButton.vue'
import IconButton from './IconButton.vue'

withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    icon: string
    label: string
    variant?: Variant
    disabled?: boolean
  }>(),
  {
    variant: 'primary' as const,
    disabled: false
  }
)
</script>

<style lang="scss" module>
$height: 36px;

.button {
  height: $height;
  width: 80%;
  border-radius: math.div($height, 2);
}
</style>
