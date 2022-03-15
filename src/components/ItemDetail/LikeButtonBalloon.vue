<template>
  <div :class="$style.container" :style="styles.container">
    <div :class="$style.outsideTriangle" :style="styles.outsideTriangle" />
    <div :class="$style.balloon">
      <slot></slot>
    </div>
    <div :class="$style.insideTriangle" :style="styles.insideTriangle" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

// 吹き出してるとこの三角形の底辺
const OUTSIDE_TRIANGLE_BASE = 28
const INSIDE_TRIANGLE_BASE = 26
// containerのright
const BALLOON_PADDING = 20
const BALLOON_BORDER = 1
</script>

<script lang="ts" setup>
const props = defineProps<{
  left: number
  contentWidth: number
  top: number
  hamidashiRight: number
}>()

const outerWidth = computed(
  () => props.contentWidth + (BALLOON_PADDING + BALLOON_BORDER) * 2
)
const styles = computed(() => ({
  outsideTriangle: {
    left: `${
      outerWidth.value - props.hamidashiRight - INSIDE_TRIANGLE_BASE / 2
    }px`
  },
  insideTriangle: {
    left: `${
      outerWidth.value - props.hamidashiRight - OUTSIDE_TRIANGLE_BASE / 2
    }px`
  },
  container: {
    width: `${outerWidth.value}px`,
    top: `${props.top}px`,
    left: `${props.left - (outerWidth.value - props.hamidashiRight)}px`
  }
}))
</script>

<style lang="scss" module>
.container {
  position: absolute;
  z-index: 1;
}

.balloon {
  margin-top: 24px;
  padding: 20px;
  background: $color-background;
  border: solid 1px $color-text-secondary;
  border-radius: 8px;
}

.outsideTriangle {
  position: absolute;
  border: 13px solid transparent;
  border-bottom: 13px solid $color-background;
  z-index: 2;
  top: -1px;
}

.insideTriangle {
  position: absolute;
  border: 14px solid transparent;
  border-bottom: 14px solid $color-text-secondary;
  z-index: 1;
  top: -3px;
}
</style>
