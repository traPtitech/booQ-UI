<template>
  <div :class="$style.container">
    <label>
      {{ label }}
      <input type="number" :value="modelValue" @input="onInput" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputNumber',
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
}
</style>
