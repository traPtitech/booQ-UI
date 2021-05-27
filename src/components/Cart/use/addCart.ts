import { ref, Ref, ComputedRef, computed } from 'vue'
import { ItemType, ItemSummary, traP_ID } from '/@/lib/apis'
import { useStore } from '/@/store'

const useAddCart = (
  props: {
    item: ItemSummary
    btn: { icon: string; label: string } | null
  },
  emit: ((event: 'close') => void) & ((event: 'submit') => void)
): {
  cartCount: ComputedRef<number>
  maxCount: ComputedRef<number>
  ownerDetails: ComputedRef<{ userName: string }[]>
  ownerName: Ref<string>
  title: Ref<string>
  count: Ref<number>
  isEdit: ComputedRef<boolean>
  button: ComputedRef<{ icon: string; label: string; variant?: string }>
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
  const button = computed<{ icon: string; label: string; variant?: string }>(
    () => {
      if (props.btn) {
        return props.btn
      }
      if (maxCount.value === 0) {
        return {
          icon: 'mdi:cancel',
          label: '在庫がありません',
          variant: 'caution'
        }
      }
      if (!isEdit.value) {
        return { icon: 'mdi:cart', label: 'カートに入れる' }
      }
      if (count.value !== 0) {
        return { icon: 'mdi:arrow-right-bold-circle', label: '変更する' }
      }
      return {
        icon: 'mdi:arrow-right-bold-circle',
        label: '削除',
        variant: 'caution'
      }
    }
  )

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
    emit('submit')
    emit('close')
  }
  return {
    cartCount,
    maxCount,
    ownerDetails,
    ownerName,
    isEdit,
    title,
    count,
    button,
    submit,
    close
  }
}

export default useAddCart
