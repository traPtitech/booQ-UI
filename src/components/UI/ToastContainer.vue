<template>
  <div :class="$style.container">
    <transition-group name="toast-slide">
      <a-toast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :toast="toast"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToast } from '/@/store/toast'
import AToast from './AToast.vue'

export default defineComponent({
  name: 'ToastContainer',
  components: {
    AToast
  },
  setup() {
    const toastStore = useToast()
    return { toastStore }
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
