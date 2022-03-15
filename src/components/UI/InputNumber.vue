<template>
  <with-focus-underline>
    <label :class="$style.label">
      <div :class="$style.labelText">{{ label }}</div>
      <div :class="$style.inputWrapper">
        <input
          :class="$style.input"
          type="number"
          :value="modelValue"
          :min="min"
          :max="max"
          :disabled="disabled"
          @input="onInput"
        />
        <slot />
      </div>
    </label>
  </with-focus-underline>
</template>

<script lang="ts" setup>
import WithFocusUnderline from './WithFocusUnderline.vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: number
    min?: number
    max?: number
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  context.emit('update:modelValue', target.valueAsNumber)
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  border-bottom: solid 2px transparent;
  cursor: text;
  overflow: hidden;
}
.label {
  color: $color-text-secondary;
  cursor: text;
}
.labelText {
  margin-bottom: 0.5em;
}
.inputWrapper {
  display: flex;
  margin: 0.25em 0;
}
.input {
  flex: 1;
  color: $color-text-secondary;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
  &:disabled {
    color: $color-text-secondary-disabled;
    cursor: not-allowed;
  }
}
</style>
