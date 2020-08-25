<template>
  <teleport to="#dialog">
    <div :class="$style.container" @click="close">
      <div :class="$style.dialog" @click="forStopFunc">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DialogTemplate',
  emits: ['close'],
  setup(_, context) {
    const close = () => {
      context.emit('close')
    }
    const forStopFunc = (e: MouseEvent) => {
      e.stopPropagation()
    }
    return { close, forStopFunc }
  }
})
</script>

<style lang="scss" module>
.container {
  animation: fadeIn 0.5s;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  z-index: 2;
  background-color: $color-background;
  padding: 8px;
  border-radius: 16px;
  width: min(400px, 80%);
  margin: auto;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
