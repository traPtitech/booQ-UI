<template>
  <div :class="[$style.container, modelValue ? '' : $style.input]">
    <user-icon :user-name="name" :class="$style.icon" />
    <textarea
      :value="modelValue"
      :class="[$style.textarea, $style.text, modelValue ? $style.large : '']"
      @input="onInput"
    />
    <transition name="fade">
      <div v-if="modelValue" :class="$style.button">
        <icon name="mdi:send" @click="submit" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'CommentsTextarea',
  components: {
    UserIcon,
    Icon
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (val: string) => true,
    submit: () => true
  },
  setup(_, context) {
    const { name } = useMe()
    const onInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      context.emit('update:modelValue', target.value)
    }
    const submit = async () => {
      context.emit('submit')
    }
    return { name, onInput, submit }
  }
})
</script>

<style lang="scss" module>
.textarea {
  padding: 0.5rem;
  appearance: none;
  font: inherit;
  resize: none;
  height: 5rem;
  transition: height 0.3s ease;
  &:focus {
    outline: none;
    height: 10rem;
  }
}

.large {
  height: 10rem;
}

.container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  position: relative;
}

.text {
  margin-left: 8px;
  align-self: center;
  padding: 0.7rem;
  border: 2px solid $color-text-secondary;
  border-radius: 12px;
  width: 100%;
}

.input {
  opacity: 0.5;
  transition: opacity 0.3s ease;
  &:focus-within {
    opacity: 1;
  }
}

.button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0.5rem;
  bottom: 0.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: $color-text-white;
  background-color: $color-text-secondary;
  cursor: pointer;
}

.icon {
  pointer-events: none;
  margin: 0.2rem;
  flex-shrink: 0;
}
</style>
