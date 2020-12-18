<template>
  <div :class="$style.balloonContainer">
    <div :class="$style.before" :style="styles.before" />
    <div :class="$style.balloon" :style="styles.balloon">
      <slot></slot>
    </div>
    <div :class="$style.after" :style="styles.after" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 吹き出してるとこの三角形の底辺
const BORDER_TRIANGLE_BASE = 28
const CONTENT_TRIANGLE_BASE = 24
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
    }
  },
  setup(props) {
    const styles = {
      before: `right: ${
        props.right - CONTENT_TRIANGLE_BASE / 2 - CONTAINER_RIGHT
      }px;`,
      after: `right: ${
        props.right - BORDER_TRIANGLE_BASE / 2 - CONTAINER_RIGHT
      }px;`,
      balloon: `width: ${
        props.width + (BALLOON_PADDING + BALLOON_BORDER) * 2
      }px`
    }
    return { styles }
  }
})
</script>

<style lang="scss" module>
.balloonContainer {
  position: absolute;
  right: -16px;
  top: 70%;
}
.balloon {
  position: relative;
  margin-top: 1.5rem;
  padding: 20px;
  background: $color-background;
  border: solid 1px $color-text-secondary;
  border-radius: 8px;
}

.before {
  content: '';
  position: absolute;
  top: 1px;
  margin-left: -15px;
  border: 12px solid transparent;
  border-bottom: 12px solid $color-background;
  z-index: 2;
}

.after {
  content: '';
  position: absolute;
  top: -3px;
  margin-left: -17px;
  border: 14px solid transparent;
  border-bottom: 14px solid $color-text-secondary;
  z-index: 1;
}
</style>
