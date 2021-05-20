<template>
  <ul :class="$style.list">
    <li v-for="(item, i) in items" :key="item.id">
      <item :item="item" />
      <wide-icon-button
        v-if="item.type === ItemType.equipment"
        :variant="itemStatus[i] ? 'caution': 'primary'"
        :class="$style.button"
        @click="() => clickAddDialog(i)"
        :label="itemStatus[i] ? 'まとめて借りない' : 'まとめて借りる'"
        icon="mdi:cart"
      />
    </li>
    <cart-dialog :item="addDialogItem" @close="toggleAddDialog" @add="addItemToCart" v-if="isOpenAddDialog" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import Item from './Item.vue'
import WideIconButton from '/@/components/UI/WideIconButton.vue'
import CartDialog from './CartDialog.vue'
import useCart from './use/cart'

export default defineComponent({
  name: 'ItemGrid',
  components: {
    Item,
    WideIconButton,
    CartDialog
  },
  props: {
    items: {
      type: Array as PropType<ItemSummary[]>,
      required: true
    }
  },
  setup(props) {
    const {
      isOpenAddDialog,
      toggleAddDialog,
      clickAddDialog,
      addDialogItem,
      itemStatus,
      addItemToCart
    } = useCart(props)
    return { isOpenAddDialog, toggleAddDialog, clickAddDialog, addDialogItem, itemStatus, ItemType, addItemToCart }
  }
})
</script>

<style lang="scss" module>
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 16px;
}

.button {
  margin-top: 0.5rem;
  width: 100%;
}
</style>
