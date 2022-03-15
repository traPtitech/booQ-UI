<template>
  <!-- nameが変わってもre-rendorされないのでkeyを当てて明示的に再描画してる -->
  <div :key="name" :class="$style.icon" :style="styles">
    <span class="iconify" :data-icon="name" :style="styles" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
</script>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  {
    size: 24
  }
)

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))
</script>

<style lang="scss" module>
.icon {
  contain: strict;
}
</style>
