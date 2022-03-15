<template>
  <div :class="$style.container">
    <h1 :class="$style.header">まとめて借りる</h1>
    <div>
      <div :class="$style.item">
        <h3 :class="$style.subtitle">カートに入れたもの ({{ itemCount }})</h3>
        <cart-items />
      </div>
      <div :class="$style.item">
        <h3 :class="$style.subtitle">目的等を入力する</h3>
        <cart-confirm @borrowed="onBorrowed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useTitle from './use/title'
import { useCart } from '../store/cart'
import { useRouter } from 'vue-router'
import CartItems from '/@/components/Cart/CartItems.vue'
import CartConfirm from '/@/components/Cart/CartConfirm.vue'

const cartStore = useCart()
const router = useRouter()
useTitle(ref('まとめて借りる'))

const itemCount = computed(() => cartStore.cart.length)

const onBorrowed = () => {
  router.push('/')
}
</script>

<style lang="scss" module>
.container {
  padding: 3rem;
  text-align: left;
}
.header {
  display: flex;
  align-items: center;
  margin: 0;
}
.item {
  margin: 3rem 0;
}
.subtitle {
  margin: 0;
  padding-bottom: 0.5rem;
}
</style>
