<template>
  <div v-if="cartCount || isCartMode" :class="$style.container">
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
    },
    isCartMode: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" module>
.container {
  height: 2rem;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: lighten($color-primary, 35%);
  pointer-events: none;
}

.content {
  color: $color-primary;
}
</style>
