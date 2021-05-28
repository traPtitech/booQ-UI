<template>
  <div :class="$style.container">
    <h1 :class="$style.header">まとめて借りる</h1>
    <div :class="$style.flex">
      <div :class="$style.item">
        <h3 :class="$style.subtitle">
          カートに入れたもの ({{ items.length }})
        </h3>
        <cart-item :items="items" />
      </div>
      <div :class="$style.item">
        <h3 :class="$style.subtitle">目的等を入力する</h3>
        <cart-confirm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useTitle from './use/title'
import CartItem from '/@/components/Cart/CartItem.vue'
import { useStore } from '../store'
import CartConfirm from '/@/components/Cart/CartConfirm.vue'

export default defineComponent({
  name: 'Cart',
  components: {
    CartConfirm,
    CartItem
  },
  setup() {
    useTitle(ref('まとめて借りる'))

    const store = useStore()
    const items = computed(() => store.state.cart.map(v => v.item))
    return { items }
  }
})
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
