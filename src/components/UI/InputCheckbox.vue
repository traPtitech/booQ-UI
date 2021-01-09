<template>
  <div :class="$style.container">
    <label>
      {{ label }}
      <div :class="$style.checkboxWrapper">
        <input v-model="val" type="checkbox" />
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'InputCheckbox',
  props: {
    label: {
      type: String,
      default: undefined
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (val: boolean) => true
  },
  setup(props, context) {
    const val = computed({
      get: () => props.modelValue,
      set: v => {
        context.emit('update:modelValue', v)
      }
    })
    return { val }
  }
})
</script>

<style lang="scss" module>
.container {
}
.checkboxWrapper {
}
</style>
