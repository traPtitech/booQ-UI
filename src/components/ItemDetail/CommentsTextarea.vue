<template>
  <textarea
    :value="modelValue"
    :class="[$style.container, modelValue ? $style.large : '']"
    @input="onInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CommentsTextarea',
  props: {
    modelValue: {
      type: String,
      required: true
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
  pointer-events: auto;
  padding: 0.5rem;
  appearance: none;
  font: inherit;
  resize: none;
  height: 5rem;
  transition: height 0.5s;
  &:focus {
    outline: none;
    height: 10rem;
  }
}

.large {
  height: 10rem;
}
</style>
