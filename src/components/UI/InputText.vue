<template>
  <with-focus-underline>
    <label :class="$style.label">
      {{ label }}
      <div :class="$style.inputWrapper">
        <input
          v-if="!multiline"
          :class="$style.input"
          type="text"
          :value="modelValue"
          @input="onInput"
        />
        <textarea
          v-else
          :class="$style.input"
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
  name: 'InputText',
  components: {
    WithFocusUnderline
  },
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    multiline: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (val: string) => true
  },
  setup(props, context) {
    const onInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      context.emit('update:modelValue', target.value)
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
