import { ref, Ref, ComputedRef, computed } from 'vue'
import { ItemType, ItemSummary, traP_ID } from '/@/lib/apis'
import { useStore } from '/@/store'

const useAddCart = (
  props: {
    item: ItemSummary
  },
  emit: (event: 'close') => void
): {
  maxCount: ComputedRef<number>
  ownerDetails: ComputedRef<{ userName: string }[]>
  ownerName: Ref<string>
  title: Ref<string>
  count: Ref<number>
  isEdit: ComputedRef<boolean>
  submit: () => void
  close: () => void
} => {
  const store = useStore()

  const cartCount = computed(
    () =>
      store.state.cart.find(iic => iic.item.id === props.item.id)?.count ?? 0
  )
  const isEdit = computed(() => cartCount.value !== 0)

  const title = computed(() =>
    isEdit.value ? '個数を変更する' : '物品を借りる'
  )
  const ownerDetails = computed(() =>
    props.item.owners
      .filter(v => v.rentalable)
      .map(v => ({ userName: v.user.name }))
  )
  const ownerName = ref(
    (() => {
      if (props.item.type === ItemType.equipment) {
        return (
          props.item.owners.find(v => v.ownerId === traP_ID)?.user.name ?? ''
        )
      } else {
        return ownerDetails.value[0]?.userName ?? ''
      }
    })()
  )
  const owner = computed(() =>
    props.item.owners.find(v => v.user.name === ownerName.value)
  )
  const maxCount = computed(
    () =>
      props.item.latestLogs?.find(v => v.id === owner.value?.id)?.count ??
      props.item.owners.find(v => v.id === owner.value?.id)?.count ??
      1
  )
  const count = ref(cartCount.value || 1)

  const close = () => {
    emit('close')
  }

  const submit = () => {
    if (!owner.value) {
      emit('close')
      return
    }
    if (count.value === 0) {
      store.commit.removeItemFromCart(props.item.id)
    } else {
      store.commit.upsertItemToCart({
        item: props.item,
        count: count.value,
        ownerId: owner.value.ownerId
      })
    }
    emit('close')
  }
  return {
    maxCount,
    ownerDetails,
    ownerName,
    isEdit,
    title,
    count,
    submit,
    close
  }
}

export default useAddCart
