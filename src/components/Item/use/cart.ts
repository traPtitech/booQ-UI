import { computed, ComputedRef, ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCart = (items: ComputedRef<ItemSummary[]>) => {
  const store = useStore()
  const itemWithCartCounts = computed(() =>
    items.value.map(item => ({
      item,
      count: store.getters.cartItems.get(item.id) ?? 0
    }))
  )

  const removeItemFromCart = (id: number) => {
    store.commit.removeItemFromCart(id)
  }

  const addDialogItem = ref<ItemSummary | null>(null)
  const { isOpen: isOpenAddDialog, toggle: toggleAddDialog } = useOpener()
  const clickAddDialog = (item: ItemSummary) => {
    addDialogItem.value = item
    toggleAddDialog()
  }
  return {
    itemWithCartCounts,
    removeItemFromCart,
    isOpenAddDialog,
    toggleAddDialog,
    clickAddDialog,
    addDialogItem
  }
}

export default useCart
