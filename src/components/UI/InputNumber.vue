<template>
  <with-focus-underline>
    <label :class="$style.label">
      <div :class="$style.labelText">{{ label }}</div>
      <div :class="$style.inputWrapper">
        <input
          :class="$style.input"
          type="number"
          :value="modelValue"
          @input="onInput"
        />
        <slot />
      </div>
    </label>
  </with-focus-underline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WithFocusUnderline from './WithFocusUnderline.vue'

export default defineComponent({
  name: 'InputNumber',
  components: {
    WithFocusUnderline
  },
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (val: number) => true
  },
  setup(props, context) {
    const onInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      context.emit('update:modelValue', target.valueAsNumber)
    }
    return { onInput }
  }
})
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
}
</style>
