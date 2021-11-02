<template>
  <with-focus-underline :class="$style.container" @click="focus">
    <a-icon name="mdi:search" :class="$style.icon" />
    <input
      ref="inputEle"
      :class="$style.input"
      type="search"
      placeholder="Search..."
      :value="modelValue"
      @input="onInput"
      @keypress.enter="onEnter"
    />
  </with-focus-underline>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'
import WithFocusUnderline from './WithFocusUnderline.vue'

export default defineComponent({
  name: 'SearchInput',
  components: {
    AIcon,
    WithFocusUnderline
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    search: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const inputEle = shallowRef<HTMLInputElement>()
    const focus = () => {
      inputEle.value?.focus()
    }

    const onInput = (e: Event) => {
      const v = (e.target as HTMLInputElement).value
      context.emit('update:modelValue', v)
    }
    const onEnter = () => {
      context.emit('search')
    }
    return { inputEle, focus, onInput, onEnter }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  color: $color-text-secondary;
  border-bottom: solid 2px transparent;
  cursor: text;
  overflow: hidden;
}
.icon {
  flex: 0;
  margin-right: 0.25rem;
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
