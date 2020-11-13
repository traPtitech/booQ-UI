<template>
  <div :class="$style.container" @click="focus">
    <icon name="mdi:search" :class="$style.icon" />
    <input
      ref="inputEle"
      :class="$style.input"
      type="search"
      placeholder="Search..."
      :value="modelValue"
      @input="onInput"
      @keypress.enter="onEnter"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'SearchInput',
  components: {
    Icon
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
    const inputEle = ref<HTMLInputElement>()
    const focus = () => {
      inputEle.value?.focus()
    }

    const onInput = (e: InputEvent) => {
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
  display: flex;
  color: $color-text-secondary;
  border-bottom: solid 2px $color-text-secondary;
  cursor: text;
  &:focus-within {
    border-bottom-color: $color-primary;
  }
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
