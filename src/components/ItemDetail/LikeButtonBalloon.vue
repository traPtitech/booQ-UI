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
import { computed, defineComponent } from 'vue'

// 吹き出してるとこの三角形の底辺
const OUTSIDE_TRIANGLE_BASE = 28
const INSIDE_TRIANGLE_BASE = 26
// containerのright
const BALLOON_PADDING = 20
const BALLOON_BORDER = 1

export default defineComponent({
  name: 'LikeButtonBalloon',
  props: {
    /** 吹き出してるところの頂点を指定するイメージ */
    left: {
      type: Number,
      required: true
    },
    /** 内容のwidth、paddingとかを含んだ吹き出し部分のwidthではない */
    contentWidth: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    /**
      leftで指定したところから右にはみ出してる部分の長さを指定する
    */
    /*
    -------^----
           ↑   ↑
            ココ
    */
    hamidashiRight: {
      type: Number,
      required: true
    }
  },
  setup(props) {
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
    return { styles }
  }
})
</script>

<style lang="scss" module>
.container {
  position: absolute;
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
