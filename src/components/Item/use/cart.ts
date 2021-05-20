import { computed, ref } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import { useStore } from '/@/store'
import useOpener from '/@/use/opener'

const useCart = (props: { items: ItemSummary[] }) => {
	const store = useStore()
	const itemStatus = computed(() => props.items.map(item => !!store.state.itemInCart.find(iic => iic.id === item.id )))

	const addItemToCart = (payload: { id: number, count: number }) => {
		store.commit.addItemToCart(payload)
		console.log(store.state.itemInCart)
	}
	const removeItemFromCart = (id: number) => {
		store.commit.removeItemFromCart(id)
	}

	const addDialogItem = ref<ItemSummary | null>(null)
	const { isOpen: isOpenAddDialog, toggle: toggleAddDialog } = useOpener()
	const clickAddDialog = (i: number) => {
		addDialogItem.value = props.items[i] || null
		if (!addDialogItem.value) return
		if (itemStatus.value[i]) {
			removeItemFromCart(addDialogItem.value.id)
		} else {
			toggleAddDialog()
		}
	}
	return { itemStatus, addItemToCart, removeItemFromCart, isOpenAddDialog, toggleAddDialog, clickAddDialog, addDialogItem }
}

export default useCart
