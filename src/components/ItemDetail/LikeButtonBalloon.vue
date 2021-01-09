<template>
  <div :class="$style.balloonContainer" :style="styles.balloonContainer">
    <div :class="$style.outsideTriangle" :style="styles.outsideTriangle" />
    <div :class="$style.balloon" :style="styles.balloon">
      <slot></slot>
    </div>
    <div :class="$style.insideTriangle" :style="styles.insideTriangle" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

// 吹き出してるとこの三角形の底辺
const OUTSIDE_TRIANGLE_BASE = 28
const INSIDE_TRIANGLE_BASE = 26
// baloonContainerのright
const CONTAINER_RIGHT = -16
const BALLOON_PADDING = 20
const BALLOON_BORDER = 1

export default defineComponent({
  name: 'LikeButtonBalloon',
  props: {
    // 吹き出してるところの頂点を指定するイメージ
    right: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const styles = computed(() => ({
      outsideTriangle: {
        right: `${props.right - INSIDE_TRIANGLE_BASE / 2 - CONTAINER_RIGHT}px`
      },
      insideTriangle: {
        right: `${props.right - OUTSIDE_TRIANGLE_BASE / 2 - CONTAINER_RIGHT}px`
      },
      balloon: {
        width: `${props.width + (BALLOON_PADDING + BALLOON_BORDER) * 2}px`
      },
      balloonContainer: {
        top: `${props.top}px`
      }
    }))
    return { styles }
  }
})
</script>

<style lang="scss" module>
.balloonContainer {
  position: absolute;
  right: -16px;
  width: 100%;
}

.balloon {
  position: absolute;
  margin-top: 1.5rem;
  padding: 20px;
  background: $color-background;
  border: solid 1px $color-text-secondary;
  border-radius: 8px;
  right: 0;
}

.outsideTriangle {
  content: '';
  position: absolute;
  top: -1px;
  border: 13px solid transparent;
  border-bottom: 13px solid $color-background;
  z-index: 2;
}

.insideTriangle {
  content: '';
  position: absolute;
  top: -3px;
  border: 14px solid transparent;
  border-bottom: 14px solid $color-text-secondary;
  z-index: 1;
}
</style>
