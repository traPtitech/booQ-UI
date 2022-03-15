<template>
  <div :class="$style.container">
    <item-panel :item="item" @click.capture="openDialog" />
    <cart-tip
      :class="$style.tip"
      :cart-count="cartCount"
      :is-cart-mode="isCartMode"
    />
    <cart-add-dialog v-if="isDialogOpen" :item="item" @close="toggleDialog" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import useOpener from '/@/use/opener'
import { useCart } from '/@/store/cart'
</script>

<script lang="ts" setup>
import ItemPanel from './ItemPanel.vue'
import CartAddDialog from '../Cart/CartAddDialog.vue'
import CartTip from './CartTip.vue'

const props = defineProps<{
  item: ItemSummary
  isCartMode: boolean
}>()

const cartStore = useCart()
const { isOpen: isDialogOpen, toggle: toggleDialog } = useOpener()

const cartCount = computed(() => cartStore.cartItems.get(props.item.id) ?? 0)
const openDialog = (e: MouseEvent) => {
  if (!props.isCartMode) return

  e.preventDefault()
  toggleDialog()
}
</script>

<style lang="scss" module>
.container {
  position: relative;
}

.tip {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
}
</style>
