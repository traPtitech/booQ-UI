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

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import useTitle from './use/title'
import CartItems from '/@/components/Cart/CartItems.vue'
import { useStore } from '../store'
import CartConfirm from '/@/components/Cart/CartConfirm.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CartPage',
  components: {
    CartConfirm,
    CartItems
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    useTitle(ref('まとめて借りる'))

    const itemCount = computed(() => store.state.cart.length)

    const onBorrowed = () => {
      router.push('/')
    }

    return { itemCount, onBorrowed }
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
