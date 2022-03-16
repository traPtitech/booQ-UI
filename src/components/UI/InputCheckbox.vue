<template>
  <label :class="$style.label" :data-is-checked="val">
    {{ label }}
    <input v-model="val" :class="$style.checkbox" type="checkbox" />
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  label?: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const val = computed({
  get: () => props.modelValue,
  set: v => {
    emit('update:modelValue', v)
  }
})
</script>

<style lang="scss" module>
.label {
  position: relative;
  padding-right: 1.5em;
  color: $color-text-secondary;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: block;
    height: 1em;
    width: 1em;
    background-color: $color-text-secondary;
  }
  &:focus-within::before {
    box-shadow: 0px 0px 0px 5px rgba($color-primary, 0.3);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0.4em;
    bottom: 0;
    right: 0.05em;
    display: block;
    height: 0.4em;
    width: 0.7em;
    transform: rotate(-45deg);
    transform-origin: center left;
    border: {
      left: solid 2px transparent;
      bottom: solid 2px transparent;
    }
  }
  &[data-is-checked='true']::after {
    border-color: $color-text-white;
  }
}
.checkbox {
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
}
</style>
