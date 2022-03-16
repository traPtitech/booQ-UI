<template>
  <button :class="$style.container" @click="toggleCartMode">
    <a-icon name="mdi:cart" />
    <div>{{ text }}</div>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', _: boolean): void
}>()

const toggleCartMode = () => {
  emit('update:modelValue', !props.modelValue)
}
const text = computed(() => (props.modelValue ? 'おわる' : 'まとめて借りる'))
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  color: $color-primary;
  cursor: pointer;

  background-color: transparent;
  border: none;
  outline: none;
  appearance: none;
  padding: 0;
}
</style>
