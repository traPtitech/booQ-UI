<template>
  <div :class="$style.container">
    <label>
      {{ label }}
      <input
        v-if="!multiline"
        type="text"
        :value="modelValue"
        @input="onInput"
      />
      <textarea v-else :value="modelValue" @input="onInput" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputText',
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
}
</style>
