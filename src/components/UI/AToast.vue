<template>
  <div :class="$style.container" :data-type="toast.type" @click="remove">
    <a-icon :class="$style.icon" :name="iconName" mdi :size="32" />
    <div :class="$style.text">{{ toast.text }}</div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useToast, Toast } from '/@/store/toast'

const iconNameMap: Record<Toast['type'], string> = {
  success: 'mdi:information',
  error: 'mdi:alert',
  info: 'mdi:information'
}

const useAutoHide = (props: { toast: Toast }) => {
  const toastStore = useToast()
  let timer: number | undefined

  const remove = () => {
    toastStore.removeToast(props.toast.id)
  }

  onMounted(() => {
    timer = window.setTimeout(() => {
      remove()
    }, props.toast.timeout)
  })
  onUnmounted(() => {
    window.clearTimeout(timer)
  })

  return { remove }
}
</script>

<script lang="ts" setup>
import AIcon from './AIcon.vue'

const props = defineProps<{
  toast: Toast
}>()

const { remove } = useAutoHide(props)

const iconName = computed(() => iconNameMap[props.toast.type])
</script>

<style lang="scss" module>
.container {
  filter: drop-shadow(0 2px 4px rgba(33, 63, 99, 0.3));
  display: flex;
  align-items: center;
  width: 320px;
  max-width: calc(100vw - 40px);
  margin: 12px 0;
  padding: 8px;
  border-radius: 4px;
  pointer-events: auto;
  color: $color-text-white;
  user-select: none;
  &[data-type='success'] {
    background: $color-primary;
  }
  &[data-type='error'] {
    background: $color-error;
  }
  &[data-type='info'] {
    background: $color-secondary;
  }
  &[role='button'] {
    cursor: pointer;
  }
}
.icon {
  color: $color-text-white;
  margin: 4px;
  flex-shrink: 0;
  vertical-align: middle;
}
.text {
  margin: 4px;
  word-break: break-all;
}
</style>
