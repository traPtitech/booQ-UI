<template>
  <div :class="$style.container">
    <transition-group name="toast-slide">
      <toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import Toast from './Toast.vue'

export default defineComponent({
  name: 'ToastContainer',
  components: {
    Toast
  },
  setup() {
    const store = useStore()
    const toasts = computed(() => store.state.toasts)
    return { toasts }
  }
})
</script>

<style lang="scss" module>
.container {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  contain: layout;
}
</style>
