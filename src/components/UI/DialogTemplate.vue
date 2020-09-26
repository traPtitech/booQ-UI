<template>
  <teleport to="#dialog">
    <div :class="$style.container" @click="close">
      <div :class="$style.dialog" @click.stop>
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
    return { close }
  }
})
</script>

<style lang="scss" module>
.container {
  animation: fadeIn 0.2s;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  z-index: 2;
  background-color: $color-background;
  padding: 24px;
  border-radius: 8px;
  width: 80%;
  min-width: 400px;
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
