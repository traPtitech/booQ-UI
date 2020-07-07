<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    role="img"
    :class="$style.icon"
  >
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import mdi from '/@/assets/mdi'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    }
  },
  setup(props) {
    const path = computed(() => mdi.get(props.name))
    return { path }
  }
})
</script>

<style lang="scss" module>
.icon {
  contain: strict;
}
</style>
