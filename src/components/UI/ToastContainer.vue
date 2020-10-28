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
$z-index-toast-container: 10000;

.container {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: $z-index-toast-container;
  contain: layout;
}

$ts: 'toast-slide';
$easeOutCirc: cubic-bezier(0.075, 0.82, 0.165, 1);
$easeInExpo: cubic-bezier(0.95, 0.05, 0.795, 0.035);

.#{$ts}-enter-active {
  transition: all 0.3s $easeOutCirc;
  transform: translateX(0px);
}
.#{$ts}-leave-active {
  transition: all 0.8s $easeInExpo;
}
.#{$ts}-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.#{$ts}-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
.#{$ts}-move {
  transition: transform 3s;
}
</style>
