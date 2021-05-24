import { computed, ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'

const useCart = (props: { items: ItemSummary[] }) => {
	const store = useStore()
	const cartCounts = computed(() => props.items.map(item => store.state.itemInCart.find(iic => iic.id === item.id )?.count ?? 0))

	const removeItemFromCart = (id: number) => {
		store.commit.removeItemFromCart(id)
	}

	const addDialogItemIndex = ref<number>(-1)
	const { isOpen: isOpenAddDialog, toggle: toggleAddDialog } = useOpener()
	const clickAddDialog = (i: number) => {
    addDialogItemIndex.value = i
    toggleAddDialog()
	}
	return { cartCounts, removeItemFromCart, isOpenAddDialog, toggleAddDialog, clickAddDialog, addDialogItemIndex }
}

export default useCart
