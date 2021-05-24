<template>
  <div :key="key" :class="$style.icon" :style="styles">
    <span class="iconify" :data-icon="name" :style="styles" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

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
    const styles = computed(() => ({
      height: `${props.size}px`,
      width: `${props.size}px`
    }))
    const key = computed(() => props.name)
    return { styles, key }
  }
})
</script>

<style lang="scss" module>
.icon {
  contain: strict;
}
</style>
