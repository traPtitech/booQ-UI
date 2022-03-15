<template>
  <a-icon v-if="cartLength === 0" name="mdi:cart" :class="$style.disable" />
  <router-link v-else to="/cart">
    <a-icon name="mdi:cart" :class="$style.enable" />
  </router-link>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useCart } from '/@/store/cart'
</script>

<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue';

const cartStore = useCart()
const cartLength = computed(() => cartStore.cart.length)
</script>

<style lang="scss" module>
.enable {
  color: $color-primary;
}
.disable {
  opacity: 0.5;
}
</style>
