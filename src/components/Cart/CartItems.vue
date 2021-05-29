<template>
  <ul :class="$style.list">
    <li v-for="item in items" :key="item.item.id" :class="$style.item">
      <cart-item :cart-item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '/@/store'
import CartItem from './CartItem.vue'

export default defineComponent({
  name: 'CartItems',
  components: {
    CartItem
  },
  setup() {
    const store = useStore()
    const items = computed(() => store.state.cart)
    return { items }
  }
})
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
