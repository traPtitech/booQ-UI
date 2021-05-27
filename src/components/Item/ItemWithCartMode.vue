<template>
  <item :item="item" />
  <div v-if="isCartMode" :class="$style.cartMode" @click="click" />
  <cart-tip :cart-count="cartCount" :is-cart-mode="isCartMode" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Item from './Item.vue'
import CartTip from '../Cart/CartTip.vue'

export default defineComponent({
  name: 'ItemWithCartMode',
  components: {
    Item,
    CartTip
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    isCartMode: {
      type: Boolean,
      required: true
    },
    cartCount: {
      type: Number,
      default: 0
    }
  },
  emits: {
    clickOverlay: () => true
  },
  setup(_, context) {
    const click = () => context.emit('clickOverlay')
    return { click }
  }
})
</script>

<style lang="scss" module>
.button {
  margin-top: 0.5rem;
  width: 100%;
}

.cartMode {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 2px;
  transition: 0.2s all ease-in-out;
  &:hover {
    box-shadow: 0 0 0px 2px $color-primary;
  }
}
</style>
