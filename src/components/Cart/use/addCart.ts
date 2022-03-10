import { ref, Ref, ComputedRef, computed } from 'vue'
import { ItemDetail, ItemSummary } from '/@/lib/apis'
import { useCart } from '/@/store/cart'
import useOwners from '/@/components/ItemDetail/use/owners'

const useAddCart = (props: {
  item: ItemSummary | ItemDetail
}): {
  maxCount: ComputedRef<number>
  ownerDetails: ComputedRef<{ userName: string }[]>
  ownerName: Ref<string>
  title: Ref<string>
  count: Ref<number>
  isEdit: ComputedRef<boolean>
  submit: () => void
} => {
  const cartStore = useCart()
  const { ownerDetails } = useOwners(props)

  const cartCount = computed(() => cartStore.cartItems.get(props.item.id) ?? 0)
  const isEdit = computed(() => cartCount.value > 0)

  const title = computed(() =>
    isEdit.value ? '個数を変更する' : '物品を借りる'
  )

  const rentalableOwnerDetails = computed(() =>
    ownerDetails.value.filter(o => o.rentalable)
  )
  const ownerName = ref(
    rentalableOwnerDetails.value.find(o => o.count > 0)?.userName ?? ''
  )

  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === ownerName.value)
  )
  const maxCount = computed(
    () =>
      props.item.latestLogs?.find(v => v.id === owner.value?.id)?.count ??
      props.item.owners.find(v => v.id === owner.value?.id)?.count ??
      0
  )
  const count = ref(cartCount.value || 1)

  const submit = () => {
    if (!owner.value) return

    if (count.value === 0) {
      cartStore.removeItemFromCart(props.item.id)
    } else {
      cartStore.upsertItemToCart({
        item: props.item,
        count: count.value,
        ownerId: owner.value.ownerId
      })
    }
  }
  return {
    maxCount,
    ownerDetails,
    ownerName,
    isEdit,
    title,
    count,
    submit
  }
}

export default useAddCart
