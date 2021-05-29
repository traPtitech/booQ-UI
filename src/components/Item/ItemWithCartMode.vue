<template>
  <item :item="item" @click.capture="openDialog" />
  <cart-tip :cart-count="cartCount" :is-cart-mode="isCartMode" />
  <cart-add-dialog v-if="isDialogOpen" :item="item" @close="toggleDialog" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import Item from './Item.vue'
import CartTip from '../Cart/CartTip.vue'
import CartAddDialog from '../Cart/CartAddDialog.vue'
import useOpener from '/@/use/opener'
import { useStore } from '/@/store'

export default defineComponent({
  name: 'ItemWithCartMode',
  components: {
    Item,
    CartTip,
    CartAddDialog
  },
  props: {
    item: {
      type: Object as PropType<ItemSummary>,
      required: true
    },
    isCartMode: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const { isOpen: isDialogOpen, toggle: toggleDialog } = useOpener()

    const cartCount = computed(
      () => store.getters.cartItems.get(props.item.id) ?? 0
    )
    const openDialog = (e: MouseEvent) => {
      if (!props.isCartMode) return

      e.preventDefault()
      toggleDialog()
    }

    return { isDialogOpen, toggleDialog, cartCount, openDialog }
  }
})
</script>
