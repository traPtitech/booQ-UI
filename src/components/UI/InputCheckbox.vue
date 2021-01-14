<template>
  <label :class="$style.label" :data-is-checked="val">
    {{ label }}
    <input v-model="val" :class="$style.checkbox" type="checkbox" />
  </label>
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
  &:focus-within {
    outline: solid 1px $color-primary;
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
