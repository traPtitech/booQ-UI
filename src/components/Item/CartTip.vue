<template>
  <div v-if="cartCount" :class="$style.container">
    <icon name="mdi:cart" :class="$style.content" />
    <div :class="$style.content">{{ cartCount }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'CartTip',
  components: {
    Icon
  },
  props: {
    cartCount: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  height: 2rem;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: mix($color-primary-disabled, $color-text-white);
}

.content {
  color: $color-primary;
}
</style>
