<template>
  <icon-button
    :icon="icon"
    :label="label"
    :variant="variant"
    :class="$style.button"
    :data-custom-width="customWidth"
  />
</template>

<script lang="ts">
import { Variant } from './IconButton.vue'
</script>

<script lang="ts" setup>
import IconButton from './IconButton.vue'

const props = withDefaults(
  defineProps<{
    icon: string
    label: string
    variant?: Variant
    customWidth?: boolean
  }>(),
  {
    variant: 'primary' as const,
    customWidth: false
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
