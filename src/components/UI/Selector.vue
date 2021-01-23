<template>
  <div :class="$style.container">
    <label>
      <div :class="$style.labelText">{{ label }}</div>
      <div :class="$style.selectWrapper">
        <select v-model="val" :class="$style.select">
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'Selector',
  props: {
    label: {
      type: String,
      default: undefined
    },
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
    const val = ref(props.options[0] ?? '')
    watch(val, newVal => {
      context.emit('update:modelValue', newVal)
    })
    return { val }
  }
})
</script>

<style lang="scss" module>
$border: 1px;
$padding: 0.25em;

.container {
  color: $color-text-secondary;
}
.labelText {
  margin-bottom: 0.5em;
}
.selectWrapper {
  position: relative;
  width: 100%;
  height: 1em + $padding * 2;
  margin-top: 0.1rem;
  background-color: $color-background;
  border: solid $border $color-text-secondary;
  border-radius: 0.1em;
  &::before {
    content: '';
    position: absolute;
    top: -$border;
    right: -$border;
    bottom: -$border;
    display: block;
    width: 1.5em;
    background-color: $color-text-secondary;
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    top: -$border;
    right: -$border;
    bottom: -$border;
    display: block;
    width: 0.5em;
    margin: {
      top: 0.6em;
      bottom: 0.4em;
      left: 0.5em;
      right: 0.5em;
    }
    border: {
      left: 0.25em solid transparent;
      right: 0.25em solid transparent;
      top: 0.3em solid $color-text-white;
    }
    pointer-events: none;
  }
  &:focus-within {
    border-color: $color-primary;
  }
}
.select {
  width: 100%;
  height: 100%;
  padding-right: 1.5em;
  padding-left: $padding;
  border: none;
  outline: none;
  background: transparent;
  background-image: none;
  box-shadow: none;
  cursor: pointer;
  appearance: none;
}
</style>
