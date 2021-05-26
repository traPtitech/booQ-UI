import { computed, ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'

const useCart = (props: { items: ItemSummary[] }) => {
  const store = useStore()
  const itemWithCartCounts = computed(() =>
    props.items.map(item => ({
      item,
      count: store.state.itemInCart.find(iic => iic.id === item.id)?.count ?? 0
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
