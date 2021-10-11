<template>
  <button :class="$style.container" @click="toggleCartMode">
    <icon name="mdi:cart" />
    <div>{{ text }}</div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'CartToggle',
  components: {
    Icon
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: boolean) => true
  },
  setup(props, context) {
    const toggleCartMode = () => {
      context.emit('update:modelValue', !props.modelValue)
    }
    const text = computed(() =>
      props.modelValue ? 'おわる' : 'まとめて借りる'
    )
    return { toggleCartMode, text }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  color: $color-primary;
  cursor: pointer;

  background-color: transparent;
  border: none;
  outline: none;
  appearance: none;
  padding: 0;
}
</style>
