<template>
  <ul :class="$style.list">
    <li v-for="item in cartStore.cart" :key="item.item.id" :class="$style.item">
      <cart-item :cart-item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { useCart } from '/@/store/cart'
</script>

<script lang="ts" setup>
import CartItem from './CartItem.vue';

const cartStore = useCart()
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
}

.item {
  margin-top: 1rem;
}
</style>
