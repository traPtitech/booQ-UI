<template>
  <ul :class="$style.list">
    <li
      v-for="iwcc in itemWithCartCounts"
      :key="iwcc.item.id"
      :class="$style.item"
    >
      <item :item="iwcc.item" />
      <div
        v-if="isCartMode"
        :class="$style.cartMode"
        @click="() => clickAddDialog(iwcc.item)"
      />
      <cart-tip :cart-count="iwcc.count" :is-cart-mode="isCartMode" />
    </li>
    <cart-add-dialog
      v-if="isOpenAddDialog"
      :item="addDialogItem"
      :is-cart-mode="isCartMode"
      @close="toggleAddDialog"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Item from './Item.vue'
import CartAddDialog from '../Cart/CartAddDialog.vue'
import CartTip from './CartTip.vue'
import useCart from './use/cart'

export default defineComponent({
  name: 'ItemGrid',
  components: {
    Item,
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
      addDialogItem,
      itemWithCartCounts
    } = useCart(props)
    return {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItem,
      itemWithCartCounts
    }
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
