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
import { useToast } from '/@/store/toast'
</script>

<script lang="ts" setup>
import AToast from './AToast.vue';

const toastStore = useToast()
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
