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
    <span :class="$style.underline" />
    <span :class="$style.underlineFocus" />
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

.underline,
.underlineFocus {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
}
.underline {
  background-color: $color-text-secondary;
  left: 0;
}
.underlineFocus {
  background-color: $color-primary;
  left: -100%;
  transition: all 0.2s ease;
  .container:focus-within & {
    left: 0;
  }
}
</style>
