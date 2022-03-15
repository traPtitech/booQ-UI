<template>
  <div v-if="cartCount || isCartMode" :class="$style.container">
    <a-icon name="mdi:cart" :class="$style.content" />
    <div :class="$style.content">{{ cartCount }}</div>
  </div>
</template>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue';

const props = withDefaults(defineProps<{
    cartCount: number,
    isCartMode?: boolean
}>(), {
    isCartMode: false
});
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
