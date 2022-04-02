<template>
  <icon-button
    :icon="icon"
    :label="label"
    :variant="variant"
    :class="$style.button"
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
  }>(),
  {
    variant: 'primary' as const
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
