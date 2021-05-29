<template>
  <ul :class="$style.list">
    <li
      v-for="iwcc in itemWithCartCounts"
      :key="iwcc.item.id"
      :class="$style.item"
    >
      <item-with-cart-mode
        :cart-count="iwcc.count"
        :item="iwcc.item"
        :is-cart-mode="isCartMode"
        @clickOverlay="() => clickAddDialog(iwcc.item)"
      />
    </li>
    <cart-add-dialog
      v-if="isOpenAddDialog"
      :item="addDialogItem"
      @close="toggleAddDialog"
    />
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import ItemWithCartMode from './ItemWithCartMode.vue'
import CartAddDialog from '../Cart/CartAddDialog.vue'
import useCart from './use/cart'

export default defineComponent({
  name: 'ItemGrid',
  components: {
    ItemWithCartMode,
    CartAddDialog
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    },
    isCartMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItem,
      itemWithCartCounts
    } = useCart(computed(() => props.items))
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
</style>
