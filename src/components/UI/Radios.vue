<template>
  <div :class="$style.container">
    <label v-for="option in options" :key="option">
      <input v-model="val" type="radio" :value="option" />
      {{ option }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'Radios',
  props: {
    options: {
      type: Array as PropType<string[]>,
      required: true
    },
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
    const val = ref(props.options[0])
    watch(val, newVal => {
      context.emit('update:modelValue', newVal)
    })
    return { val }
  }
})
</script>

<style lang="scss" module>
.container {
}
</style>
