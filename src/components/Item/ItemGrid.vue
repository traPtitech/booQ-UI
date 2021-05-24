<template>
  <ul :class="$style.list">
    <li v-for="(item, i) in items" :key="item.id" :class="$style.item">
      <item :item="item" />
      <div v-if="isCartMode" :class="$style.cartMode" @click="() => clickAddDialog(i)" />
      <cart-tip :cart-count="cartCounts[i]" />
    </li>
    <cart-add-dialog
      v-if="isOpenAddDialog"
      :item="items[addDialogItemIndex]"
      :cart-count="cartCounts[addDialogItemIndex]"
      @close="toggleAddDialog"
      @add="addItemToCart"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import Item from './Item.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import CartAddDialog from '../Cart/CartAddDialog.vue'
import CartTip from './CartTip.vue'
import useCart from './use/cart'

export default defineComponent({
  name: 'ItemGrid',
  components: {
    Item,
    WideIconButton,
    CartAddDialog,
    CartTip
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    },
    isCartMode: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItemIndex,
      cartCounts,
      addItemToCart
    } = useCart(props)
    return { isOpenAddDialog, toggleAddDialog, clickAddDialog, addDialogItemIndex, cartCounts, ItemType, addItemToCart }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}

.item {
  position: relative;
}

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
